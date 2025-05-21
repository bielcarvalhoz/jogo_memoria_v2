// src/components/Card.js
import React, { memo } from "react";

const Card = ({ id, symbol, isFlipped, isMatched, onClick, colors }) => {
  // Se colors não for passado como prop, defina as cores padrão
  const cardColors = colors || {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={`${isFlipped || isMatched ? "flipped" : ""}`}
      onClick={handleClick}
      aria-label={`Carta ${isFlipped || isMatched ? "revelada: " + symbol : "não revelada"}`}
      style={{
        perspective: "1000px",
        cursor: !isFlipped && !isMatched ? "pointer" : "default",
        aspectRatio: "1",
      }}
    >
      <div
        className="card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped || isMatched ? "rotateY(180deg)" : "",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="card-face card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardColors.darkGreen,
            color: "white",
            borderRadius: "12px",
            fontSize: "2rem",
            fontWeight: "bold",
            border: `3px solid ${cardColors.mediumGreen}`,
            boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
            }}
          >
            ?
          </div>
        </div>

        <div
          className="card-face card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isMatched ? cardColors.brightGreen : cardColors.bgColor,
            color: cardColors.darkGreen,
            borderRadius: "12px",
            fontSize: "2rem",
            transform: "rotateY(180deg)",
            border: isMatched ? `3px solid ${cardColors.brightGreen}` : `3px solid ${cardColors.mediumGreen}`,
            transition: "background-color 0.3s",
            boxShadow: isMatched ? "0 0 15px rgba(123, 190, 66, 0.5)" : "none",
          }}
        >
          <img
            src={symbol}
            alt="img"
            style={{
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* Animações para a virada da carta */}
      <style jsx>{`
        .card:hover .card-inner:not(.flipped) {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-5px);
        }

        .card .card-inner {
          transition: transform 0.6s, box-shadow 0.3s, transform 0.3s;
        }

        @media (max-width: 768px) {
          .card-face {
            font-size: 1.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .card-face {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Card);
