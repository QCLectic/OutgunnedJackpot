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
  let dieResult= [];
  for (let i = 0; diceNumRollValue > i; i++) {
    dieResult.push(rollDie());
  }
  return dieResult;
}

rollBtn.addEventListener("click", function () {
  console.log(diceRoll());
});
// show results of roll
// organize by number of matches, declare level of success or faiulre
// basic, critical, extreme, impossible, jackpot! =2,3,4,5,6 matches
// option to reroll lesser matches if there is at least one match. otherwise declare failure.
// if reroll results in additional match, declare greater success, or lose one success match
// option to go all in, declare failure if no new match
// reset state or restart game
//
//
//
