var slider = document.getElementById("myRange");
var output = document.getElementById("range_output");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
};

const getRandomNumber= (min,max)=> {
    return Math.floor(Math.random() * (max - min + 1))+ min;
};

const rollDie= ()=> getRandomNumber(1,6);

document.getElementById("rollDiceButton").addEventListener("click", function(){
    var numDice= document.getElementById("myRange").value;
    var container=document.getElementById("rollDisplay");
    var results = [];

    container.innerHTML="";

    for (var i= 0; i < numDice; i++){
        let reelResult = rollDie();
        results.push(reelResult);
        container.innerHTML += '<span class="reels">'+ reelResult+ "</span>";
    }
     // Sort the results array by the number of matches
    results.sort(function(a, b) {
        var matchesA = results.filter(num => num === a).length;
        var matchesB = results.filter(num => num === b).length;
        return matchesB - matchesA;
    });

    // Display the final results in the rollMatch div
    var rollMatchDiv = document.getElementById("rollMatch");
    rollMatchDiv.innerHTML = results.map(num => '<span class="reels">' + num + '</span>').join("");
});