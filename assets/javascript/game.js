function startGame(){
    correctGuesses = [];
    incorrectGuesses = [];
    var bandName =  selectWord();
    document.querySelector("#wins").innerHTML = "Current Score is: "+ score;
    document.querySelector("#lostGames").innerHTML = "Number of losses is: "+ losses; 
};
    


//function to select a word
function selectWord(){   
    var wordSelector = Math.floor(Math.random() * 10);
    var bandName = bandNames[wordSelector];
    var q = wordsUsed.indexOf(bandName);
    if(q=-1){
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
    guessesRemaining = bandName.length + 5;
    document.querySelector("#incorrectGuesses").innerHTML = "Previous Wrong Guesses: " + incorrectGuesses.join(', ');
    document.querySelector("#guessesRemaining").innerHTML = "You Have  " + guessesRemaining + " Guess Remaining";
    document.onkeyup = function(event) { 
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        //check to see if selected letter in in string
        var n=bandName.lastIndexOf(userInput);

        if (guessesRemaining < 1){
            losses++;
            document.querySelector("#lostGames").innerHTML = "Number of Losses is: " + losses;
            startGame();
        } else {
            if(n >-1){
                for(i=0; i < n+1; i++) {
                //give position in the array of matching chararter
                    if(userInput === bandName[i]){
                        displayed.splice(i,1,userInput);
                        document.querySelector("#wordDisplayed").innerHTML = displayed.join(' '); 
                    }
                }
                if (checkWin(bandName,displayed)===1){
                    score ++;
                    document.querySelector("#wins").innerHTML = "Current Score is: "+ score;
                    startGame();
                }

            } else{
                incorrectGuesses.push(userInput);
                -- guessesRemaining;
                document.querySelector("#guessesRemaining").innerHTML = "You Have  " + guessesRemaining + " Guess Remaining";
                document.querySelector("#incorrectGuesses").innerHTML = "Previous Wrong Guesses: " + incorrectGuesses.join(', ');
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
        console.log('word score = check');
        return 1;
    } else {
        console.log('word score <> check');
        return 2;
    }
};