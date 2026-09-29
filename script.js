const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const hearts = document.getElementById('hearts');

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicText.textContent = 'Our melody is playing';
    } catch (e) {
      musicText.textContent = 'Tap again for music';
    }
  } else {
    music.pause();
    musicText.textContent = 'Play our melody';
  }
});

// Floating hearts
const heartChars = ['♥','♡','❤','💕','💗'];
function makeHeart() {
  const h = document.createElement('div');
  h.className = 'float-heart';
  h.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (10 + Math.random()*18) + 'px';
  h.style.animationDuration = (7 + Math.random()*8) + 's';
  h.style.animationDelay = (Math.random()*2) + 's';
  hearts.appendChild(h);
  setTimeout(()=>h.remove(), 18000);
}
setInterval(makeHeart, 850);
for(let i=0;i<10;i++) setTimeout(makeHeart, i*300);

// The runaway NO button
const noBtn = document.getElementById('noBtn');
const tease = document.getElementById('tease');
let attempts = 0;
const teaseLines = [
  'There is only one correct answer. 😌',
  'Hmm… that button seems unusually nervous. 😂',
  'Nice try, Andal. ❤️',
  'The NO button has chosen self-preservation. 🏃',
  'I think the universe is telling you something… 👀',
  '404: NO response not found. 😭',
  'Okay okay… you are persistent. 😂',
  'Just press YES and make one man very happy. 🥹'
];

function escapeNo(e) {
  if (e) e.preventDefault();
  attempts++;
  tease.textContent = teaseLines[Math.min(attempts, teaseLines.length-1)];

  const pad = 18;
  const bw = noBtn.offsetWidth || 100;
  const bh = noBtn.offsetHeight || 50;
  const maxX = Math.max(pad, window.innerWidth - bw - pad);
  const maxY = Math.max(100, window.innerHeight - bh - pad);

  noBtn.style.position = 'fixed';
  noBtn.style.left = (pad + Math.random() * (maxX-pad)) + 'px';
  noBtn.style.top = (70 + Math.random() * Math.max(30, maxY-70)) + 'px';
}
noBtn.addEventListener('mouseenter', escapeNo);
noBtn.addEventListener('pointerdown', escapeNo);
noBtn.addEventListener('touchstart', escapeNo, {passive:false});

// YES celebration
document.getElementById('yesBtn').addEventListener('click', () => {
  document.getElementById('proposal').style.display = 'none';
  document.getElementById('success').classList.add('show');
  document.querySelector('.music-btn').style.display = 'none';

  // Big burst
  const emojis = ['♥','❤','💕','💗','💍','✨','🎉','🥹','🥳'];
  for(let i=0;i<130;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    c.style.left = Math.random()*100 + 'vw';
    c.style.fontSize = (10 + Math.random()*22) + 'px';
    c.style.setProperty('--x', (Math.random()*260-130) + 'px');
    c.style.animationDelay = (Math.random()*1.3) + 's';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 5000);
  }

  // Keep the melody going if it was already started; otherwise try to start it.
  music.play().catch(()=>{});
});
