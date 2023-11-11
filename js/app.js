import { CheckersGame } from "./modules/game.js";
import { Board } from "./modules/board.js";
import { CheckersDOMPrinter } from "./modules/printer.js";
import { Player } from "./modules/player.js";

document.addEventListener("DOMContentLoaded", function () {
  const appContainerRef = document.getElementById("app");
  const winnerInfo = document.getElementById("winner");
  const restartInfo = document.getElementById("restart");
  const restartButton = document.getElementById("restart-btn");

  winnerInfo.classList.add("hidden");
  restartInfo.classList.add("hidden");

  restartButton.addEventListener("click", () => {
    game.restart();
    winnerInfo.classList.add("hidden");
    restartInfo.classList.add("hidden");
  });

  if (!appContainerRef) {
    throw new Error("App container not found!");
  }

  const board = new Board();
  const printer = new CheckersDOMPrinter({ appContainerRef });
  const game = new CheckersGame({ board, printer });
  const player1 = new Player("Gracz 1");
  const player2 = new Player("Gracz 2");

  game.addPlayer(player1, CheckersGame.getStartingPositionForWhite());
  game.addPlayer(player2, CheckersGame.getStartingPositionForBlack());

  game.init();

  appContainerRef.addEventListener("click", (e) => {
    if (e.target.classList.contains("piece")) {
      // zaznacz pionek
      const { coord } = e.target.parentElement.dataset;
      const { player: playerIndex } = e.target.dataset;

      game.selectPiece(coord, +playerIndex);
    } else if (
      e.target.classList.contains("cell") &&
      e.target.classList.contains("selected")
    ) {
      // wykonaj ruch
      const { coord } = e.target.dataset;
      game.move(`${game.selectedPiece}-${coord}`);

      if (game.isGameOver()) {
        winnerInfo.classList.remove("hidden");
        winnerInfo.innerText = `Koniec gry! Wygrywa ${
          game.getLastActivePlayer().name
        }!`;
        restartInfo.classList.remove("hidden");
      }
    }
  });
});
