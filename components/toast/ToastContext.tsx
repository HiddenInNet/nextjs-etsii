"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export type ToastType = "error" | "success" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Contenedor flotante para los Toasts */}
      <div className="fixed right-5 bottom-5 z-50 flex w-full max-w-sm flex-col gap-3 px-4 font-mono">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-in slide-in-from-bottom-5 flex items-start gap-3 rounded-xl border-4 border-neutral-900 bg-neutral-900 p-4 text-white shadow-[4px_4px_0_#202020] transition-all duration-300 ${
              toast.type === "error"
                ? "border-red-500/80 text-red-400"
                : toast.type === "success"
                  ? "border-emerald-500/80 text-emerald-400"
                  : "border-yellow-400/80 text-yellow-400"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "error" && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              {toast.type === "success" && (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              )}
              {toast.type === "info" && (
                <Info className="h-5 w-5 text-yellow-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="mt-1 font-sans text-xs leading-relaxed wrap-break-word text-neutral-300">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de un ToastProvider");
  }
  return context;
}
