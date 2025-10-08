let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let score = 0;

let h3 = document.querySelector("h3");
let colors = ["red", "yellow", "green", "blue"];

          //Starting Game
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

       //Changing Level
function levelUp() {
    userSeq = [];                                                          //Resets the User Values.
    level++;
    h3.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);                         //Generate a Random Number
    let randomColor = colors[randomIdx];                                   //Save the color at index of Random Number.
    let randomBtn = document.querySelector(`.${randomColor}`);             //Store the Color in a variable.

    gameSeq.push(randomColor);                                              //Add Colors to Array.
    console.log(gameSeq);
    btnFlash(randomBtn);                                                    //Pass color as Argument
}

      //Flashing Button 1st Time
function btnFlash(btn) {
    btn.classList.add("flash");                                             //Give flash class to btn (white color).

    setTimeout(function () {            
        btn.classList.remove("flash");                                      //Remove the white color after 250 ms.
    }, 100);
}

      //Detecting the Mouse Click
let allBtn = document.querySelectorAll(".box");                             //Storing all buttons in allBtn
for (btn of allBtn) {
    btn.addEventListener("click", mouseClick);                              //Call mouseClick function when clicked.
}

      //Applying Flash functionality
function mouseClick() {
    console.log(`You Clicked ${this.className}`)
    let btn = this;                                                         //this is button that is pressed
    btnFlash(btn);                                                          //apply Flash effect

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    check(userSeq.length-1);                                                 //Checks last Value.
}

     //Check Answer
function check(idx) {                                                   //Give the last index to idx
    if (gameSeq[idx] == userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {                              //means user entered all colors
            setTimeout (levelUp,500);
        }
    } else {
        let highScore = high();
        h3.innerHTML = `Game Over..!!<br>Your Score is: <b>${level}</b><br>
                        High Score: ${highScore}<br>
                        Press any Key to Start Again.`;
        document.querySelector("body").style.backgroundColor = 'red';           //Screen turn Red on wrong Choice
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor ='white';     //Screen again White after 500ms.
        }, 500);
        reset();
    }
}
     //To Calculate High Score.
function high() {               
    if (level > score) {
        score = level;
    }
    return score;
}
    //To Reset
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}