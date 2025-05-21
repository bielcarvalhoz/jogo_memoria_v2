// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import InstructionsModal from "./components/InstructionsModal";
import GameOver from "./components/GameOver";
import HomeScreen from "./components/HomeScreen";
import Scoreboard from "./components/Scoreboard";
import Scoretable from "./components/scoreTable";
import NameInput from "./components/NameInput";
import "./App.css";

// Imagens para as cartas - você pode usar caminhos relativos ou URLs
const cardImages = [
  // Itens recicláveis com suas respectivas cores de reciclagem
  "/images/cards/papel.png", // Papel (azul)
  "/images/cards/plastico.png", // Plástico (vermelho)
  "/images/cards/vidro.png", // Vidro (verde)
  "/images/cards/metal.png", // Metal (amarelo)
  "/images/cards/organico.png", // Orgânico (marrom)
  "/images/cards/eletronico.png", // Eletrônico (laranja)
  "/images/cards/bateria.png", // Bateria
  "/images/cards/oleo.png", // Óleo usado
  "/images/cards/pilha.png", // Pilhas
  "/images/cards/lampada.png", // Lâmpadas
  "/images/cards/tetrapak.png", // Tetrapak
  "/images/cards/pet.png", // Garrafa PET
  "/images/cards/lata.png", // Lata de alumínio
  "/images/cards/jornal.png", // Jornal
  "/images/cards/cd.png", // CD/DVD
  "/images/cards/pneu.png", // Pneu
];

