// src/components/Scoretable.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ajuste o caminho conforme necessário

const Scoretable = ({ show, onClose, onPlayAgain }) => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cores extraídas da imagem do logo
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
    lightGreen: "#E8F4DF",
  };

  useEffect(() => {
    if (show) {
      // Carregar as pontuações do servidor quando o componente for exibido
      fetchScores();
    }
  }, [show]);

  const fetchScores = async () => {
    try {
      setIsLoading(true);
      const scoresRef = collection(db, "scores");
      const q = query(scoresRef, orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScores(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pontuações:", error);
      setIsLoading(false);
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
          maxWidth: "900px",
          width: "95%",
          maxHeight: "90vh",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: `1px solid ${colors.lightGreen}`,
            backgroundColor: colors.darkGreen,
            color: "white",
          }}
        >
          <h5 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>
            <span style={{ color: colors.brightGreen, marginRight: "8px" }}>★</span>
            Top 10 Pontuações
          </h5>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "white",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: "1.5rem",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0 auto",
                  border: `4px solid ${colors.lightGreen}`,
                  borderTopColor: colors.brightGreen,
                  borderRadius: "50%",
                  animation: "spin 1s infinite linear",
                }}
              ></div>
              <p style={{ marginTop: "1rem", color: colors.darkGreen }}>Carregando pontuações...</p>
              <style jsx>{`
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
          ) : scores.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  fontSize: "0.95rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: colors.lightGreen,
                      color: colors.darkGreen,
                    }}
                  >
                    <th style={tableHeaderStyle}>Posição</th>
                    <th style={tableHeaderStyle}>Nome</th>
                    <th style={tableHeaderStyle}>Pontuação</th>
                    <th style={tableHeaderStyle}>Movimentos</th>
                    <th style={tableHeaderStyle}>Tempo</th>
                    <th style={tableHeaderStyle}>Dificuldade</th>
                    <th style={tableHeaderStyle}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr
                      key={score.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : colors.bgColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.lightGreen)}
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "white" : colors.bgColor)
                      }
                    >
                      <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                        {index < 3 ? (
                          <span
                            style={{
                              display: "inline-block",
                              width: "24px",
                              height: "24px",
                              lineHeight: "24px",
                              textAlign: "center",
                              borderRadius: "50%",
                              backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                              color: index === 0 ? "#000" : "#FFF",
                            }}
                          >
                            {index + 1}
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td style={tableCellStyle}>{score.name}</td>
                      <td style={{ ...tableCellStyle, fontWeight: "bold", color: colors.brightGreen }}>
                        {score.score}
                      </td>
                      <td style={tableCellStyle}>{score.moves}</td>
                      <td style={tableCellStyle}>{formatTime(score.time)}</td>
                      <td style={tableCellStyle}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            backgroundColor: getDifficultyColor(score.difficulty),
                            color: "white",
                          }}
                        >
                          {getDifficultyName(score.difficulty)}
                        </span>
                      </td>
                      <td style={tableCellStyle}>{new Date(score.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                backgroundColor: colors.lightGreen,
                borderRadius: "8px",
                color: colors.darkGreen,
              }}
            >
              <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Nenhuma pontuação registrada ainda.
              </p>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>Jogue uma partida para registrar sua pontuação!</p>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: `1px solid ${colors.lightGreen}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              color: colors.darkGreen,
              border: `2px solid ${colors.darkGreen}`,
              borderRadius: "8px",
              padding: "0.6rem 1.2rem",
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
            onClick={onPlayAgain}
            style={{
              backgroundColor: colors.brightGreen,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.6rem 1.2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(123, 190, 66, 0.3)",
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

const tableHeaderStyle = {
  padding: "0.75rem 1rem",
  textAlign: "left",
  fontWeight: "600",
  borderRadius: "4px 4px 0 0",
};

const tableCellStyle = {
  padding: "0.75rem 1rem",
  borderBottom: "1px solid #E8F4DF",
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

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "#7BBE42"; // Verde brilhante
    case "hard":
      return "#D64045"; // Vermelho
    case "medium":
    default:
      return "#579F8A"; // Verde médio
  }
};

export default Scoretable;
