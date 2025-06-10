// fetch("/data.json")
//   .then((res) => res.json())
//   .then((data) => {
//     // console.log(data.structure);
//     data.structure.forEach((structure) => {
//       const tex = document.createElement("p");
//       console.log(structure[0]);
//       // tex.textContent = `${structure[0]}`;
//       container.appendChild(tex);
//     });
//   });
const body = document.querySelector("body");
let angka = 0;
let score = 0;

fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector("body");
    const tex = document.createElement("div");
    container.appendChild(tex);

    function renderSoal(index) {
      tex.innerHTML = "";

      const soal = data.structure[index];
      if (!soal) {
        tex.innerHTML = `<p>Quiz selesai!</p><p>Skor akhir kamu: ${score}</p>`;
      }

      const question = document.createElement("p");
      question.textContent = soal.question;
      tex.appendChild(question);

      for (const key in soal.options) {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `soal${index}`;
        radio.value = key;

        label.appendChild(radio);
        label.append(` ${key}. ${soal.options[key]}`);
        tex.appendChild(label);
        tex.appendChild(document.createElement("br"));
      }
    }

    renderSoal(angka);

    const btn = document.createElement("button");
    btn.innerText = "klik";
    body.appendChild(btn);
    btn.addEventListener("click", () => {
      const selected = document.querySelector(
        `input[name="soal${angka}"]:checked`
      );
      if (selected) {
        const jawaban = selected.value;
        const benar = data.structure[angka].answer;
        if (jawaban === benar) {
          score++;
        }
      }

      console.log(score);

      angka++;
      renderSoal(angka);
    });
  });
