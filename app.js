//Telling to read my HTML before it reads JS file, a more fool proof way to ensure order

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;
  let audio = new Audio("fairy.wav");
  let audio1 = new Audio("whoosh.wav");

  const colors = [
    "url(images/brown.png)",
    "url(images/green.png)",
    "url(images/blue.png)",
    "url(images/red.png)",
    "url(images/purple.png)",
    "url(images/yellow.png)",
  ];

  //Here I will create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * colors.length);
      square.style.backgroundImage = colors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  //Here will be code related to being draggable

  let draggedColor;
  let replacedColor;
  let idDragged;
  let idReplaced;

  squares.forEach((i) => i.addEventListener("dragstart", dragStart));
  squares.forEach((i) => i.addEventListener("dragend", dragEnd));
  squares.forEach((i) => i.addEventListener("dragover", dragOver));
  squares.forEach((i) => i.addEventListener("dragenter", dragEnter));
  squares.forEach((i) => i.addEventListener("dragleave", dragLeave));
  squares.forEach((i) => i.addEventListener("drop", dragDrop));

  function dragStart() {
    draggedColor = this.style.backgroundImage;
    idDragged = parseInt(this.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave() {}

  function dragDrop() {
    replacedColor = this.style.backgroundImage;
    idReplaced = parseInt(this.id);
    this.style.backgroundImage = draggedColor;
    squares[idDragged].style.backgroundImage = replacedColor;
  }
  function dragEnd() {
    this.style.backgroundImage = replacedColor;

    //here we define what valid move is

    let validMoves = [
      idDragged - 1,
      idDragged - width,
      idDragged + 1,
      idDragged + width,
    ];

    let validMove = validMoves.includes(idReplaced);

    if (idReplaced && validMove) {
      idReplaced = null;
    } else if (idReplaced && !validMove) {
      squares[idReplaced].style.backgroundImage = replacedColor;
      squares[idDragged].style.backgroundImage = draggedColor;
    } else {
      squares[idDragged].style.backgroundImage = draggedColor;
    }
  }

  //Move candy if cleared

  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundColor === "") {
          let randomColor = Math.floor(Math.random() * colors.length);
          squares[i].style.backgroundImage = colors[randomColor];
        }
      }
    }
  }

  //checking for matches

  function checkThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decideImage = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      // const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      // if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decideImage && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((i) => {
          squares[i].style.backgroundImage = "";
          audio.play();
        });
      }
    }
  }
  checkThree();

  function checkColumn() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decideImage = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decideImage && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((i) => {
          squares[i].style.backgroundImage = "";
          audio.play();
        });
      }
    }
  }
  checkColumn();

  //CHECK FOR 4

  function checkFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decideImage = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      // const notValid = [
      //   5,
      //   6,
      //   7,
      //   13,
      //   14,
      //   15,
      //   21,
      //   22,
      //   23,
      //   29,
      //   30,
      //   31,
      //   37,
      //   38,
      //   39,
      //   45,
      //   46,
      //   47,
      //   53,
      //   54,
      //   55,
      // ];
      // if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decideImage && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((i) => {
          squares[i].style.backgroundImage = "";
          audio1.play();
        });
      }
    }
  }
  checkFour();

  function checkColumnFour() {
    for (i = 0; i < 47; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decideImage = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decideImage && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((i) => {
          squares[i].style.backgroundImage = "";
          audio1.play();
        });
      }
    }
  }
  checkColumnFour();

  window.setInterval(function () {
    moveDown();
    checkFour();
    checkColumnFour();
    checkThree();
    checkColumn();
  }, 100);
});
