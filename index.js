const sizes = [5, 7, 10]
const select = document.getElementById("select")
const start = document.getElementById("start")
sizes.map((elem) => {
  const opt = document.createElement("option")
  opt.value = elem
  opt.innerText = elem
  select.append(opt)
})
const EMPTY_CELL = 0
const RABBIT_CELL = 1
const WOLF_CELL = 2
const BAND_CELL = 3
const HOME_CELL = 4

const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
// // =============================================================================================================

const createMatrix=(s)=> {
  return new Array(s).fill(0).map(() => new Array(s).fill(0))
}
// // ================================================================================================================

const getMatrixSize=()=>{
  let val = parseInt(select.options[select.selectedIndex].text)
  return createMatrix(val)
}
// // ====================================================================================================================

const getRandomCells=(masiv)=> {
  const x = Math.floor(Math.random() * masiv.length)
  const y = Math.floor(Math.random() * masiv.length)
  console.log(x, y, "hji")
  return [x, y]
}
//  =======================================================================================

function findEmptyCell(masiv) {
  // const cell = getRandomCells(masiv)
  // const matrix = getMatrixSize()
  // const x = cell[0]
  // const y = cell[1]
  const x = Math.floor(Math.random() * masiv.length)
  const y = Math.floor(Math.random() * masiv.length)
  if (masiv[x][y] === EMPTY_CELL) {
    return [x, y]
  } else {
    return findEmptyCell(masiv)
  }
}
function findCharacterCords(masiv, character) {
  const findInMatrix = function (accumulator, row, x) {
    row.forEach((element, y) => {
      if (element === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return masiv.reduce(findInMatrix, [])
}

// ======================================================================================================================

function addFigure(masiv, figure, count) {
  for (let i = 0; i < count; i++) {
    const [x, y] = findEmptyCell(masiv)
    masiv[x][y] = figure
  }
  return masiv
}

//    ==============================================================================================================
function getCharactersCount(size, percent) {
  return Math.round((size * percent) / 100)
}
// ==========================================================================================================

function addAllFigures() {
  const addWolfes = addFigure(
    getMatrixSize(),
    WOLF_CELL,
    getCharactersCount(getMatrixSize().length, 60)
  )
  const addRabbit = addFigure(addWolfes, RABBIT_CELL, 1)
  const addBand = addFigure(
    addRabbit,
    BAND_CELL,
    getCharactersCount(getMatrixSize().length, 42)
  )
  const addHome = addFigure(addBand, HOME_CELL, 1)
  return addHome
}

// ==================================================================================================================================================

// ==============================================================================================================

function findCell(masiv, cell) {
  const X = masiv.findIndex((elem) => elem.includes(cell))
  const Y = masiv
    .find((elem) => elem.includes(cell))
    .findIndex((el) => el === cell)
  return [X, Y]
}
// =============================================================================================================
// function checkEmptyCells(masiv, cell) {
//   const [x, y] = cell
//   let possibleCells = {
//     r: 0,
//     l: 0,
//     u: 0,
//     d: 0,
//   }
//   if (y !== masiv.length - 1) {
//     if (masiv[x][y + 1] !== BAND_CELL) {
//       possibleCells.r = 1
//     }
//   } else {
//     if (masiv[x][y - y] !== BAND_CELL) {
//       possibleCells.r = 1
//     }
//   }
//   if (y !== 0) {
//     if (masiv[x][y - 1] !== BAND_CELL) {
//       possibleCells.l = 1
//     }
//   } else {
//     if (masiv[x][y + masiv.length - 1] !== BAND_CELL) {
//       possibleCells.l = 1
//     }
//   }
//   if (x !== 0) {
//     if (masiv[x - 1][y] !== BAND_CELL) {
//       possibleCells.u = 1
//     }
//   } else {
//     if (masiv[x + (masiv.length - 1)][y] !== BAND_CELL) {
//       possibleCells.u = 1
//     }
//   }
//   if (x !== masiv.length - 1) {
//     if (masiv[x + 1][y] !== BAND_CELL) {
//       possibleCells.d = 1
//     }
//   } else {
//     if (masiv[x - x][y] !== BAND_CELL) {
//       possibleCells.d = 1
//     }
//   }
//   return possibleCells
// }

function moves(masiv) {
  document.onkeydown = function (e) {
    if (e.key === "ArrowRight") {
      moveRabbit(masiv, RIGHT)
      //   console.log(moveRabbitRight(matrix))
    }
    if (e.key === "ArrowLeft") {
      moveRabbit(masiv, LEFT)
      //   console.log(moveRabbitLeft(matrix))
    }
    if (e.key === "ArrowUp") {
      moveRabbit(masiv, UP)
      //   console.log(moveRabbitUp(matrix))
    }
    if (e.key === "ArrowDown") {
      moveRabbit(masiv, DOWN)
      //   console.log(moveRabbitDown(matrix))
    }
  }
}
// ===============================================================================================

// function moveRabbitRight(masiv) {
//   const [x, y] = findCell(masiv, RABBIT_CELL)

//   const possibleCell = checkEmptyCells(masiv, findCell(masiv, RABBIT_CELL))
//   if (possibleCell.r === 1) {
//     if (y !== masiv.length - 1) {
//       console.log("if1")
//       if (masiv[x][y + 1] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x][y + 1] === HOME_CELL) {
//         console.log("You WIN")
//       } else {
//         masiv[x][y + 1] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     } else {
//       if (masiv[x][y - y] === WOLF_CELL) {
//         console.log(typeof masiv[x][y - y], typeof WOLF_CELL)

//         console.log("Game over")
//       } else if (masiv[x][y - y] === HOME_CELL) {
//         console.log("you WiN")
//       } else {
//         masiv[x][y - y] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     }
//   }
//   return masiv
// }
// // ==========================================================================================================

// function moveRabbitLeft(masiv) {
//   const [x, y] = findCell(masiv, RABBIT_CELL)

//   const possibleCell = checkEmptyCells(
//     addAllFigures(),
//     findCell(addAllFigures(), RABBIT_CELL)
//   )
//   console.log(possibleCell)
//   if (possibleCell.l === 1) {
//     if (y !== 0) {
//       if (masiv[x][y - 1] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x][y - 1] === HOME_CELL) {
//         console.log("You WON")
//       } else {
//         masiv[x][y - 1] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     } else {
//       if (masiv[x][y + (masiv.length - 1)] == WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x][y + (masiv.length - 1)] === HOME_CELL) {
//         console.log("you WON")
//       } else {
//         masiv[x][y + (masiv.length - 1)] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     }
//   }
//   return masiv
// }
// // ==================================================================================================================
// function moveRabbitUp(masiv) {
//   const [x, y] = findCell(masiv, RABBIT_CELL)

//   const possibleCell = checkEmptyCells(masiv, findCell(masiv, RABBIT_CELL))
//   if (possibleCell.u === 1) {
//     if (x !== 0) {
//       if (masiv[x - 1][y] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x - 1][y] === HOME_CELL) {
//         console.log("You WIN")
//       } else {
//         masiv[x - 1][y] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     } else {
//       if (masiv[x + (masiv.length - 1)][y] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x + (masiv.length - 1)][y] === HOME_CELL) {
//         console.log("you WiN")
//       } else {
//         masiv[x + (masiv.length - 1)][y] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     }
//   }
//   return masiv
// }
// // ================================================================================================
// function moveRabbitDown(masiv) {
//   const [x, y] = findCell(masiv, RABBIT_CELL)

//   const possibleCell = checkEmptyCells(masiv, findCell(masiv, RABBIT_CELL))
//   if (possibleCell.d === 1) {
//     if (x !== masiv.length - 1) {
//       if (masiv[x + 1][y] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x + 1][y] === HOME_CELL) {
//         console.log("You WIN")
//       } else {
//         masiv[x + 1][y] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     } else {
//       if (masiv[x - x][y] === WOLF_CELL) {
//         console.log("Game over")
//       } else if (masiv[x - x][y] === HOME_CELL) {
//         console.log("you WiN")
//       } else {
//         masiv[x - x][y] = RABBIT_CELL
//         masiv[x][y] = EMPTY_CELL
//       }
//     }
//   }
//   return masiv
// }
// ======================================================================================================================
// function findWolves(masiv) {
//   const coordsX = []
//   const coordsY = []
//   const wolfCoords = []
//   masiv.forEach((element) => {
//     if (element.includes(WOLF_CELL)) {
//       for (let i = 0; i < element.length; i++) {
//         if (element[i] === WOLF_CELL) {
//           coordsX.push(masiv.indexOf(element))
//           coordsY.push(i)
//         }
//       }
//     }
//   })
//   for (let i = 0; i < coordsX.length; i++) {
//     wolfCoords.push([coordsX[i], coordsY[i]])
//   }
//   return wolfCoords
//   // return coord
// }
const moveRabbit = (masiv, direction) => {
  const rabbitCurrentCoords = findCell(masiv,RABBIT_CELL)
  console.log("rabbit"+ rabbitCurrentCoords)
  const rabbitLegalMoves = legalMoves(rabbitCurrentCoords)
  console.log(rabbitLegalMoves)
  const correctedMoves = correctMoves(rabbitLegalMoves, masiv)
  const rabbitMoveDirection = checkRabbitDirection(
    correctedMoves[direction],
    masiv
  )

  if (rabbitMoveDirection !== undefined) {
    moveCharacterIntoNewCell(
      rabbitCurrentCoords,
      rabbitMoveDirection,
      masiv
    )
  } else {
    // Game over or win
    return
  }
  console.log(masiv, "functionEnd")
}

const moveCharacterIntoNewCell = ([x, y], [j, k], masiv) => {
 masiv[x][y] = EMPTY_CELL
 masiv[j][k] = RABBIT_CELL
  return masiv
}

const checkRabbitDirection = ([x, y], masiv) => {
  if (masiv[x][y] === EMPTY_CELL) {
    return [x, y]
  }
  if (masiv[x][y] === BAND_CELL) {
    console.log("band")
    return
  }
  if (masiv[x][y] === WOLF_CELL) {
    console.log("wolf")
    return
  }
  if (masiv[x][y] === HOME_CELL) {
    console.log("house")
    return
  }
}

const teleport = ([x, y], masiv) => {
  const maxValue = masiv.length
  x = (x + maxValue) % maxValue
  y = (y + maxValue) % maxValue
  return [x, y]
}

const legalMoves = ([x, y]) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
}
const correctMoves = (rabbitLegalMoves,masiv) => {
  return rabbitLegalMoves.map((coord) => teleport(coord, masiv))
}
// =================================================================================================
function moveWolves(masiv) {
  const rabbitCoords =findCharacterCords(masiv, RABBIT_CELL)
  const wolvesCoords = findCharacterCords(masiv,WOLF_CELL)

}

// =====================================================================================================================
function startTheGAme() {
  const matrix = addAllFigures()
  console.log(matrix)
  moves(matrix)
  moveWolves(matrix)
}
// =======================================================================================================================

start.addEventListener("click", () => {
  startTheGAme()
})

// =======================================================================================================================


