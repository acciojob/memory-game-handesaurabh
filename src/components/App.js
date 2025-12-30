import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Set up game based on difficulty
  const startGame = (level) => {
    setDifficulty(level);
    setMatchedPairs([]);
    setFlippedTiles([]);
    setAttempts(0);
    setGameCompleted(false);

    let tileCount;
    switch (level) {
      case 'easy':
        tileCount = 8;
        break;
      case 'normal':
        tileCount = 16;
        break;
      case 'hard':
        tileCount = 32;
        break;
      default:
        tileCount = 8;
    }

    // Create pairs of numbers
    const pairs = tileCount / 2;
    let numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i); // Add each number twice for pairing
    }

    // Shuffle the numbers
    shuffleArray(numbers);

    // Create tile objects
    const newTiles = numbers.map((number, index) => ({
      id: index,
      value: number,
      isFlipped: false,
      isMatched: false
    }));

    setTiles(newTiles);
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Handle tile click
  const handleTileClick = (tileId) => {
    // Don't process if tile is already flipped or matched
    if (flippedTiles.includes(tileId) || tiles.find(tile => tile.id === tileId)?.isMatched) {
      return;
    }

    const newFlippedTiles = [...flippedTiles, tileId];
    setFlippedTiles(newFlippedTiles);

    // When two tiles are flipped, check for match
    if (newFlippedTiles.length === 2) {
      setAttempts(prev => prev + 1);

      const firstTile = tiles.find(tile => tile.id === newFlippedTiles[0]);
      const secondTile = tiles.find(tile => tile.id === newFlippedTiles[1]);

      if (firstTile.value === secondTile.value) {
        // Match found
        const updatedTiles = tiles.map(tile => {
          if (tile.id === firstTile.id || tile.id === secondTile.id) {
            return { ...tile, isMatched: true };
          }
          return tile;
        });

        setTiles(updatedTiles);
        setMatchedPairs(prev => [...prev, firstTile.value]);
      }

      // Reset flipped tiles after a delay
      setTimeout(() => {
        setFlippedTiles([]);
      }, 1000);
    }
  };

  // Check if game is completed
  useEffect(() => {
    if (tiles.length > 0 && matchedPairs.length === tiles.length / 2 && tiles.length > 0) {
      setGameCompleted(true);
    }
  }, [matchedPairs, tiles]);

  // Reset game
  const resetGame = () => {
    setDifficulty(null);
    setTiles([]);
    setFlippedTiles([]);
    setMatchedPairs([]);
    setAttempts(0);
    setGameCompleted(false);
  };

  return (
    <div>
      {!difficulty ? (
        // Landing page with difficulty selection
        <div className="levels_container">
          <h1>Welcome!</h1>
          <h4>Select Difficulty Level: <span>0</span></h4>
          <div>
            <button id="easy" onClick={() => startGame('easy')}>Easy (8 tiles)</button>
            <button id="normal" onClick={() => startGame('normal')}>Normal (16 tiles)</button>
            <button id="hard" onClick={() => startGame('hard')}>Hard (32 tiles)</button>
          </div>
          <button id="start-game-btn" onClick={() => startGame('easy')}>Start Game</button>
        </div>
      ) : (
        // Game board
        <div>
          <div className="game-info">
            <h2>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</h2>
            <p>Attempts: {attempts}</p>
            <p>Matches: {matchedPairs.length} / {tiles.length / 2}</p>
            <button onClick={resetGame}>Reset Game</button>
          </div>

          {gameCompleted ? (
            <div className="game-completed">
              <h2>Congratulations!</h2>
              <p>You completed the game in {attempts} attempts!</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          ) : (
            <div className={`cells_container ${difficulty}`}>
              {tiles.map(tile => (
                <div
                  key={tile.id}
                  className={`tile ${flippedTiles.includes(tile.id) || tile.isMatched ? 'flipped' : ''} ${tile.isMatched ? 'matched' : ''}`}
                  onClick={() => handleTileClick(tile.id)}
                >
                  <span>{flippedTiles.includes(tile.id) || tile.isMatched ? tile.value : '?'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
