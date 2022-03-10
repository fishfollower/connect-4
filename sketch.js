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
  gridSlider = createSlider(1,5,2);
  gridSlider.position(boardHeight+20,0);
  marginSlider = createSlider(1,20,5);
  marginSlider.position(boardHeight+20,40),
  animationSlider = createSlider(1,7,5);
  animationSlider.position(boardHeight+20,80);
  b = scanColForPos() * boardSize + (boardSize/2),
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
  stroke(255);
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
        if(board[i][j] == 3) { fill(0,255,0); }
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
        hasWon(activeColor,cellX,i,board);
        if(activeColor == 1) { activeColor = 2}
        else if(activeColor == 2) {activeColor = 3}
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
  stroke(0,255,0,150)
  let target1 = cellX * boardSize*boxSize/boardSize
  let target2 = (cellX+1) * boardSize*boxSize/boardSize
  pos1 += (target1 - pos1) / animationSlider.value()
  pos2 += (target2 - pos2) / animationSlider.value()
  posy += (b - posy) / animationSlider.value()
  strokeWeight(gridSlider.value())
  line(pos1, 0, pos1,boardHeight);
  line(pos2, 0, pos2,boardHeight);
  strokeWeight(5)
  if(activeColor == 1) {stroke(255,0,0)}
  if(activeColor == 2) {stroke(0,0,255)}
  if(activeColor == 3) {stroke(0,255,0)}
  noFill();
  circle(pos1 +boxSize/2, posy,boxSize-marginSlider.value())
  if(posy == "NaN") { posy = 1}
}

function scanColForPos() {
  boxSize = boardWidth / boardSize;
  let cellX = round(constrain(mouseX,1,boardWidth-1) / boxSize - 0.5);
  let notFound = true;

  for(let i = boardSize-1; i >= 0 && notFound; i--) {
    if(board[cellX][i] == 0) {
      notFound = false;
      return i;
    }
  }
  return -1;
}

function hasWon(_activeColor, _posX, _posY, _arr) {
  let hasWon = false;
  let checksud = [];
  let checksrl = [];
  let checksul = [];
  let checksur = [];
  for(let i = -3; i < 4; i++) {
    if(_posX+i < boardSize && _posX+i >= 0 && _posY+i <= boardSize && _posY+i > 0) {checksul.push(_arr[_posX+i][_posY+i])}
    if(_posX+i < boardSize && _posX+i >= 0 && _posY-i <= boardSize && _posY-i > 0) {checksur.push(_arr[_posX+i][_posY-i])}
    if(_posX < boardSize && _posX >= 0 && _posY+i <= boardSize && _posY+i > 0) {checksud.push(_arr[_posX][_posY+i])}
    if(_posX+i < boardSize && _posX+i >= 0 && _posY <= boardSize && _posY > 0) {checksrl.push(_arr[_posX+i][_posY])}
    //checksud.push(_arr[_posX][_posY+i])
    //checksrl.push(_arr[_posX+i][_posY])
    //checksul.push(_arr[_posX+i][_posY+i])
    //checksur.push(_arr[_posX+i][_posY-i])
  }
  print(checksud,checksrl,checksul,checksur)

  let counterud = 0;
  for(let i =0 ; i < checksud.length ; i++) {
    if(checksud[i] == _activeColor) {counterud++} 
    else {counterud = 0;}
    if(counterud > 3) { hasWon = true}
  }

  let counterrl = 0;
  for(let i =0 ; i < checksrl.length ; i++) {
    if(checksrl[i] == _activeColor) {counterrl++} 
    else {counterrl = 0;}
    if(counterrl > 3) { hasWon = true}
  }

  let counterul = 0;
  for(let i =0 ; i < checksul.length ; i++) {
    if(checksul[i] == _activeColor) {counterul++} 
    else {counterul = 0;}
    if(counterul > 3) { hasWon = true}
  }

  let counterur = 0;
  for(let i =0 ; i < checksur.length ; i++) {
    if(checksur[i] == _activeColor) {counterur++} 
    else {counterur = 0;}
    if(counterur > 3) { hasWon = true}
  }

  print(hasWon);
  if (hasWon) {
    if(_activeColor == 1) {
      createP("Red won!!!")
    }
    else if (_activeColor == 2) {
      createP("Blue won!!!")
    }
    else {
      createP("Green won!!!")
    }
  }
  
}