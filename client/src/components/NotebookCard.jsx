import React from "react";
import "./NotebookCard.css";

function NotebookCard({notebook, onClick, onWrite, onRead, onDelete}){
    return(
    <div className="book" onClick={onClick}>
      {/* Efekt için boş sayfalar */}
        <div className="back"></div>
        <div className="page6">
            <button onClick={(e) => {e.stopPropagation(); onWrite?.(notebook); }}>Yaz</button>
            <button onClick={(e) => {e.stopPropagation(); onRead?.(notebook); }}>Oku</button>
            <button onClick={(e) => {e.stopPropagation(); onDelete?.(notebook); }}>Sil</button>
        </div>
        <div className="page5"></div>
        <div className="page4"></div>
        <div className="page3"></div>
        <div className="page2"></div>
        <div className="page1"></div>
        
        {/* DÜZELTME: İsim (h3), kapağın (front) içine taşındı */}
        <div className="front">
             <h3 className="book-name">{notebook.name}</h3> 
        </div>
      
    </div>
    );
}

export default NotebookCard;