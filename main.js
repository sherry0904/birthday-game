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
  'O': '#e67e22', // Girl Shirt
  'V': '#9b59b6', // Purple (Monster)
  'A': '#d35400'  // Orange (Fire)
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
  ],
  monster: [
    "....VVVV........",
    "...VVVVVV.......",
    "..VVVVVVVV......",
    "..VWBVVBWV......",
    "..VVVVVVVV......",
    "...V.VV.V.......",
    "...V....V......."
  ],
  fire: [
    ".....R..........",
    "....RAR.........",
    "...RAYAR........",
    "..RAYYYAR.......",
    "..RAYYYAR.......",
    "...RAAR.........",
    "....RR.........."
  ],
  banana: [
    ".......Y........",
    "......YY........",
    ".....YY.........",
    "....YY..........",
    "...YY...........",
    "..YYY...........",
    "..YYYYY........."
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
      title: "Level 1",
      bgType: 'night',
      itemSprites: ['firework', 'heart'],
      itemCount: 10, // 增加到 10 個讓遊戲節奏更長
      speedMultiplier: 1.0, // 速度倍率
      spawnRate: 40, // 縮短距離，讓節奏更緊湊
      obstacleSprite: 'monster', // 這關的危險障礙物圖案
      chapterDesc: "這是一切開始的地方，還記得我們一起看的煙火嗎？",
      message: "那時的心情跟著煙火一起綻放",
      photo: "🎆",
      photoSrc: "", // TODO: 填入您的真實照片路徑，例如 "./my-photo1.jpg"
      storyMilestones: [
        { distance: 100, text: "還記得我們第一次一起跨年嗎？\n那天天氣超冷的～🥶" },
        { distance: 250, text: "你一直握著我的手，說這樣就不冷了。" },
        { distance: 400, text: "後來我們一起去了好多地方..." },
        { distance: 550, text: "那時候我就知道，接下來的日子有你就夠了。" }
      ]
    },
    {
      id: 2,
      title: "Level 2",
      bgType: 'forest',
      itemSprites: ['camera', 'suitcase'],
      itemCount: 10, // 增加到 10 個讓遊戲節奏更長
      speedMultiplier: 1.2, // 速度變快 1.2 倍
      spawnRate: 35, // 東西出現變得更密集
      obstacleSprite: 'fire', // 這關的危險障礙物圖案
      chapterDesc: "走遍各地的旅程，每一次迷路都是新的探險。",
      message: "有你在身邊，去哪裡都好玩。",
      photo: "🌲",
      photoSrc: "", // TODO: 填入您的真實照片路徑
      storyMilestones: [
        { distance: 100, text: "那次去阿里山迷路...\n還好最後有看到日出！🌅" },
        { distance: 250, text: "每次出門旅行你都會幫我拍好多照片。" },
        { distance: 400, text: "雖然有時候會為了行程吵架，哈哈。" },
        { distance: 550, text: "但有你在的旅途，就算下雨也覺得好玩。" }
      ]
    },
    {
      id: 3,
      title: "Level 3",
      bgType: 'home',
      itemSprites: ['controller', 'pan'],
      itemCount: 10, // 增加到 10 個讓遊戲節奏更長
      speedMultiplier: 1.5, // 速度變快 1.5 倍
      spawnRate: 25, // 東西出現變得最密集
      obstacleSprite: 'banana', // 這關的危險障礙物圖案
      chapterDesc: "比起外面的世界，我更喜歡和你窩在沙發上的時光。",
      message: "日常的點點滴滴是最珍貴的寶藏。",
      photo: "🏠",
      photoSrc: "", // TODO: 填入您的真實照片路徑
      storyMilestones: [
        { distance: 100, text: "其實只要跟你待在沙發上廢，\n就是最棒的一天啦 🥰" },
        { distance: 250, text: "你煮的晚餐總是特別好吃！" },
        { distance: 400, text: "一起打電動、一起看廢片..." },
        { distance: 550, text: "未來的每一天，也要一起這樣平平淡淡的過喔。" }
      ]
    }
  ]
};

// Load Backgrounds
const bgNight = new Image(); bgNight.src = './bg_night.png';
const bgForest = new Image(); bgForest.src = './bg_forest.png';
const bgHome = new Image(); bgHome.src = './bg_home.png';

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
const uiChapter = document.getElementById('chapter-screen');
const uiLevel = document.getElementById('level-screen');
const uiFinal = document.getElementById('final-screen');
const hud = document.getElementById('hud');

const btnStart = document.getElementById('start-btn');
const btnStartChapter = document.getElementById('start-chapter-btn');
const btnNext = document.getElementById('next-level-btn');
const cake = document.getElementById('cake-img');

