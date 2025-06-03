// src/components/CuriosityModal.js
import React from "react";

const CuriosityModal = ({ show, curiosity, onClose, colors }) => {
  if (!show || !curiosity) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: `3px solid ${curiosity.color || colors.brightGreen}`,
          animation: "modalAppear 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
            color: "#999",
            lineHeight: 1,
            padding: "5px",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#999";
          }}
        >
          ×
        </button>

        {/* Header com ícone e título */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "0.5rem",
            }}
          >
            <img
              src={curiosity.icon}
              alt="Logo Item"
              style={{ width: "150px", marginBottom: "-25px", marginTop: "-25px" }}
            />
          </div>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: curiosity.color || colors.darkGreen,
              margin: "0",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {curiosity.title}
          </h2>
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: curiosity.color || colors.brightGreen,
              margin: "0.5rem auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Conteúdo da curiosidade */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            padding: "1.5rem",
            marginBottom: "2rem",
            border: `2px solid ${curiosity.color || colors.brightGreen}20`,
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: colors.darkGreen,
              margin: "0",
              fontFamily: "'Nunito', sans-serif",
              textAlign: "justify",
            }}
          >
            {curiosity.fact}
          </p>
        </div>

        {/* Rodapé com botão */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: curiosity.color || colors.brightGreen,
              color: "white",
              border: "none",
              borderRadius: "25px",
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              fontFamily: "'Nunito', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Continuar Jogando! 🎮
          </button>
        </div>

        {/* Decoração de fundo */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "100px",
            height: "100px",
            backgroundColor: `${curiosity.color || colors.brightGreen}10`,
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "80px",
            height: "80px",
            backgroundColor: `${curiosity.color || colors.brightGreen}08`,
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </div>

      {/* CSS para animações */}
      <style jsx>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 1rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CuriosityModal;
