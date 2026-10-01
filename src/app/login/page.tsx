"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Sparkles,
  Building,
  UserCheck,
  RotateCw,
  Zap,
} from "lucide-react";
import { loginAction, requestOtpAction, verifyOtpAction, quickDemoLoginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<"otp" | "password">("otp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // 1-Click Fast Persona Switchers
  const handleQuickLogin = (role: "ADMIN" | "BUYER" | "SUPPLIER") => {
    setErrorMsg(null);
    startTransition(async () => {
      try {
        await quickDemoLoginAction(role);
      } catch (err: unknown) {
        if ((err as Error)?.message?.includes("NEXT_REDIRECT")) return;
        setErrorMsg("Failed to sign in with demo credentials. Please try again.");
      }
    });
  };

  // Request OTP Handler
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }
    setErrorMsg(null);
    setFeedbackMsg(null);

    startTransition(async () => {
      const res = await requestOtpAction(email);
      if (res.success) {
        setOtpSent(true);
        setDevOtp(res.devOtp || "123456");
        setFeedbackMsg(`Verification code sent to ${email}`);
      } else {
        setErrorMsg(res.message);
      }
    });
  };

  // Verify OTP & Sign In
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }
    setErrorMsg(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("otp", otpCode);
      const res = await verifyOtpAction(null, formData);
      if (res && !res.success) {
        setErrorMsg(res.error || "Failed to verify OTP.");
      }
    });
  };

  // Password Login Handler
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);
      const res = await loginAction(null, formData);
      if (res && !res.success) {
        setErrorMsg(res.error || "Invalid email or password.");
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 shadow-xs">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Sign In to YRC Global
          </h1>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Industrial B2B procurement, automated RFQs, equipment sizing, and verified supplier catalogues.
          </p>
        </div>

        {/* 1-Click Instant Demo Credentials Access */}
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50/60 via-white to-sky-50/40 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                1-Click Instant Test Access
              </span>
            </div>
            <span className="text-[11px] font-bold text-sky-800 bg-sky-100/90 px-2.5 py-0.5 rounded-full">
              Zero Password Needed
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Click any verified test persona to sign in instantly with full operational privileges:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleQuickLogin("BUYER")}
              className="flex items-center justify-center space-x-1.5 rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-2.5 text-xs font-bold text-sky-900 hover:bg-sky-100 hover:border-sky-300 transition-all shadow-2xs active:scale-[0.98] cursor-pointer hover:-translate-y-0.5"
            >
              <UserCheck className="h-3.5 w-3.5 text-sky-700 shrink-0" />
              <span>Industrial Buyer</span>
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleQuickLogin("SUPPLIER")}
              className="flex items-center justify-center space-x-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300 transition-all shadow-2xs active:scale-[0.98] cursor-pointer hover:-translate-y-0.5"
            >
              <Building className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
              <span>OEM Supplier</span>
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleQuickLogin("ADMIN")}
              className="flex items-center justify-center space-x-1.5 rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-2.5 text-xs font-bold text-rose-900 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-2xs active:scale-[0.98] cursor-pointer hover:-translate-y-0.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-rose-700 shrink-0" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="flex items-center space-x-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {/* Global Success Banner */}
        {feedbackMsg && (
          <div className="flex items-center space-x-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">{feedbackMsg}</span>
          </div>
        )}

        {/* Main Authentication Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Auth Mode Tabs: OTP vs Password */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAuthMode("otp");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "otp"
                  ? "bg-white text-sky-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="h-4 w-4 text-orange-500" />
              <span>Email + OTP (Recommended)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "password"
                  ? "bg-white text-sky-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <KeyRound className="h-4 w-4 text-slate-500" />
              <span>Password Login</span>
            </button>
          </div>

          {/* TAB 1: EMAIL + OTP LOGIN */}
          {authMode === "otp" && (
            <div className="space-y-4">
              {!otpSent ? (
                /* Step 1: Input Email */
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label htmlFor="otp-email" className="block text-xs font-bold text-slate-800 mb-1.5">
                      Business or Personal Email
                    </label>
                    <div className="relative">
                      <input
                        id="otp-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="buyer@yrcglobal.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-3 pl-10 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      We will dispatch a secure 6-digit one-time passcode to this email address.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || !email}
                    className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 py-3 text-sm font-bold text-white shadow-xs hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin text-white" /> Sending OTP...
                      </span>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="h-4 w-4 text-sky-200" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Step 2: Input 6-digit OTP */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {/* Realtime OTP Simulator Notification Banner in Sky Blue */}
                  {devOtp && (
                    <div className="rounded-xl border border-sky-200 bg-sky-50/90 p-3.5 text-xs text-sky-900 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                          Instant Demo Verification Code
                        </span>
                        <span className="font-mono text-base font-extrabold text-sky-950">
                          {devOtp}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpCode(devOtp)}
                        className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        Auto-fill Code
                      </button>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="otp-input" className="block text-xs font-bold text-slate-800">
                        Enter 6-Digit Code sent to <span className="text-slate-900 font-extrabold">{email}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode("");
                        }}
                        className="text-[11px] font-bold text-sky-700 hover:underline cursor-pointer"
                      >
                        Change Email
                      </button>
                    </div>
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••••"
                      className="w-full text-center tracking-[0.5em] font-mono font-extrabold text-xl sm:text-2xl rounded-xl border border-slate-300 bg-slate-50/50 py-3 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || otpCode.length < 6}
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin text-white" /> Verifying Code...
                      </span>
                    ) : (
                      <>
                        <span>Verify &amp; Enter Platform</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleSendOtp()}
                      className="text-xs font-semibold text-slate-600 hover:text-sky-700 cursor-pointer"
                    >
                      Didn&apos;t receive code? Resend OTP
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: STANDARD PASSWORD LOGIN */}
          {authMode === "password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label htmlFor="pwd-email" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="pwd-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-3 pl-10 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="pwd-input" className="block text-xs font-bold text-slate-800">
                    Password
                  </label>
                  <Link href="/contact" className="text-[11px] font-semibold text-sky-700 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="pwd-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-3 pl-10 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending || !email || !password}
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 py-3 text-sm font-bold text-white shadow-xs hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin text-white" /> Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Sign In with Password</span>
                    <ArrowRight className="h-4 w-4 text-sky-200" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Registration Link */}
        <div className="text-center text-xs sm:text-sm text-slate-600">
          <span>New to YRC Global? </span>
          <Link href="/register" className="font-bold text-sky-700 hover:text-sky-900 hover:underline">
            Register your Enterprise Account
          </Link>
        </div>
      </div>
    </div>
  );
}
