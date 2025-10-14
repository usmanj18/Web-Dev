let para = document.querySelector("h3");
let inputBox = document.querySelector("input");
let btn = document.querySelector("button");
let timerDisplay = document.querySelector("#time");
let resDisplay = document.querySelector("#result");

let string = [
    "The quick brown fox jumps over the lazy dog",
    "Jinxed wizards pluck ivy from the big quilt",
    "How quickly daft jumping zebras vex",
    "Glow worms waggle with nimble, tiny feet",
    "Pack my box with five dozen liquor jugs"
];

let seconds = 0;
let timer = null;
let started = false;

document.addEventListener("keypress", (event) => {
    if (!started) {
        start();
        started = true;
    }
});

function start() {
    clearInterval(timer);
    seconds = 0;
    timerDisplay.innerText = "Time: 0s";
    resDisplay.innerText = "Result: Pending...";

    let index = Math.floor(Math.random() * string.length);
    let phrase = string[index];
    para.innerText = phrase;

    inputBox.value = "";
    inputBox.focus();

    timer = setInterval(() => {
        seconds++;
        timerDisplay.innerText = `Time: ${seconds}s`;
    }, 1000);

    inputBox.addEventListener("keypress", handleEnter);
    btn.addEventListener("click", handleReset);
}

function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        evaluation();
    }
}

function handleReset() {
    clearInterval(timer);
    seconds = 0;
    started = false;
    para.innerText = "Press any Key to Start";
    timerDisplay.innerText = "Time: 0s";
    inputBox.value = "";
    resDisplay.innerText = "Result: Pending...";
    inputBox.removeEventListener("keypress", handleEnter);
}

function evaluation() {
    clearInterval(timer);
    timerDisplay.innerText = `Completed in ${seconds}s`;

    let target = para.innerText.trim().toLowerCase();
    let achive = inputBox.value.trim().toLowerCase();

    if (achive == target) {
        resDisplay.innerText = "Successful";
    } else {
        resDisplay.innerText = "Unsuccessful";
    }

    inputBox.value = "";
    inputBox.removeEventListener("keypress", handleEnter);
}
