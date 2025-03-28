class Game {
  constructor() {
    this.board = Array(9).fill(null);
    this.winState = false;
    this.players = ["✖", "Ｏ"];
    this.turn = 0;
    this.currentPlayer = this.players[this.turn];
  }

  play(cell) {
    this.board[cell] = this.players[this.turn];
    this.winState = this.hasWon(); // Verificar si hay ganador
    this.toggleTurn();
  }

  toggleTurn() {
    this.turn = this.turn === 0 ? 1 : 0;
    this.currentPlayer = this.players[this.turn];
  }

  hasWon() {
    const winPos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    for (const combo of winPos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true;
      }
    }
    return false;
  }
}

// Inicializar juego
const game = new Game();
const modal = document.querySelector("dialog");
const modalMessage = document.getElementById("modal-message");

document.querySelectorAll("td").forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (game.board[index] || game.winState) return; // Bloquear clicks si hay ganador

    // Actualizar interfaz primero
    cell.textContent = game.players[game.turn];
    game.players[game.turn] === "✖"
      ? cell.classList.add("x-player")
      : cell.classList.add("o-player");

    // Lógica del juego
    game.play(index);

    // Mostrar modal si hay victoria o empate
    if (game.winState || game.board.every((cell) => cell)) {
      // El ganador es el jugador anterior (porque toggleTurn ya cambió el turno)
      const winner = game.players[game.turn === 0 ? 1 : 0];
      modalMessage.textContent = game.board.every((cell) => cell)
        ? "It's a tie!"
        : `${winner} has won!`;
      modal.showModal();
    }
  });
});

function resetGame() {
  game.board = Array(9).fill(null);
  game.winState = false;
  game.turn = 0;
  game.currentPlayer = game.players[game.turn];

  document.querySelectorAll("td").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x-player", "o-player");
  });

  modal.close();
}