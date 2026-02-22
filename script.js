//==============================================================
//✅ Main responsive logic
//==============================================================
let symbols = [];
function spawnParticle() {

  if (symbols.length === 0) return;

  const el = document.createElement("span");
  el.className = "particle";

  el.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight;

  el.style.left = x + "px";
  el.style.top  = y + "px";

  const dx = (Math.random() * 120 - 60) + "px";
  const dy = -(y + 1000) + "px";

  const r1 = (Math.random() * 40 - 20) + "deg";
  const r2 = (Math.random() * 120 - 60) + "deg";

  el.style.setProperty("--dx", dx);
  el.style.setProperty("--dy", dy);
  el.style.setProperty("--rot-start", r1);
  el.style.setProperty("--rot-end", r2);

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

setInterval(spawnParticle, 500);

function responsivePoster() {
  if (window.matchMedia("(max-height: 600px) and (max-width: 800px)").matches) {
    symbols = ["□", "/", "○",  "╱", "╲", "▭", "▯", "▱", "Tiri", "Karanuruk", "~"];
    document.querySelector("#mainText1").textContent = "Tiri Karanuruk";
    document.querySelector("#mainText2").textContent = "Any Questions?"; 
  } 
  else if (window.matchMedia("(max-height: 700px)").matches) {
  } 
  else { // ℹ️ Default
    symbols = ["□", "/", "○", "■", "╱", "╲", "▭", "▮", "▯", "▰", "▱", "~"];
    document.querySelector("#mainText1").textContent = "Special Guest";
    document.querySelector("#mainText2").textContent = "↸ Shrink Window"; 
  }
}

//==============================================================
//❓Initial run + resize listener
//==============================================================
responsivePoster(); // Initial run
window.addEventListener("resize", responsivePoster); // Update on resize
