'use strict';

//Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

//Global variables
let activePlayer = 0;
let currentScore = 0;
let score0 = 0;
let score1 = 0;

//Start conditions
const startGame = function () {
  updateScore(score0Element, 0);
  updateScore(score1Element, 0);
  updateScore(currentScore0Element, 0);
  updateScore(currentScore1Element, 0);
  diceElement.classList.add('hidden');
  activePlayer = 0;

  //restart game
  playerElement1.classList.remove('player--active');
  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--winner');
  playerElement0.classList.remove('player--winner');
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

const switchPlayer = function () {
  activePlayer = !activePlayer;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

const updateScore = function (element, value) {
  element.textContent = value;
};

const resetCurrentScoreActivePlayer = function () {
  currentScore = 0;
  if (!activePlayer) updateScore(currentScore0Element, currentScore);
  else updateScore(currentScore1Element, currentScore);
};

const isPalyerWinTheGame = function () {
  return !activePlayer ? score0 >= 100 : score1 >= 100;
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceElement.classList.remove('hidden');
  diceElement.src = `images/dice-${dice}.png`;

  //3. Check for rolled 1: if true, switch to next player
  if (dice === 1) {
    resetCurrentScoreActivePlayer();
    switchPlayer();
  } else {
    currentScore += dice;

    if (!activePlayer) {
      updateScore(currentScore0Element, currentScore);
    } else {
      updateScore(currentScore1Element, currentScore);
    }
  }
});

//User holds score
btnHold.addEventListener('click', function () {
  if (!activePlayer) {
    score0 += currentScore;
    updateScore(score0Element, score0);
    resetCurrentScoreActivePlayer();
  } else {
    score1 += currentScore;
    updateScore(score1Element, score1);
    resetCurrentScoreActivePlayer();
  }

  if (!isPalyerWinTheGame()) {
    switchPlayer();
  } else {
    btnRoll.disabled = true;
    btnHold.disabled = true;
    !activePlayer
      ? playerElement0.classList.add('player--winner')
      : playerElement1.classList.add('player--winner');
  }
});

//newGame
btnNew.addEventListener('click', startGame);

startGame();
