"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface TableModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export const TableModal: React.FC<TableModalProps> = ({
  isOpen,
  children,
  onClose,
  title,
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className="relative w-full max-w-lg bg-background p-6 shadow-lg border sm:rounded-lg animate-in zoom-in-95 fade-in-0">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2
              id="modal-title"
              className="text-lg font-semibold leading-none tracking-tight"
            >
              {title}
            </h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="rounded-sm hover:opacity-100 opacity-70 absolute right-4 top-4"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-black dark:text-white" />
            </Button>
          </div>
        )}
        <div className="relative overflow-auto">{children}</div>
      </div>
    </div>
  );
};
