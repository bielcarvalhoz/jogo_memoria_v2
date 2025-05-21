// src/components/Scoreboard.js
import React from "react";

const Scoreboard = ({ moves, matchedPairs, totalPairs, timer }) => {
  // Cores extraídas da imagem do logo
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
    lightGreen: "#E8F4DF",
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (matchedPairs / totalPairs) * 100;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1.25rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 16px rgba(13, 77, 75, 0.08)",
      }}
    >
      <h4
        style={{
          color: colors.darkGreen,
          fontSize: "1.15rem",
          marginBottom: "1.2rem",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Status do Jogo
      </h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "0.5rem",
            backgroundColor: colors.lightGreen,
            borderRadius: "8px",
            marginRight: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              marginBottom: "0.25rem",
              color: colors.darkGreen,
              fontWeight: "600",
            }}
          >
            Movimentos
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: colors.darkGreen,
            }}
          >
            {moves}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "0.5rem",
            backgroundColor: colors.lightGreen,
            borderRadius: "8px",
            marginLeft: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              marginBottom: "0.25rem",
              color: colors.darkGreen,
              fontWeight: "600",
            }}
          >
            Tempo
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: colors.darkGreen,
            }}
          >
            {formatTime(timer)}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: colors.darkGreen,
            }}
          >
            Progresso
          </span>
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: colors.brightGreen,
            }}
          >
            {matchedPairs} / {totalPairs}
          </span>
        </div>

        <div
          style={{
            height: "12px",
            backgroundColor: "#E2E2E2",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progressPercentage}%`,
              backgroundColor: colors.brightGreen,
              borderRadius: "6px",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        {progressPercentage > 0 && progressPercentage < 100 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              color: colors.mediumGreen,
              fontStyle: "italic",
            }}
          >
            {progressPercentage < 50 ? "Continue assim, você vai conseguir!" : "Quase lá, falta pouco!"}
          </div>
        )}

        {progressPercentage === 100 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: colors.brightGreen,
            }}
          >
            Parabéns, você completou o jogo!
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
