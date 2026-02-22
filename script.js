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
  setTimeout(() => el.remove(), 7500);
}

function responsivePoster() {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    symbols = ["□", "/", "○",  "╱", "Morakana", "Doppelgänger", "TK1971", "DeepTalking5000", "You are 99% likely to see this show"];
    document.querySelector("#mainText1").textContent = "TIRI KARANURUK";
    document.querySelector("#mainText2").textContent = "Any Questions?"; 
  } 
  else { // ℹ️ Default
    symbols = ["□", "/", "○", "■", "╱", "╲", "▭", "▮", "▯", "▰", "▱", "~"];
    document.querySelector("#mainText1").textContent = "Special Guest";
    document.querySelector("#mainText2").textContent = "⇤ Shrink Window"; 
  }
}

//==============================================================
//❓Initial run + resize listener
//==============================================================
responsivePoster(); // Initial run
window.addEventListener("resize", responsivePoster); // Update on resize

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //==============================================================
  //❓Create a new speech recognition
  //==============================================================
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";          // Set language to English
    recognition.continuous = true;       // Keep listening until stopped
    recognition.interimResults = true;   // Show partial results while speaking

  //==============================================================
  //❓Start recognition when "#startBtn" button is clicked
  //==============================================================
    document.querySelector("#startBtn").addEventListener("click", () => {
      recognition.start(); // Start listening
      document.querySelector("#startBtn").style.display = "none"; // Hide button after click
      document.querySelector("#mainText1").style.display = "block";
      document.querySelector("#mainText2").style.display = "block";
      setInterval(spawnParticle, 500);
    });

  //==============================================================
  //✅ Define keywords and what happens when they are spoken
  //==============================================================
    const keywords = {
      "What day": () => {
        document.querySelector("#mainText3").textContent = "Friday,\n2/27/26";
      },
      "What time": () => {
        document.querySelector("#mainText3").textContent = "4:30 PM EST";
      },
      "Where": () => {
        document.querySelector("#mainText3").textContent = "808 Commonwealth Ave.\nin Room 410,\nOr on Zoom";
      },
      "Thank you": () => {
        document.querySelector("#mainText3").textContent = "See you then!";
      },
    };

  //==============================================================
  //❓Process recognized speech results
  //==============================================================
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      document.querySelector("#mainText2").textContent = transcript; // Show what user said
      const lowerTranscript = transcript.toLowerCase();
      for (const key in keywords) { 
        if (lowerTranscript.includes(key.toLowerCase())) { // Check if keyword is spoken
          document.querySelector("#mainText2").textContent = key; // Display the keyword
          keywords[key](); // Run the keyword action
          break; // Stop checking after first match
        }
      }
    };

  //==============================================================
  //❓Restart recognition automatically when it ends
  //==============================================================
    recognition.onend = () => {
      recognition.start();
    };

  //==============================================================
}
