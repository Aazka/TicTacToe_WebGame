let box=document.querySelectorAll(".box");
let rest=document.querySelector("#reset");
let turn0=true;

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
box.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn0){
            box.textContent="X";
            turn0=false;
        }else{
            box.textContent="O";
            turn0=true;
        }
        box.disabled=true;
        checkWin();
    })
});
rest.addEventListener("click", ()=>{
    box.forEach((box)=>{
        box.textContent="";
        box.disabled=false;
    });
    turn0=true;
});

let pos1=0;
let pos2=0;
let pos3=0;
const checkWin=()=>{
    for(let pattern of winPatterns){
        pos1=box[pattern[0]].innerText;
        pos2=box[pattern[1]].innerText;
        pos3=box[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!="")
        {
            if(pos1==pos2 && pos2==pos3){
                alert(pos1+" wins!");
               DisableAll();
        }
        //console.log(pattern[0], pattern[1], pattern[2]); 
        //console.log(box[pattern[0]], box[pattern[1]], box[pattern[2]]);
        }
    }
};
const DisableAll=()=>{
    box.forEach((box)=>{
        box.disabled=true;
    });
}