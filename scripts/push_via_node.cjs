const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

async function main() {
  const token = process.env.GITHUB_PAT || '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';
  const repoDir = path.resolve(__dirname, '..');
  
  console.log('Initiating push via Node.js OpenSSL 3.6.3...');
  const result = await git.push({
    fs,
    http,
    dir: repoDir,
    remote: 'origin',
    ref: 'main',
    url: 'https://github.com/Quantex-Intelligence/YRC.git',
    onAuth: () => ({
      username: token,
      password: ''
    }),
    onProgress: (p) => {
      if (p.total) {
        const pct = Math.round((p.loaded / p.total) * 100);
        console.log(`${p.phase}: ${pct}% (${p.loaded}/${p.total})`);
      } else {
        console.log(`${p.phase}: ${p.loaded}`);
      }
    }
  });
  console.log('Push completed successfully!', JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('Push failed:', err);
  process.exit(1);
});
