/*
humanScore, compScore

playGame()
    loop 5:
        compSelect = compIn(), 
        playerSelect = playerIn()
        playRound(compSelect, playerSelect): decide who wins and return the winner. 
        increment Score acc to winner
    announce game winner
*/

let score = {"player": 0, "computer": 0}
const choices = ["scissors", "rock", "paper"]

function compIn() {
    let index = Math.floor(Math.random()*3)
    return choices[index]
}

function playerIn() {
    let choice = prompt("enter: rock, paper or scissors? ").toLowerCase()
    while (choices.indexOf(choice) === -1) {
        choice = prompt("enter: rock, paper or scissors? ")
    }
    return choice
}

function playRound(playerSelection, compSelection) {
    let selected = {player: playerSelection, computer: compSelection}
    if (selected.player == selected.computer) {
        return "draw"
    } else {
        switch (selected.player) {
            case "scissors":
                return selected.computer == "rock" ? "computer": "player"
            case "rock":
                return selected.computer == "scissors" ? "player": "computer"
            case "paper":
                return selected.computer == "rock" ? "player": "computer"
        }
    }
}


function playGame() {
    for (let round = 1; round <= 5; round++) {
        let playerMove = playerIn()
        let compMove =  compIn()
        let roundOutcome = playRound(playerMove, compMove)
        console.log(`player: ${playerMove}, computer: ${compMove}`)
        if (roundOutcome == "draw") {
            console.log(`round ${round} is a draw`)
        } else {
            score[roundOutcome] += 1
            console.log(`${roundOutcome} wins round ${round}.`)
            console.log(`Score is: player: ${score["player"]}, computer: ${score["computer"]}`)
        }
        console.log("")
    }
    if (score["player"] == score["computer"] ) {
        console.log("The game is a draw!")
    } else {
        let winner = score["player"] < score["computer"] ? "computer": "player"
        console.log(`${winner} won the game!`)
    }
}

let start = document.querySelector('body > div > button')
start.addEventListener("click", playGame)