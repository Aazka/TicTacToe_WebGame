let box=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGame=document.querySelector("#new-game");
let message=document.querySelector("#message");
let msgContainer=document.querySelector(".msg-container");
let turnPlayer=true;
const winPatterns=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let playerTurn=[];
let avalible_AI_Chance=[];
box.forEach((grid, index)=>{
    grid.addEventListener("click",()=>{
        if(turnPlayer)
        {
            console.log(index);// i want to save the index of selected btn so that next time ai ignore that btn
            playerTurn.push(index);
            grid.textContent="O";
            turnPlayer=false;
            grid.disabled=true;
            AI_Turn();
            CheckWin();
            if(DrawCheck())
            {
                ShowMessage("It's a draw!");
                DisableAll();
                turnPlayer=false;
            }
        }
    });
});

const AI_Turn=()=>{
    avalible_AI_Chance.length=0;
    for(let i=0; i<box.length; i++)
    {
        if(!playerTurn.includes(i)&&box[i].textContent=="")
        {
            avalible_AI_Chance.push(i);
        }
    }
    if(avalible_AI_Chance.length==0)
    {
        // Handle tie game or end game logic
        return;
    }
    var randomIndex=avalible_AI_Chance[Math.floor(Math.random()*avalible_AI_Chance.length)];
    box[randomIndex].textContent="X";
    box[randomIndex].disabled=true;
    //EnableAll();
    turnPlayer=true;
}
const CheckWin=()=>{
    for(let pattern of winPatterns)
    {
        let pos1=box[pattern[0]].innerText;
        let pos2=box[pattern[1]].innerText;
        let pos3=box[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!="")
        {
            if(pos1==pos2 && pos2==pos3)
            {
                //alert(pos1+" wins!");
                if(pos1=="X")
                    ShowMessage("AI wins!");
                else
                    ShowMessage("You wins!");
                DisableAll();
                turnPlayer=false;
            }   
        }
    }
};
const DrawCheck=()=>{
    for(let cell of box)    {
        if(cell.textContent=="")
        {            
            return false; // There is still an empty cell, so it's not a draw
        }   
    }   
    return true; // All cells are filled, so it's a draw
}
const ShowMessage=(winner)=>{
    message.textContent=`${winner}`;
    msgContainer.classList.remove("hide");
}

const ResetGame=()=>{
    box.forEach((cell)=>{
            cell.textContent="";
            cell.disabled=false;
        }); 
        msgContainer.classList.add("hide");
        turnPlayer=true;
        playerTurn.length=0;
}
const DisableAll=()=>{
    box.forEach((cell)=>{
        cell.disabled=true;
    })
}
resetBtn.addEventListener("click",ResetGame);
newGame.addEventListener("click",ResetGame);