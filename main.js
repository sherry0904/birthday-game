const PIXEL_SIZE = 4;
const PALETTE = {
  '.': null, // Transparent
  'H': '#4a3018', // Hair
  'F': '#fcdbb6', // Face
  'B': '#000000', // Black
  'S': '#3498db', // Shirt
  'L': '#2c3e50', // Legs
  'W': '#ffffff', // White
  'R': '#e74c3c', // Red
  'Y': '#f1c40f', // Yellow
  'G': '#2ecc71', // Green
  'K': '#34495e', // Dark Gray
  'D': '#bdc3c7', // Light Gray
  'C': '#2c3e50', // Glasses Frame
  'P': '#8e44ad', // Girl Hair
  'O': '#e67e22'  // Girl Shirt
};

const SPRITES = {
  boyFront: [
    "......HHHH......",
    "....HHHHHHHH....",
    "...HHHHHHHHHH...",
    "..HHHHHHHHHHHH..",
    "..HHHFFFFFFHHH..",
    "..HHCFBCCBFCCHH..",
    "..HHFFRFFRFFHH..",
    "..HHFFFBBFFFHH..",
    "...HHFFFFFFHH...",
    "....FFFFFFFF....",
    "....SSSSSSSS....",
    "...SSSSSSSSSS...",
    "..FSSSSSSSSSSF..",
    "....LLLLLLLL....",
    "....LL....LL....",
    "...BBB....BBB..."
  ],
  boyRun1: [
    "......HHHH......",
    "....HHHHHHHH....",
    "...HHHHHHHHHH...",
    "..HHHHHHHHHHHH..",
    "..HHHFFFFFFHHH..",
    "..HHCFBCCBFCCHH..",
    "..HHFFRFFRFFHH..",
    "..HHFFFBBFFFHH..",
    "...HHFFFFFFHH...",
    "....FFFFFFFF....",
    "....SSSSSSSS....",
    "...SSSSSSSSSS...",
    "..FSSSSSSSSSSF..",
    "....LLLLLLLL....",
    ".....LL...LL....",
    "......BB...BB..."
  ],
  boyRun2: [
    "................",
    "......HHHH......",
    "....HHHHHHHH....",
    "...HHHHHHHHHH...",
    "..HHHHHHHHHHHH..",
    "..HHHFFFFFFHHH..",
    "..HHCFBCCBFCCHH..",
    "..HHFFRFFRFFHH..",
    "..HHFFFBBFFFHH..",
    "...HHFFFFFFHH...",
    "....FFFFFFFF....",
    "....SSSSSSSS....",
    "...SSSSSSSSSS...",
    "..FSSSSSSSSSSF..",
    "....LL...LL.....",
    "...BB...BB......"
  ],
  girlFront: [
    "......PPPP......",
    "....PPPPPPPP....",
    "...PPPPPPPPPP...",
    "..PPPPPPPPPPPP..",
    "..PPPFFFFFFPPP..",
    "..PPFFBFFBFFPP..",
    "..PPFFRFFRFFPP..",
    "..PPFFFBBFFFPP..",
    "...PPFFFFFFPP...",
    "....FFFFFFFF....",
    "....OOOOOOOO....",
    "...OOOOOOOOOO...",
    "..FOOOOOOOOOOF..",
    "....LLLLLLLL....",
    "....LL....LL....",
    "...BBB....BBB..."
  ],
  girlRun1: [
    "......PPPP......",
    "....PPPPPPPP....",
    "...PPPPPPPPPP...",
    "..PPPPPPPPPPPP..",
    "..PPPFFFFFFPPP..",
    "..PPFFBFFBFFPP..",
    "..PPFFRFFRFFPP..",
    "..PPFFFBBFFFPP..",
    "...PPFFFFFFPP...",
    "....FFFFFFFF....",
    "....OOOOOOOO....",
    "...OOOOOOOOOO...",
    "..FOOOOOOOOOOF..",
    "....LLLLLLLL....",
    ".....LL...LL....",
    "......BB...BB..."
  ],
  girlRun2: [
    "................",
    "......PPPP......",
    "....PPPPPPPP....",
    "...PPPPPPPPPP...",
    "..PPPPPPPPPPPP..",
    "..PPPFFFFFFPPP..",
    "..PPFFBFFBFFPP..",
    "..PPFFRFFRFFPP..",
    "..PPFFFBBFFFPP..",
    "...PPFFFFFFPP...",
    "....FFFFFFFF....",
    "....OOOOOOOO....",
    "...OOOOOOOOOO...",
    "..FOOOOOOOOOOF..",
    "....LL...LL.....",
    "...BB...BB......"
  ],
  firework: [
    "....R.R.........",
    "..Y.R.R.Y.......",
    "...Y.R.Y........",
    "....YYY.........",
    ".RRYYYYYRR......",
    "....YYY.........",
    "...Y.R.Y........",
    "..Y.R.R.Y.......",
    "....R.R........."
  ],
  heart: [
    "..RR..RR........",
    ".RRRRRRRR.......",
    ".RRRRRRRR.......",
    ".RRRRRRRR.......",
    "..RRRRRR........",
    "...RRRR.........",
    "....RR.........."
  ],
  camera: [
    "...KKKK.........",
    ".KKKKKKKK.......",
    ".KK.W..KK.......",
    ".KK....KK.......",
    ".KKKKKKKK......."
  ],
  suitcase: [
    "...KKKK.........",
    "...K..K.........",
    ".DDDDDDDD.......",
    ".D.D..D.D.......",
    ".DDDDDDDD.......",
    ".D.D..D.D.......",
    ".DDDDDDDD......."
  ],
  controller: [
    "................",
    "..RRRRRRRR......",
    ".R.W.RR.B.R.....",
    ".R...RR...R.....",
    "..RRRRRRRR......"
  ],
  pan: [
    "................",
    "..DDDD..........",
    ".DDDDDD.........",
    ".DDDDDD.........",
    "..DDDD.KKK......"
  ],
  cloud: [
    "....WWW.........",
    "..WWWWWWW.......",
    ".WWWWWWWWW......",
    ".WWWWWWWWW......",
    "...WWWWWW......."
  ]
};

