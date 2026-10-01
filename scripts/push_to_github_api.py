#!/usr/bin/env python3
import os
import sys
import json
import base64
import time
import urllib.request
import urllib.error

TOKEN = os.environ.get("GITHUB_TOKEN", "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")
OWNER = "Quantex-Intelligence"
REPO = "YRC"
BASE_URL = f"https://api.github.com/repos/{OWNER}/{REPO}"

HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "YRC-Deployer"
}

def api_request(endpoint, method="GET", data=None):
    url = f"{BASE_URL}/{endpoint}" if not endpoint.startswith("http") else endpoint
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                if resp.status == 204:
                    return None
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode("utf-8", errors="ignore")
            print(f"HTTPError {e.code} on {endpoint}: {err_msg}")
            if attempt == 4:
                raise
            time.sleep(2)
        except Exception as e:
            print(f"Network error on {endpoint}: {e} (attempt {attempt+1}/5)")
            if attempt == 4:
                raise
            time.sleep(2)

def get_latest_commit():
    ref_data = api_request("git/refs/heads/main")
    return ref_data["object"]["sha"]

def create_blob(filepath):
    with open(filepath, "rb") as f:
        content = f.read()
    b64_content = base64.b64encode(content).decode("utf-8")
    payload = {
        "content": b64_content,
        "encoding": "base64"
    }
    resp = api_request("git/blobs", method="POST", data=payload)
    return resp["sha"]

def should_include_file(relpath):
    # Exclude root source brochures, photos, node_modules, .next, .env, git
    parts = relpath.split(os.sep)
    if any(p.startswith(".git") or p in ("node_modules", ".next", ".kiro", "var", "tmp", "output", "coverage", "test-results") for p in parts):
        return False
    if relpath == ".env" or relpath.startswith(".env.") and relpath != ".env.example":
        return False
    if relpath.endswith(".pdf") and len(parts) == 1:
        return False
    if relpath.startswith("PHOTO-") and relpath.endswith(".jpg"):
        return False
    if relpath.endswith(".tsbuildinfo") or relpath.endswith(".DS_Store"):
        return False
    if relpath.startswith("data/extractions"):
        return False
    return True

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(f"Scanning files in {repo_root}...")
    
    files_to_push = []
    for root, dirs, files in os.walk(repo_root):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, repo_root)
            if should_include_file(rel_path):
                files_to_push.append(rel_path)
    
    print(f"Found {len(files_to_push)} files to commit.")
    
    # 1. Upload blobs
    tree_items = []
    for idx, relpath in enumerate(sorted(files_to_push), 1):
        full_path = os.path.join(repo_root, relpath)
        sha = create_blob(full_path)
        print(f"[{idx}/{len(files_to_push)}] Uploaded blob: {relpath} ({sha[:8]})")
        tree_items.append({
            "path": relpath,
            "mode": "100644",
            "type": "blob",
            "sha": sha
        })
        time.sleep(0.05)  # gentle rate limit
    
    # 2. Get parent commit
    parent_sha = get_latest_commit()
    print(f"Parent commit on main: {parent_sha}")
    
    # 3. Create tree
    print("Creating git tree...")
    tree_resp = api_request("git/trees", method="POST", data={"tree": tree_items})
    tree_sha = tree_resp["sha"]
    print(f"Created tree: {tree_sha}")
    
    # 4. Create commit
    print("Creating git commit...")
    commit_payload = {
        "message": "feat: YRC Global Industrial B2B & B2C E-Commerce Marketplace platform",
        "tree": tree_sha,
        "parents": [parent_sha]
    }
    commit_resp = api_request("git/commits", method="POST", data=commit_payload)
    commit_sha = commit_resp["sha"]
    print(f"Created commit: {commit_sha}")
    
    # 5. Update main ref
    print("Updating main reference...")
    ref_resp = api_request("git/refs/heads/main", method="PATCH", data={
        "sha": commit_sha,
        "force": True
    })
    print(f"Successfully updated main to {commit_sha}!")
    print(f"Repository URL: https://github.com/{OWNER}/{REPO}")

if __name__ == "__main__":
    main()
