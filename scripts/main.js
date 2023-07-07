/* eslint-disable prefer-const */
/* eslint-disable no-undef */
//diceNum'/ player selects number of dice to roll using input range  diceNumRoll
// display number of dice to roll, between 2 and 9
const diceNumRoll = document.getElementById('diceNumRoll');
const diceNum = document.getElementById('diceNum');
let rolledDice;
diceNumRoll.addEventListener('input', () => {
  const diceNumRollValue = diceNumRoll.value;
  diceNum.textContent = diceNumRollValue;
});
// player clicks button to roll dice
// it takes value of diceNumRoll and rolls that many dice. storing results.
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

const rollBtn = document.getElementById('rollBtn');

function diceRoll(numRolls) {
  //let diceNumRollValue = diceNumRoll.value; in row below change numRolls from the value to left
  // eslint-disable-next-line prefer-const
  let dieResult = [];
  for (let i = 0; numRolls > i; i++) {
    dieResult.push(rollDie());
  }

  return dieResult;
}

// show results of roll
const resultDisplay = document.getElementById('resultDisplay');
const sortedDiceEm = document.getElementById('sortedDice');
const outcome = document.getElementById('outcome');
// Sort the array based on the number of occurrences
function diceSort(arr) {
  let countMap = new Map();

  // Count the occurrences of each number in the array
  for (const num of arr) {
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

  let maxCount = 0;
  for (let value of Object.values(counter)) {
    if (value > maxCount) {
      maxCount = value;
    }
  }
  switch (maxCount) {
    case 2:
      return 'Basic Success. Care to roll again?';
    case 3:
      return 'Critical Success. Care to roll again?';
    case 4:
      return 'Extreme Success!';
    case 5:
      return 'Impossible Success!';
    default:
      if (maxCount > 5) {
        return 'Jackpot! You are driving the scene!';
      }
      return 'Failure! Bummer :(';
  }
}

//need to grab biggest value of array then based on value print result.
// scratch that.
//need to see if at least one count in the array is greater than 2, then declaere the result.
//otherwise declare failure.

rollBtn.addEventListener('click', () => {
  rolledDice = diceRoll(diceNumRoll.value);
  resultDisplay.textContent = rolledDice;

  let sortedDice = diceSort(rolledDice);
  sortedDiceEm.textContent = sortedDice;

  let outcomeArr = outcomeFun(rolledDice);
  outcome.textContent = outcomeArr;

  if (outcomeArr === 'Failure! Bummer :(') {
    reRollBtn.disabled = true; // Disable the button if the outcome is 'Failure! Bummer :('
  } else {
    reRollBtn.disabled = false; // Enable the button for other outcomes
  }
  // outcome.textContent = passFail;
});
// option to reroll lesser matches if there is at least one match. otherwise declare failure.
const reRollBtn = document.getElementById('reRollBtn');
const allInBtn = document.getElementById('allInBtn');

reRollBtn.addEventListener('click', () => {
  // Find the maximum count of occurrences
  let counter = {};
  for (let element of rolledDice.flat()) {
    counter[element] = (counter[element] || 0) + 1;
  }
  let maxCount = Math.max(...Object.values(counter));

  // Allow the user to choose which numbers to keep from the rolledDice
  let numbersToKeep = prompt(
    `Choose the numbers to keep from the following: ${rolledDice
      .flat()
      .join(', ')}`
  );
  if (numbersToKeep === null) {
    // User canceled the reroll, do not proceed
    return;
  }

  numbersToKeep = numbersToKeep
    .split(',')
    .map((num) => parseInt(num.trim(), 10));

  // Filter the rolledDice array to keep the selected numbers
  let selectedNumbers = rolledDice
    .flat()
    .filter((num) => numbersToKeep.includes(num));

  // Roll the remaining numbers in the rolledDice array
  let diceNumRollValue = rolledDice.flat().length - selectedNumbers.length;
  let newNotMax = diceRoll(diceNumRollValue);

  // Combine selectedNumbers and newNotMax arrays into reRolledDice
  reRolledDice = selectedNumbers.concat(newNotMax);

  // Evaluate if the reRolledDice provides a greater max value than rolledDice
  // Find the maximum count of occurrences in reRolledDice
  let reRolledCounter = {};
  for (const element of reRolledDice) {
    reRolledCounter[element] = (reRolledCounter[element] || 0) + 1;
  }
  let reRolledMaxCount = Math.max(...Object.values(reRolledCounter));

  // Compare the max counts of rolledDice and reRolledDice
  if (reRolledMaxCount <= maxCount) {
    // Subtract one success level
    switch (maxCount) {
      case 2:
        outcome.textContent = 'Failure! Better Luck Next Time.';
        break;
      case 3:
        outcome.textContent = 'Basic Success. Care to roll again?';
        break;
      case 4:
        outcome.textContent = 'Critical Success. Care to roll again?';
        break;
      case 5:
        outcome.textContent = 'Extreme Success!';
        break;
      case 6:
        outcome.textContent = 'Impossible Success!';
        break;
      default:
        break;
    }
  } else {
    // Update the outcome based on reRolledDice
    outcome.textContent = outcomeFun(reRolledDice);
  }
  // Update the resultDisplay, sortedDiceEm, and outcome
  resultDisplay.textContent = reRolledDice;
  sortedDiceEm.textContent = diceSort(reRolledDice);
  // Disable the reRollBtn after roll
  reRollBtn.disabled = true;
  // Enable/disable the allInBtn based on the outcome
  if (reRolledMaxCount === 2) {
    allInBtn.disabled = true;
  } else {
    allInBtn.disabled = false;
  }
});
// if reroll results in additional match, declare greater success, or lose one success match
// i havent coded in the lose one match yet.
// option to go all in, declare failure if no new match
allInBtn.addEventListener('click', () => {
  //  results in additional match, declare greater success, or lose one success match
  let reRolledcounter = {};
  for (let element of rolledDice.flat()) {
    reRolledcounter[element] = (reRolledcounter[element] || 0) + 1;
  }
  let reRolledMaxCount = Math.max(...Object.values(reRolledcounter));

  // Allow the user to choose which numbers to keep from the rolledDice
  let numbersToKeep = prompt(
    `Choose the numbers to keep from the following: ${reRolledDice
      .flat()
      .join(', ')}`
  );
  if (numbersToKeep === null) {
    // User canceled the reroll, do not proceed
    return;
  }

  numbersToKeep = numbersToKeep
    .split(',')
    .map((num) => parseInt(num.trim(), 10));

  // Filter the rolledDice array to keep the selected numbers
  let selectedNumbers = reRolledDice
    .flat()
    .filter((num) => numbersToKeep.includes(num));

  // Roll the remaining numbers in the rolledDice array
  let diceNumRollValue = reRolledDice.flat().length - selectedNumbers.length;
  let newNotMax = diceRoll(diceNumRollValue);

  // Combine selectedNumbers and newNotMax arrays into reRolledDice
  let allInDice = selectedNumbers.concat(newNotMax);

  // Evaluate if the reRolledDice provides a greater max value than rolledDice
  // Find the maximum count of occurrences in reRolledDice
  let allInCounter = {};
  for (const element of reRolledDice) {
    allInCounter[element] = (allInCounter[element] || 0) + 1;
  }
  let allInMaxCount = Math.max(...Object.values(allInCounter));
  if (allInMaxCount === reRolledMaxCount) {
    outcome.textContent = 'Failure! Better Luck Next Time.';
  } else {
    // Update the outcome based on reRolledDice
    outcome.textContent = outcomeFun(allInDice);
  }
  // Update the resultDisplay, sortedDiceEm, and outcome
  resultDisplay.textContent = allInDice;
  sortedDiceEm.textContent = diceSort(allInDice);
  // Disable the reRollBtn after roll
  reRollBtn.disabled = true;
  allInBtn.disabled = true;
});

// reset state or restart game
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  //resets buttons to original state
  allInBtn.disabled = true;
  reRollBtn.disabled = true;
  // remove text
  resultDisplay.textContent = '';
  sortedDiceEm.textContent = '';
  outcome.textContent = '';
  // add line break to keep same spacing
  const br = document.createElement('br');
  resultDisplay.appendChild(br.cloneNode());
  sortedDiceEm.appendChild(br.cloneNode());
  outcome.appendChild(br.cloneNode());
});
//
//
