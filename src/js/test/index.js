let data;
let keys = [];
let indexKey = 0;
let indexSoaluar = 0;
let indexSoalDalam = 0;

// const readTime =

const container = document.querySelector("main");
const contCard = document.createElement("section");
const waktu = document.getElementById("waktu");

async function fetchData() {
  const res = await fetch("/src/json/data.json");
  data = await res.json();
  keys = Object.keys(data);
  return data;
}

function loadQuestion() {
  const key = keys[indexKey];

  if (key === "structure") {
    const questions = data[key];

    if (indexSoalDalam >= questions.length) {
      indexKey++;
      indexSoalDalam = 0;
      loadQuestion();
      return;
    }

    const q = questions[indexSoalDalam];

    contCard.innerHTML = `
      <div class="judul">${key.toUpperCase()}</div>
      <div class="question">
        <p>Question ${indexSoalDalam + 1}: <span>${q.question}</span></p>
      </div>
      <div class="answer">
        <p>A. ${q.options.A}</p>
        <p>B. ${q.options.B}</p>
        <p>C. ${q.options.C}</p>
        <p>D. ${q.options.D}</p>
      </div>
      <div class="btn">
        <button id="back">Back</button>
        <div id="waktu"></div>
        <button id="next">Next</button>
      </div>
    `;
  } else if (key === "reading") {
    const passages = data[key];

    if (indexSoaluar >= passages.length) {
      indexKey++;
      indexSoaluar = 0;
      indexSoalDalam = 0;
      loadQuestion();
      return;
    }

    const passage = passages[indexSoaluar];
    const questions = passage.questions;

    if (indexSoalDalam >= questions.length) {
      indexSoaluar++;
      indexSoalDalam = 0;
      loadQuestion();
      return;
    }

    const q = questions[indexSoalDalam];

    contCard.innerHTML = `
      <div class="judul">${key.toUpperCase()}</div>
      <div class="passage">
        <h3>${passage.passage_title}</h3>
        <p>${passage.passage_text}</p>
      </div>
      <div class="question">
        <p>Question ${indexSoalDalam + 1}: <span>${q.question}</span></p>
      </div>
      <div class="answer">
        <p>A. ${q.options.A}</p>
        <p>B. ${q.options.B}</p>
        <p>C. ${q.options.C}</p>
        <p>D. ${q.options.D}</p>
      </div>
      <div class="btn">
        <button id="back">Back</button>
        <button id="next">Next</button>
      </div>
    `;
  } else if (key === "listening") {
    const dialogs = data[key];

    if (indexSoaluar >= dialogs.length) {
      indexKey++;
      indexSoaluar = 0;
      indexSoalDalam = 0;
      loadQuestion();
      return;
    }

    const dialog = dialogs[indexSoaluar];
    const questions = dialog.questions;

    if (indexSoalDalam >= questions.length) {
      indexSoaluar++;
      indexSoalDalam = 0;
      loadQuestion();
      return;
    }

    const q = questions[indexSoalDalam];
    const audio = document.querySelector("audio");
    if (indexSoaluar < 5) {
      contCard.innerHTML = `
        <div class="judul">${key.toUpperCase()}</div>
        <div class="audio">
          <h3>${dialog.dialog_title}</h3>
          <audio controls>
          <source src="${dialog.dialog_script}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="question">
          <p>Question ${indexSoalDalam + 1}: <span>${q.question}</span></p>
        </div>
        <div class="answer">
          <p>A. ${q.options.A}</p>
          <p>B. ${q.options.B}</p>
          <p>C. ${q.options.C}</p>
          <p>D. ${q.options.D}</p>
        </div>
        <div class="btn">
          <button id="back">Back</button>
          <button id="next">Next</button>
        </div>
      `;
    } else {
      contCard.innerHTML = `
        <div class="judul">${key.toUpperCase()}</div>
        <div class="audio">
          <h3>${dialog.monolog_title}</h3>
          <audio controls>
          <source src="${dialog.monolog_script}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="question">
          <p>Question ${indexSoalDalam + 1}: <span>${q.question}</span></p>
        </div>
        <div class="answer">
          <p>A. ${q.options.A}</p>
          <p>B. ${q.options.B}</p>
          <p>C. ${q.options.C}</p>
          <p>D. ${q.options.D}</p>
        </div>
        <div class="btn">
          <button id="back">Back</button>
          <button id="next">Next</button>
        </div>
      `;
    }
  }

  container.innerHTML = "";
  container.appendChild(contCard);

  document.getElementById("next").addEventListener("click", () => {
    indexSoalDalam++;
    loadQuestion();
  });

  document.getElementById("back").addEventListener("click", () => {
    if (indexSoalDalam > 0) {
      indexSoalDalam--;
    } else if (indexSoaluar > 0) {
      indexSoaluar--;
    } else if (indexKey > 0) {
      indexKey--;
      indexSoaluar = 0;
      indexSoalDalam = 0;
    }
    loadQuestion();
  });
}

async function init() {
  await fetchData();
  loadQuestion();
}

init();
