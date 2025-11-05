import React from "react";
import "./AddNotebookModal.css";

export default function AddNotebookModal({open, onClose, onCreate}) {
    const [name, setName] = React.useState("");

    React.useEffect(() => {
    if (open) {
      setName("");
      const t = setTimeout(() => {
        const el = document.querySelector(".add-modal input");
        el?.focus();
      }, 50); 
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name?.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="add-modal" onMouseDown={(e)=>e.stopPropagation()}>
        <header>
          <h3>Yeni Defter Oluştur</h3>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            Defter Adı
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn. Gündelik Kelimeler"
              aria-label="Yeni defter adı"
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn secondary" onClick={onClose}>İptal</button>
            <button type="submit" className="btn primary">Oluştur</button>
          </div>
        </form>
      </div>
    </div>
  );
}
