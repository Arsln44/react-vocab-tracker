import React from "react";
import NotebookCard from "../components/NotebookCard";
import AddNotebookButton from "../components/AddNotebookButton";
import AddNotebookModal from "../components/AddNotebookModal";
import AddNoteModal from "../components/AddNoteModal";
import NotebookViewModal from "../components/NotebookViewModal"; // <- ekledim
import "./LibraryPage.css";

export default function LibraryPage() {
  const [notebooks, setNotebooks] = React.useState([
    { id: 1, name: "Vocab Tracker", type: "vocab", words: [] }
  ]);

  // Tek modal state: hangi modal açık ve gerekiyorsa hangi notebook ile ilişkili
  const [modalState, setModalState] = React.useState({ type: null, notebook: null });

  // Yeni defter oluşturma
  const handleCreate = (name) => {
    const newNb = { id: Date.now(), name, type: "note", words: [] };
    setNotebooks(prev => [newNb, ...prev]);
    setModalState({ type: null, notebook: null });
  };

  // Kelime ekleme: noteObj = { id, word, meaning, addedAt }
  const handleAddWord = (noteObj, notebook) => {
    if (!notebook) return;
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebook.id ? { ...nb, words: [...(nb.words || []), noteObj] } : nb
      )
    );
    console.log("Eklendi:", noteObj, "->", notebook.name);
    setModalState({ type: null, notebook: null });
  };

  // artık onRead modalı açacak şekilde değiştiriyoruz
  const handleRead = (notebook) => {
    setModalState({ type: "viewNotebook", notebook });
  };

  const handleDelete = (notebook) => {
    if (!window.confirm(`${notebook.name} silinsin mi?`)) return;
    setNotebooks(prev => prev.filter(nb => nb.id !== notebook.id));
  };

  return (
    <div className="library-page">
      {/* Yeni defter butonu */}
      <AddNotebookButton onAdd={() => setModalState({ type: "addNotebook", notebook: null })} />

      {/* Yeni defter modalı */}
      <AddNotebookModal
        open={modalState.type === "addNotebook"}
        onClose={() => setModalState({ type: null, notebook: null })}
        onCreate={handleCreate}
      />

      {/* Yeni kelime modalı */}
      <AddNoteModal
        open={modalState.type === "addWord"}
        notebook={modalState.notebook}
        onClose={() => setModalState({ type: null, notebook: null })}
        onWrite={handleAddWord}
      />

      {/* Notebook (view) modalı */}
      <NotebookViewModal
        open={modalState.type === "viewNotebook"}
        notebook={modalState.notebook}
        onClose={() => setModalState({ type: null, notebook: null })}
      />

      {/* Defter kartları */}
      {notebooks.map((nb) => (
        <NotebookCard
          key={nb.id}
          notebook={nb}
          // NotebookCard içinde onWrite çağrılırken notebook argümanı verilecek:
          // onWrite={ (notebook) => ... } şeklinde yakalıyoruz
          onWrite={(notebook) => setModalState({ type: "addWord", notebook })}
          onRead={() => handleRead(nb)}
          onDelete={() => handleDelete(nb)}
        />
      ))}
    </div>
  );
}