function drawSprite(ctx, spriteKey, x, y, scale = PIXEL_SIZE) {
  const spriteData = SPRITES[spriteKey];
  if (!spriteData) return;
  for (let r = 0; r < spriteData.length; r++) {
    for (let c = 0; c < spriteData[r].length; c++) {
      const char = spriteData[r][c];
      if (PALETTE[char]) {
        ctx.fillStyle = PALETTE[char];
        ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
      }
    }
  }
}

// Game Configuration
const CONFIG = {
  gravity: 0.6,
  jumpForce: -12,
  speed: 4,
  levelConfigs: [
    {
      id: 1,
      title: "Level 1：故事的起點",
      bgType: 'night',
      itemSprites: ['firework', 'heart'],
      itemCount: 5,
      message: "那時的心情跟著煙火一起綻放",
      photo: "🎆"
    },
    {
      id: 2,
      title: "Level 2：一起看過的世界",
      bgType: 'forest',
      itemSprites: ['camera', 'suitcase'],
      itemCount: 5,
      message: "有你在身邊，去哪裡都好玩。",
      photo: "🌲"
    },
    {
      id: 3,
      title: "Level 3：平凡溫馨的日常",
      bgType: 'home',
      itemSprites: ['controller', 'pan'],
      itemCount: 5,
      message: "日常的點點滴滴是最珍貴的寶藏。",
      photo: "🏠"
    }
  ]
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// UI Elements
const uiStart = document.getElementById('start-screen');
const uiLevel = document.getElementById('level-screen');
const uiFinal = document.getElementById('final-screen');
const hud = document.getElementById('hud');

const btnStart = document.getElementById('start-btn');
const btnNext = document.getElementById('next-level-btn');
const cake = document.getElementById('cake');

// Game State
let gameState = 'START'; // START, PLAYING, LEVEL_END, FINAL
let currentLevelIndex = 0;
let score = 0;
let distance = 0;
let blowCount = 0;

let playerName = "親愛的";
let selectedChar = "boy";

// Initialize UI Selection
const charCards = document.querySelectorAll('.char-card');
charCards.forEach(card => {
  card.addEventListener('click', () => {
    charCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedChar = card.dataset.char;
  });
});

function processCharacterImage(image) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = image.width;
  tempCanvas.height = image.height;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  tempCtx.drawImage(image, 0, 0);
  const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imgData.data;
  
  let minX = image.width, minY = image.height, maxX = 0, maxY = 0;

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const i = (y * image.width + x) * 4;
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      // remove white/off-white background
      if (r > 240 && g > 240 && b > 240) {
        data[i+3] = 0;
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  tempCtx.putImageData(imgData, 0, 0);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = cropW;
  cropCanvas.height = cropH;
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(tempCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  
  return cropCanvas;
}

let boyCanvas = null;
let girlCanvas = null;

// Draw characters in Start Menu
function drawMenuCharacters() {
  const canvasBoy = document.getElementById('char-canvas-boy');
  const canvasGirl = document.getElementById('char-canvas-girl');
  const ctxB = canvasBoy.getContext('2d');
  const ctxG = canvasGirl.getContext('2d');
  
  ctxB.clearRect(0,0,64,64);
  ctxG.clearRect(0,0,64,64);
  
  if (boyCanvas) {
    ctxB.drawImage(boyCanvas, 8, 4, 48, 56);
  }
  if (girlCanvas) {
    ctxG.drawImage(girlCanvas, 8, 4, 48, 56);
  }
}

const imgBoy = new Image();
imgBoy.src = './boy.png';
imgBoy.onload = () => {
  boyCanvas = processCharacterImage(imgBoy);
  drawMenuCharacters();
};

const imgGirl = new Image();
imgGirl.src = './girl.png';
imgGirl.onload = () => {
  girlCanvas = processCharacterImage(imgGirl);
  drawMenuCharacters();
};

// Entities
class Player {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.width = 40;
    this.height = 60;
    this.vy = 0;
    this.isGrounded = false;
    this.animTimer = 0;
  }
  
  jump() {
    if (this.isGrounded) {
      this.vy = CONFIG.jumpForce;
      this.isGrounded = false;
    }
  }

  update() {
    this.vy += CONFIG.gravity;
    this.y += this.vy;
    
    const groundY = height - 100;
    if (this.y + this.height >= groundY) {
      this.y = groundY - this.height;
      this.vy = 0;
      this.isGrounded = true;
    }
    
    if (this.isGrounded) {
      this.animTimer++;
    } else {
      this.animTimer = 0; // Fixed frame when jumping
    }
  }

  draw(ctx) {
    const charCanvas = selectedChar === 'boy' ? boyCanvas : girlCanvas;
    if (!charCanvas) return;

    let yOffset = 0;
    if (this.isGrounded) {
       const runFrame = Math.floor(this.animTimer / 10) % 2;
       if (runFrame === 1) yOffset = 3; 
    }
    
    ctx.drawImage(charCanvas, this.x - 5, this.y + yOffset, 50, 60);
  }
}

class Item {
  constructor(x, y, spriteKey) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.spriteKey = spriteKey;
    this.active = true;
  }
  
  update(speed) {
    this.x -= speed;
    if (this.x < -100) this.active = false;
  }

  draw(ctx) {
    if(!this.active) return;
    drawSprite(ctx, this.spriteKey, this.x, this.y);
  }
}

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.spriteKey = 'cloud';
    this.active = true;
  }
  
  update(speed) {
    this.x -= speed;
    if (this.x < -100) this.active = false;
  }
  
  draw(ctx) {
    if(!this.active) return;
    drawSprite(ctx, this.spriteKey, this.x, this.y, 5); // slightly bigger
  }
}

