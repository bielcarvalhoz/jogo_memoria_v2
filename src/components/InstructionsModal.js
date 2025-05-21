// src/components/InstructionsModal.js
import React from "react";

const InstructionsModal = ({ isOpen, onClose, colors }) => {
  // Se não receber as cores, use valores padrão baseados no seu design
  const defaultColors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  // Use as cores passadas por props ou as cores padrão
  const modalColors = colors || defaultColors;

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "600px",
          width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ color: modalColors.darkGreen, margin: 0 }}>Como Jogar</h3>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: modalColors.darkGreen,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <ol style={{ paddingLeft: "1.2rem" }}>
            <li style={{ marginBottom: "0.8rem" }}>Vire duas cartas para encontrar pares correspondentes.</li>
            <li style={{ marginBottom: "0.8rem" }}>
              Cada par representa um item reciclável e seu destino correto.
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              Memorize a posição das cartas para encontrar os pares mais rapidamente.
            </li>
            <li style={{ marginBottom: "0.8rem" }}>Ao encontrar todos os pares, você completa o jogo!</li>
            <li>Aprenda curiosidades sobre reciclagem a cada par encontrado.</li>
          </ol>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: modalColors.brightGreen,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Entendi!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
