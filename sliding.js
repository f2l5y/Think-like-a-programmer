
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
                numero.style.backgroundColor = 'lightgreen'
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

// Add click event listeners to tiles
numeri.forEach(numero => {
    numero.addEventListener('click', () => {
        let emptyPos = findEmpty();
        if (!emptyPos) return; // Prevents error if emptyPos is null

        const computedStyle = getComputedStyle(numero);
        const tileRow = parseInt(computedStyle.gridRow);
        const tileCol = parseInt(computedStyle.gridColumn);

        let emptyRow = emptyPos.row;
        let emptyCol = emptyPos.col;

        if (isAdjacent(tileRow, tileCol, emptyRow, emptyCol)) {
            let deltaX = (emptyCol - tileCol) * 100; // 100% per grid cell
            let deltaY = (emptyRow - tileRow) * 100;

            // Apply transform for animation
            numero.style.transform = `translate(${deltaX}%, ${deltaY}%)`;

            // Wait for animation to complete before updating actual position
            
                numero.style.transform = ""; // Reset transform
                numero.style.gridRow = emptyRow;
                numero.style.gridColumn = emptyCol;
            
        }
        checkOrder()
    
    counternumber += 1
    counter.innerHTML = counternumber
});
    });

    let counter = document.querySelector("body > div:last-of-type span")
    let counternumber = parseInt(document.querySelector("body > div:last-of-type span").textContent)



NotrandomizeGrid()


