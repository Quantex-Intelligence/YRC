"use client";

import React, { useState } from "react";
import { ShieldCheck, ZoomIn, ExternalLink, Layers, Table } from "lucide-react";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";

interface ProductMediaGalleryProps {
  productName: string;
  images: Array<{
    id: string;
    imageUrl: string;
    altText?: string | null;
    isPrimary?: boolean;
    displayOrder?: number;
  }>;
  sourceDocumentId?: string | null;
  sourcePage?: number | null;
  sourceFilename?: string | null;
  companyName?: string;
  specs?: Array<{ label: string; value: string }>;
}

export function ProductMediaGallery({
  productName,
  images,
  sourceDocumentId,
  sourcePage = 1,
  sourceFilename,
  companyName,
  specs,
}: ProductMediaGalleryProps) {
  // Assemble only genuine equipment renders and photos
  const mediaItems: Array<{
    type: "render";
    url: string;
    label: string;
    description: string;
  }> = [];

  images.forEach((img, idx) => {
    mediaItems.push({
      type: "render",
      url: img.imageUrl,
      label: img.altText || (idx === 0 ? "Primary Isometric View" : `Perspective Angle ${idx + 1}`),
      description: "High-Resolution Engineering Render / Model",
    });
  });

  if (mediaItems.length === 0) {
    mediaItems.push({
      type: "render",
      url: "/images/products/roots-blower.jpg",
      label: "Engineered Equipment Model",
      description: "Calibrated 3D Industrial Asset",
    });
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentItem = mediaItems[selectedIndex] || mediaItems[0];

  return (
    <div className="space-y-4">
      {/* Main Display Stage: Luminous, high-contrast crisp stage */}
      <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 overflow-hidden shadow-xs aspect-4/3 flex items-center justify-center group transition-all">
        {currentItem ? (
          <div className="relative h-full w-full p-4 flex items-center justify-center">
            <img
              src={currentItem.url}
              alt={currentItem.label}
              className={`max-h-full max-w-full object-contain transition-all duration-300 ${
                isZoomed ? "scale-140 cursor-zoom-out" : "cursor-zoom-in group-hover:scale-103"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <Layers className="h-12 w-12 mx-auto mb-2 text-slate-300" />
            <span className="text-xs">No preview media available</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-sky-800 border border-sky-200 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            OEM Calibrated Specification
          </span>

          <span className="rounded-full bg-slate-800/90 backdrop-blur-md px-2.5 py-1 text-xs font-mono text-white border border-slate-700">
            {selectedIndex + 1} / {mediaItems.length}
          </span>
        </div>

        {/* Floating Zoom & Controls */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2 z-10">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="rounded-xl bg-white/90 backdrop-blur-md p-2 text-slate-700 hover:text-sky-700 hover:bg-white border border-slate-200 transition-all shadow-xs cursor-pointer"
            title="Toggle Detailed Zoom"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          {currentItem && (
            <a
              href={currentItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/90 backdrop-blur-md p-2 text-slate-700 hover:text-sky-700 hover:bg-white border border-slate-200 transition-all shadow-xs"
              title="Open Fullscreen in New Window"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Bottom Banner inside image container */}
        <div className="absolute bottom-3 left-3 text-xs text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs pointer-events-none">
          <span className="font-extrabold text-sky-800">{currentItem?.label}</span>
          <span className="text-slate-500 ml-1.5 hidden sm:inline">• {currentItem?.description}</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {mediaItems.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {mediaItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white p-1 cursor-pointer ${
                selectedIndex === idx
                  ? "border-sky-500 shadow-sm ring-2 ring-sky-200"
                  : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={item.url}
                alt={item.label}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 px-1 py-0.5 text-[10px] text-white truncate text-center font-medium">
                View {idx + 1}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Structured Technical Datasheet Trigger Bar */}
      {sourceDocumentId && sourceFilename && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3 text-xs text-slate-700">
            <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
              <Table className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs sm:text-sm">{sourceFilename}</span>
              <span className="text-[11px] text-slate-500">
                Verified OEM Calibration • Document Page {sourcePage || 1}
              </span>
            </div>
          </div>
          <BrochurePreviewModal
            docId={sourceDocumentId}
            docFilename={sourceFilename}
            pageNumber={sourcePage || 1}
            productName={productName}
            companyName={companyName}
            specs={specs}
            imageUrl={currentItem?.url}
            triggerLabel="Open Verified Technical Datasheet"
            triggerClassName="rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-4 py-2 text-xs font-bold text-white transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
          />
        </div>
      )}
    </div>
  );
}
