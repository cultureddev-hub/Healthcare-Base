"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function CustomSelect({
  value,
  onChange,
  disabled,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between gap-2"
      >
        <span className={selectedLabel ? "text-white" : "text-slate-500"}>
          {selectedLabel ?? placeholder ?? "Select..."}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform text-slate-400 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-0 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl z-[200] overflow-hidden max-h-[16rem] overflow-y-auto no-scrollbar">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                value === opt.value
                  ? "text-[#3eb5bd] bg-white/10"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
