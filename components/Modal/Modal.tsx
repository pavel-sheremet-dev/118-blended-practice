"use client";

import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose = () => {}, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
