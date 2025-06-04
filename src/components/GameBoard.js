// src/components/GameBoard.js
import React from "react";
import Card from "./Card";

const GameBoard = ({ cards, onCardClick }) => {
  // Cores extraídas da imagem do logo (mesmas do HomeScreen)
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  // Determina o número de colunas com base na quantidade de cartas
  const getGridTemplateColumns = () => {
    const cardCount = cards.length;
    if (cardCount <= 8) return "repeat(4, 1fr)";
    if (cardCount <= 12) return "repeat(4, 1fr)";
    return "repeat(4, 1fr)";
  };

  // Se não há cartas, mostra a mensagem de início
  if (!cards || cards.length === 0) {
    return (
      <div
        className="game-board"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(13, 77, 75, 0.15)",
          fontFamily: "'Nunito', sans-serif",
          minHeight: "400px",
          textAlign: "center",
        }}
      >
        {/* Ícone decorativo */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: colors.brightGreen,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            fontSize: "2.5rem",
            color: "white",
          }}
        >
          🎮
        </div>

        {/* Mensagem principal */}
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.darkGreen,
            marginBottom: "0.75rem",
            margin: "0 0 0.75rem 0",
          }}
        >
          Pronto para começar?
        </h3>

        {/* Mensagem secundária */}
        <p
          style={{
            fontSize: "1rem",
            color: colors.mediumGreen,
            marginBottom: "1.5rem",
            lineHeight: "1.5",
            maxWidth: "300px",
            margin: "0 0 1.5rem 0",
          }}
        >
          Clique em <strong>"Novo Jogo"</strong> para iniciar sua aventura de reciclagem!
        </p>

        {/* Animação sutil */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            opacity: "0.6",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: colors.brightGreen,
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: colors.mediumGreen,
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite 0.3s",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: colors.darkGreen,
              borderRadius: "50%",
              animation: "pulse 1.5s ease-in-out infinite 0.6s",
            }}
          />
        </div>

        {/* CSS para animação */}
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          @media (max-width: 768px) {
            .game-board {
              padding: 2rem 1rem;
              min-height: 350px;
            }
          }

          @media (max-width: 480px) {
            .game-board {
              padding: 1.5rem 0.75rem;
              min-height: 300px;
            }
          }
        `}</style>
      </div>
    );
  }

  // Renderização normal com as cartas
  return (
    <div
      className="game-board"
      style={{
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns(),
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(13, 77, 75, 0.15)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={onCardClick}
          colors={colors}
        />
      ))}

      {/* Responsividade para dispositivos menores */}
      <style jsx>{`
        @media (max-width: 768px) {
          .game-board {
            gap: 0.75rem;
            padding: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .game-board {
            gap: 0.5rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GameBoard;
