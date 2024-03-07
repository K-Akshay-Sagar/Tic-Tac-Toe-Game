let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let count = 0;
let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}


const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = (count) => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(count >= 9) {
            msg.innerText = "Game was Drawn";
        }

        setTimeout( () => {
            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                if(pos1Val === pos2Val && pos2Val === pos3Val){
                    showWinner(pos1Val);
                }
            }
        }, 500);
    }
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.style.color = "#247691";
            turnO = false;
        }else {
            box.innerText = "X";
            box.style.color = "#b73105";
            turnO = true;
        }
        count++;
        box.disabled = true;
        checkWinner(count);
    });
})


resetGameBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);
