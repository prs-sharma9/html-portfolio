
// Assigning numbers to each block
// 1 : Green
// 2 : Red
// 3 : Blue
// 4 : Yellow

let level = 0;
let sequence = [];
let clickIdx = 0;
let btnList = [$("#green"), $("#red"), $("#blue"), $("#yellow")]
let audioList = [new Audio("./sounds/green.mp3"), 
                new Audio("./sounds/red.mp3"),
                new Audio("./sounds/blue.mp3"),
                new Audio("./sounds/yellow.mp3")];

const btnIdxMapping = new Map();
btnIdxMapping.set("green", 0);
btnIdxMapping.set("red", 1);
btnIdxMapping.set("blue", 2);
btnIdxMapping.set("yellow", 3);
            
let title = $("#level-title")
let wrongAudio = new Audio("./sounds/wrong.mp3");



function addKeyListener() {
    $(document).on("keypress", restartGame);
}

function restartGame() {
    console.log("restartGame");
    level = 0;
    clickIdx = 0;
    sequence = [];
    $(document).off("keypress");
    levelUp();
}

function gameOver() {
    console.log("gameOver");
    title.text("Game Over, Press Any Key to Restart !!");
    addKeyListener();
    btnList.forEach((btn) => btn.off("click"));
    $("body").addClass("game-over");
    wrongAudio.play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

function selectButton(idx) {
    btnList[idx].addClass("pressed");
    audioList[idx].play();
    setTimeout(() => {
        btnList[idx].removeClass("pressed");
    }, 200);
}


function btnClickListener(event) {
    console.log("btnClickListener: " + event.target);
    let classStr = $(event.target).attr("class").split(" ")[1];
    let idx = btnIdxMapping.get(classStr);
    console.log("clicked: "+ idx);
    if(sequence[clickIdx] != idx) {
        gameOver();
        return;
    }
    selectButton(idx);
    clickIdx++;
    if(clickIdx == sequence.length) {
        setTimeout(levelUp, 500);
    }
}

function levelUp() {
    level++;
    console.log("levelUp: " + level);
    clickIdx = 0;
    title.text("Level "+level);
    let idx = Math.floor((Math.random()*4));
    sequence.push(idx);
    console.log(sequence);
    selectButton(idx);
    if(level === 1) {
        btnList.forEach((btn) => btn.on("click", btnClickListener));
    }
}

addKeyListener();
