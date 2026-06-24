// Audio Engine (8-bit Synthesizer)
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.bgmTimeout = null;
    this.bgmStopped = true;
  }

  init() {
    if (this.ctx || this.isMuted) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8; // 提高整體音量
    this.masterGain.connect(this.ctx.destination);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
      if (this.ctx && this.ctx.state === 'running') this.ctx.suspend();
    } else {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      if (gameState === 'PLAYING') this.startBGM();
    }
    return this.isMuted;
  }

  playTone(freq, type, duration, vol = 1, slideToFreq = null) {
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideToFreq, this.ctx.currentTime + duration);
    }
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playJump() { this.playTone(150, 'square', 0.15, 0.4, 300); }
  
  playCollect() {
    this.playTone(987.77, 'square', 0.1, 0.2); // B5
    setTimeout(() => this.playTone(1318.51, 'square', 0.2, 0.2), 100); // E6
  }

  playHit() { this.playTone(150, 'sawtooth', 0.3, 0.5, 50); }
  playBounce() { this.playTone(300, 'sine', 0.2, 0.4, 200); }
  
  playWin() {
    // 史詩級勝利號角 (Final Fantasy 勝利音樂風格)
    const notes = [
      { f: 523.25, d: 0.1 }, // C5
      { f: 523.25, d: 0.1 }, // C5
      { f: 523.25, d: 0.1 }, // C5
      { f: 523.25, d: 0.3 }, // C5
      { f: 415.30, d: 0.3 }, // G#4
      { f: 466.16, d: 0.3 }, // A#4
      { f: 523.25, d: 0.15 }, // C5
      { f: 466.16, d: 0.15 }, // A#4
      { f: 523.25, d: 0.6 }  // C5
    ];
    let time = 0;
    notes.forEach((n) => {
      setTimeout(() => this.playTone(n.f, 'square', n.d, 0.3), time * 1000);
      time += n.d + 0.05;
    });
  }

  startBGM() {
    if (this.isMuted || !this.ctx) return;
    this.stopBGM();
    
    const melody = [
      261.63, 329.63, 392.00, 523.25, // C
      392.00, 493.88, 587.33, 783.99, // G
      220.00, 261.63, 329.63, 440.00, // Am
      174.61, 220.00, 261.63, 349.23  // F
    ];
    let step = 0;
    
    const playNextNote = () => {
      if (this.bgmStopped) return;
      this.playTone(melody[step % melody.length], 'triangle', 0.15, 0.1);
      step++;
      this.bgmTimeout = setTimeout(playNextNote, 250);
    };
    
    this.bgmStopped = false;
    playNextNote();
  }

  stopBGM() {
    this.bgmStopped = true;
    if (this.bgmTimeout) clearTimeout(this.bgmTimeout);
  }
}
const audio = new AudioEngine();

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

