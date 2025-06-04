// src/components/NameInput.js
import React, { useState } from "react";

const NameInput = ({ show, score, moves, time, difficulty, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Cores extraídas da imagem do logo
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
    lightGreen: "#E8F4DF",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Por favor, digite seu nome");
      return;
    }

    setIsSaving(true);

    try {
      await onSave(name);
      setName("");
      setError("");
    } catch (error) {
      setError("Erro ao salvar pontuação. Tente novamente.");
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!show) return null;

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
          maxWidth: "450px",
          width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1.25rem",
            borderBottom: `1px solid ${colors.lightGreen}`,
            backgroundColor: colors.brightGreen,
            color: "white",
            textAlign: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              cursor: "pointer",
              fontSize: "1.5rem",
              lineHeight: 1,
              opacity: isSaving ? 0.5 : 1,
              pointerEvents: isSaving ? "none" : "auto",
            }}
            onClick={isSaving ? null : onCancel}
          >
            ×
          </span>

          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 0.75rem",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              color: colors.brightGreen,
            }}
          >
            🏆
          </div>

          <h4 style={{ margin: "0 0 0.25rem", fontWeight: "700" }}>Nova Pontuação Alta!</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "0.9rem" }}>Seu resultado está entre os melhores!</p>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                color: colors.darkGreen,
                marginTop: 0,
                marginBottom: "0.5rem",
                fontSize: "2.5rem",
                fontWeight: "700",
              }}
            >
              {score}
            </h2>
            <p
              style={{
                color: colors.darkGreen,
                margin: 0,
                fontSize: "0.9rem",
              }}
            >
              {moves} movimentos • {formatTime(time)} • {getDifficultyName(difficulty)}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: colors.darkGreen,
                }}
                htmlFor="nameInput"
              >
                Como gostaria de ser chamado(a)?
              </label>
              <input
                type="text"
                id="nameInput"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                maxLength={20}
                disabled={isSaving}
                required
                placeholder="Digite seu nome aqui"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: error ? "2px solid #d9534f" : `2px solid ${colors.lightGreen}`,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.mediumGreen)}
                onBlur={(e) => (e.target.style.borderColor = error ? "#d9534f" : colors.lightGreen)}
              />
              {error && (
                <div
                  style={{
                    color: "#d9534f",
                    fontSize: "0.85rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "8px",
                border: "none",
                backgroundColor: colors.darkGreen,
                color: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                opacity: isSaving ? 0.8 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className={isSaving ? "" : "btn-hover-effect"}
            >
              {isSaving ? (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: "3px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      marginRight: "0.75rem",
                      animation: "spin 1s infinite linear",
                    }}
                  ></div>
                  Salvando...
                </>
              ) : (
                "Salvar Pontuação"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* CSS para animações e efeitos */}
      <style jsx>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 77, 75, 0.15);
        }
        .btn-hover-effect:active {
          transform: translateY(1px);
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getDifficultyName = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "Fácil";
    case "hard":
      return "Difícil";
    case "medium":
    default:
      return "Médio";
  }
};

export default NameInput;
