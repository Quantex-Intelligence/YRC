"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction, requestOtpAction, verifyOtpAction, AuthActionResult } from "@/app/actions/auth";
import { RoleCodes } from "@/lib/rbac/permissions";
import {
  Building2,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCw,
} from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    registerAction,
    null
  );

  const [registerMode, setRegisterMode] = useState<"otp" | "password">("otp");
  const [selectedRole, setSelectedRole] = useState<string>(RoleCodes.BUYER);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP State
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  // 1-Click Autofill Sample Procurement Account
  const handleAutofillDemo = () => {
    setFirstName("Vikram");
    setLastName("Patel");
    setCompanyName("Gujarat Heavy Process Systems Pvt Ltd");
    setEmail(`procurement.${Math.floor(1000 + Math.random() * 9000)}@ghprocess.com`);
    setPassword("EnterprisePass2026!");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setOtpError("Please provide a valid corporate work email address.");
      return;
    }
    setOtpError(null);
    setOtpLoading(true);

    try {
      const res = await requestOtpAction(email);
      if (res.success) {
        setOtpSent(true);
        setDevOtp(res.devOtp || "123456");
      } else {
        setOtpError(res.message);
      }
    } catch {
      setOtpError("Unable to dispatch OTP. Please check your network connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyRegisterOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setOtpError("Please enter the complete 6-digit OTP code.");
      return;
    }
    setOtpError(null);
    setOtpLoading(true);

    try {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("otp", otpCode);
      formData.set("roleCode", selectedRole);
      formData.set("fullName", `${firstName} ${lastName}`);
      const res = await verifyOtpAction(null, formData);
      if (res && !res.success) {
        setOtpError(res.error || "Failed to verify registration OTP.");
      }
    } catch {
      setOtpError("Failed to register session.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 shadow-xs">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Create Your YRC Global Account
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Join India&apos;s premier industrial ecosystem to procure machinery, request verified RFQ quotes, or list OEM equipment.
          </p>
        </div>

        {/* Demo Fast Fill Pill */}
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-700">
            <Sparkles className="h-4 w-4 text-sky-600 shrink-0" />
            <span className="font-semibold">Fast-track registration testing:</span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-4 py-1.5 text-xs font-bold text-white transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5 shrink-0"
          >
            Autofill Sample Data
          </button>
        </div>

        {/* Error Banners */}
        {(state?.error || otpError) && (
          <div className="flex items-center space-x-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-semibold">{state?.error || otpError}</span>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setRegisterMode("otp")}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                registerMode === "otp"
                  ? "bg-white text-sky-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="h-4 w-4 text-orange-500" />
              <span>Register via OTP (Instant)</span>
            </button>
            <button
              type="button"
              onClick={() => setRegisterMode("password")}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                registerMode === "password"
                  ? "bg-white text-sky-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lock className="h-4 w-4 text-slate-500" />
              <span>Password Registration</span>
            </button>
          </div>

          {/* Role Archetype Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Select Account Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedRole === RoleCodes.BUYER
                    ? "border-sky-500 bg-sky-50/80 text-sky-950 ring-2 ring-sky-200 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="roleCode"
                    value={RoleCodes.BUYER}
                    checked={selectedRole === RoleCodes.BUYER}
                    onChange={() => setSelectedRole(RoleCodes.BUYER)}
                    className="accent-sky-600"
                  />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">Industrial Buyer</span>
                </div>
                <span className="text-xs text-slate-500 mt-1">
                  Procure equipment, post RFQs, compare quotes &amp; access MSME schemes
                </span>
              </label>

              <label
                className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedRole === RoleCodes.SUPPLIER
                    ? "border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-200 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="roleCode"
                    value={RoleCodes.SUPPLIER}
                    checked={selectedRole === RoleCodes.SUPPLIER}
                    onChange={() => setSelectedRole(RoleCodes.SUPPLIER)}
                    className="accent-emerald-600"
                  />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">OEM / Supplier</span>
                </div>
                <span className="text-xs text-slate-500 mt-1">
                  List machinery, respond to commercial RFQs &amp; publish verified catalogues
                </span>
              </label>
            </div>
          </div>

          {/* MODE 1: OTP REGISTRATION */}
          {registerMode === "otp" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Vikram"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Patel"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Company / Organization Legal Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Gujarat Heavy Process Systems Pvt Ltd"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Work Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="v.patel@ghprocess.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 pl-9 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || !email || !firstName}
                    className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 py-3 text-sm font-bold text-white disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer hover:-translate-y-0.5 active:scale-[0.99]"
                  >
                    {otpLoading ? (
                      <span className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin text-white" /> Sending OTP...
                      </span>
                    ) : (
                      <>
                        <span>Send Registration OTP</span>
                        <ArrowRight className="h-4 w-4 text-sky-200" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyRegisterOtp} className="space-y-4">
                  {devOtp && (
                    <div className="rounded-xl border border-sky-200 bg-sky-50/90 p-3.5 text-xs text-sky-900 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                          Instant Demo Verification Code
                        </span>
                        <span className="font-mono text-base font-extrabold text-sky-950">{devOtp}</span>
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
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Enter 6-Digit Code sent to <span className="font-extrabold text-slate-900">{email}</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••••"
                      className="w-full text-center tracking-[0.5em] font-mono font-extrabold text-xl sm:text-2xl rounded-xl border border-slate-300 bg-slate-50/50 py-3 text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || otpCode.length < 6}
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {otpLoading ? (
                      <span className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin text-white" /> Verifying &amp; Registering...
                      </span>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODE 2: PASSWORD REGISTRATION */}
          {registerMode === "password" && (
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="roleCode" value={selectedRole} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-first" className="block text-xs font-bold text-slate-800 mb-1">
                    First Name *
                  </label>
                  <input
                    id="reg-first"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ramesh"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label htmlFor="reg-last" className="block text-xs font-bold text-slate-800 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="reg-last"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Kumar"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-company" className="block text-xs font-bold text-slate-800 mb-1">
                  Company Legal Name
                </label>
                <input
                  id="reg-company"
                  name="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Apex Industrial Solutions Pvt Ltd"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-2.5 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold text-slate-800 mb-1">
                  Work Email Address *
                </label>
                <div className="relative">
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 pl-9 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-pwd" className="block text-xs font-bold text-slate-800 mb-1">
                  Password (Min. 8 characters) *
                </label>
                <div className="relative">
                  <input
                    id="reg-pwd"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 pl-9 text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 py-3 text-sm font-bold text-white shadow-xs hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin text-white" /> Creating Enterprise Account...
                  </span>
                ) : (
                  <>
                    <span>Register Enterprise Account</span>
                    <ArrowRight className="h-4 w-4 text-sky-200" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Existing Account Footer Link */}
        <div className="text-center text-xs sm:text-sm text-slate-600">
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-sky-700 hover:text-sky-900 hover:underline">
            Sign in with Email or OTP
          </Link>
        </div>
      </div>
    </div>
  );
}
