const qwerty = document.getElementById("qwerty"); /*---- keyboard ----*/
const phrase = document.getElementById("phrase"); /*---- ul ----*/
const startGame = document.querySelector(".btn__reset"); /*---- “Start Game” ----*/
const overlay = document.getElementById("overlay"); /*---- div containing h2 and “Start Game” ----*/
const visbilePhrase = document.querySelector('#phrase ul'); /*---- Phrase hidden letters ----*/
const show = document.getElementsByClassName('show'); /*---- visible letters ----*/
const letters = document.getElementsByClassName('letter'); /*---- Phrase letters ----*/
const liveHearts = document.querySelectorAll('.tries img'); /*---- liveHeart.png image ----*/
const title = document.querySelector('.title'); /*---- "Wheel of Success" title ----*/
let missed = 0; /*---- Guesses the player has missed ----*/

/*---- Phrases ----*/

phrases = [
          "see the stage",
          "lost puppy",
          "signing autographs",
          "The sports car ",
          "by the brook",
          "favorite pastime",
          
];

/*---- Hide the start screen overlay. ----*/

startGame.addEventListener ( "click", () => {
  overlay.style.display = "none";
});

/*---- Random phrase ---*/

function getRandomPhraseAsArray(arr){
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split("");

}

/*---- Display randomly picked phrase ----*/

function addPhraseToDisplay(arr) {
    for (i = 0; i < arr.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = arr[i];
      visbilePhrase.appendChild(listItem);
      if (arr[i] !== " " ) {
        listItem.className = "letter";
      } else {
        listItem.className = "space";
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


/*---- Check if guess matches letter in phrase ----*/

function checkLetter (guess) {
  let match = null;
  for (i = 0; i < letters.length; i++) {
    if (guess.textContent == letters[i].textContent) {
      letters[i].classList.add("show");
      guess.style.background = '#5ed163';
       match = true;
  }
}
  return match;
}

/*---- event listener to the keyboard ----*/

qwerty.addEventListener( "click", (e) => {
  if(e.target.tagName == 'BUTTON') {
    const clickedLetter = e.target;
    clickedLetter.classList.add("chosen");
    clickedLetter.disabled = 'true';
    const letterFound = checkLetter(clickedLetter);

    if( letterFound === null){
    let currentMissed = missed;
    liveHearts[currentMissed].setAttribute("src", "images/lostHeart.png");
    missed += 1;
    }
  }
  checkWin();
});

/*---- check if player won or if the game is over ----*/

function checkWin() {
      if(show.length === letters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        title.textContent = 'You won!!';
        startGame.textContent = 'Play again';
      }

      else if (missed >= 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        title.textContent = 'You lost!!';
        startGame.textContent = 'Play again';
      }
    }

  window.addEventListener ( "click", (e) => {
      if(e.target.textContent === 'Play again'){
        missed = 0;
        window.location.reload(true);
      }
    });