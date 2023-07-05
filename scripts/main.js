// player selects number of dice to roll using input range  diceNumRoll
// display number of dice to roll, between 2 and 9
let diceNumRoll = document.getElementById("diceNumRoll");
let diceNum = document.getElementById("diceNum");

diceNumRoll.addEventListener("input", function () {
  let diceNumRollValue = diceNumRoll.value;
  diceNum.textContent = diceNumRollValue;
});
// player clicks button to roll dice
// it takes value of diceNumRoll and rolls that many dice. storing results.
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

let rollBtn = document.getElementById("rollBtn");

function diceRoll() {
  let diceNumRollValue = diceNumRoll.value;
  let dieResult = [];
  for (let i = 0; diceNumRollValue > i; i++) {
    dieResult.push(rollDie());
  }

  return dieResult;
}

// show results of roll
let resultDisplay = document.getElementById("resultDisplay");
let sortedDiceEm = document.getElementById("sortedDice");
let outcome = document.getElementById("outcome");
// Sort the array based on the number of occurrences
function diceSort(arr) {
  let countMap = new Map();

  // Count the occurrences of each number in the array
  for (let num of arr) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // Sort the array based on the count of occurrences
  arr.sort((a, b) => countMap.get(b) - countMap.get(a) || a - b);

  return arr;
}

function outcomeFun(arr) {
  let counter = {};
  for (element of arr.flat()) {
    if (counter[element]) {
      counter[element] += 1;
    } else {
      counter[element] = 1;
    }
  }
  console.log(counter);

  let maxCount = 0;
  for (let value of Object.values(counter)) {
    if (value > maxCount) {
      maxCount = value;
    }
  }
  console.log(maxCount);
  switch (maxCount) {
    case 1:
      return "Failure! Bummer :(";
    case 2:
      return "Basic Success. Care to roll again?";
    case 3:
      return "Critical Success. Care to roll again?";
    case 4:
      return "Extreme Success!";
    case 5:
      return "Impossible Success!";
    case 6:
      return "Jackpot! You are driving the scene!";
    default:
      break;
  }
}

//need to grab biggest value of array then based on value print result.
// scratch that. need to see if at least one count in the array is greater than 2, then declaere the result. otherwise declare failure.

rollBtn.addEventListener("click", function () {
  let rolledDice = diceRoll();
  resultDisplay.textContent = rolledDice;

  let sortedDice = diceSort(rolledDice);
  sortedDiceEm.textContent = sortedDice;

  let outcomeArr = outcomeFun(rolledDice);
  outcome.textContent = outcomeArr;

  if (outcomeArr === "Failure! Bummer :(") {
    reRollBtn.disabled = true; // Disable the button if the outcome is "Failure! Bummer :("
  } else {
    reRollBtn.disabled = false; // Enable the button for other outcomes
  }
  // outcome.textContent = passFail;
});
// option to reroll lesser matches if there is at least one match. otherwise declare failure.
let reRollBtn = document.getElementById("reRollBtn");
let allInBtn= document.getElementById("allInBtn");
reRollBtn.addEventListener("click", function () {
  allInBtn.disabled =false;
});
// if reroll results in additional match, declare greater success, or lose one success match
// option to go all in, declare failure if no new match
// reset state or restart game
let resetBtn= document.getElementById("resetBtn");
resetBtn.addEventListener("click",function(){
  allInBtn.disabled=true;
  reRollBtn.disabled=true;
});
//
//
