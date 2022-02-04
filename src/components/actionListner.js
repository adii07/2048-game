import React, { useEffect, useState } from "react";

import {
  initialBoard,
  getRandomCell,
  west,
  east,
  north,
  south,
  gameOver,
  winStatus
} from "./board";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const ActionListner = () => {
  const [board, updateBoard] = useState(getRandomCell(initialBoard()));

  const checkEndGame = () => {
    if (winStatus(board)) {
      console.log("You win!");
    } else if (gameOver(board)) {
      console.log("Game over!");
    }
  };

  const left = () => {
    const newBoard = west(board);
    updateBoard(getRandomCell(newBoard));
    checkEndGame();
  };

  const right = () => {
    const newBoard = east(board);
    updateBoard(getRandomCell(newBoard));
    checkEndGame();
  };

  const up = () => {
    const newBoard = north(board);
    updateBoard(getRandomCell(newBoard));
    checkEndGame();
  };

  const down = () => {
    const newBoard = south(board);
    updateBoard(getRandomCell(newBoard));
    checkEndGame();
  };

  const onKeyDown = (e) => {
      console.log(e.key);
    switch (e.key) {
      case "ArrowLeft":
        left();
        break;
        case "1":
        left();
        break;
      case "ArrowRight":
        right();
        break;
        case "2":
        right();
        break;
      case "ArrowUp":
        up();
        break;
        case "3":
        up();
        break;
      case "ArrowDown":
        down();
        break;
        case "4":
            down();
            break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <>
      <div className="game-board">
        {board.map((row, i) => {
          return (
            <div key={`row-${i}`} className="row">
              {row.map((cell, j) => (
                <Cell key={`cell-${i}-${j}`} number={cell} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActionListner;
