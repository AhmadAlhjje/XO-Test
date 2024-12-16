const boxes = document.querySelectorAll('.box');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameEnded = false;

function handleBoxClick(event) {
 const box = event.target;

 if (!gameEnded && !box.classList.contains('black')) {
 box.textContent = currentPlayer;
 box.classList.add(currentPlayer);

 if (checkWin()) {
 endGame(currentPlayer);
 return;
 }

 currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
 
 if (checkDraw()) {
 resetGame();
 return;
 }
 
 box.classList.add('black');
 
 }
}

function checkWin() {
const winningCombinations = [
 [0,1,2], [3,4,5], [6,7,8], // rows
 [0,3,6], [1,4,7], [2,5,8], // columns
 [0,4,8], [2,4,6] // diagonals
];

for (let combination of winningCombinations) {
 const [a,b,c] = combination;

 if (
 boxes[a].classList.contains(currentPlayer) &&
 boxes[b].classList.contains(currentPlayer) &&
 boxes[c].classList.contains(currentPlayer)
 ) {
return true;
 }
}

return false;
}

function checkDraw() {
for (let box of boxes) {
if (!box.classList.contains('black')) {
 return false; 
}
}

return true; 
}

function endGame(winner) {
for (let box of boxes) { 
box.removeEventListener('click', handleBoxClick);
}

const messageElement = document.getElementById('R');
messageElement.innerHTML = `Player ${winner} wins!`;
// document.body.appendChild(messageElement);
}

function resetGame() { 
for (let box of boxes) { 
box.textContent = '';
box.classList.remove('X', 'O', 'black');
}

gameEnded = false; 
currentPlayer = 'X'; 
}

for (let box of boxes) { 
box.addEventListener('click', handleBoxClick); 
}

resetButton.addEventListener('click', function()
{location.reload();});
