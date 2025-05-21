// src/components/HomeScreen.js
import React, { useState } from "react";
import InstructionsModal from "./InstructionsModal"; // Importando o componente de modal

const HomeScreen = ({ onStartGame }) => {
  const [showCredits, setShowCredits] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Cores extraídas da imagem do logo
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  return (
    <div
      className="home-screen"
      style={{
        backgroundColor: colors.bgColor,
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
        color: colors.darkGreen,
      }}
    >
      <div className="container py-5">
        <div className="text-center mb-4">
          {/* Logo do ReciclaMente */}
          <img
            src="/reciclamente-logo.png"
            alt="ReciclaMente Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "180px" }}
          />
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "700",
              color: colors.darkGreen,
              marginBottom: "1rem",
            }}
          >
            ReciclaMente
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              color: colors.darkGreen,
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Teste sua memória enquanto aprende sobre a importância da reciclagem para o nosso planeta!
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 8px 24px rgba(13, 77, 75, 0.15)",
                marginBottom: "2rem",
              }}
            >
              <div className="d-grid gap-3">
                <button
                  onClick={onStartGame}
                  style={{
                    backgroundColor: colors.brightGreen,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(123, 190, 66, 0.3)",
                  }}
                  className="btn-hover-effect"
                >
                  Jogar
                </button>

                <button
                  onClick={() => setShowInstructions(true)}
                  style={{
                    backgroundColor: colors.mediumGreen,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 12px rgba(87, 159, 138, 0.3)",
                  }}
                  className="btn-hover-effect"
                >
                  Como Jogar
                </button>

                <button
                  onClick={() => setShowCredits(true)}
                  style={{
                    backgroundColor: "transparent",
                    color: colors.darkGreen,
                    border: `2px solid ${colors.darkGreen}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                  }}
                  className="btn-hover-effect"
                >
                  Créditos
                </button>
              </div>
            </div>

            {/* Seção de dica ambiental */}
            <div
              style={{
                backgroundColor: "#E8F4DF",
                borderRadius: "12px",
                padding: "1.5rem",
                border: `2px solid ${colors.brightGreen}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "20px",
                  backgroundColor: colors.brightGreen,
                  color: "white",
                  padding: "0.3rem 1rem",
                  borderRadius: "15px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                Sabia que?
              </div>
              <p style={{ marginTop: "0.8rem", marginBottom: "0" }}>
                Uma única garrafa plástica pode levar mais de 450 anos para se decompor completamente na
                natureza. Reciclar é proteger nosso futuro!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usando o componente de modal de instruções */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        colors={colors}
      />

      {/* Modal de Créditos */}
      {showCredits && (
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
              maxWidth: "500px",
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
              <h3 style={{ color: colors.darkGreen, margin: 0 }}>Créditos</h3>
              <button
                onClick={() => setShowCredits(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: colors.darkGreen,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <img
                src="/reciclamente-logo.png"
                alt="ReciclaMente Logo"
                style={{ maxWidth: "100px", marginBottom: "1rem" }}
              />
              <h4 style={{ color: colors.darkGreen }}>ReciclaMente</h4>
              <p style={{ margin: "0.5rem 0" }}>Desenvolvido por:</p>
              <ul>
                <li>João Pedro Araujo de Alencar 822128063</li>
                <li>Felipe Andrade Novais 822147917</li>
                <li>Gabriel Carvalho Fernandes 822125616</li>
                <li>Victor Hugo Santos Nunes 825163477</li>
              </ul>
              <p style={{ margin: "0.5rem 0" }}>Versão: 1.0.0</p>
              <p style={{ margin: "0.5rem 0" }}>Tecnologias: React, CSS, JavaScript</p>
              <p style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
                Todos os direitos reservados &copy; 2025
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setShowCredits(false)}
                style={{
                  backgroundColor: colors.mediumGreen,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS para efeitos de hover nos botões */}
      <style jsx>{`
        .btn-hover-effect:hover {
          transform: translateY(-3px);
          filter: brightness(1.1);
        }
        .btn-hover-effect:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
