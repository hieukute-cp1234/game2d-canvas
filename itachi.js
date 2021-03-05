const canvas = document.getElementById('itachi');
const ctx = canvas.getContext('2d');

let isPlaying = 0;
let Score = 0;
let moneyStatus = 1;

//Tao mot nhan vat ---------------
const itachisheet = new Image();
itachisheet.src = 'itachi.png';
let itachiRun = new Sprite(250, 239, 35, 35);
const itachiRunCells = [
  {
    x: 10,
    y: 9,
    W: 49,
    h: 52
  },
  {
    x: 78,
    y: 14,
    w: 56,
    h: 47
  },
  {
    x: 146,
    y: 13,
    w: 58,
    h: 48
  },
  {
    x: 225,
    y: 11,
    w: 46,
    h: 50
  },
  {
    x: 286,
    y: 14,
    w: 55,
    h: 46
  },
  {
    x: 352,
    y: 12,
    w: 58,
    h: 49
  }
]

const itachiLeadCells = [
  {
    x: 433,
    y: 3,
    w: 35,
    h: 61
  },
  {
    x: 487,
    y: 2,
    w: 36,
    h: 61
  },
  {
    x: 541,
    y: 10,
    w: 57,
    h: 53
  },
  {
    x: 609,
    y: 11,
    w: 53,
    h: 51
  }
]


itachiRun.painters.push(new SpriteSheetPainter(itachisheet, 1000 / 12, itachiRunCells)); //run painter
itachiRun.painters.push(new SpriteSheetPainter(itachisheet, 1000 / 4, itachiLeadCells)); //jump painter

itachiRun.behaviors.push({ //update painter
  enable: true,
  execute: (sprite) => {
    sprite.painters[sprite.painterIdx].update();
  }
});

itachiRun.behaviors.push(new HorizontalRunBehavior(5, 508, 0, 1));
itachiRun.behaviors.push(new VerticalJumpBehavior(4, 500));

//------------------------------

function drawBeginScence() {
  //vẽ bg
  ctx.drawImage(itachisheet, 8, 163, 508, 279,
    0, 0, 508, 279);
  ctx.save();
  //vẽ play
  ctx.drawImage(itachisheet, 541, 163, 322, 112,
    198, 100, 107, 37);
  //vẽ đường
  ctx.drawImage(itachisheet, 11, 449, 245, 42,
    0, 508 - 250, 245, 88);
  ctx.drawImage(itachisheet, 11, 449, 245, 42,
    244, 508 - 250, 245, 84);
  ctx.drawImage(itachisheet, 11, 449, 245, 42,
    450, 508 - 250, 245, 84);
}

itachisheet.onload = () => {
  GameLoop();
}

function GameLoop() {
  //console.log(isPlaying)
  if (isPlaying == 0) drawBeginScence();
  else if (isPlaying == 1) drawPlayingScence();

  requestAnimationFrame(GameLoop);
}

function randommMoney() {

}

function vacham() {
  if (moneyStatus == 1) drawMoney();
  if (itachiRun.h > 2 && moneyStatus == 1) moneyStatus = 0;

}

function calScore() {
  if (moneyStatus == 1) {

  }
}

function drawGameOver() {
  ctx.drawImage(itachisheet, 8, 163, 508, 279,
    0, 0, 508, 279);
  ctx.drawImage(itachisheet, 551, 303, 280, 166,
    198, 100, 280, 166);
}
function drawMoney(m) {
  ctx.drawImage(itachisheet, 753, 13, 158, 136,
    100, 279 - 30, 20, 17);
}

function drawPlayingScence() {
  //vẽ bg
  ctx.drawImage(itachisheet, 8, 163, 508, 279,
    0, 0, 508, 279);
  //vẽ đường
  ctx.drawImage(itachisheet, 11, 451, 245, 42,
    0, 508 - 250, 245, 88);
  ctx.drawImage(itachisheet, 11, 451, 245, 42,
    244, 508 - 250, 245, 84);
  ctx.drawImage(itachisheet, 11, 451, 245, 42,
    450, 508 - 250, 245, 84);

  drawMoney();
  vacham();

  itachiRun.draw(ctx);
  itachiRun.update();
}

document.onkeydown = (e) => {
  //console.log(e.keyCode);
  if (e.keyCode == 32 && isPlaying == 0) {
    isPlaying = 1;
  }
  switch (e.keyCode) {
    case 39:
      itachiRun.behaviors[1].enable = true;
      itachiRun.behaviors[1].direction = 1;
      itachiRun.painters[0].direction = 1;
      break;
    case 37:
      itachiRun.behaviors[1].enable = true;
      itachiRun.behaviors[1].direction = -1;
      itachiRun.painters[0].direction = -1;
      break;
    case 38:
      if (itachiRun.painterIdx === 0) {
        itachiRun.painterIdx = 1; //set jump painter
        itachiRun.painters[1].direction = itachiRun.painters[0].direction;
        itachiRun.behaviors[2].ydefault = itachiRun.y;
        itachiRun.behaviors[2].enable = true;
        itachiRun.behaviors[2].startTime = Date.now();
      }
      break;
    default:
      break;
  }
}

document.onkeyup = (e) => {
  switch (e.keyCode) {
    case 39:
      itachiRun.behaviors[1].enable = false;
      break;
    case 37:
      itachiRun.behaviors[1].enable = false;
      break;
    default:
      break;
  }
} 