// Game State
let gameState = 'START'; // START, PLAYING, LEVEL_END, FINAL
let currentLevelIndex = 0;
let score = 0;
let distance = 0;
let lastSpawnDistance = 0;
let consecutiveItems = 0;
let consecutiveObstacles = 0;
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
  constructor(x, y, spriteKey = 'cloud') {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.spriteKey = spriteKey;
    this.type = spriteKey === 'cloud' ? 'cloud' : 'danger';
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
let currentStoryIndex = 0;
let storyTimeout = null;

const storyOverlay = document.getElementById('story-overlay');
const storyText = document.getElementById('story-text');

function initLevel() {
  player = new Player();
  items = [];
  obstacles = [];
  score = 0;
  distance = 0;
  lastSpawnDistance = 0;
  consecutiveItems = 0;
  consecutiveObstacles = 0;
  groundOffset = 0;
  currentStoryIndex = 0;
  if(storyTimeout) clearTimeout(storyTimeout);
  storyOverlay.classList.remove('visible');
  storyOverlay.classList.add('hidden');
  updateHUD();
}

function checkStoryMilestones() {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  if (!levelConf.storyMilestones) return;
  
  if (currentStoryIndex < levelConf.storyMilestones.length) {
    const milestone = levelConf.storyMilestones[currentStoryIndex];
    if (distance >= milestone.distance) {
      showStoryOverlay(milestone);
      currentStoryIndex++;
    }
  }
}

function showStoryOverlay(milestone) {
  storyText.innerHTML = milestone.text.replace(/\n/g, '<br>');
  
  storyOverlay.classList.remove('hidden');
  void storyOverlay.offsetWidth; // Trigger reflow
  storyOverlay.classList.add('visible');
  
  if (storyTimeout) clearTimeout(storyTimeout);
  storyTimeout = setTimeout(() => {
    storyOverlay.classList.remove('visible');
    setTimeout(() => {
       storyOverlay.classList.add('hidden');
    }, 500);
  }, 7000); // 顯示 7 秒
}

function spawnEntities() {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  const spawnRate = levelConf.spawnRate || 300;
  const currentSpeed = CONFIG.speed * (levelConf.speedMultiplier || 1.0);
  
  if (distance - lastSpawnDistance > spawnRate) {
    if (score < levelConf.itemCount) {
      let isItem = Math.random() > 0.5;
      
      // 防呆機制：避免連續出現超過 2 個相同的東西（維持分佈平均）
      if (consecutiveItems >= 2) {
        isItem = false;
      } else if (consecutiveObstacles >= 2) {
        isItem = true;
      }

      if (isItem) {
        consecutiveItems++;
        consecutiveObstacles = 0;
        // item
        const spriteKey = levelConf.itemSprites[Math.floor(Math.random() * levelConf.itemSprites.length)];
        items.push(new Item(width + 50, height - 150 - Math.random() * 100, spriteKey));
      } else {
        consecutiveObstacles++;
        consecutiveItems = 0;
        // obstacle
        const obsKey = Math.random() > 0.4 ? levelConf.obstacleSprite : 'cloud'; // 60% danger, 40% cloud
        obstacles.push(new Obstacle(width + 50, height - 140, obsKey));
      }
      lastSpawnDistance = distance;
    }
  }
}

function checkCollisions() {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  const currentSpeed = CONFIG.speed * (levelConf.speedMultiplier || 1.0);

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
      
      obs.active = false;
      if (obs.type === 'danger') {
        score = Math.max(0, score - 1);
        updateHUD();
        // Red Flash Effect
        const canvasEl = document.getElementById('gameCanvas');
        if (canvasEl) {
          canvasEl.style.transition = 'none';
          canvasEl.style.filter = 'drop-shadow(0 0 20px red) sepia(1) hue-rotate(-50deg) saturate(5)';
          setTimeout(() => {
            canvasEl.style.transition = 'filter 0.3s';
            canvasEl.style.filter = 'none';
          }, 100);
        }
      } else {
        // Just slow down or visual effect
        player.vy = -5; // mini bump
      }
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
  document.getElementById('score-total').innerText = levelConf.itemCount;
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
  
  const levelImage = document.getElementById('level-image');
  const levelPlaceholder = document.getElementById('level-photo-placeholder');
  
  // Here we can check if there's a level photo URL
  // For now we just use the emoji or placeholder
  if (levelConf.photoSrc && levelConf.photoSrc.trim() !== '') {
    levelImage.src = levelConf.photoSrc;
    levelImage.style.display = 'block';
    levelPlaceholder.style.display = 'none';
  } else {
    levelImage.style.display = 'none';
    levelPlaceholder.style.display = 'block';
    levelPlaceholder.innerText = levelConf.photo;
  }
  
  uiLevel.classList.add('active');
  hud.classList.add('hidden');
}

function drawBackground(ctx) {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  const currentSpeed = CONFIG.speed * (levelConf.speedMultiplier || 1.0);
  
  // Background parallax
  groundOffset -= currentSpeed * 0.5;
  
  // Move player forward in distance
  distance += currentSpeed * 0.1;
  
  let bgImg = null;
  if (levelConf.bgType === 'night') bgImg = bgNight;
  else if (levelConf.bgType === 'forest') bgImg = bgForest;
  else if (levelConf.bgType === 'home') bgImg = bgHome;

  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    // 根據畫布高度等比例縮放圖片
    const ratio = height / bgImg.height;
    const drawW = bgImg.width * ratio;
    const drawH = height;
    
    // 視差滾動偏移量 (較慢)
    const parallaxOffset = ((groundOffset * 0.3) % drawW + drawW) % drawW;
    
    // 繪製兩張圖片實現無縫滾動
    ctx.drawImage(bgImg, parallaxOffset, 0, drawW, drawH);
    ctx.drawImage(bgImg, parallaxOffset - drawW, 0, drawW, drawH);
    if (parallaxOffset > 0 && parallaxOffset < drawW) {
      ctx.drawImage(bgImg, parallaxOffset + drawW, 0, drawW, drawH);
    }
  } else {
    // Fallback 背景
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(0, 0, width, height);
  }

  // Ground base
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
  const tileOffset = groundOffset % 50;
  for(let i = -1; i < width / 50 + 2; i++) {
    ctx.fillRect(i * 50 + tileOffset, height - 100, 25, 100);
  }
}

