// 迷你俄罗斯方块（自动下落 + 消除）
// 画布渲染
const canvasMini = document.getElementById("tetrisMini");
const ctxMini = canvasMini.getContext("2d");

// 比例放大
const scale = 10;
const cols = 10;
const rows = 20;
canvasMini.width = cols * scale;
canvasMini.height = rows * scale;

// 颜色
const colors = [
  null,
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
  "#F5FF33",
];

// 战场
let arenaMini = Array.from({ length: rows }, () => Array(cols).fill(0));

// 随机方块形状
const piecesMini = "TJLOSZI";
function createPieceMini(type) {
  switch (type) {
    case "T": return [[0,7,0],[7,7,7],[0,0,0]];
    case "J": return [[0,3,0],[0,3,0],[3,3,0]];
    case "L": return [[0,4,0],[0,4,0],[0,4,4]];
    case "O": return [[5,5],[5,5]];
    case "S": return [[0,6,6],[6,6,0],[0,0,0]];
    case "Z": return [[8,8,0],[0,8,8],[0,0,0]];
    case "I": return [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]];
  }
}
function drawMini() {
  ctxMini.fillStyle = "#000";
  ctxMini.fillRect(0,0,canvasMini.width, canvasMini.height);

  arenaMini.forEach((row, y) => 
    row.forEach((value, x) => {
      if (value !== 0) {
        ctxMini.fillStyle = colors[value];
        ctxMini.fillRect(x*scale,y*scale,scale,scale);
      }
    })
  );
}
function collideMini(arena, player) {
  const [m,o] = [player.matrix, player.pos];
  for (let y=0; y<m.length;y++){
    for(let x=0;x<m[y].length;x++){
      if (m[y][x] !== 0 && 
         (arena[y+o.y] && arena[y+o.y][x+o.x]) !==0) {
        return true;
      }
    }
  }
  return false;
}
function mergeMini(arena, player) {
  player.matrix.forEach((row,y)=>{
    row.forEach((val,x) => {
      if (val !== 0) arena[y+player.pos.y][x+player.pos.x] = val;
    });
  });
}
function arenaSweepMini() {
  outer: for (let y=rows-1; y>=0; y--){
    for (let x=0; x<cols; x++){
      if (arenaMini[y][x] === 0) continue outer;
    }
    arenaMini.splice(y,1);
    arenaMini.unshift(Array(cols).fill(0));
    y++;
  }
}

let dropCounterMini = 0;
let dropIntervalMini = 600;
let lastTimeMini = 0;

const playerMini = {
  pos: {x:0,y:0},
  matrix: null,
};

function playerResetMini() {
  const piece = piecesMini[(piecesMini.length * Math.random())|0];
  playerMini.matrix = createPieceMini(piece);
  playerMini.pos.y = 0;
  playerMini.pos.x = (arenaMini[0].length/2 | 0) - (playerMini.matrix[0].length/2 | 0);

  if (collideMini(arenaMini, playerMini)) {
    arenaMini.forEach(row=>row.fill(0));
  }
}

function playerDropMini() {
  playerMini.pos.y++;
  if (collideMini(arenaMini, playerMini)) {
    playerMini.pos.y--;
    mergeMini(arenaMini, playerMini);
    arenaSweepMini();
    playerResetMini();
  }
  dropCounterMini = 0;
}

function updateMini(time=0){
  const delta = time - lastTimeMini;
  lastTimeMini = time;
  dropCounterMini += delta;
  if (dropCounterMini > dropIntervalMini) {
    playerDropMini();
  }
  drawMini();
  requestAnimationFrame(updateMini);
}

playerResetMini();
updateMini();