// =========================================================================
// 遊戲全域配置區 (您可以隨意修改這裡的文字與參數)
// =========================================================================
const CONFIG = {
  gravity: 0.6,       // 角色掉落重力
  jumpForce: -12,     // 角色跳躍力道
  speed: 4,           // 畫面捲動基礎速度
  storyDuration: 6000, // 無敵留白與閱讀時間 (毫秒，6000 = 6秒。可以自由調整！)
  
  // 最終破關的卡片訊息
  finalMessage: `
      <p>親愛的 {playerName}，生日快樂！</p>
      <p>謝謝你陪我把那些衝動、冒險、平凡日常，一點一點都過成了我最捨不得忘記的回憶。</p>
      <p>以前覺得浪漫是煙火、是遠方、是特別安排的驚喜。後來才知道，真正的浪漫，是我每一次回頭，都剛好看見你還在我身邊。</p>
      <p>新的一歲，希望你開心、健康、被愛著。而我也想繼續陪你，把往後的每一年，都過成我們的故事。</p>
      <p>提示：去看看你的床頭櫃吧！</p>
  `,

  levelConfigs: [
    {
      id: 1,
      title: "Chapter 1\n心動是從一時衝動開始的",
      bgType: 'night',
      itemSprites: ['firework', 'heart'],
      itemCount: 12, // 遊戲過關所需的寶物數量
      speedMultiplier: 1.0, // 速度倍率
      spawnRate: 40, // 縮短距離，讓節奏更緊湊
      obstacleSprite: 'monster', // 這關的危險障礙物圖案
      // === 每一關的破關照片與文字設定 ===
      chapterDesc: "2022.02.12\n原本只是去看煙火，結果一不小心，把彼此也看進了未來。", // 關卡開始前的介紹文案
      message: "故事的開頭很鬧，但我很喜歡。因為主角是你。", // 過關時顯示在拍立得下方的文字
      
      // 👉 【放入您的照片】：請將照片放到 public 資料夾中，並在這裡填入檔名。例如 "./photo1.jpg"
      // 如果沒有填寫，會顯示預設的 Emoji 符號。
      photoSrc: "", 
      photo: "🎆", // 如果沒有設定照片，會退回顯示這個 Emoji
      
      // === 遊戲進行中浮現的回憶文字 ===
      // itemTarget: 收集到第幾個道具時出現
      // text: 想對他說的話
      storyMilestones: [
        { itemTarget: 2, text: "「不如我們直接衝高雄，看完就回來！」" },
        { itemTarget: 4, text: "現在想想，那根本不是提議，是戀愛裡的第一場衝動。" },
        { itemTarget: 6, text: "那天的煙火很亮，但你站在旁邊，害我根本沒辦法專心看天上。" },
        { itemTarget: 8, text: "從那一刻開始，你不只是學長，是我想偏心的人。" },
        { itemTarget: 10, text: "原來安心不是抽象名詞，是你握住我的手的樣子。" },
      ]
    },
    {
      id: 2,
      title: "Chapter 2\n有你在，路遠一點也沒關係",
      bgType: 'forest',
      itemSprites: ['camera', 'suitcase'],
      itemCount: 12, // 遊戲過關所需的寶物數量
      speedMultiplier: 1.2, // 速度變快 1.2 倍
      spawnRate: 35, // 東西出現變得更密集
      obstacleSprite: 'fire', // 這關的危險障礙物圖案
      // === 每一關的破關照片與文字設定 ===
      chapterDesc: "2022.11.17\n不是每次旅程都完美，但只要身邊是你，偏差也會變成驚喜。",
      message: "因為有你，旅途從來不只是抵達，而是一路都值得。",
      photoSrc: "", // 👉 【放入您的照片】：填入檔名，例如 "./photo2.jpg"
      photo: "🌲",
      
      // === 遊戲進行中浮現的回憶文字 ===
      storyMilestones: [
        { itemTarget: 2, text: "那趟山路又長又霧，像在考驗我們是不是真的很想看風景。" },
        { itemTarget: 4, text: "結果日出沒看到，卻看到夕陽、雲海，還有一路上很照顧我的你。" },
        { itemTarget: 6, text: "我走得慢、走得狼狽，你也沒有催我，只是陪我一起慢慢走。" },
        { itemTarget: 8, text: "後來我才發現，喜歡一個人，不是只想一起去遠方。" },
        { itemTarget: 10, text: "是連不好走的路，都希望旁邊站的是你。" }
      ]
    },
    {
      id: 3,
      title: "Chapter 3\n後來最喜歡的，是我們的日常",
      bgType: 'home',
      itemSprites: ['controller', 'pan'],
      itemCount: 12, // 遊戲過關所需的寶物數量
      speedMultiplier: 1.5, // 速度變快 1.5 倍
      spawnRate: 25, // 東西出現變得最密集
      obstacleSprite: 'banana', // 這關的危險障礙物圖案
      // === 每一關的破關照片與文字設定 ===
      chapterDesc: "不是每一天都有煙火和遠方，但有你的晚餐、沙發和廢片，就已經很幸福了。",
      message: "最珍貴的，不是特別的一天，是每一天都有你。",
      photoSrc: "", // 👉 【放入您的照片】：填入檔名，例如 "./photo3.jpg"
      photo: "🏠",
      
      // === 遊戲進行中浮現的回憶文字 ===
      storyMilestones: [
        { itemTarget: 2, text: "後來我越來越喜歡那些看起來沒什麼的大日子。" },
        { itemTarget: 4, text: "像是一起窩在沙發上，什麼都不做，也覺得今天很好。" },
        { itemTarget: 6, text: "像是你煮飯，我在旁邊亂晃，最後還是吃得很開心。" },
        { itemTarget: 8, text: "原來真正想共度餘生的人，會出現在每一個回家以後的晚上。" },
        { itemTarget: 10, text: "你把那些平凡的日子，慢慢過成了我最捨不得快轉的人生片段。" }
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
const btnShowInstruction = document.getElementById('show-instruction-btn');
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
let isSafeZone = false;

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
    if (score >= milestone.itemTarget) {
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
  isSafeZone = true; // 進入無障礙安全區
  
  if (storyTimeout) clearTimeout(storyTimeout);
  storyTimeout = setTimeout(() => {
    storyOverlay.classList.remove('visible');
    setTimeout(() => {
       storyOverlay.classList.add('hidden');
       isSafeZone = false; // 離開安全區
    }, 500);
  }, CONFIG.storyDuration); // 讀取設定檔的停留時間
}

function spawnEntities() {
  if (isSafeZone) return; // 進入無敵看字模式時，停止生成任何道具與障礙物

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
    const dx = (player.x + player.width/2) - (item.x + item.width/2);
    const dy = (player.y + player.height/2) - (item.y + item.height/2);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (item.active && dist < player.width/2 + 20) {
      audio.playCollect();
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
    const dx = (player.x + player.width/2) - (obs.x + obs.width/2);
    const dy = (player.y + player.height/2) - (obs.y + obs.height/2);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (obs.active && dist < player.width/2 + obs.width/2) {
      
      obs.active = false;
      if (obs.type === 'danger') {
        audio.playHit();
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
        audio.playBounce();
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
  audio.stopBGM();
  audio.playWin();
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
    audio.playJump();
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
  // Show intro part, hide instruction part
  document.getElementById('chapter-intro-part').style.display = 'block';
  document.getElementById('chapter-instruction-part').style.display = 'none';
  
  // Device detection for jump instruction text
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const jumpInstruction = document.getElementById('jump-instruction');
  if (jumpInstruction) {
    jumpInstruction.innerText = isMobile ? "「點擊螢幕跳躍」\n繼續把這段回憶跑下去" : "點擊螢幕 或 按空白鍵跳躍，繼續把這段回憶跑下去";
  }

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
  audio.init(); // 初始化音效引擎
  
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

btnShowInstruction.addEventListener('click', (e) => {
  if (e) e.stopPropagation();
  audio.playJump();
  document.getElementById('chapter-intro-part').style.display = 'none';
  document.getElementById('chapter-instruction-part').style.display = 'block';
});
btnShowInstruction.addEventListener('touchstart', (e) => {
  if (e) e.stopPropagation();
  audio.playJump();
  document.getElementById('chapter-intro-part').style.display = 'none';
  document.getElementById('chapter-instruction-part').style.display = 'block';
});

function startChapterPlay(e) {
  if (e) e.stopPropagation();
  audio.init();
  uiChapter.classList.remove('active');
  hud.classList.remove('hidden');
  initLevel();
  gameState = 'PLAYING';
  audio.startBGM(); // 關卡開始，播放 BGM
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
let finalAudioTimeout = null;
function blowCake(e) {
  if (e) e.preventDefault(); // prevent touchstart double firing click
  if (blowCount >= 20) return;
  blowCount++;
  document.getElementById('blow-progress').innerText = blowCount;
  audio.playTone(200 + blowCount*20, 'sine', 0.1, 0.3); // 吹氣音效
  
  // 蛋糕搖晃與縮小特效
  const currentScale = 1 - blowCount * 0.01;
  cake.style.setProperty('--cake-scale', currentScale);
  cake.classList.remove('cake-shake');
  void cake.offsetWidth; // trigger reflow
  cake.classList.add('cake-shake');
  
  if (blowCount >= 20) {
    audio.playWin();
    document.getElementById('blow-hint').style.display = 'none';
    const msgDiv = document.getElementById('final-message');
    msgDiv.classList.remove('hidden');
    msgDiv.innerHTML = CONFIG.finalMessage.replace('{playerName}', playerName);
    
    // 蠟燭熄滅的效果，並綻放滿滿的像素煙花
    cake.style.transform = 'scale(1.1)';
    cake.style.transition = 'all 1s ease-out';
    cake.style.animation = 'none';
    
    // Confetti & Fireworks effect
    for(let i=0; i<100; i++) {
      let c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.backgroundColor = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1'][Math.floor(Math.random()*4)];
      c.style.animationDuration = (Math.random() * 3 + 2) + 's';
      c.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(c);
    }
    
    // Pixel fireworks explosions using DOM elements
    for(let i=0; i<15; i++) {
      setTimeout(() => {
        const fireX = Math.random() * window.innerWidth;
        const fireY = Math.random() * window.innerHeight * 0.8;
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#ff9ff3', '#fff200'];
        
        for(let p=0; p<30; p++) {
          let dot = document.createElement('div');
          dot.style.position = 'absolute';
          dot.style.left = fireX + 'px';
          dot.style.top = fireY + 'px';
          dot.style.width = '8px';
          dot.style.height = '8px';
          dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          dot.style.zIndex = '10001';
          
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 100 + 30;
          const tx = Math.cos(angle) * speed;
          const ty = Math.sin(angle) * speed;
          
          dot.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          document.body.appendChild(dot);
          
          setTimeout(() => {
            dot.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            dot.style.opacity = '0';
          }, 10);
          
          setTimeout(() => dot.remove(), 1000);
        }
      }, Math.random() * 2000);
    }
  }
}

cake.addEventListener('click', blowCake);
cake.addEventListener('touchstart', blowCake);

// Mute Button Logic
const btnMute = document.getElementById('btn-mute');
btnMute.onclick = (e) => {
  e.stopPropagation();
  const isMuted = audio.toggleMute();
  btnMute.innerText = isMuted ? '🔇' : '🔊';
};

// Start loop
requestAnimationFrame(loop);

// --- Dev Tools for Testing ---
window.skipToLevel = function(levelIdx) {
  audio.init();
  audio.stopBGM();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  hud.classList.add('hidden');
  
  currentLevelIndex = levelIdx;
  gameState = 'MENU';
  showChapterScreen();
};

window.skipToCake = function() {
  audio.init();
  audio.stopBGM();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  hud.classList.add('hidden');
  
  gameState = 'FINAL';
  uiFinal.classList.add('active');
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ff7675';
  ctx.fillRect(0, 0, width, height);
};