let player;
let items = [];
let obstacles = [];
let particles = [];
let groundOffset = 0;
let lastSpawn = 0;

function initLevel() {
  player = new Player();
  items = [];
  obstacles = [];
  score = 0;
  distance = 0;
  groundOffset = 0;
  lastSpawn = 0;
  updateHUD();
}

function spawnEntities() {
  distance += CONFIG.speed;
  if (distance - lastSpawn > 300) {
    const levelConf = CONFIG.levelConfigs[currentLevelIndex];
    if (score < levelConf.itemCount) {
      // Spawn Item or Obstacle
      if (Math.random() > 0.3) {
        // item
        const spriteKey = levelConf.itemSprites[Math.floor(Math.random() * levelConf.itemSprites.length)];
        items.push(new Item(width + 50, height - 150 - Math.random() * 100, spriteKey));
      } else {
        // obstacle
        obstacles.push(new Obstacle(width + 50, height - 140));
      }
      lastSpawn = distance;
    }
  }
}

function checkCollisions() {
  // Items
  items.forEach(item => {
    if (item.active &&
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y) {
      item.active = false;
      score++;
      updateHUD();
      createParticles(item.x, item.y, item.spriteKey);
      
      const levelConf = CONFIG.levelConfigs[currentLevelIndex];
      if (score >= levelConf.itemCount) {
        levelComplete();
      }
    }
  });

  // Obstacles
  obstacles.forEach(obs => {
    if (obs.active &&
        player.x < obs.x + obs.width - 10 &&
        player.x + player.width - 10 > obs.x &&
        player.y < obs.y + obs.height - 10 &&
        player.y + player.height - 10 > obs.y) {
      // Just slow down or visual effect
      obs.active = false;
      player.vy = -5; // mini bump
    }
  });
}

