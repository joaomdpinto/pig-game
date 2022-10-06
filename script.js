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
let currentScore0 = 0;
let currentScore1 = 0;
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
  playerElement1.classList.remove('player--active');
  playerElement0.classList.add('player--active');
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

const switchPlayer = function () {
  activePlayer = !activePlayer;
  if (activePlayer) {
    playerElement0.classList.remove('player--active');
    playerElement1.classList.add('player--active');
  } else {
    playerElement1.classList.remove('player--active');
    playerElement0.classList.add('player--active');
  }
};

const updateScore = function (element, value) {
  element.textContent = value;
};

const resetCurrentScoreActivePlayer = function () {
  if (!activePlayer) {
    currentScore0 = 0;
    updateScore(currentScore0Element, currentScore0);
  } else {
    currentScore1 = 0;
    updateScore(currentScore1Element, currentScore1);
  }
};

const isPalyerWinTheGame = function () {
  if (!activePlayer) {
    return score0 >= 100;
  } else {
    return score1 >= 100;
  }
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
    if (!activePlayer) {
      currentScore0 += dice;
      updateScore(currentScore0Element, currentScore0);
    } else {
      currentScore1 += dice;
      updateScore(currentScore1Element, currentScore1);
    }
  }
});

//User holds score
btnHold.addEventListener('click', function () {
  if (!activePlayer) {
    score0 += currentScore0;
    updateScore(score0Element, score0);
    resetCurrentScoreActivePlayer();
  } else {
    score1 += currentScore1;
    updateScore(score1Element, score1);
    resetCurrentScoreActivePlayer();
  }

  if (!isPalyerWinTheGame()) {
    switchPlayer();
  } else {
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
});

//newGame
btnNew.addEventListener('click', startGame);

startGame();