function loop() {
  if (gameState === 'PLAYING') {
    ctx.clearRect(0, 0, width, height);
    
    drawBackground(ctx);
    
    spawnEntities();
    checkStoryMilestones();
    
    const levelConf = CONFIG.levelConfigs[currentLevelIndex];
    const currentSpeed = CONFIG.speed * (levelConf.speedMultiplier || 1.0);
    
    items.forEach(i => { i.update(currentSpeed); i.draw(ctx); });
    obstacles.forEach(o => { o.update(currentSpeed); o.draw(ctx); });
    
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
  if(e && e.target && (e.target.tagName === 'BUTTON' || e.target.id === 'cake-img')) return;
  
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
// Tutorial Rendering helper
function renderSpriteToCanvas(spriteKey, scale = 4) {
  const canvas = document.createElement('canvas');
  const spriteData = SPRITES[spriteKey];
  if (!spriteData) return canvas;
  canvas.width = spriteData[0].length * scale;
  canvas.height = spriteData.length * scale;
  const ctx = canvas.getContext('2d');
  
  for (let r = 0; r < spriteData.length; r++) {
    for (let c = 0; c < spriteData[r].length; c++) {
      const char = spriteData[r][c];
      if (PALETTE[char]) {
        ctx.fillStyle = PALETTE[char];
        ctx.fillRect(c * scale, r * scale, scale, scale);
      }
    }
  }
  return canvas;
}

function showChapterScreen() {
  const levelConf = CONFIG.levelConfigs[currentLevelIndex];
  document.getElementById('chapter-title').innerText = levelConf.title;
  document.getElementById('chapter-desc').innerText = levelConf.chapterDesc;
  document.getElementById('chapter-item-count').innerText = levelConf.itemCount;
  
  const itemsContainer = document.getElementById('chapter-items');
  itemsContainer.innerHTML = '';
  levelConf.itemSprites.forEach(k => {
    const canvas = renderSpriteToCanvas(k, 3);
    itemsContainer.appendChild(canvas);
  });
  
  const obsContainer = document.getElementById('chapter-obstacle');
  obsContainer.innerHTML = '';
  obsContainer.appendChild(renderSpriteToCanvas(levelConf.obstacleSprite, 3));
  
  const cloudContainer = document.getElementById('chapter-cloud');
  cloudContainer.innerHTML = '';
  cloudContainer.appendChild(renderSpriteToCanvas('cloud', 3));
  
  uiChapter.classList.add('active');
}

function startGame(e) {
  if (e) e.stopPropagation();
  
  // Get Player Name
  const inputName = document.getElementById('player-name').value.trim();
  if (inputName) {
    playerName = inputName;
  }
  
  uiStart.classList.remove('active');
  currentLevelIndex = 0;
  showChapterScreen();
}

btnStart.addEventListener('click', startGame);
btnStart.addEventListener('touchstart', startGame);

function startChapterPlay(e) {
  if (e) e.stopPropagation();
  uiChapter.classList.remove('active');
  hud.classList.remove('hidden');
  initLevel();
  gameState = 'PLAYING';
}

btnStartChapter.addEventListener('click', startChapterPlay);
btnStartChapter.addEventListener('touchstart', startChapterPlay);

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
    showChapterScreen();
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
