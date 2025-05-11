const carOne = document.getElementById("car-1");
const carTwo = document.getElementById("car-2");
const WordView = document.getElementById("word-to-type");
const wordInput = document.getElementById("typed-word");
const modal = document.getElementById("modal");
const startGameBtn = document.getElementById("start");

setTimeout(() => {
  carOne.style.left = "5%";
  carTwo.style.left = "5%";
}, 100);

let carOnePosition = 5;
let carTwoPosition = 5;
let isGameOver = false;
let startTime = null;
let wordCount = 0;

const words = [
  "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "amazing", "zebra", "vex",
  "wizard", "box", "jelly", "grumpy", "night", "field", "puzzle", "quest", "vapor", "axe",
  "knight", "buzz", "crisp", "flood", "blank", "dwarf", "equip", "glow", "humor", "index",
  "junky", "karma", "lemon", "mango", "noble", "orbit", "pluck", "quake", "risky", "scope",
  "trend", "unzip", "vivid", "whale", "xerox", "yield", "zesty", "anchor", "blaze", "climb",
  "dodge", "eagle", "flame", "grove", "hatch", "input", "jewel", "kiosk", "latch", "model",
  "nerdy", "ounce", "prank", "quilt", "rival", "squad", "trace", "ultra", "value", "worry",
  "xenon", "young", "zonal", "adapt", "brisk", "chunk", "drift", "elite", "feast", "grace",
  "harsh", "ideal", "joint", "kneel", "label", "minor", "neigh", "ocean", "print", "quiet",
  "ranch", "split", "thump", "unity", "visit", "wrath", "xeric", "yacht", "zebra"
];

const winner = (status) => {
  const totalTime = (Date.now() - startTime) / 1000 / 60;
  const wpm = Math.round(wordCount / totalTime);
  modal.innerHTML = `
    <h2>Game Over</h2>
    <h3>${status}!</h3>
    <h3>Your WPM : ${wpm}!</h3>
    <button onclick="playAgain()" class="btn btn-warning text-black lg:px-12 lg:py-8 text-2xl">Play Again</button>
    `;

  modal.showModal();
};


const typeHandler = () => {
  const randomWord = words[Math.floor(Math.random() * words.length)];

  WordView.innerText = randomWord;

  wordInput.addEventListener("input", (e) => {
    if (e.target.value === randomWord) {
      wordCount++;
      wordInput.value = "";
      carTwoPosition += 10;
      carTwo.style.left = carTwoPosition + "%";

      if (carTwoPosition >= 80) {
        isGameOver = true;
        winner("You Win");
      }
      typeHandler();
    }
  });
};

const carOneConstantMove = () => {
  const carOneMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carOneMove);
    }

    if (carOnePosition >= 80) {
      isGameOver = true;
      winner("You Lost!");
    }
    carOnePosition += 0.4;
    carOne.style.left = carOnePosition + "%";
  }, 100);
};

const carTwoConstantMove = () => {
  const carTwoMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carTwoMove);
    }

    if (carTwoPosition >= 72) {
      isGameOver = true;
      winner("You Win!");
    }
    carTwoPosition += 0.1;
    carTwo.style.left = carTwoPosition + "%";
  }, 100);
};

const startGame = () => {
  startTime = Date.now();
  carOneConstantMove();
  carTwoConstantMove();
  typeHandler();
};

startGameBtn.addEventListener("click", startGame);
