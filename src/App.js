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
import CuriosityModal from "./components/CuriosityModal";
import "./App.css";
import { db } from "./firebaseConfig";
import { getDocs, addDoc, collection, query, orderBy, limit } from "firebase/firestore";

// Imagens para as cartas - você pode usar caminhos relativos ou URLs
const cardImages = [
  // Itens recicláveis com suas respectivas cores de reciclagem
  "papel", // Papel (azul)
  "plastico", // Plástico (vermelho)
  "vidro", // Vidro (verde)
  "metal", // Metal (amarelo)
  "organico", // Orgânico (marrom)
  "eletronico", // Eletrônico (laranja)
  "bateria", // Bateria
  "oleo", // Óleo usado
  "pilha", // Pilhas
  "lampada", // Lâmpadas
  "tetrapak", // Tetrapak
  "pet", // Garrafa PET
  "lata", // Lata de alumínio
  "papelao", // Papelao
  "cd", // CD/DVD
  "pneu", // Pneu
];

// Base de dados de curiosidades para cada item
const curiosities = {
  papel: {
    title: "Papel",
    fact: "Uma tonelada de papel reciclado economiza cerca de 17 árvores! O papel pode ser reciclado até 7 vezes antes de suas fibras ficarem muito curtas.",
    icon: "/images/cards/papel.png",
    color: "#4A90E2",
  },
  plastico: {
    title: "Plástico",
    fact: "O plástico pode levar até 400 anos para se decomor na natureza! Mas quando reciclado, pode se transformar em roupas, tapetes e até mesmo novos produtos plásticos.",
    icon: "/images/cards/plastico.png",
    color: "#E74C3C",
  },
  vidro: {
    title: "Vidro",
    fact: "O vidro é 100% reciclável e pode ser reciclado infinitas vezes sem perder qualidade! Uma garrafa de vidro reciclada economiza energia suficiente para acender uma lâmpada por 4 horas.",
    icon: "/images/cards/vidro.png",
    color: "#27AE60",
  },
  metal: {
    title: "Metal",
    fact: "Reciclar uma lata de alumínio economiza 95% da energia necessária para produzir uma nova! O alumínio pode ser reciclado infinitas vezes sem perder suas propriedades.",
    icon: "/images/cards/metal.png",
    color: "#F39C12",
  },
  organico: {
    title: "Resíduo Orgânico",
    fact: "Os resíduos orgânicos representam cerca de 50% do lixo doméstico! Quando compostados, viram adubo natural que enriquece o solo e reduz a necessidade de fertilizantes químicos.",
    icon: "/images/cards/organico.png",
    color: "#8E44AD",
  },
  eletronico: {
    title: "Lixo Eletrônico",
    fact: "O lixo eletrônico é o que mais cresce no mundo! Contém metais preciosos como ouro e prata, mas também substâncias tóxicas que podem contaminar o meio ambiente.",
    icon: "/images/cards/eletronico.png",
    color: "#E67E22",
  },
  bateria: {
    title: "Bateria",
    fact: "Uma pilha comum pode contaminar até 20.000 litros de água! Por isso é importante descartá-las em locais apropriados para reciclagem de materiais perigosos.",
    icon: "/images/cards/bateria.png",
    color: "#34495E",
  },
  oleo: {
    title: "Óleo de Cozinha",
    fact: "Um litro de óleo usado pode contaminar até 1 milhão de litros de água! Quando reciclado, pode virar sabão, biodiesel ou até mesmo tinta.",
    icon: "/images/cards/oleo.png",
    color: "#D35400",
  },
  pilha: {
    title: "Pilhas",
    fact: "As pilhas contêm metais pesados como mercúrio, chumbo e cádmio. Uma única pilha pode contaminar 400 litros de água por 50 anos!",
    icon: "/images/cards/pilha.png",
    color: "#95A5A6",
  },
  lampada: {
    title: "Lâmpadas",
    fact: "Lâmpadas fluorescentes contêm mercúrio e devem ser recicladas em locais especiais. Já as LEDs podem durar até 25 anos e são muito mais eficientes!",
    icon: "/images/cards/lampada.png",
    color: "#F1C40F",
  },
  tetrapak: {
    title: "Tetrapak",
    fact: "As embalagens Tetrapak são feitas de 75% papel, 20% plástico e 5% alumínio. Quando recicladas, podem virar papel higiênico, telhas e até móveis!",
    icon: "/images/cards/tetrapak.png",
    color: "#3498DB",
  },
  pet: {
    title: "Garrafa PET",
    fact: "Uma garrafa PET leva cerca de 400 anos para se decomor! Mas 5 garrafas PET recicladas podem virar uma camiseta, e 25 garrafas podem virar um casaco de lã!",
    icon: "/images/cards/pet.png",
    color: "#E74C3C",
  },
  lata: {
    title: "Lata de Alumínio",
    fact: "O Brasil é campeão mundial em reciclagem de latas de alumínio, com 97% de reciclagem! Uma lata reciclada volta às prateleiras em apenas 30 dias.",
    icon: "/images/cards/lata.png",
    color: "#BDC3C7",
  },
  papelao: {
    title: "Papelão",
    fact: "O papelão pode ser reciclado até 25 vezes! É feito principalmente de fibras recicladas e sua reciclagem economiza 50% da energia necessária para produzir papelão novo.",
    icon: "/images/cards/papelao.png",
    color: "#D2691E",
  },
  cd: {
    title: "CD/DVD",
    fact: "CDs e DVDs são feitos de policarbonato e podem levar mais de 100 anos para se decompor! Quando reciclados, podem virar novos CDs ou até mesmo peças automotivas.",
    icon: "/images/cards/cd.png",
    color: "#9B59B6",
  },
  pneu: {
    title: "Pneu",
    fact: "Um pneu pode levar mais de 600 anos para se decompor! Quando reciclado, pode virar asfalto, solados de sapato, pisos esportivos e até combustível para fornos.",
    icon: "/images/cards/pneu.png",
    color: "#2C3E50",
  },
};

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
  const [gameInitialized, setGameInitialized] = useState(false); // Novo estado para controlar se o jogo foi iniciado

  // Novos estados para o sistema de curiosidades
  const [showCuriosity, setShowCuriosity] = useState(false);
  const [currentCuriosity, setCurrentCuriosity] = useState(null);
  const [curiositiesEnabled, setCuriositiesEnabled] = useState(true);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Estado para detectar dispositivo móvel
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect para monitorar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para alternar o estado das curiosidades
  const toggleCuriosities = () => {
    setCuriositiesEnabled((prevState) => !prevState);
  };

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

    selectedImages.forEach((itemType, index) => {
      // Cria dois cards com a mesma imagem (um par)
      newCards.push({
        id: index * 2,
        item: itemType,
        symbol: curiosities[itemType].icon,
        isFlipped: false,
        isMatched: false,
      });
      newCards.push({
        id: index * 2 + 1,
        item: itemType,
        symbol: curiosities[itemType].icon,
        isFlipped: false,
        isMatched: false,
      });
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
    setShowScoreboard(false);
    setIsTimerPaused(false);
    setGameInitialized(true); // Marca que o jogo foi inicializado
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
    if (flippedCards.length === 2 || isTimerPaused) return;

    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)));

    setFlippedCards((prevFlipped) => [...prevFlipped, id]);
  };

  // Função para mostrar curiosidade
  const showCuriosityModal = (itemType) => {
    const curiosity = curiosities[itemType];
    if (curiosity && curiositiesEnabled) {
      setCurrentCuriosity(curiosity);
      setShowCuriosity(true);
      setIsTimerPaused(true);
    }
  };

  // Função para fechar modal de curiosidade
  const closeCuriosityModal = () => {
    setShowCuriosity(false);
    setCurrentCuriosity(null);
    setIsTimerPaused(false);
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

        // Mostra curiosidade se estiver habilitada
        showCuriosityModal(firstCard.item);
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
  }, [flippedCards, cards, curiositiesEnabled]);

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
      const scoresRef = collection(db, "scores");
      const q = query(scoresRef, orderBy("score", "desc"), limit(10));
      const snapshot = await getDocs(q);

      const scores = snapshot.docs.map((doc) => doc.data());
      const isHighScore = scores.length < 10 || scores.some((s) => score > s.score);

      if (isHighScore) {
        setIsHighScore(true);
        setShowNameInput(true);
      } else {
        setGameOver(true);
      }
    } catch (error) {
      console.error("Erro ao verificar pontuação:", error);
      setGameOver(true);
    }
  };

  // Timer - agora considera se está pausado
  useEffect(() => {
    let interval = null;

    if (isActive && !isTimerPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer, isTimerPaused]);

  // Calcula a pontuação do jogador
  const calculateScore = () => {
    const baseScore = 1000;
    const timeDeduction = timer * 2;
    const movesDeduction = moves * 10;

    return Math.max(baseScore - timeDeduction - movesDeduction, 100);
  };

  // Altera a dificuldade do jogo - agora reseta o estado de inicialização
  const handleDifficultyChange = (newDifficulty) => {
    if (!isActive || window.confirm("Mudar a dificuldade irá reiniciar o jogo. Deseja continuar?")) {
      setDifficulty(newDifficulty);
      setIsActive(false);
      setGameInitialized(false); // Reseta o estado de inicialização
      setCards([]); // Limpa as cartas
      setStatusMessage("Clique em 'Novo Jogo' para começar!");
    }
  };

  // Inicia um novo jogo
  const handleStartGame = () => {
    setShowHomeScreen(false);
    // Não inicia o jogo automaticamente, apenas sai da tela inicial
    setStatusMessage("Clique em 'Novo Jogo' para começar!");
  };

  // Volta para a tela inicial
  const handleBackToHome = () => {
    setShowHomeScreen(true);
    setIsActive(false);
    setShowScoreboard(false);
    setGameInitialized(false); // Reseta o estado de inicialização
    setCards([]); // Limpa as cartas
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

      await addDoc(collection(db, "scores"), scoreData);

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

  if (showHomeScreen) {
    return (
      <HomeScreen
        onStartGame={handleStartGame}
        curiositiesEnabled={curiositiesEnabled}
        onToggleCuriosities={toggleCuriosities}
      />
    );
  }

  return (
    <div
      className="memory-game"
      style={{
        backgroundColor: colors.bgColor,
        minHeight: "100dvh",
        fontFamily: "'Nunito', sans-serif",
        color: colors.darkGreen,
        padding: isMobile ? "1rem" : "1.5rem",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: isMobile ? "0.5rem" : "1rem",
            }}
          >
            <img
              src="/reciclamente-logo.png"
              alt="ReciclaMente Logo"
              style={{
                maxWidth: isMobile ? "60px" : "80px",
                height: "auto",
              }}
            />
            <h1
              style={{
                fontSize: isMobile ? "1.8rem" : "2.2rem",
                fontWeight: "700",
                color: colors.darkGreen,
                margin: "0",
                textAlign: "center",
              }}
            >
              ReciclaMente
            </h1>
          </div>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              color: colors.mediumGreen,
              fontWeight: "500",
              marginBottom: "1.5rem",
              padding: isMobile ? "0 1rem" : "0",
            }}
          >
            Encontre todos os pares e aprenda sobre reciclagem!
          </p>
          <div
            style={{
              display: "flex",
              gap: isMobile ? "0.5rem" : "1rem",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              padding: isMobile ? "0 0.5rem" : "0",
            }}
          >
            <button
              onClick={handleBackToHome}
              style={{
                backgroundColor: "transparent",
                color: colors.darkGreen,
                border: `2px solid ${colors.darkGreen}`,
                borderRadius: "8px",
                padding: isMobile ? "0.5rem 1rem" : "0.5rem 1.25rem",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: isMobile ? "auto" : "120px",
              }}
              className="btn-hover-effect"
            >
              {isMobile ? "Menu" : "Voltar ao Menu"}
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                color: colors.mediumGreen,
                flexWrap: "nowrap",
              }}
            >
              <span>Curiosidades:</span>
              <button
                onClick={toggleCuriosities}
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "15px",
                  backgroundColor: curiositiesEnabled ? colors.brightGreen : "#ccc",
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  minWidth: "40px",
                }}
                className="btn-hover-effect"
              >
                {curiositiesEnabled ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </header>

        <div
          className="status-message"
          style={{
            backgroundColor: "#E8F4DF",
            color: colors.darkGreen,
            borderRadius: "10px",
            padding: isMobile ? "0.75rem 1rem" : "0.75rem 1.25rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            border: `1px solid ${colors.brightGreen}`,
            fontWeight: "500",
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
          role="alert"
        >
          {statusMessage || (gameInitialized ? "Encontre os pares!" : "Clique em 'Novo Jogo' para começar!")}
          {isTimerPaused && (
            <span
              style={{
                marginLeft: isMobile ? "0.5rem" : "1rem",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                color: colors.mediumGreen,
                fontStyle: "italic",
                display: isMobile ? "block" : "inline",
                marginTop: isMobile ? "0.25rem" : "0",
              }}
            >
              (Timer pausado)
            </span>
          )}
        </div>

        <div
          className="game-layout"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
            gap: isMobile ? "1.5rem" : "2rem",
            alignItems: "start",
          }}
        >
          <div
            className="game-board-container"
            style={{
              position: "relative",
              order: isMobile ? 2 : 1,
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
                width: isMobile ? "35px" : "40px",
                height: isMobile ? "35px" : "40px",
                fontSize: isMobile ? "1rem" : "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "absolute",
                top: isMobile ? "-15px" : "-20px",
                left: isMobile ? "5px" : "0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
              className="btn-hover-effect"
            >
              ?
            </button>
          </div>

          <div
            className="controls-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              order: isMobile ? 1 : 2,
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
                padding: isMobile ? "0.75rem" : "0.85rem",
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: "600",
                width: "100%",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="btn-hover-effect"
            >
              {isMobile ? "Pontuações" : "Ver Melhores Pontuações"}
            </button>
          </div>
        </div>
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

      <CuriosityModal
        show={showCuriosity}
        curiosity={currentCuriosity}
        onClose={closeCuriosityModal}
        colors={colors}
      />

      {/* CSS para efeitos de hover nos botões e responsividade */}
      <style jsx>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .btn-hover-effect:active {
          transform: translateY(1px);
        }

        /* Responsividade melhorada */
        @media (max-width: 768px) {
          .memory-game {
            padding: 0.75rem !important;
          }

          .container {
            padding: 0 !important;
          }

          .game-layout {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          .status-message {
            margin-bottom: 1rem !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 480px) {
          .memory-game {
            padding: 0.5rem !important;
          }

          h1 {
            font-size: 1.5rem !important;
          }

          .status-message {
            font-size: 0.8rem !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .game-layout {
            grid-template-columns: 1.8fr 1fr !important;
          }
        }

        /* Melhorias para tablets em orientação portrait */
        @media (max-width: 1024px) and (orientation: portrait) {
          .game-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          .controls-container {
            order: 1 !important;
          }

          .game-board-container {
            order: 2 !important;
          }
        }

        /* Melhorias para dispositivos muito pequenos */
        @media (max-width: 360px) {
          .memory-game {
            padding: 0.25rem !important;
          }

          header {
            margin-bottom: 1rem !important;
          }

          h1 {
            font-size: 1.3rem !important;
          }

          .status-message {
            padding: 0.5rem !important;
            font-size: 0.75rem !important;
          }
        }

        /* Melhorias para telas largas */
        @media (min-width: 1200px) {
          .container {
            max-width: 1400px !important;
          }

          .game-layout {
            grid-template-columns: 2.5fr 1fr !important;
            gap: 3rem !important;
          }
        }

        /* Ajustes para altura da tela */
        @media (max-height: 600px) and (orientation: landscape) {
          .memory-game {
            padding: 0.5rem !important;
          }

          header {
            margin-bottom: 1rem !important;
          }

          .status-message {
            margin-bottom: 1rem !important;
            padding: 0.5rem !important;
          }

          .game-layout {
            gap: 1rem !important;
          }
        }

        /* Melhorias de acessibilidade para dispositivos touch */
        @media (hover: none) and (pointer: coarse) {
          .btn-hover-effect:hover {
            transform: none;
            filter: none;
          }

          .btn-hover-effect:active {
            transform: scale(0.95);
            filter: brightness(0.9);
          }
        }

        /* Ajustes específicos para Safari iOS */
        @supports (-webkit-touch-callout: none) {
          .memory-game {
            min-height: -webkit-fill-available !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
