
let boardHeight = 400;
let boardWidth = 400;
let board = makeArr2D(7,7);
let activeColor = 1;

function setup() {
  createCanvas(boardWidth,boardHeight);
  console.log(board);
  for(let i = 0; i < 7 ; i++) {
    for(let j = 0; j < 7 ; j++) {
      board[i][j] = 0;
    }
  }  
}

function draw() {
  background(51);
  makeGrid(7);
  drawGrid(7);
}

function makeGrid(num) {
  boxSizeX = boardWidth / num;
  if(activeColor == 1) {
    stroke(255,0,0);
  } else {
    stroke(255,255,0);
  }
  for(let i = 0; i <= boardWidth; i += boxSizeX) {
    strokeWeight(5);
    line(i, 0, i, boardHeight);
  }
  boxSizeY = boardHeight / num;
  for(let i = 0; i <= boardHeight; i += boxSizeY) {
    strokeWeight(5);
    line(0, i, boardWidth,i);
  }
}

function makeArr2D(rows, cols) {
  let arr = new Array(cols);
  for(let i = 0 ; i < arr.length ; i++) {
    arr[i] = new Array(rows);
  }
}
function makeArr2D(rows, cols) {
  let arr = new Array(cols);
  for(let i = 0 ; i < arr.length ; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function drawGrid(num) {
  for(let i = 0; i < num ; i++) {
    for(let j = 0; j < num ; j++) {
      boxSize = boardWidth / num;
      noStroke();
      if(board[i][j]) {
        if(board[i][j] == 1) { fill(255,0,0); }
        if(board[i][j] == 2) { fill(255,255,0); }
        circle(i*boxSize+boxSize/2,j*boxSize+boxSize/2,boxSize-20);
      }
    }
  }
}

function mousePressed() {
  boxSize = boardWidth / 7;
  let cellX = round(mouseX / boxSize - 0.5);
  let cellY = round(mouseY / boxSize - 0.5);
  let notFound = true;

  for(let i = 6; i >= 0 && notFound; i--) {
    if(board[cellX][i] == 0) {
      board[cellX][i] = activeColor;
      notFound = false;
    }
  }
  if(activeColor == 1) { activeColor = 2}
  else { activeColor = 1}
  isDraw();
}

function isDraw() {
  let count = 0;
  for(let i = 0; i < 7 ; i++) {
    for(let j = 0; j < 7 ; j++) {
      if(board[i][j] >= 1)
      count++;
    }
  }  
  if(count == 7*7) {
    createP("DRAW!!!");
  }
}