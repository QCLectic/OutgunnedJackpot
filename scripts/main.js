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
    const reel= rollDie();
    let reelResult= reel;
    document.getElementById("rollResult").innerHTML= '<p>'+ reelResult +'</p>';
});

function rollDiceButton(){
    return 
};