function createParticles(x, y, spriteKey) {
  for(let i=0; i<5; i++) {
    particles.push({
      x, y,
      vx: (Math.random()-0.5)*10,
      vy: (Math.random()-0.5)*10,
      life: 1.0,
      spriteKey
    });
  }
}

function updateParticles() {
  for(let i=particles.length-1; i>=0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.05;
    if(p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles(ctx) {
  particles.forEach(p => {
    ctx.globalAlpha = p.life;
    drawSprite(ctx, p.spriteKey, p.x, p.y, 2);
    ctx.globalAlpha = 1.0;
  });
}

function updateHUD() {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  document.getElementById('score-val').innerText = score;
  document.getElementById('current-level-val').innerText = currentLevelIndex + 1;
}

function levelComplete() {
  gameState = 'LEVEL_END';
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  
  document.getElementById('level-title').innerText = levelConf.title;
  // Inject player name
  let msg = levelConf.message;
  if(msg.includes('那時的心情')) msg = `${playerName}，` + msg;
  else if(msg.includes('有你在身邊')) msg = `${playerName}，` + msg;
  else if(msg.includes('日常的點點滴滴')) msg = `${playerName}，` + msg;
  
  document.getElementById('level-message').innerText = msg;
  document.getElementById('level-photo').innerText = levelConf.photo;
  
  uiLevel.classList.add('active');
  hud.classList.add('hidden');
}

function drawBackground(ctx) {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  
  // Sky
  if (levelConf.bgType === 'night') {
    ctx.fillStyle = '#192a56'; // 愛河夜景
    ctx.fillRect(0, 0, width, height);
    // Draw some stars
    ctx.fillStyle = '#f5f6fa';
    for(let i=0; i<20; i++){
        let sx = ((i*123) % width);
        let sy = ((i*321) % (height/2));
        ctx.fillRect(sx, sy, 2, 2);
    }
    // Far City skyline
    ctx.fillStyle = '#273c75';
    const cityOffset = (groundOffset * 0.2) % 100;
    for(let i=-100; i<width+100; i+=100) {
      ctx.fillRect(i + cityOffset, height - 150, 40, 50);
      ctx.fillRect(i + cityOffset + 40, height - 180, 30, 80);
      ctx.fillRect(i + cityOffset + 70, height - 130, 30, 30);
    }
  } else if (levelConf.bgType === 'forest') {
    ctx.fillStyle = '#81ecec'; // 阿里山天空
    ctx.fillRect(0, 0, width, height);
    // Mountains
    ctx.fillStyle = '#55efc4';
    const mountOffset = (groundOffset * 0.3) % 200;
    for(let i=-200; i<width+200; i+=200) {
      ctx.beginPath();
      ctx.moveTo(i + mountOffset, height - 100);
      ctx.lineTo(i + 100 + mountOffset, height - 250);
      ctx.lineTo(i + 200 + mountOffset, height - 100);
      ctx.fill();
    }
    // Trees
    ctx.fillStyle = '#00b894';
    const treeOffset = (groundOffset * 0.6) % 150;
    for(let i=-150; i<width+150; i+=150) {
      ctx.fillRect(i + treeOffset + 60, height - 140, 10, 40); // trunk
      ctx.beginPath();
      ctx.arc(i + treeOffset + 65, height - 150, 30, 0, Math.PI*2); // leaves
      ctx.fill();
    }
  } else {
    ctx.fillStyle = '#ffeaa7'; // 溫馨室內
    ctx.fillRect(0, 0, width, height);
    // Windows
    ctx.fillStyle = '#74b9ff';
    const wallOffset = (groundOffset * 0.5) % 300;
    for(let i=-300; i<width+300; i+=300) {
      ctx.fillRect(i + wallOffset + 50, height - 300, 100, 100);
      ctx.fillStyle = '#ffffff'; // window frames
      ctx.fillRect(i + wallOffset + 95, height - 300, 10, 100);
      ctx.fillRect(i + wallOffset + 50, height - 255, 100, 10);
      ctx.fillStyle = '#74b9ff';
    }
  }

  // Ground
  groundOffset = (groundOffset - CONFIG.speed) % 50;
  if (levelConf.bgType === 'home') {
    ctx.fillStyle = '#d1ccc0'; // 木地板顏色
  } else {
    ctx.fillStyle = '#2d3436'; // 戶外深色地面
  }
  ctx.fillRect(0, height - 100, width, 100);
  
  // Ground pattern
  if (levelConf.bgType === 'home') {
    ctx.fillStyle = '#b3aaa0';
  } else {
    ctx.fillStyle = '#636e72';
  }
  for(let i = 0; i < width / 50 + 2; i++) {
    ctx.fillRect(i * 50 + groundOffset, height - 100, 25, 100);
  }
}

function loop() {
  if (gameState === 'PLAYING') {
    ctx.clearRect(0, 0, width, height);
    
    drawBackground(ctx);
    
    spawnEntities();
    
    items.forEach(i => { i.update(CONFIG.speed); i.draw(ctx); });
    obstacles.forEach(o => { o.update(CONFIG.speed); o.draw(ctx); });
    
    player.update();
    player.draw(ctx);
    
    checkCollisions();
    
    updateParticles();
    drawParticles(ctx);
  }
  
  requestAnimationFrame(loop);
}

// Input handling
function jumpAction(e) {
  // Prevent jumping if clicking on a UI button or cake
  if(e && e.target && (e.target.tagName === 'BUTTON' || e.target.id === 'cake')) return;
  
  if (gameState === 'PLAYING') {
    player.jump();
  }
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') jumpAction(e);
});
window.addEventListener('touchstart', jumpAction);
window.addEventListener('mousedown', jumpAction);

// Button Handlers
function startGame(e) {
  if (e) e.stopPropagation();
  
  // Get Player Name
  const inputName = document.getElementById('player-name').value.trim();
  if (inputName) {
    playerName = inputName;
  }
  
  uiStart.classList.remove('active');
  hud.classList.remove('hidden');
  currentLevelIndex = 0;
  initLevel();
  gameState = 'PLAYING';
}

btnStart.addEventListener('click', startGame);
btnStart.addEventListener('touchstart', startGame);

function nextLevel(e) {
  if (e) e.stopPropagation();
  uiLevel.classList.remove('active');
  currentLevelIndex++;
  
  if (currentLevelIndex >= CONFIG.levelConfigs.length) {
    // Final
    gameState = 'FINAL';
    uiFinal.classList.add('active');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ff7675';
    ctx.fillRect(0, 0, width, height);
  } else {
    hud.classList.remove('hidden');
    initLevel();
    gameState = 'PLAYING';
  }
}

btnNext.addEventListener('click', nextLevel);
btnNext.addEventListener('touchstart', nextLevel);

// Final Cake Interaction
function blowCake(e) {
  if (e) e.preventDefault(); // prevent touchstart double firing click
  if (blowCount >= 20) return;
  blowCount++;
  document.getElementById('blow-progress').innerText = blowCount;
  
  // Scale down cake slightly as feedback
  cake.style.transform = `scale(${1 - blowCount*0.01})`;
  
  if (blowCount >= 20) {
    document.getElementById('blow-hint').style.display = 'none';
    const msgDiv = document.getElementById('final-message');
    msgDiv.classList.remove('hidden');
    msgDiv.innerHTML = `
      <p>親愛的 ${playerName}，生日快樂！</p>
      <p>謝謝你一直以來的陪伴，未來的日子也要一起走過無數風景。</p>
      <p>🎁 提示：去看看你的床頭櫃吧！</p>
    `;
    
    cake.innerText = '🎉';
    cake.style.transform = 'scale(1.2)';
    cake.style.animation = 'none';
    
    // Confetti effect
    for(let i=0; i<100; i++) {
      let c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.backgroundColor = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1'][Math.floor(Math.random()*4)];
      c.style.animationDuration = (Math.random() * 3 + 2) + 's';
      c.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(c);
    }
  }
}

cake.addEventListener('click', blowCake);
cake.addEventListener('touchstart', blowCake);

// Start loop
requestAnimationFrame(loop);
