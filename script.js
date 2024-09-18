"use strict";

//selecting elements

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // another way of selecting ID
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//starting conditions

let currentScore, activePlayer, scores, playing; //declaring outside bcoz if it declared in initial func it will bcom function scoped
const initial = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true; // state of the game

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

initial();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active"); //it will add class if it not present ..if it is present it will remove the class
  player1El.classList.toggle("player--active");
};
//rolling dice functionlity
btnRoll.addEventListener("click", function () {
  //generating a random dice num
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    //displaying dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for the dice value is 1 or  not
    if (dice !== 1) {
      //add the score to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //adding the score to the current score
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add the current score to the total score
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check whether the score is 100
    if (scores[activePlayer] >= 100) {
      // then finish the game
      playing = false;
      diceEl.classList.add("hidden"); //hiding the dice after a win

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3.if not 100 then switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initial);
