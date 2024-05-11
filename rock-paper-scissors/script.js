// data
let score = { player: 0, computer: 0 };
const choices = ["scissors", "rock", "paper"];
let roundNo = 0;

// dom elements
const roundNoElem = document.querySelector("#round");
const pScore = document.querySelector("#score #player");
const cScore = document.querySelector("#score #computer");
const cMove = document.querySelector("#comp-move");
const curOut = document.querySelector("#current-outcome");

function something() {}

function compIn() {
    let index = Math.floor(Math.random() * 3);
    cMove.textContent = capitalize(choices[index]);
    return choices[index];
}

function updateCounts() {
    pScore.textContent = score["player"];
    cScore.textContent = score["computer"];
    roundNoElem.textContent = roundNo;
}

function reset() {
    score["player"] = 0;
    score["computer"] = 0;
    roundNo = 0;
}

function capitalize(i) {
    return i.substring(0, 1).toLocaleUpperCase() + i.substring(1);
}

function playRound(playerSelection, compSelection) {
    let selected = { player: playerSelection, computer: compSelection };
    let roundOutcome;
    if (selected.player == selected.computer) {
        roundOutcome = "draw";
    } else {
        switch (selected.player) {
            case "scissors":
                roundOutcome =
                    selected.computer == "rock" ? "computer" : "player";
                break;
            case "rock":
                roundOutcome =
                    selected.computer == "scissors" ? "player" : "computer";
                break;
            case "paper":
                roundOutcome =
                    selected.computer == "rock" ? "player" : "computer";
        }
    }
    if (roundOutcome == "draw") {
        curOut.textContent = "This round is a draw";
    } else {
        score[roundOutcome] += 1;
        curOut.textContent = `${capitalize(roundOutcome)} wins this round.`;
    }
    roundNo += 1;
    for (let i in score) {
        if (score[i] == 5) {
            curOut.textContent = `${capitalize(i)} wins the game.`;
            reset();
            break;
        }
    }
    updateCounts();
}

let inputs = document.querySelectorAll(".input");
inputs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        playRound(e.target.textContent.toLowerCase(), compIn());
    });
});

