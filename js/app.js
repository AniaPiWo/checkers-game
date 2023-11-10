import { CheckersGame } from "./modules/game.js";
import { Board } from "./modules/board.js";
import { Player } from "./modules/player.js";
import { CheckersDOMPrinter } from "./modules/printer.js";

document.addEventListener("DOMContentLoaded", function () {
  const appContainerRef = document.getElementById("app");

  if (!appContainerRef) {
    throw new Error("App container not found!");
  }
  //jak najmniej zaleznosci
  //wszytsko zwiazane z plansza jest w board
  const board = new Board();
  //wszytsko zwiazane z drukowaniem jest w printer
  const printer = new CheckersDOMPrinter({ appContainerRef });
  //wszytsko zwiazane z gra jest w game
  const game = new CheckersGame({ board, printer });

  const player1 = new Player("Ania");
  const player2 = new Player("Filip");

  console.log(player1, player2);

  game.addPlayer(player1, CheckersGame.getStartingPositionForWhite());
  game.addPlayer(player2, CheckersGame.getStartingPositionForBlack());

  game.init();
});
