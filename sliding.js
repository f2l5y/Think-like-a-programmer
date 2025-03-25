
//global variable scope for the quadrants within the grid
const numeri = document.querySelectorAll("div>div")


//generate random number
function randomNum (){
    return (Math.floor(Math.random()*5)+1).toString()
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
for(let numero of numeri){
    let testo = randomNum().toString()
    testo = checkarr(testo,arrdiv)
    arrdiv.push(testo)
    numero.textContent = testo
}


//the position of the div children needs to be randomized
function randomizeGrid(){
    const items = document.querySelectorAll("div > div")
    const occupied = new Set()

    items.forEach(item=>{
        let positionAssigned = false;
        
        while(!positionAssigned){
            const randomColumn = Math.floor(Math.random() * 3) + 1;
            const randomRow = Math.floor(Math.random() * 2) + 1;
            const gridPosition = `${randomRow}-${randomColumn}`;
            if (!occupied.has(gridPosition)) {
                item.style.gridColumn = randomColumn;
                item.style.gridRow = randomRow;
                occupied.add(gridPosition);
                positionAssigned = true;
            }}
    })
}


//create a constant loop that checks which grid quadrant is empty
function findEmpty() {
    let allPositions = new Set(["1-1", "1-2", "1-3", "2-1", "2-2", "2-3"]);
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
    });
});




randomizeGrid()


