///<reference path="p5.d.ts" />
let gridSlider;
let marginSlider;
let animationSlider;

let boardHeight = 400;
let boardWidth = 400;
let boardSize = 15;
let board = makeArr2D(boardSize,boardSize);
let activeColor = 1;
let b;

function setup() {
  gridSlider = createSlider(1,5,4);
  gridSlider.position(boardHeight+20,0)
  marginSlider = createSlider(1,20,15)
  marginSlider.position(boardHeight+20,40)
  b = scanColForPos() * boardSize + (boardSize/2)
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
    stroke(0,0,255);
  }
  for(let i = 0; i < boardWidth+1; i += boxSizeX) {
    strokeWeight(gridSlider.value());
    line(i, 0, i, boardHeight);
  }
  boxSizeY = boardHeight / num;
  for(let i = 0; i < boardHeight+1; i += boxSizeY) {
    strokeWeight(gridSlider.value());
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
        if(board[i][j] == 2) { fill(0,0,255); }
        circle(i*boxSize+boxSize/2,j*boxSize+boxSize/2,boxSize-marginSlider.value());
      }
    }
  }
}

function mousePressed() {
  if(mouseX < boardWidth && mouseY < boardHeight) {
    boxSize = boardWidth / boardSize;
    let cellX = round(constrain(mouseX,1,boardWidth-1) / boxSize - 0.5);
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

let pos1 = 0;
let pos2 = 0;
let posy = 0;

function hoverSel() {
  b = scanColForPos() * boxSize+boxSize/2
  let cellX = round(constrain(mouseX,1,boardWidth-1) / boxSize - 0.5);
  print(boxSize)
  stroke(0,255,0,150)
  let target1 = cellX * boardSize*boxSize/boardSize
  let target2 = (cellX+1) * boardSize*boxSize/boardSize
  pos1 += (target1 - pos1) / 5
  pos2 += (target2 - pos2) / 5
  posy += (b - posy) / 5
  strokeWeight(gridSlider.value())
  line(pos1, 0, pos1,boardHeight);
  line(pos2, 0, pos2,boardHeight);
  noStroke();
  fill(0,255,0,150)
  circle(pos1 +boxSize/2, posy,boxSize-marginSlider.value())
  if(posy == "NaN") { posy = 1}
}

function scanColForPos() {
  boxSize = boardWidth / boardSize;
  let cellX = round(constrain(mouseX,1,boardWidth-1) / boxSize - 0.5);
  let notFound = true;

  for(let i = boardSize-1; i >= 0 && notFound; i--) {
    if(board[cellX][i] == 0) {
      //board[cellX][i] = activeColor;
      notFound = false;
        return i;
    }
  }
  return -1;
}