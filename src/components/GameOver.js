// src/components/GameOver.js
import React from "react";

const GameOver = ({ show, score, moves, time, onClose, onNewGame }) => {
  if (!show) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Cores extraídas da imagem do logo (mesmas do HomeScreen)
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          width: "90%",
          maxWidth: "550px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Nunito', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Cabeçalho */}
        <div
          style={{
            backgroundColor: colors.mediumGreen,
            padding: "1.2rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            borderBottom: `3px solid ${colors.brightGreen}`,
          }}
        >
          <h5 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700" }}>
            Parabéns! Você completou o jogo!
          </h5>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              transition: "background-color 0.2s",
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Corpo */}
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.bgColor,
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              border: `2px dashed ${colors.brightGreen}`,
            }}
          >
            <h2
              style={{
                color: colors.darkGreen,
                fontWeight: "700",
                fontSize: "2.2rem",
                marginBottom: "1rem",
              }}
            >
              Pontuação: {score}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: colors.darkGreen,
                marginBottom: "0.7rem",
              }}
            >
              Você completou o jogo em <strong>{moves}</strong> movimentos
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                color: colors.darkGreen,
                marginBottom: "0",
              }}
            >
              Tempo total: <strong>{formatTime(time)}</strong>
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#E8F4DF",
              borderRadius: "8px",
              padding: "1rem",
              fontSize: "0.95rem",
              color: colors.darkGreen,
              marginBottom: "1rem",
            }}
          >
            Obrigado por jogar e aprender sobre reciclagem! A cada jogo, você contribui para um mundo mais
            sustentável.
          </div>
        </div>

        {/* Rodapé */}
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#F7F7F7",
            borderTop: "1px solid #E5E5E5",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              color: colors.darkGreen,
              border: `2px solid ${colors.darkGreen}`,
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="btn-hover-effect"
          >
            Fechar
          </button>
          <button
            onClick={onNewGame}
            style={{
              backgroundColor: colors.brightGreen,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(123, 190, 66, 0.3)",
            }}
            className="btn-hover-effect"
          >
            Jogar Novamente
          </button>
        </div>
      </div>

      {/* CSS para efeitos de hover nos botões */}
      <style jsx>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .btn-hover-effect:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
};

export default GameOver;
