
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
    numero.addEventListener('click',()=>(numero.classList.add("slider")))
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
function findEmpty(){
    
    //array of all possible position
    let occupied = new Set()
    let defaultocc = new Set(['1 - 1', '1 - 2', '1 - 3', '2 - 1', '2 - 2', '2 - 3'])

    numeri.forEach(numero => {
        const computedStyle = getComputedStyle(numero);
        const gridRow = parseInt(computedStyle.gridRow)
        const gridColumn = parseInt(computedStyle.gridColumn)
        occupied.add(`${gridRow} - ${gridColumn}`)
    
    });

    
    defaultocc.forEach(item => {
        if(!occupied.has(item)){
            console.log(item)
        }
    })

    
    
}

randomizeGrid()
findEmpty()

