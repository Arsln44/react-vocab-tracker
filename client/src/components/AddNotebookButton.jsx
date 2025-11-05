import React from "react";
import "./AddNotebookButton.css";

export default function AddNotebookButton({onAdd}){
    return (
        <button className="add-notebook-btn"
        onClick={(e) => {
            e.stopPropagation;
            if (typeof onAdd === "function") onAdd();
        }}
        aria-label="Yeni Defter Oluştur"
        >  
        + Yeni Defter
        </button>
    );
}