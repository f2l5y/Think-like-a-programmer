
//global variable scope for the quadrants within the grid
const numeri = document.querySelectorAll("div>div")


//generate random number
function randomNum (){
    return (Math.floor(Math.random()*8)+1).toString()
}


//recursive function to check if the random number is a duplicate
//if yes, generate another number, else return that number
function checkarr(a,b){
    if(b.includes(a)){
        return checkarr(randomNum(),b)
    }else{
        return a
    }
}


//looping through the divs to assign random numbers.
//also add event listener to make them slide
let arrdiv = []
// for(let numero of numeri){
//     let testo = randomNum().toString()
//     testo = checkarr(testo,arrdiv)
//     arrdiv.push(testo)
//     numero.textContent = testo
// }


//the position of the div children needs to be randomized
// function randomizeGrid(){
//     const items = document.querySelectorAll("div > div")
//     const occupied = new Set()

//     items.forEach(item=>{
//         let positionAssigned = false;
        
//         while(!positionAssigned){
//             const randomColumn = Math.floor(Math.random() * 3) + 1;
//             const randomRow = Math.floor(Math.random() * 3) + 1;
//             const gridPosition = `${randomRow}-${randomColumn}`;
//             if (!occupied.has(gridPosition)) {
//                 item.style.gridColumn = randomColumn;
//                 item.style.gridRow = randomRow;
//                 occupied.add(gridPosition);
//                 positionAssigned = true;
//             }}
//     })
// }

//not randomizedgrid
function NotrandomizeGrid(){
    const items = document.querySelectorAll("div > div")
    const occupied = new Set()

   
        let i=0
           while(i<3){
               const randomRow = i+1;
                   let t=0
                   while(t<3){
                       const randomColumn = t + 1;
                       const gridPosition = `${randomRow}-${randomColumn}`;
                       items.forEach((item,index) =>{
                           if (!occupied.has(gridPosition) && index == ((randomRow-1)*3+randomColumn)-1) {
                               item.style.gridColumn = randomColumn;
                               item.style.gridRow = randomRow;
                              }
                           
                    })
                       t+=1;
                   } i+=1
           }
            
        }
  

function checkOrder(){
    numeri.forEach((numero) =>
        {   let randomColumn = parseInt(getComputedStyle(numero).gridColumn)
            let randomRow = parseInt(getComputedStyle(numero).gridRow)
            if(parseInt(numero.textContent) === (randomRow-1)*3+randomColumn){
                numero.style.backgroundColor = 'rgb(0, 163, 11)'
                numero.style.color = 'white'
                return
            }else{
                numero.style.backgroundColor = 'lightblue'
                numero.style.color = 'blue'

            }
        }
    )

}

//create a constant loop that checks which grid quadrant is empty
function findEmpty() {
    let allPositions = new Set(["1-1", "1-2", "1-3", "2-1", "2-2", "2-3","3-1","3-2","3-3"]);
    let occupied = new Set();

    numeri.forEach(numero => {
        const computedStyle = getComputedStyle(numero);
        const gridRow = parseInt(computedStyle.gridRow);
        const gridColumn = parseInt(computedStyle.gridColumn);

        if (!isNaN(gridRow) && !isNaN(gridColumn)) {
            occupied.add(`${gridRow}-${gridColumn}`);
        }
    });

    // Find the missing (empty) quadrant
    for (let pos of allPositions) {
        if (!occupied.has(pos)) {
            let [row, col] = pos.split('-').map(Number);
            return { row, col };  // Return the empty grid's coordinates
        }
    }

    return null;  // In case there's no empty space (shouldn't happen)
}


// Function to check if two quadrants are adjacent
function isAdjacent(tileRow, tileCol, emptyRow, emptyCol) {
    return (
        (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||  // Left/Right check
        (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1)     // Up/Down check
    );
}


let counterSpan = document.querySelector("body > div:nth-last-of-type(2) span")
let counternumber = parseInt(document.querySelector("body > div:nth-last-of-type(2) span").textContent)
const moveHistory = []; // Array to track tiles' last three positions
const elementHistory = [] //track the element that has been moved
let moveCounter = Number(0);

function trackMoves(previousPosition, newPosition,elementNumber) {

    // If history is empty, initialize the first element
    if (moveHistory.length === 0) {
        moveHistory.push(previousPosition); // Start history with the previous position

    }

    // Get the latest history to compare
    moveHistory.push(newPosition)
    elementHistory.push(elementNumber)
    let history = moveHistory; 
    let history2 = elementHistory;

    if(history2[0] !== history2[1] && history2.length > 1){
        history[0]=previousPosition
        history[1]=newPosition
    }

    // Check if the move is a reversal (new position equals the previous position in the history)
    if (history.length === 3 && history[2] === history[0] && history2[0] == history2[1]) {
        moveCounter--; // Decrement on reversal
        counternumber = moveCounter;
        counterSpan.innerHTML = counternumber.toString(); // Update the counter on the page
        history.pop(); // Remove the last position (reversal move)
        history.pop()

        if(history2.length == 2){
            history2.shift()
        }
      
    } else {
        moveCounter++; // Increment for a new move
        counternumber = moveCounter;
        counterSpan.innerHTML = counternumber.toString(); // Update the counter on the page

        if(history2.length == 2){
            history2.shift()
        }

        // If history has 3 positions, remove the oldest one
        if (history.length === 3) {
            history.unshift(); 
            history.unshift();
        }

    }
}


// Add click event listeners to tiles
    numeri.forEach(numero => {
        numero.addEventListener('click', () => {
            let emptyPos = findEmpty();
            if (!emptyPos) return;
    
            const computedStyle = getComputedStyle(numero);
            const tileRow = parseInt(computedStyle.gridRow);
            const tileCol = parseInt(computedStyle.gridColumn);
    
            let emptyRow = emptyPos.row;
            let emptyCol = emptyPos.col;
    
            if (isAdjacent(tileRow, tileCol, emptyRow, emptyCol)) {
                let deltaX = (emptyCol - tileCol) * 100;
                let deltaY = (emptyRow - tileRow) * 100;
    
                // Move tile using transform
                numero.style.transition = "transform 0.3s ease";
                numero.style.transform = `translate(${deltaX}%, ${deltaY}%)`;
    
                function onTransitionEnd(event) {
                    if (event.propertyName !== "transform") return; // Ensure it's the transform property
    
                    numero.removeEventListener("transitionend", onTransitionEnd);
    
                    // Delay grid update slightly to avoid flicker
                    setTimeout(() => {
                        numero.style.gridRow = emptyRow;
                        numero.style.gridColumn = emptyCol;
                        checkOrder();
    
                        // Remove transform *after* grid position updates
                        numero.style.transition = "none"; // Temporarily remove transition
                        numero.style.transform = ""; // Reset transform
    
                        // Re-enable transition for next moves
                        requestAnimationFrame(() => {
                            numero.style.transition = "transform 0.3s ease";
                        });  trackMoves(`${tileRow}-${tileCol}`, `${emptyRow}-${emptyCol}`,numero.textContent);
                    }, 1); // Small delay ensures it updates in sync
                }
    
                numero.addEventListener("transitionend", onTransitionEnd);
            }
    
          
           
        });
    });
    




NotrandomizeGrid()


