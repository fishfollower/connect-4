///<reference path="p5.d.ts" />


let boardHeight = 400;
let boardWidth = 400;
let boardSize = 10;
let board = makeArr2D(boardSize,boardSize);
let activeColor = 1;

function setup() {
  createCanvas(boardWidth,boardHeight);
  console.log(board);
  for(let i = 0; i < boardSize ; i++) {
    for(let j = 0; j < boardSize ; j++) {
      board[i][j] = 0;
    }
  }  
}

function draw() {
  background(51);
  makeGrid(boardSize);
  drawGrid(boardSize);
  hoverSel();
}

function makeGrid(num) {
  boxSizeX = boardWidth / num;
  if(activeColor == 1) {
    stroke(255,0,0);
  } else {
    stroke(255,255,0);
  }
  for(let i = 0; i < boardWidth+1; i += boxSizeX) {
    strokeWeight(5);
    line(i, 0, i, boardHeight);
  }
  boxSizeY = boardHeight / num;
  for(let i = 0; i < boardHeight+1; i += boxSizeY) {
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
  boxSize = boardWidth / boardSize;
  let cellX = round(mouseX / boxSize - 0.5);
  let notFound = true;

  for(let i = boardSize-1; i >= 0 && notFound; i--) {
    if(board[cellX][i] == 0) {
      board[cellX][i] = activeColor;
      notFound = false;
      if(activeColor == 1) { activeColor = 2}
      else { activeColor = 1}
      isDraw();
    }
  }
  
}

function isDraw() {
  let count = 0;
  for(let i = 0; i < boardSize ; i++) {
    for(let j = 0; j < boardSize ; j++) {
      if(board[i][j] >= 1)
      count++;
    }
  }  
  if(count == boardSize*boardSize) {
    createP("DRAW!!!");
  } 
} 

function hoverSel() {
  let cellX = round(mouseX / boxSize - 0.5);
  stroke(0,255,0)
}