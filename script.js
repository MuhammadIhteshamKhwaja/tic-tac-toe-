const body = document.querySelector("body");



const grid = document.createElement("div");
grid.classList.add("grid");


let playerXturn = true;
let playerOturn = false;

let playerXmoves = [];
let playerOmoves = [];

let gameOver = false;
let preview = false ;

let xWins = 0 ;
let oWins = 0 ;
let draws = 0 ;

const results = document.createElement("div");
results.classList.add("results");
const xResult = document.createElement("p");
const oResult = document.createElement("p");
const drawResults = document.createElement("p");


results.append(xResult , oResult , drawResults);

function updateResults (){
 xResult.textContent = `X wins : ${xWins}`;
 oResult.textContent = `O wins : ${oWins}`;
 drawResults.textContent = `Draws : ${draws}`;

 xResult.style.color = "#00E5FF";
 oResult.style.color = "#FFEB3B";
 drawResults.style.color = "white";

}
updateResults();

body.appendChild(results)
body.appendChild(grid);

const display = document.createElement("p");
display.classList.add("display");
body.appendChild(display);
updateDisplay("X's Turn.");

for(let i = 0 ; i<9 ; i++){
    let box = document.createElement("div");
    box.classList.add("box");
    grid.appendChild(box);

    box.addEventListener("click" , ()=>{

        if(gameOver){
          return;
        }
        if(box.textContent ==="" || preview){
    if(playerXturn){
        box.textContent = "X";
        box.style.color = "#00E5FF";
        playerXmoves.push(i);
        playerXturn = false;
        playerOturn = true;
        updateDisplay("O's Turn.")
        
        

    }
    else{
        box.textContent = "O";
        box.style.color = "#FFEB3B";
        playerOmoves.push(i);
        playerOturn = false;
        playerXturn = true; 
        updateDisplay("X's Turn.");



    }}
    
    preview = false;
    checkWinner();
})



  box.addEventListener("mouseenter", ()=>{
  if(box.textContent===""){  
  box.textContent = playerXturn ?  "X" : "O";
  box.style.color = playerXturn ? "#00E5FF80" : "#FFEB3B80";
  preview = true;
  }
  });



box.addEventListener("mouseleave" , ()=>{
  if(preview){
    box.textContent = "";
    preview = false;
  }
})


}

const box = document.querySelectorAll(".box");

const winningIndexes =   [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]  ];

const checkWinner = ()=>{
 
  
  for(const combo of winningIndexes){
  if(combo.every(i=>playerOmoves.includes(i))){

    display.textContent =  `O won`;
    oWins++;
    display.style.color = "#FFEB3B";
    gameOver = true;
    highlightWinner(combo , "#FFEB3B")
    updateResults();
    return;
  }};
  
  for(const combo of winningIndexes){
    if(combo.every(i=>playerXmoves.includes(i))){
    display.textContent =  `X won`;
    xWins++;
    display.style.color = "#00E5FF"
    gameOver = true;
    highlightWinner(combo , "#00E5FF")
    updateResults();
    return;
    }
  }

 if([...box].every(box=> box.textContent!=="")){
    display.textContent =  `It's a Draw`;
    draws++;
    display.style.color = "white";
    gameOver = true;
    box.forEach(box=>box.style.backgroundColor = "#ffffff44");
    updateResults();
  }

  }

  function highlightWinner(combo , color){
    combo.forEach(index=>{
      box[index].style.backgroundColor = color+"33";
    })
  }




function updateDisplay(text){
  display.innerHTML = `${text}`
  if(playerXturn){
   display.style.color = "#00E5FF"

  }
  else{
    display.style.color = "#FFEB3B"
  }
}
const btnsContainer = document.createElement("div");
const resetBoard = document.createElement("button");
const restartBtn = document.createElement("button");
btnsContainer.classList.add("btns-container");
resetBoard.classList.add("reset-board");
restartBtn.classList.add("restart-btn");
resetBoard.textContent = "Reset Board";
restartBtn.textContent = "Restart Game";
body.appendChild(btnsContainer);
btnsContainer.append(resetBoard , restartBtn);

function resetGame(){
  box.forEach(box=> {
    box.style.backgroundColor = "transparent";
    box.textContent = ""});
  playerXturn = true;
  playerOturn = false;
  playerXmoves = [];
  playerOmoves = [];
  gameOver = false;
  updateDisplay("X's Turn.")
}

resetBoard.addEventListener("click" ,()=>{
  resetGame();
})
restartBtn.addEventListener("click", ()=>{
  resetGame();
  xWins = 0;
  oWins = 0;
  draws = 0;
  updateResults();
})

