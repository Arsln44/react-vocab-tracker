import React from "react";
import "./AddNoteModal.css";

export default function AddNoteModal({open, onClose, onWrite, notebook}) {

    const [word, setWord] = React.useState("");
    const [meaning, setMeaning] = React.useState("");
    const wordInputRef = React.useRef(null);

    React.useEffect(() => {
        if (open) {
        setWord("");
        setMeaning("");
        const t = setTimeout(() => {
            wordInputRef.current?.focus();
        }, 50);
        return () => clearTimeout(t);
        }
    }, [open]);

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
        if (e.key === "Escape") {
            if (typeof onClose === "function") onClose();
        }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const w = word?.trim();
        const m = meaning?.trim();
        if (!w || !m) return;
        const note = { id: Date.now(), word: w, meaning: m, addedAt: new Date().toISOString() };
        if (typeof onWrite === "function") onWrite(note, notebook);
        setWord("");
        setMeaning("");
        if (typeof onClose === "function") onClose();
    };

    if(!open) return null;

    return(
        <div className="modal-backdrop" role="dialog" aria-label="true" onMouseDown={onClose}>
            <div className="add-modal" onMouseDown={(e) => e.stopPropagation()}>
                <header>
                    <h3>{notebook ? notebook.name : "Yeni Not"}</h3>
                </header>
                <form onSubmit={handleSubmit}>
                    <label className="row-label">
                        <span className="label-text">Kelime Giriniz</span>
                        <div className="two-inputs">
                            <input
                                ref={wordInputRef}
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                placeholder="Kelime"
                                aria-label="Kelime"
                            />
                            <span className="colon">:</span>
                            <input
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                            placeholder="Anlamı"
                            aria-label="Anlam"
                            />
                        </div>
                    </label>
                    <div className="modal-actions">
                        <button type="button" className="btn secondary" onClick={onClose}>İptal</button>
                        <button type="submit" className="btn primary">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}