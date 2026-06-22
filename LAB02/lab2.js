const prompt = require('prompt');

// Start the prompt package
prompt.start();

// Ask the user for their choice
prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.log("An error occurred.");
        return;
    }

    let userSelection = result.userSelection.toUpperCase();
    let computerSelection = "";

    // Generate random computer choice
    let randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber <= 0.34) {
        computerSelection = "PAPER";
    }
    else if (randomNumber >= 0.35 && randomNumber <= 0.67) {
        computerSelection = "SCISSORS";
    }
    else {
        computerSelection = "ROCK";
    }

    // Display selections
    console.log("User Selection: " + userSelection);
    console.log("Computer Selection: " + computerSelection);

    // Determine winner
    if (userSelection === computerSelection) {
        console.log("It's a tie");
    }
    else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        console.log("User Wins");
    }
    else if (
        userSelection === "ROCK" ||
        userSelection === "PAPER" ||
        userSelection === "SCISSORS"
    ) {
        console.log("Computer Wins");
    }
    else {
        console.log("Invalid choice. Please enter ROCK, PAPER, or SCISSORS.");
    }
});
