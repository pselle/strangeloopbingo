var choices = [
  "monad",
  "asynchrony/synchrony (noun form)",
  "non-deterministic",
  "references a library or theorem as if everyone knows it already",
  "atomicity",
  "immutable",
  "state",
  "distributed systems",
  "CAP",
  "first order logic",
  "theorem",
  "type theory",
  "category theory",
  "Brownian motion",
  "abstraction",
  "Dedalus",
  "scheduler",
  "parsing",
  "algorithm",
  "lambda calculus",
  "formal proof",
  "scaling",
  "formulas",
  "isomorphic",
  "hypotheses",
]

// From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Cheat to win ...
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var shuffledChoices = shuffle(choices)

var squares = document.querySelectorAll('#bingoBoard td')

for(var i=0; i < squares.length; i++) {
  squares[i].textContent = shuffledChoices[i]
}

squares[12].textContent = "FREE SQUARE"