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
    let roundOutcome;
    if (selected.player == selected.computer) {
        roundOutcome = "draw"
    } else {
        switch (selected.player) {
            case "scissors":
                roundOutcome = selected.computer == "rock" ? "computer": "player"
                break
            case "rock":
                roundOutcome = selected.computer == "scissors" ? "player": "computer"
                break
            case "paper":
                roundOutcome = selected.computer == "rock" ? "player": "computer"
        }
    }
    if (roundOutcome == "draw") {
        console.log(`this round is a draw`)
        console.log(`Score is: player: ${score["player"]}, computer: ${score["computer"]}`)
    } else {
        score[roundOutcome] += 1
        console.log(`${roundOutcome} wins round this round.`)
        console.log(`Score is: player: ${score["player"]}, computer: ${score["computer"]}`)
    }
    console.log("")
}


function playGame() {
    for (let round = 1; round <= 5; round++) {
        let playerMove = playerIn()
        let compMove =  compIn()
        console.log(`round no. : ${round}`)
        console.log(`player: ${playerMove}, computer: ${compMove}`)
        playRound(playerMove, compMove)
    }
    if (score["player"] == score["computer"] ) {
        console.log("The game is a draw!")
    } else {
        let winner = score["player"] < score["computer"] ? "computer": "player"
        console.log(`${winner} won the game!`)
    }
}
// playGame()