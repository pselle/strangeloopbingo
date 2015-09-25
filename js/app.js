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
  , board = document.querySelector('#bingoBoard')
  , selectedSquares = makeArray(5, function () { return makeArray(5, function () { return false }) })

selectedSquares[2][2] = 'free'

for(var i=0; i < squares.length; i++) {
  var row, col
  squares[i].textContent = shuffledChoices[i]
  squares[i].setAttribute('data-row', row = Math.floor(i / 5))
  squares[i].setAttribute('data-col', col = i % 5)
  if (selectedSquares[row][col])
    squares[i].classList.add('selected')
  squares[i].onclick = onclick
}

squares[12].textContent = "FREE SQUARE"

// Select
function onclick(e) {
  var square = e.target
    , row = parseInt(square.getAttribute('data-row'))
    , col = parseInt(square.getAttribute('data-col'))
    , selected = selectedSquares[row][col]

  if (selected === 'free')
    return console.log('You cant de-select the free square!')

  selectedSquares[row][col] = !selected
  square.classList[selected ? 'remove' : 'add']('selected')

  checkWin(selectedSquares)
}

// See if we've won given a selectedSquares 2d array
function checkWin(ss) {
  var rows = ss
    , cols = transpose(ss)
    , diags = [diag(rows), oppdiag(cols)]
    , checks  = rows.concat(cols).concat(diags)
    , win = any(checks, function(check) { return all(check, identity) })

  board.classList[win ? 'add' : 'remove']('win')
}

function identity(x) { return x }
function any(arr, fn) {
  for (var i = 0, n = arr.length; i < n; i++) {
    if (fn(arr[i]))
      return true
  }
  return false
}

function all(arr, fn) {
  return !any(arr, function (v) { return !fn(v) })
}

// matrix transpose
function transpose(m) {
  return m.map(function (_,i) {
    return m.map(function (_,j) {
      return m[j][i]
    })
  })
}

// matrix diagnol
function diag(m) {
  return m.map(function (_,i) { return m[i][i] })
}
// matrix opposing diagnol
function oppdiag(m) {
  return m.map(function (_,i) { return m[i][4-i] })
}

function makeArray(n, fn) {
  return Array.apply(null, {length: n}).map(fn)
}