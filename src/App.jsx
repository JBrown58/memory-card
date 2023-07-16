import cardData from "./components/CardData";
import { useState, useEffect } from "react";
import CardList from "./components/CardList";
import Header from "./components/Header";
import GameOverModal from "./components/GameOverModal";
import Footer from "./components/Footer";

function App() {
  const [gameResult, setGameResult] = useState({
    win: undefined,
  });
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (clickedCards.length === cardData.length) {
      setGameResult(prevGameResult => ({
        ...prevGameResult,
        win: true,
      }));
    }
    setHighScore(
      gameResult.win !== undefined
        ? highScore < score
          ? score
          : highScore
        : highScore
    );
    return () => {};
  }, [clickedCards, highScore, score, gameResult.win]);

  function determineWin(cardId) {
    if (clickedCards.includes(cardId)) {
      setGameResult(prevGameResult => ({
        ...prevGameResult,
        win: false,
      }));
      return;
    }
    setClickedCards(current => [...current, cardId]);
    setScore(score => score + 1);
  }

  function resetGameState() {
    setScore(0);
    setClickedCards([]);
    setGameResult(prevGameResult => ({
      ...prevGameResult,
      win: undefined,
    }));
  }

  return (
    <div className="flex h-screen flex-col justify-between bg-slate-100">
      <Header score={score} highScore={highScore} />
      {gameResult.win !== undefined && (
        <GameOverModal resetGame={resetGameState} gameResult={gameResult} />
      )}
      <CardList onCardClick={setClickedCards} determineWin={determineWin} />
      <Footer />
    </div>
  );
}

export default App;
