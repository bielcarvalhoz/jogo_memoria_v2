// src/components/GameControls.js
import React from "react";

const GameControls = ({ onNewGame, onDifficultyChange, difficulty, isGameActive }) => {
  // Cores extraídas da imagem do logo (mesmas do HomeScreen)
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  return (
    <div
      className="game-controls"
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 16px rgba(13, 77, 75, 0.1)",
        marginBottom: "1.5rem",
        border: `2px solid ${colors.mediumGreen}`,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <button
          onClick={onNewGame}
          aria-label="Iniciar Novo Jogo"
          style={{
            backgroundColor: colors.brightGreen,
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.85rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            width: "100%",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(123, 190, 66, 0.3)",
          }}
          className="btn-hover-effect"
        >
          {isGameActive ? "Reiniciar Jogo" : "Iniciar Jogo"}
        </button>
      </div>

      <div>
        <label
          htmlFor="difficulty-select"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            color: colors.darkGreen,
            fontWeight: "600",
          }}
        >
          Dificuldade:
        </label>
        <div
          style={{
            position: "relative",
          }}
        >
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            aria-label="Selecionar Dificuldade"
            style={{
              width: "100%",
              padding: "0.75rem",
              appearance: "none",
              backgroundColor: colors.bgColor,
              border: `2px solid ${colors.mediumGreen}`,
              borderRadius: "8px",
              color: colors.darkGreen,
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            <option value="easy">Fácil (8 cartas)</option>
            <option value="medium">Médio (12 cartas)</option>
            <option value="hard">Difícil (16 cartas)</option>
          </select>
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: colors.darkGreen,
            }}
          >
            ▼
          </div>
        </div>
      </div>

      {/* Dica de jogo */}
      <div
        style={{
          backgroundColor: "#E8F4DF",
          borderRadius: "8px",
          padding: "0.8rem 1rem",
          marginTop: "1.25rem",
          fontSize: "0.9rem",
          color: colors.darkGreen,
          borderLeft: `4px solid ${colors.brightGreen}`,
        }}
      >
        <strong>Dica:</strong> Quanto mais rápido você completar o jogo com menos movimentos, maior será sua
        pontuação!
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

        select:focus {
          outline: none;
          border-color: ${colors.brightGreen};
          box-shadow: 0 0 0 3px rgba(123, 190, 66, 0.3);
        }
      `}</style>
    </div>
  );
};

export default GameControls;
