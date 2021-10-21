
// global variables go at the top
// similar to in C except uses the word "let"
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let newLetters = ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"];
let player1score = 0;
let player2score = 0;

/*
Decryption guideline
1. Make a new array in which the message will be decrypted to
2. Make a new function that associates the newLetters with Letters instead of POINTS
3. Make another new function similar to computeScore but instead for decryption of strings (computeNeww)
4. Return the decrypted message
*/

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
function islower(str) {
  return str === str.toLowerCase();
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// return Letters with new letters that are decrypted
function getWord(letter){
  let index = Letters.indexOf(letter);
  return newLetters[index];
}


// can you in JS perform an islower/isupper and strlen?
function computeScore(word){
  // sets score to 0 and goes through each character in the word
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        // Takes one letter, states the score based on point array, and adds to make final score
        console.log("letter is " + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());
        console.log("final score here " + score);
    }
    return score;
}

// new function that is similar to computescore but for strings
function computeNeww(word){
  // instead of setting score to 0 like in computeScore, set score to "" for strings instead of integers
  let neww = "";
  for (i = 0, n = word.length; i < n; i++){
    console.log("letter is " + (word[i]));
    console.log("letter score is " + getWord(word[i].toLowerCase()));
    neww += getWord(word[i].toLowerCase());
    console.log("final score here " + neww);
  }
  return neww;
}

 

// uses "hello" to process through the function which computes or gets the score of the word
computeScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
  }

  // alerts of the value or score
 function encrypt(){
    let score = computeScore(getInputValue())
    // alert("You scored " + computeScore(getInputValue()));
    output("The encrypted message is " + score + " points.");
  }

  // results the decripted message
  function decrypt(){
    let neww = computeNeww(getInputValue())
    output("the decrypted message is " + neww);
  }

  // failing function due to inability to access element on page and alter it dynamically
  function output(content){
    document.getElementById("display").innerHTML = content;
  }

