const gameRows = 6;
const gameColumns = 7;
let currentPlayer = 'red';
let gameOver = false;

initializeBoard();
initializeGame();

let button = document.getElementById("reset-button");
button.disabled = true;

function initializeBoard() {
  for (let column = 0; column < gameColumns; column++) {
    const htmlColumn = document.createElement('div');
    htmlColumn.className = 'column column-' + (column + 1);

    document.querySelector('#game').append(htmlColumn);

    for (let row = 0; row < gameRows; row++) {
      const cell = document.createElement('div');
      cell.className = 'cell row-' + (row + 1);

      htmlColumn.prepend(cell);
    }
  }
}

function initializeGame() {
  const columns = document.querySelectorAll('.column');

  columns.forEach(element => {
    element.addEventListener('click', function(event) {
      if (gameOver) {
        return;
      }
      const clickedColumn = event.target.closest('.column');
      const columnNumber = clickedColumn.classList[1].split('-')[1];

      for (let index = 0; index < gameRows; index++) {
        const targetCell = clickedColumn.querySelector(`.cell.row-${index + 1}`);

        if (checkCellEmpty(targetCell)) {
          targetCell.classList.add(currentPlayer);
          currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';

          checkWinner(parseInt(columnNumber), index + 1);
          break;
        }
      }
    });
  });
}

function getCellColorByPosition(column, row) {
    return document.querySelector(`.column-${column} .row-${row}`)?.classList[2];
  }
  

function checkWinner(column, row) {
  
  const checkLists = { horizontal: [], vertical: [], diagonalUp: [], diagonalDown: [] };
  let element = document.getElementById("message");
  let score = document.getElementById("scoreboard");

  checkLists.horizontal.push(getCellColorByPosition(column, row));
  checkLists.vertical.push(getCellColorByPosition(column, row));
  checkLists.diagonalUp.push(getCellColorByPosition(column, row));
  checkLists.diagonalDown.push(getCellColorByPosition(column, row));

  for (let index = 1; index < 4; index++) {
    checkLists.horizontal.unshift(getCellColorByPosition(column - index, row));
    checkLists.horizontal.push(getCellColorByPosition(column + index, row));

    checkLists.vertical.unshift(getCellColorByPosition(column, row - index));
    checkLists.vertical.push(getCellColorByPosition(column, row + index));

    checkLists.diagonalUp.unshift(getCellColorByPosition(column - index, row - index));
    checkLists.diagonalUp.push(getCellColorByPosition(column + index, row + index));

    checkLists.diagonalDown.unshift(getCellColorByPosition(column - index, row + index));
    checkLists.diagonalDown.push(getCellColorByPosition(column + index, row - index));
  }

  if (
    checkLists.horizontal.join('').includes('redredredred')
    || checkLists.vertical.join('').includes('redredredred')
    || checkLists.diagonalUp.join('').includes('redredredred')
    || checkLists.diagonalDown.join('').includes('redredredred')
  ) {
    
    let text = document.createTextNode("ROJAS GANAN");
    element.appendChild(text);
    gameOver = true;
    button.disabled = false;
    
  } else if (
    checkLists.horizontal.join('').includes('yellowyellowyellowyellow')
    || checkLists.vertical.join('').includes('yellowyellowyellowyellow')
    || checkLists.diagonalUp.join('').includes('yellowyellowyellowyellow')
    || checkLists.diagonalDown.join('').includes('yellowyellowyellowyellow')
  ) {
   
    let text = document.createTextNode("AMARILLAS GANAN");
    element.appendChild(text);
    gameOver = true;
    button.disabled = false;
  } else if (checkBoardFull()) {
    
    let text = document.createTextNode("EMPATE");
    element.appendChild(text);
    gameOver = true;
    button.disabled = false;
  }

}


function checkCellEmpty(element) {
  return !(element.classList.contains('red') || element.classList.contains('yellow'));
}

function checkBoardFull() {
  let ifBoardFull = true;

  const cells = document.querySelectorAll('.cell');

  cells.forEach(element => {
    if (checkCellEmpty(element)) {
      ifBoardFull = false;
    }
  });

  return ifBoardFull;
}

const resetButton = document.getElementById('reset-button');


resetButton.addEventListener('click', function() {
  newGame();
});

function newGame() {
 
  const cells = document.querySelectorAll('.cell');
  cells.forEach(element => {
    element.classList.remove('red', 'yellow');
  });

  gameOver = false;

  let element = document.getElementById("message");
  element.innerHTML = "";
  button.disabled = true;
}