const App = () => {
  // Cores extraídas da imagem do logo (mesmas dos outros componentes)
  const colors = {
    darkGreen: "#0D4D4B",
    brightGreen: "#7BBE42",
    mediumGreen: "#579F8A",
    bgColor: "#F7F4E9",
  };

  // Estados para gerenciar o jogo
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [totalPairs, setTotalPairs] = useState(6);

  // Estados para gerenciar a navegação e os modais
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [isHighScore, setIsHighScore] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  // Inicializa o jogo
  const initializeGame = useCallback(() => {
    let pairsCount;
    switch (difficulty) {
      case "easy":
        pairsCount = 4; // 8 cartas
        break;
      case "hard":
        pairsCount = 8; // 16 cartas
        break;
      case "medium":
      default:
        pairsCount = 6; // 12 cartas
        break;
    }

    setTotalPairs(pairsCount);

    // Cria pares de cartas
    const selectedImages = cardImages.slice(0, pairsCount);
    let newCards = [];

    selectedImages.forEach((imagePath, index) => {
      // Cria dois cards com a mesma imagem (um par)
      newCards.push({ id: index * 2, symbol: imagePath, isFlipped: false, isMatched: false });
      newCards.push({ id: index * 2 + 1, symbol: imagePath, isFlipped: false, isMatched: false });
    });

    // Embaralha as cartas
    newCards = shuffleCards(newCards);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setIsActive(true);
    setGameOver(false);
    setStatusMessage("Jogo iniciado! Encontre os pares.");
  }, [difficulty]);

  // Embaralha as cartas usando o algoritmo Fisher-Yates
  const shuffleCards = (cards) => {
    const newCards = [...cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  };

  // Lida com o clique na carta
  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;

    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)));

    setFlippedCards((prevFlipped) => [...prevFlipped, id]);
  };

  // Verifica se há um par quando duas cartas são viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      const firstCard = cards.find((card) => card.id === flippedCards[0]);
      const secondCard = cards.find((card) => card.id === flippedCards[1]);

      if (firstCard.symbol === secondCard.symbol) {
        // Par encontrado
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === flippedCards[0] || card.id === flippedCards[1] ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prevMatched) => prevMatched + 1);
        setFlippedCards([]);
        setStatusMessage("Par encontrado! Continue assim!");
      } else {
        // Não é um par, vira as cartas de volta após um delay
        setStatusMessage("Não é um par. Tente novamente!");
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === flippedCards[0] || card.id === flippedCards[1]
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Verifica se o jogo acabou
  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs === totalPairs) {
      setIsActive(false);
      const finalScore = calculateScore();
      setCurrentScore(finalScore);

      // Verifica se a pontuação é alta o suficiente para estar no top 10
      checkIfHighScore(finalScore);
    }
  }, [matchedPairs, totalPairs]);

  // Verifica se a pontuação é alta o suficiente para estar no top 10
  const checkIfHighScore = async (score) => {
    try {
      const response = await fetch("/api/scores/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          difficulty,
        }),
      });

      const data = await response.json();

      if (data.isHighScore) {
        setIsHighScore(true);
        setShowNameInput(true);
      } else {
        setGameOver(true);
      }
    } catch (error) {
      console.error("Erro ao verificar pontuação:", error);
      // Em caso de erro, mostra o modal de fim de jogo
      setGameOver(true);
    }
  };

  // Timer
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Calcula a pontuação do jogador
  const calculateScore = () => {
    const baseScore = 1000;
    const timeDeduction = timer * 2;
    const movesDeduction = moves * 10;

    return Math.max(baseScore - timeDeduction - movesDeduction, 100);
  };

  // Altera a dificuldade do jogo
  const handleDifficultyChange = (newDifficulty) => {
    if (!isActive || window.confirm("Mudar a dificuldade irá reiniciar o jogo. Deseja continuar?")) {
      setDifficulty(newDifficulty);
      setIsActive(false);
    }
  };

  // Inicia um novo jogo
  const handleStartGame = () => {
    setShowHomeScreen(false);
    initializeGame();
  };

  // Volta para a tela inicial
  const handleBackToHome = () => {
    setShowHomeScreen(true);
    setIsActive(false);
    setShowScoreboard(false);
  };

  // Salva a pontuação do jogador
  const saveScore = async (name) => {
    try {
      const scoreData = {
        name,
        score: currentScore,
        moves,
        time: timer,
        difficulty,
        date: new Date().toISOString(),
      };

      await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreData),
      });

      setShowNameInput(false);
      setShowScoreboard(true);
    } catch (error) {
      console.error("Erro ao salvar pontuação:", error);
      throw error;
    }
  };

  // Fecha o modal de fim de jogo e exibe o scoreboard
  const handleGameOverClose = () => {
    setGameOver(false);
    setShowScoreboard(true);
  };

  // Fecha o modal de inserir nome sem salvar
  const handleNameInputCancel = () => {
    setShowNameInput(false);
    setGameOver(true);
  };

  // Efeito para inicializar o jogo quando a dificuldade muda e o jogo está ativo
  useEffect(() => {
    if (!showHomeScreen && !isActive && cards.length === 0) {
      initializeGame();
    }
  }, [difficulty, isActive, cards.length, initializeGame, showHomeScreen]);

  if (showHomeScreen) {
    return <HomeScreen onStartGame={handleStartGame} />;
  }

  return (
    <div
      className="memory-game"
      style={{
        backgroundColor: colors.bgColor,
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
        color: colors.darkGreen,
        padding: "1.5rem",
      }}
    >
      <div className="container">
        <header
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <img
              src="/reciclamente-logo.png"
              alt="ReciclaMente Logo"
              style={{
                maxWidth: "80px",
                marginRight: "1rem",
              }}
            />
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                color: colors.darkGreen,
                margin: "0",
              }}
            >
              ReciclaMente
            </h1>
          </div>
          <p
            style={{
              fontSize: "1.2rem",
              color: colors.mediumGreen,
              fontWeight: "500",
              marginBottom: "1.5rem",
            }}
          >
            Encontre todos os pares e aprenda sobre reciclagem!
          </p>
          <button
            onClick={handleBackToHome}
            style={{
              backgroundColor: "transparent",
              color: colors.darkGreen,
              border: `2px solid ${colors.darkGreen}`,
              borderRadius: "8px",
              padding: "0.5rem 1.25rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            className="btn-hover-effect"
          >
            Voltar ao Menu
          </button>
        </header>

        <div
          className="status-message"
          style={{
            backgroundColor: "#E8F4DF",
            color: colors.darkGreen,
            borderRadius: "10px",
            padding: "0.75rem 1.25rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            border: `1px solid ${colors.brightGreen}`,
            fontWeight: "500",
          }}
          role="alert"
        >
          {statusMessage}
        </div>

        <div
          className="row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 -15px",
          }}
        >
          <div
            className="col-md-8"
            style={{
              flex: "0 0 66.666667%",
              maxWidth: "66.666667%",
              padding: "0 15px",
              marginBottom: "1.5rem",
              position: "relative",
            }}
          >
            <GameBoard cards={cards} onCardClick={handleCardClick} />
            <button
              onClick={() => setShowInstructions(true)}
              style={{
                backgroundColor: colors.mediumGreen,
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                cursor: "pointer",
                position: "absolute",
                top: "-20px",
                left: 0,
              }}
            >
              ?
            </button>
          </div>
          <div
            className="col-md-4"
            style={{
              flex: "0 0 33.333333%",
              maxWidth: "33.333333%",
              padding: "0 15px",
            }}
          >
            <Scoreboard moves={moves} matchedPairs={matchedPairs} totalPairs={totalPairs} timer={timer} />
            <GameControls
              onNewGame={initializeGame}
              onDifficultyChange={handleDifficultyChange}
              difficulty={difficulty}
              isGameActive={isActive}
            />
            <button
              onClick={() => setShowScoreboard(true)}
              style={{
                backgroundColor: "transparent",
                color: colors.mediumGreen,
                border: `2px solid ${colors.mediumGreen}`,
                borderRadius: "8px",
                padding: "0.85rem",
                fontSize: "1rem",
                fontWeight: "600",
                width: "100%",
                marginTop: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="btn-hover-effect"
            >
              Ver Melhores Pontuações
            </button>
          </div>
        </div>

        {/* <GameInstructions /> */}
      </div>

      <GameOver
        show={gameOver}
        score={currentScore}
        moves={moves}
        time={timer}
        onClose={handleGameOverClose}
        onNewGame={initializeGame}
      />

      <NameInput
        show={showNameInput}
        score={currentScore}
        moves={moves}
        time={timer}
        difficulty={difficulty}
        onSave={saveScore}
        onCancel={handleNameInputCancel}
      />

      <Scoretable
        show={showScoreboard}
        onClose={() => setShowScoreboard(false)}
        onPlayAgain={initializeGame}
      />

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        colors={colors}
      />

      {/* CSS para efeitos de hover nos botões */}
      <style jsx>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .btn-hover-effect:active {
          transform: translateY(1px);
        }

        @media (max-width: 768px) {
          .row {
            flex-direction: column;
          }

          .col-md-8,
          .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
