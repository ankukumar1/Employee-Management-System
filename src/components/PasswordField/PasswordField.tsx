'use client';

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type PasswordFieldProps = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordField({ label, id, className, ...inputProps }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  const inputId = id ?? inputProps.name;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700" htmlFor={inputId}>
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 ${className ?? ""}`.trim()}
          type={isVisible ? "text" : "password"}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute inset-y-0 right-2 flex w-9 items-center justify-center rounded-lg text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 3 18 18" />
      <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
      <path d="M7.59 7.59C5.05 8.82 3 12 3 12s3.75 6.75 9 6.75a8.3 8.3 0 0 0 4.91-1.61" />
      <path d="M14.12 9.88A3 3 0 0 0 12 9c-.3 0-.6.05-.88.14" />
      <path d="M17.55 6.45A8.3 8.3 0 0 1 21 12s-.93 1.67-2.6 3.24" />
    </svg>
  );
}
