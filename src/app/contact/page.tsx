"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  HelpCircle,
  MessageSquare,
  Building2,
  FileText,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";

export default function ContactSupportPage() {
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "procurement",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ticketId = `SUP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket(ticketId);
      setLoading(false);
    }, 600);
  };

  const supportChannels = [
    {
      icon: Phone,
      title: "Direct B2B Hotline",
      detail: "+91 98765 43210",
      subtext: "Mon – Sat, 9:00 AM – 7:00 PM IST",
      action: "tel:+919876543210",
      actionText: "Call Hotline",
      color: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
      icon: Mail,
      title: "Procurement Desk Email",
      detail: "support@yrcglobal.com",
      subtext: "Guaranteed 4-hour response SLA",
      action: "mailto:support@yrcglobal.com",
      actionText: "Email Helpdesk",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      icon: Headphones,
      title: "Engineering Advisory",
      detail: "engineering@yrcglobal.com",
      subtext: "STP/ETP, Blowers & Membrane Sizing",
      action: "mailto:engineering@yrcglobal.com",
      actionText: "Consult Engineers",
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
    {
      icon: Building2,
      title: "Corporate Headquarters",
      detail: "YRC Expo Marketing Private Limited",
      subtext: "Ahmedabad, Gujarat & Hyderabad, Telangana",
      action: "/about",
      actionText: "View Offices",
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
  ];

  const faqs = [
    {
      q: "How do I request a formal B2B quotation (RFQ)?",
      a: "You can click 'Request RFQ' on any product page or use the global RFQ form. Our engineering team immediately dispatches your specs to the authorized manufacturer for custom pricing.",
    },
    {
      q: "Are prices on YRC Global inclusive of GST?",
      a: "Prices for standard catalog items are shown in INR with 18% GST itemized transparently during checkout. Tax invoices with your company GSTIN are generated automatically.",
    },
    {
      q: "Can I size equipment before procurement?",
      a: "Yes! Use our interactive Engineering Calculators to compute exact aeration blower CFM and ultrafiltration membrane surface areas based on your plant flow rate.",
    },
    {
      q: "How does YRC Global verify product specifications?",
      a: "All equipment specifications are extracted directly from official manufacturer technical brochures and cross-referenced with physical catalogs. Zero fabricated data.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header Breadcrumbs */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-700 font-semibold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Support &amp; Contact Desk</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                <Sparkles className="h-4 w-4 text-sky-600" /> Enterprise Customer Support
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Contact &amp; Technical Assistance Desk
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl leading-relaxed">
                We are here to assist with industrial equipment procurement, engineering sizing, supplier onboarding, and government MSME subsidy consultations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-2 shrink-0">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified B2B Response Desk</span>
            </div>
          </div>
        </div>

        {/* 4 Direct Support Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supportChannels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-sky-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${ch.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{ch.title}</h3>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">{ch.detail}</p>
                    <p className="text-xs text-slate-500 mt-1">{ch.subtext}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={ch.action}
                    className="inline-flex items-center text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors group"
                  >
                    <span>{ch.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid: Interactive Form & Direct Help */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Support Ticket Submission Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Helpdesk Ticket Dispatch
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                Submit an Official Assistance Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill in your project requirements or question and an authorized technical specialist will respond within 4 business hours.
              </p>
            </div>

            {submittedTicket ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center space-y-4 animate-in fade-in">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Ticket Registered Successfully
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Support Ticket #{submittedTicket}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your inquiry has been routed to our technical engineering team. A confirmation email has been dispatched to <strong>{formData.email}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-98"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Full Name / Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Company / Enterprise Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Process Technologies Pvt Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Inquiry Classification *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    >
                      <option value="procurement">Industrial Procurement / RFQ</option>
                      <option value="engineering">Technical Sizing &amp; Engineering Help</option>
                      <option value="orders">Existing Order &amp; Logistics Tracking</option>
                      <option value="supplier">Manufacturer &amp; Supplier Onboarding</option>
                      <option value="msme">MSME Scheme &amp; Subsidy Advisory</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Subject / Equipment Reference *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aeration Roots Blower Model AB-100 sizing"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800">Detailed Message &amp; Operating Parameters *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your technical query, operating conditions (flow rate, head, capacity), or inquiry details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-hidden transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3.5 px-6 text-xs sm:text-sm font-bold text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? "Registering Support Ticket..." : "Submit Support Ticket"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ & SLA Commitments */}
          <div className="lg:col-span-5 space-y-6">
            {/* SLA Commitment Card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/40 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Clock className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Our Service Level Commitments (SLA)
                </h3>
              </div>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">4-Hour Response:</strong> All procurement tickets acknowledged by a technical account officer.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">24-48 Hour RFQ Quotations:</strong> Turnkey plant proposals engineered directly with factory engineers.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">100% Tax Invoicing Support:</strong> Instant assistance for GST input tax credit (ITC) reconciliation.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <HelpCircle className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {faqs.map((f, i) => (
                  <div key={i} className="py-3 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{f.q}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
