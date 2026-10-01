"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Info,
  Sliders,
  Sparkles,
} from "lucide-react";

export default function EngineeringCalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"blower" | "membrane">("blower");

  // Blower State
  const [tankVolume, setTankVolume] = useState<number>(200); // m³
  const [bodIn, setBodIn] = useState<number>(300); // mg/L
  const [bodOut, setBodOut] = useState<number>(30); // mg/L
  const [diffuserDepth, setDiffuserDepth] = useState<number>(4.0); // meters

  // Blower Calculations
  const dailyBodKg = (tankVolume * (bodIn - bodOut)) / 1000;
  const o2DemandKgDay = dailyBodKg * 1.5;
  const sote = Math.min(0.28, diffuserDepth * 0.065); // Standard oxygen transfer efficiency
  const airDensity = 1.2; // kg/m³
  const o2InAirFraction = 0.232;
  const standardAirVolumeM3Day = o2DemandKgDay / (sote * airDensity * o2InAirFraction);
  const airFlowM3Hr = Math.round(standardAirVolumeM3Day / 24);
  const airFlowCfm = Math.round(airFlowM3Hr * 0.5886);
  const operatingPressureBar = Number((diffuserDepth * 0.098 + 0.15).toFixed(2)); // water head + piping losses

  // Recommended blower model determination
  let recommendedBlower = {
    model: "Alpha AB-50",
    powerKw: "3.7 kW (5 HP)",
    slug: "alpha-roots-blowers-ab-series",
  };
  if (airFlowM3Hr > 1200) {
    recommendedBlower = {
      model: "Alpha AB-150 Heavy",
      powerKw: "37 kW (50 HP)",
      slug: "alpha-roots-blowers-ab-series",
    };
  } else if (airFlowM3Hr > 600) {
    recommendedBlower = {
      model: "Alpha AB-100",
      powerKw: "18.5 kW (25 HP)",
      slug: "alpha-roots-blowers-ab-series",
    };
  } else if (airFlowM3Hr > 250) {
    recommendedBlower = {
      model: "Alpha AB-80",
      powerKw: "7.5 kW (10 HP)",
      slug: "alpha-roots-blowers-ab-series",
    };
  }

  // Membrane State
  const [plantCapacityKld, setPlantCapacityKld] = useState<number>(500); // KLD (m³/day)
  const [operatingHours, setOperatingHours] = useState<number>(20); // hrs/day
  const [designFluxLmh, setDesignFluxLmh] = useState<number>(65); // LMH (L/m²/hr)

  // Membrane Calculations
  const hourlyFlowM3 = plantCapacityKld / operatingHours;
  const totalLitersPerHour = hourlyFlowM3 * 1000;
  const totalAreaM2 = Math.round(totalLitersPerHour / designFluxLmh);
  const moduleAreaM2 = 50; // Asahi Kasei UNA-620A area
  const requiredModules = Math.ceil(totalAreaM2 / moduleAreaM2);
  const racksCount = Math.ceil(requiredModules / 8);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Breadcrumbs */}
        <div className="space-y-2">
          <nav className="text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Engineering Sizing Tools</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-2">
                <Sparkles className="h-3.5 w-3.5 text-orange-600" /> Process Engineering Suite
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Industrial Equipment Sizing Calculators
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Precision engineering models to compute exact airflow, pressure, and membrane surface area requirements.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>CPHEEO &amp; ISO Sizing Standards</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-2xl p-2 gap-2 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("blower")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "blower"
                ? "bg-sky-600 text-white shadow-md shadow-sky-100"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Zap className={`h-4 w-4 ${activeTab === "blower" ? "text-amber-200" : "text-sky-600"}`} />
            <span>STP/ETP Aeration Roots Blower Calculator</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("membrane")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "membrane"
                ? "bg-sky-600 text-white shadow-md shadow-sky-100"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className={`h-4 w-4 ${activeTab === "membrane" ? "text-amber-200" : "text-sky-600"}`} />
            <span>Hollow-Fiber Ultrafiltration (UF) Sizing</span>
          </button>
        </div>

        {/* Blower Calculator Panel */}
        {activeTab === "blower" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-b-2xl border-x border-b border-slate-200 p-6 sm:p-8 shadow-xs">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">1. Wastewater Process Parameters</h3>
                <p className="text-xs text-slate-500">Configure your aeration basin dimensions and biological organic loading.</p>
              </div>

              {/* Slider 1: Tank Volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Aeration Tank Volume (m³)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{tankVolume} m³</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={tankVolume}
                  onChange={(e) => setTankVolume(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20 m³ (Small STP)</span>
                  <span>1,000 m³</span>
                  <span>2,000 m³ (Industrial ETP)</span>
                </div>
              </div>

              {/* Slider 2: Influent BOD */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Raw Influent BOD (mg/L)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{bodIn} mg/L</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={bodIn}
                  onChange={(e) => setBodIn(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>50 mg/L (Dilute)</span>
                  <span>300 mg/L (Municipal)</span>
                  <span>1,500 mg/L (Food/Dairy ETP)</span>
                </div>
              </div>

              {/* Slider 3: Target Effluent BOD */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Target Effluent BOD (mg/L)</label>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">{bodOut} mg/L</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={bodOut}
                  onChange={(e) => setBodOut(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10 mg/L (CPCB Zero Discharge)</span>
                  <span>30 mg/L (Standard Discharge)</span>
                </div>
              </div>

              {/* Slider 4: Diffuser Water Depth */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Diffuser Submergence Depth (m)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{diffuserDepth} meters</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="6.0"
                  step="0.5"
                  value={diffuserDepth}
                  onChange={(e) => setDiffuserDepth(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2.0 m (Shallow)</span>
                  <span>4.0 m (Standard)</span>
                  <span>6.0 m (Deep Basin)</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-xs space-y-6 border border-sky-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                    Calculated Engineering Ratings
                  </span>
                  <span className="rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 border border-emerald-200">
                    SOTE {(sote * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Required Airflow</span>
                    <span className="text-xl font-extrabold text-slate-900">{airFlowM3Hr}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">m³/hr</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Airflow in CFM</span>
                    <span className="text-xl font-extrabold text-orange-600">{airFlowCfm}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">CFM</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Operating Pressure</span>
                    <span className="text-lg font-extrabold text-slate-900">{operatingPressureBar}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">bar</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Daily BOD Removed</span>
                    <span className="text-lg font-extrabold text-slate-900">{dailyBodKg.toFixed(0)}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">kg/day</span>
                  </div>
                </div>
              </div>

              {/* Matched Product CTA */}
              <div className="pt-4 border-t border-sky-100 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Recommended OEM Blower Configuration
                </span>
                <div className="rounded-xl bg-white p-4 border border-sky-200 shadow-xs space-y-1">
                  <div className="text-sm font-extrabold text-slate-900">{recommendedBlower.model}</div>
                  <div className="text-xs text-sky-700 font-bold">Motor Rating: {recommendedBlower.powerKw}</div>
                  <p className="text-[11px] text-slate-500">Twin-lobe heavy-duty rotary positive displacement air blower with acoustic enclosure.</p>
                </div>

                <Link
                  href={`/products/${recommendedBlower.slug}`}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-center text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>View Recommended Product &amp; Buy</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Membrane Calculator Panel */}
        {activeTab === "membrane" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-b-2xl border-x border-b border-slate-200 p-6 sm:p-8 shadow-xs">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">1. Ultrafiltration Plant Requirements</h3>
                <p className="text-xs text-slate-500">Determine hollow-fiber membrane module quantity based on feed flux rates.</p>
              </div>

              {/* Slider 1: Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Design Capacity (KLD / m³ per day)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{plantCapacityKld} KLD</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={plantCapacityKld}
                  onChange={(e) => setPlantCapacityKld(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>50 KLD (Commercial)</span>
                  <span>500 KLD (Industrial)</span>
                  <span>5,000 KLD (5 MLD Municipal)</span>
                </div>
              </div>

              {/* Slider 2: Operating Hours */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Daily Operating Hours (excluding backwash)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{operatingHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="22"
                  step="1"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>16 hrs (High backwash)</span>
                  <span>20 hrs (Typical)</span>
                  <span>22 hrs (Continuous)</span>
                </div>
              </div>

              {/* Slider 3: Design Flux */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-700">Design Membrane Flux (LMH - L/m²/hr)</label>
                  <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">{designFluxLmh} LMH</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  step="5"
                  value={designFluxLmh}
                  onChange={(e) => setDesignFluxLmh(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>35 LMH (High Turbidity Tertiary)</span>
                  <span>65 LMH (Pre-treated Surface)</span>
                  <span>100 LMH (Groundwater)</span>
                </div>
              </div>
            </div>

            {/* Membrane Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-xs space-y-6 border border-sky-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                    Calculated Skid Dimensions
                  </span>
                  <span className="rounded-lg bg-sky-100 text-sky-800 text-[10px] font-mono font-bold px-2 py-0.5 border border-sky-200">
                    PVDF Hollow Fiber
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Total Membrane Area</span>
                    <span className="text-xl font-extrabold text-slate-900">{totalAreaM2}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">m²</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Hourly Permeate Flow</span>
                    <span className="text-xl font-extrabold text-orange-600">{hourlyFlowM3.toFixed(1)}</span>
                    <span className="text-[11px] text-slate-500 ml-1 font-mono">m³/hr</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Required Modules</span>
                    <span className="text-xl font-extrabold text-emerald-700">{requiredModules}</span>
                    <span className="text-[11px] text-slate-500 ml-1">Modules (50m²)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-semibold block">Skid Rack Banks</span>
                    <span className="text-xl font-extrabold text-slate-900">{racksCount}</span>
                    <span className="text-[11px] text-slate-500 ml-1">Skid Racks</span>
                  </div>
                </div>
              </div>

              {/* Matched Product CTA */}
              <div className="pt-4 border-t border-sky-100 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Matched OEM Membrane Specification
                </span>
                <div className="rounded-xl bg-white p-4 border border-sky-200 shadow-xs space-y-1">
                  <div className="text-sm font-extrabold text-slate-900">Asahi Kasei Microza UNA-620A</div>
                  <div className="text-xs text-sky-700 font-bold">0.1 μm PVDF Hollow Fiber Membrane</div>
                  <p className="text-[11px] text-slate-500">50 m² active filtration area with pressurized outside-in flow filtration.</p>
                </div>

                <Link
                  href="/products/asahi-microza-una-620a-uf-module"
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3 text-center text-xs font-bold text-white hover:shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>View Product &amp; Order Modules</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
