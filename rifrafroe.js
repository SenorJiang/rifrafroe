//Create blank board array
var ticTacArr = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
var gameOver = false; //Status for if game is won
var turn = 0; //Tracks which turn it is
const pieceBackground = ["url(images/rifraf.png)","url(images/roe.png)"];
const pieces=["RIFRAF","ROE"];
var depth = 0;
var win = false;

function checkWin(place, piece, dir) {
  var match = false;
  //debugging logs
  console.log("--Checking--");
  console.log("Place: " + place);
  console.log("Piece: " + piece);
  console.log("dir: " + dir[0] + dir[1]);
  depth++;
  console.log("depth: " + depth);

  //Set newPlace as location to check
  var newPlace = [];
  if (
    Number(place[0]) + Number(dir[0]) >= 0 &&
    Number(place[1]) + Number(dir[1]) >= 0 &&
    Number(place[0]) + Number(dir[0]) <= 2 &&
    Number(place[1]) + Number(dir[1]) <= 2
  ) {
    //Update newPlace
    newPlace[0] = Number(place[0]) + Number(dir[0]);
    newPlace[1] = Number(place[1]) + Number(dir[1]);
    console.log("spot checking: " + ticTacArr[newPlace[0]][newPlace[1]]);

    //Check if new spot matches current spot
    if (
      ticTacArr[newPlace[0]][newPlace[1]] == ticTacArr[place[0]][place[1]] &&
      ticTacArr[newPlace[0]][newPlace[1]] == piece
    ) {
      match = true;

      match = checkWin(newPlace, piece, dir);
      console.log("Match: " + match);
      console.log("Depth 2: " + depth);
      if (!match) {
        depth--;
      } else if (depth >= 3) {
        console.log("Match returned");
        return match;
      }
    } else {
      match = false;
      depth--;
      return match;
    }
  } else {
    //if cannot search past this point
    match = true;
    console.log("Edge Match: " + match);
  }
  return match;
}

function takeTurn(place) {
  console.log("---------------------");
  document.getElementById(place).style.backgroundImage = pieceBackground[turn%2];
  document.getElementById(place).style.backgroundSize = "contain";

  ticTacArr[place[0]][place[1]] = pieces[turn%2];

  if (!win) {
    win = checkWin([place[0], 0], pieces[turn % 2], [0, 1]); //Search Row
  }
  console.log("Row WIN: " + win);
  if (!win) {
    win = checkWin([0, place[1]], pieces[turn % 2], [1, 0]); //Search Cols
  }
  console.log("Col WIN: " + win);
  if (!win) {
    win = checkWin([0, 0], pieces[turn % 2], [1, 1]); //Search Down-Right
  }
  console.log("Diag-Down-Right WIN: " + win);
  if (!win) {
    win = checkWin([2, 0], pieces[turn % 2], [-1, 1]); //Search Down-left
  }
  console.log("Diag-Down-left WIN: " + win);

  if (win) {
    document.getElementById("winner").innerHTML = "WINNER: " + pieces[turn % 2];
    var inputArray = document.getElementsByClassName("gameButton");
    for (i = 0; i < inputArray.length; i++) {
      inputArray[i].disabled = true;
    }
  } else if (turn == 8) {
    document.getElementById("winner").innerHTML = "DRAW";
  }
  document.getElementById(place).disabled = true;
  turn++;
  return;
}

function resetBoard() {
  turn = 0;
  win=false;
  ticTacArr = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
  var inputArray = document.getElementsByClassName("gameButton");
  for (i = 0; i < inputArray.length; i++) {
    inputArray[i].disabled = false;
    inputArray[i].style.backgroundImage="none";
  }
  document.getElementById("winner").innerHTML = "";
}