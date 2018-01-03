var score = 0;
var bandNames = ["incubus", "poison", "wu tang clan", "judas priest", "rage against the machine", "system of a down", 
                "red hot chili pepers", "flock of seagals", "limp bizkit", "toadies" ];

var losses = 0;
var wordSelector;
var wordsUsed=[];
var correctGuesses =[];
var displayed = [];
var incorrectGuesses = [];
var guessesRemaining = 0;
var bandName;
var imagePath = "assets/images/";

// start the game
document.onkeyup = function(){
    startGame()
}
function startGame(){
    //reset varables at round level
    correctGuesses = [];
    incorrectGuesses = [];
    if(wordsUsed.length > 9){
        wordsUsed.length = 0;
    }
    // call function to select a band
    var bandName =  selectWord();
    document.querySelector("#wins").innerHTML = "Current Score is: "+ score;
    document.querySelector("#lostGames").innerHTML = "Number of losses is: "+ losses; 
};
    


//function to select a word
function selectWord(){   
    var wordSelector = Math.floor(Math.random() * 10);
    var bandName = bandNames[wordSelector];
    var q = wordsUsed.indexOf(bandName);
    //establish if band has been used before and if so pick another
    if(q===-1){
        wordsUsed.push(bandName);
        gameSetup(bandName);
    } else {
        selectWord() ;
    }
};

//Function to setup display for game
function gameSetup(bandName){  
    displayed.length = 0;
    for( i = 0; i < bandName.length; i++){
        if(bandName[i]===' '){
            displayed.push(' / ');    
        }else {
            displayed.push(' _ ');
        }
    }
    document.querySelector("#wordDisplayed").innerHTML = displayed.join('');
    roundStart(bandName);
};

//starts each specific round of the game after the word has been selected
function roundStart(bandName){
    guessesRemaining = bandName.length;
    document.querySelector("#incorrectGuesses").innerHTML = incorrectGuesses.join(', ');
    document.querySelector("#guessesRemaining").innerHTML = "You Have  " + guessesRemaining + " Guess Remaining";
    document.onkeyup = function(event) { 
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        //check to see if selected letter in in string
        var n=bandName.lastIndexOf(userInput);
        // see if the user is out of guesses
        if (guessesRemaining < 1){
            losses++;
            document.querySelector("#lostGames").innerHTML = "Number of Losses is: " + losses;
            startGame();
        //if guesses remain continue game
        } else {
            //check to see if users letter selection is in the selected band name
            if(n >-1){
                //letter seleted is in the word
                for(i=0; i < n+1; i++) {
                //give position in the array of matching chararter
                    if(userInput === bandName[i]){
                        displayed.splice(i,1,userInput);
                        document.querySelector("#wordDisplayed").innerHTML = displayed.join(' '); 
                    }
                }
                //call function to see if the user has won
                if (checkWin(bandName,displayed)===1){
                    score ++;
                    document.querySelector("#wins").innerHTML = "Current Score is: "+ score;
                    document.querySelector("#correctBand").innerHTML = bandName;
                    document.querySelector('#bandPhoto').src= imagePath + bandNames.indexOf(bandName) + ".jpg";
                    startGame();
                }
            //letter selected is not in the word
            } else {
                incorrectGuesses.push(userInput);
                -- guessesRemaining;
                document.querySelector("#guessesRemaining").innerHTML = "You Have  " + guessesRemaining + " Guess Remaining";
                document.querySelector("#incorrectGuesses").innerHTML = incorrectGuesses.join(', ');
            }
        }
    }
};

function checkWin(bandName,displayed){
    var check = displayed.length;
    var wordScore = 0;
    var a = displayed.indexOf(" / ");
    if(a > -1){
        for(s=1; s< displayed.length; s++){
            if (displayed[s]===" / "){
                wordScore ++;
            }
        }
    }
    for( i = 0; i < displayed.length; i++){
       if ( displayed[i]=== bandName[i]){
            wordScore ++;
        } else {
            wordScore = wordScore;
        }
    }
    if(wordScore === check){
        return 1;
    } else {
        return 2;
    }
};