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
