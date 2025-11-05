import React from "react";
import "./NotebookViewModal.css";

export default function NotebookViewModal({ open, onClose, notebook }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const words = Array.isArray(notebook?.words) ? notebook.words : [];

  return (
    <div className="nvm-backdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="nvm-container" onMouseDown={(e) => e.stopPropagation()}>
        <button className="nvm-close" onClick={onClose} aria-label="Kapat">✕</button>

        <div className="nvm-book-flat" aria-live="polite">

          <div className="nvm-left-page">
            <h3 className="nvm-book-title">{notebook?.name ?? "Defter"}</h3>
            <span className="nvm-book-subtitle">Kelime Defteri</span>
          </div>

          <div className="nvm-right-page">
            <div className="nvm-content-wrapper" role="list">
              {words.length === 0 ? (
                <div className="nvm-empty">Bu defterde henüz kelime yok.</div>
              ) : (
                <ol>
                  {words.map((w) => (
                    <li key={w.id ?? w.addedAt} className="nvm-word-item" role="listitem">
                      <span className="nvm-word">{w.word}</span>
                      <span className="nvm-sep"> — </span>
                      <span className="nvm-meaning">{w.meaning}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}