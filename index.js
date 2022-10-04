const sizes = [5, 7, 10]
const select = document.getElementById("select")
const start = document.getElementById("start")
sizes.map(elem => {
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
// // =============================================================================================================

function createMatrix(s) {
    return new Array(s).fill(0).map(() => new Array(s).fill(0));
}
// // ================================================================================================================

function getMatrixSize() {
    let val = parseInt(select.options[select.selectedIndex].text)
    return createMatrix(val)
}
// // ====================================================================================================================

function getRandomCells(masiv) {
    const x = Math.floor(Math.random() * (masiv.length))
    const y = Math.floor(Math.random() * (masiv.length))
    console.log(x,y,"hji")
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
      return  findEmptyCell(masiv)
    }
}

// ======================================================================================================================

function addFigure(masiv, figure, count) {
    for (let i = 0; i < count; i++) {
        let emptyCell = findEmptyCell(masiv)
        const [x,y] = emptyCell
        masiv[x][y] = figure
    }
    

    return masiv
}

//    ==============================================================================================================
function getCharactersCount(size, percent) {
    const matrixSize = size
    const count = Math.round(matrixSize * percent / 100)
    return count
}
// ==========================================================================================================

function addAllFigures() {
    const addWolfes = (addFigure(getMatrixSize(), WOLF_CELL, getCharactersCount(getMatrixSize().length, 60)))
    const addRabbit = (addFigure(addWolfes, RABBIT_CELL, 1))
    const addBand = (addFigure(addRabbit, BAND_CELL, getCharactersCount(getMatrixSize().length, 42)))
    const addHome = (addFigure(addBand, HOME_CELL, 1))
    return addWolfes
}

// ==================================================================================================================================================
const matrix = addAllFigures()
document.onkeydown=function(e){
    if(e.key==="ArrowRight"){
        console.log(moveRabbitRight(matrix))
    }
    if(e.key==="ArrowLeft"){
        console.log(moveRabbitLeft(matrix))
    }
    if(e.key==="ArrowUp"){
        console.log(moveRabbitUp(matrix))
    }

}

// ==============================================================================================================

function findCell(masiv,cell){
    const X=masiv.findIndex(elem=>elem.includes(cell))
    const Y=masiv.find(elem=>elem.includes(cell)).findIndex(el=>el===cell)
    return [X,Y]
    
}
// =============================================================================================================
function checkEmptyCells(masiv,cell){
    const x=cell[0]
    const y=cell[1]
    let possibleCells={
        r:0,
        l:0,
        u:0,
        d:0

    }
      if( y!==masiv.length-1 ){
        if(masiv[x][y+1]!==BAND_CELL){
            possibleCells.r=1
        }
    }
    else{
        if(masiv[x][y-y]!==BAND_CELL){
            possibleCells.r=1
            
        }
        
    }
    if(y!==0){
     if(masiv[x][y-1]!==BAND_CELL){
        possibleCells.l=1
    }
}
else{
    if(masiv[x][y+masiv.length-1]!==BAND_CELL){
        possibleCells.l=1
}
}
if(x!==0){
    if(masiv[x-1][y]!==BAND_CELL){
        possibleCells.u=1
    }
}
else{
    if(masiv[x+(masiv.length-1)][y]!==BAND_CELL){
        possibleCells.u=1
    }
}
if(x!==masiv.length-1){
    if(masiv[x+1][y]!==BAND_CELL){
        possibleCells.d=1
    }
}
else{
    if(masiv[x-x][y]!==BAND_CELL){
        possibleCells.d=1
    }
}
    return possibleCells
}

// ===============================================================================================

function moveRabbitRight(masiv){
const oldCoord= findCell(masiv,RABBIT_CELL)
const x=oldCoord[0]
const y=oldCoord[1]
const possibleCell=checkEmptyCells(addAllFigures() ,findCell(addAllFigures(),RABBIT_CELL))
console.log(possibleCell)
if(possibleCell.r===1){
   if(y!==masiv.length-1){
    if([x][y+1]===WOLF_CELL){
        console.log("Game over")
   }
   else if(masiv[x][y+1]===HOME_CELL){
    console.log("You WON")
   }
   else{
    masiv[x][y+1]=RABBIT_CELL
    masiv[x][y]=EMPTY_CELL
   }
    
}
else{
    if(masiv[x][y-y]===WOLF_CELL){
        console.log("Game over")
   }
   else if(masiv[x][y-y]===HOME_CELL){
      console.log("you WON")
   }
   else{
    masiv[x][y-y]=RABBIT_CELL
    masiv[x][y]=EMPTY_CELL
   }
}
}
else{
    return masiv
}
return masiv

}
// ==========================================================================================================

// function moveRabbitLeft(masiv){
//     const oldCoord= findCell(masiv,RABBIT_CELL)
//     const x=oldCoord[0]
//     const y=oldCoord[1]
//     const possibleCell=checkEmptyCells(addAllFigures() ,findCell(addAllFigures(),RABBIT_CELL))
//     console.log(possibleCell)
//     if(possibleCell.l===1){
//         if(y!==0){
//          if([x][y-1]===WOLF_CELL){
//              console.log("Game over")
//         }
//         else if(masiv[x][y-1]===HOME_CELL){
//          console.log("You WON")
//         }
//         else{
//          masiv[x][y-1]=RABBIT_CELL
//          masiv[x][y]=EMPTY_CELL
//         }
         
//      }
//      else{
//          if(masiv[x][y+(masiv.length-1)]===WOLF_CELL){
//              console.log("Game over")
//         }
//         else if(masiv[x][y+(masiv.length-1)]===HOME_CELL){
//            console.log("you WON")
//         }
//         else{
//          masiv[x][y+(masiv.length-1)]=RABBIT_CELL
//          masiv[x][y]=EMPTY_CELL
//         }
//      }
//      }
//      else{
//         return masiv
//      }
//      return masiv
    

// }
// ==================================================================================================================
//               
// ======================================================================================================================

function startTheGAme() {
    
    console.log(matrix)
    console.log(checkEmptyCells(matrix,findCell(matrix,RABBIT_CELL)))
    
}
// =======================================================================================================================

start.addEventListener('click', () => {
    startTheGAme()
    
})


 
 