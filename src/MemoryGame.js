import React, { useState, useEffect } from "react";
import "./MemoryGame.css";

const generateCards = (rows, cols) => {
  const totalCards = rows * cols;
  const numbers = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
  const cards = [...numbers, ...numbers];
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(3);
  const [cards, setCards] = useState(generateCards(rows, cols));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const flipCard = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  const resetGame = () => {
    setCards(generateCards(rows, cols));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleGridChange = (e) => {
    e.preventDefault();
    const newRows = parseInt(e.target.rows.value);
    const newCols = parseInt(e.target.cols.value);
    if ((newRows * newCols) % 2 === 0) {
      setRows(newRows);
      setCols(newCols);
      resetGame();
    } else {
      alert("Total cards must be even!");
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <form onSubmit={handleGridChange}>
        <label>
          Rows:
          <input type="number" name="rows" min="1" defaultValue={rows} />
        </label>
        <label>
          Columns:
          <input type="number" name="cols" min="1" defaultValue={cols} />
        </label>
        <button type="submit">Set Grid</button>
      </form>
      <button onClick={resetGame}>Reset Game</button>
      <div
        className="card-container"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => flipCard(index)}
          >
            <div className="card-content">
              {flippedCards.includes(index) || matchedCards.includes(index)
                ? card
                : "?"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
