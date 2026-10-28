const mainMenu = document.getElementById("mainMenu");
const gameArea = document.getElementById("gameArea");

const pvpBtn = document.getElementById("pvpBtn");
const aiBtn = document.getElementById("aiBtn");
const twoVsTwoBtn = document.getElementById("twoVsTwoBtn");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");


/* =========================
   GAME SETTINGS
   ========================= */

const WIDTH = 800;
const HEIGHT = 450;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const SPEED = 5;
const AI_SPEED = 6;

const SIZE = 35;

const WIN_SCORE = 5;


/* =========================
   GAME VARIABLES
   ========================= */

let gameMode = "";

let gameRunning = false;

let gameOver = false;

let blueScore = 0;

let redScore = 0;


/* =========================
   PLAYERS
   ========================= */

const blue1 = {
    x: 70,
    y: 100,
    color: "blue"
};


const blue2 = {
    x: 70,
    y: 300,
    color: "#45a3ff"
};


const red1 = {
    x: 695,
    y: 100,
    color: "red"
};


const red2 = {
    x: 695,
    y: 300,
    color: "#ff7777"
};


/* =========================
   BASE
   ========================= */

const base = {

    x: WIDTH / 2 - 50,

    y: HEIGHT / 2 - 25,

    width: 100,

    height: 50

};


/* =========================
   MOVE BASE
   ========================= */

function moveBase() {

    const margin = 30;


    base.x =
        Math.random() *
        (WIDTH - base.width - margin * 2)
        + margin;


    base.y =
        Math.random() *
        (HEIGHT - base.height - margin * 2)
        + margin;

}


/* =========================
   KEYBOARD
   ========================= */

const keys = {};


document.addEventListener(
    "keydown",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


/* =========================
   MOVE PLAYER
   ========================= */

function movePlayer(
    player,
    up,
    down,
    left,
    right
) {

    if (keys[up]) {

        player.y -= SPEED;

    }


    if (keys[down]) {

        player.y += SPEED;

    }


    if (keys[left]) {

        player.x -= SPEED;

    }


    if (keys[right]) {

        player.x += SPEED;

    }


    /* KEEP INSIDE CANVAS */

    if (player.x < 0) {

        player.x = 0;

    }


    if (player.y < 0) {

        player.y = 0;

    }


    if (player.x > WIDTH - SIZE) {

        player.x =
            WIDTH - SIZE;

    }


    if (player.y > HEIGHT - SIZE) {

        player.y =
            HEIGHT - SIZE;

    }

}


/* =========================
   COLLISION
   ========================= */

function touching(
    player,
    object
) {

    return (

        player.x <
        object.x + object.width

        &&

        player.x + SIZE >
        object.x

        &&

        player.y <
        object.y + object.height

        &&

        player.y + SIZE >
        object.y

    );

}


/* =========================
   RESET PLAYERS
   ========================= */

function resetPositions() {

    /* BLUE */

    blue1.x = 70;
    blue1.y = 100;


    blue2.x = 70;
    blue2.y = 300;


    /* RED */

    red1.x = 695;
    red1.y = 100;


    red2.x = 695;
    red2.y = 300;

}


/* =========================
   CAPTURE BASE
   ========================= */

function checkCapture() {


    /* =====================
       BLUE PLAYER 1
       ===================== */

    if (
        touching(
            blue1,
            base
        )
    ) {

        blueScore++;


        message.textContent =
            "BLUE captured the base! Score: "
            + blueScore;


        if (
            blueScore >= WIN_SCORE
        ) {

            gameOver = true;


            message.textContent =
                "BLUE WINS!";


            return;

        }


        resetPositions();

        moveBase();

        return;

    }


    /* =====================
       BLUE PLAYER 2
       ===================== */

    if (
        gameMode === "2v2"
        &&
        touching(
            blue2,
            base
        )
    ) {

        blueScore++;


        message.textContent =
            "BLUE TEAM captured the base! Score: "
            + blueScore;


        if (
            blueScore >= WIN_SCORE
        ) {

            gameOver = true;


            message.textContent =
                "BLUE TEAM WINS!";


            return;

        }


        resetPositions();

        moveBase();

        return;

    }


    /* =====================
       RED PLAYER 1
       ===================== */

    if (
        touching(
            red1,
            base
        )
    ) {

        redScore++;


        message.textContent =
            "RED captured the base! Score: "
            + redScore;


        if (
            redScore >= WIN_SCORE
        ) {

            gameOver = true;


            message.textContent =
                "RED WINS!";


            return;

        }


        resetPositions();

        moveBase();

        return;

    }


    /* =====================
       RED PLAYER 2
       ===================== */

    if (
        gameMode === "2v2"
        &&
        touching(
            red2,
            base
        )
    ) {

        redScore++;


        message.textContent =
            "RED TEAM captured the base! Score: "
            + redScore;


        if (
            redScore >= WIN_SCORE
        ) {

            gameOver = true;


            message.textContent =
                "RED TEAM WINS!";


            return;

        }


        resetPositions();

        moveBase();

        return;

    }

}


/* =========================
   DRAW PLAYER
   ========================= */

function drawPlayer(player) {

    ctx.fillStyle =
        player.color;


    ctx.fillRect(

        player.x,

        player.y,

        SIZE,

        SIZE

    );


    /* HIGHLIGHT */

    ctx.fillStyle =
        "white";


    ctx.fillRect(

        player.x + 7,

        player.y + 7,

        8,

        8

    );

}


/* =========================
   DRAW GAME
   ========================= */

function draw() {


    /* CLEAR */

    ctx.clearRect(

        0,

        0,

        WIDTH,

        HEIGHT

    );


    /* =====================
       FIELD
       ===================== */

    ctx.fillStyle =
        "#2e8b57";


    ctx.fillRect(

        0,

        0,

        WIDTH,

        HEIGHT

    );


    /* =====================
       CENTER LINE
       ===================== */

    ctx.strokeStyle =
        "white";


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.moveTo(

        WIDTH / 2,

        0

    );


    ctx.lineTo(

        WIDTH / 2,

        HEIGHT

    );


    ctx.stroke();


    /* =====================
       BASE
       ===================== */

    ctx.fillStyle =
        "limegreen";


    ctx.fillRect(

        base.x,

        base.y,

        base.width,

        base.height

    );


    /* BASE TEXT */

    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 16px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(

        "BASE",

        base.x +
        base.width / 2,

        base.y + 31

    );


    /* =====================
       PLAYERS
       ===================== */

    drawPlayer(blue1);

    drawPlayer(red1);


    if (
        gameMode === "2v2"
    ) {

        drawPlayer(blue2);

        drawPlayer(red2);

    }


    /* =====================
       SCORE
       ===================== */

    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 20px Arial";


    /* BLUE SCORE */

    ctx.textAlign =
        "left";


    ctx.fillText(

        "BLUE: " +
        blueScore,

        20,

        30

    );


    /* RED SCORE */

    ctx.textAlign =
        "right";


    ctx.fillText(

        "RED: " +
        redScore,

        WIDTH - 20,

        30

    );

}


/* =========================
   FAST AI
   ========================= */

function moveAI() {


    /* MOVE HORIZONTALLY */

    if (
        red1.x < base.x
    ) {

        red1.x +=
            AI_SPEED;

    }


    if (
        red1.x > base.x
    ) {

        red1.x -=
            AI_SPEED;

    }


    /* MOVE VERTICALLY */

    if (
        red1.y < base.y
    ) {

        red1.y +=
            AI_SPEED;

    }


    if (
        red1.y > base.y
    ) {

        red1.y -=
            AI_SPEED;

    }


    /* KEEP AI INSIDE FIELD */

    if (
        red1.x < 0
    ) {

        red1.x = 0;

    }


    if (
        red1.y < 0
    ) {

        red1.y = 0;

    }


    if (
        red1.x >
        WIDTH - SIZE
    ) {

        red1.x =
            WIDTH - SIZE;

    }


    if (
        red1.y >
        HEIGHT - SIZE
    ) {

        red1.y =
            HEIGHT - SIZE;

    }

}


/* =========================
   START GAME
   ========================= */

function startGame(mode) {

    gameMode =
        mode;


    mainMenu.style.display =
        "none";


    gameArea.style.display =
        "flex";


    gameRunning =
        true;


    gameOver =
        false;


    blueScore =
        0;


    redScore =
        0;


    resetPositions();


    /* START BASE AT CENTER */

    base.x =
        WIDTH / 2 -
        base.width / 2;


    base.y =
        HEIGHT / 2 -
        base.height / 2;


    message.textContent =
        "Capture the green base!";


    gameLoop();

}


/* =========================
   GAME LOOP
   ========================= */

function gameLoop() {

    if (
        !gameRunning
    ) {

        return;

    }


    if (
        !gameOver
    ) {


        /* =====================
           BLUE PLAYER 1
           W A S D
           ===================== */

        movePlayer(

            blue1,

            "w",

            "s",

            "a",

            "d"

        );


        /* =====================
           PLAYER VS PLAYER
           RED PLAYER 1
           ARROW KEYS
           ===================== */

        if (
            gameMode === "pvp"
        ) {

            movePlayer(

                red1,

                "arrowup",

                "arrowdown",

                "arrowleft",

                "arrowright"

            );

        }


        /* =====================
           PLAYER VS AI
           ===================== */

        if (
            gameMode === "ai"
        ) {

            moveAI();

        }


        /* =====================
           2 VS 2
           ===================== */

        if (
            gameMode === "2v2"
        ) {


            /* BLUE PLAYER 2
               I J K L */

            movePlayer(

                blue2,

                "i",

                "k",

                "j",

                "l"

            );


            /* RED PLAYER 1
               ARROW KEYS */

            movePlayer(

                red1,

                "arrowup",

                "arrowdown",

                "arrowleft",

                "arrowright"

            );


            /* RED PLAYER 2
               8 5 4 6 */

            movePlayer(

                red2,

                "8",

                "5",

                "4",

                "6"

            );

        }


        /* =====================
           CHECK CAPTURE
           ===================== */

        checkCapture();

    }


    /* DRAW */

    draw();


    /* NEXT FRAME */

    requestAnimationFrame(
        gameLoop
    );

}


/* =========================
   MENU BUTTONS
   ========================= */

pvpBtn.addEventListener(

    "click",

    function() {

        startGame("pvp");

    }

);


aiBtn.addEventListener(

    "click",

    function() {

        startGame("ai");

    }

);


twoVsTwoBtn.addEventListener(

    "click",

    function() {

        startGame("2v2");

    }

);


/* =========================
   RESTART
   ========================= */

restartBtn.addEventListener(

    "click",

    function() {

        blueScore = 0;

        redScore = 0;

        gameOver = false;


        resetPositions();


        /* RESET BASE TO CENTER */

        base.x =
            WIDTH / 2 -
            base.width / 2;


        base.y =
            HEIGHT / 2 -
            base.height / 2;


        message.textContent =
            "Game restarted!";

    }

);


/* =========================
   BACK TO MENU
   ========================= */

backBtn.addEventListener(

    "click",

    function() {

        gameRunning =
            false;


        gameArea.style.display =
            "none";


        mainMenu.style.display =
            "flex";

    }

);


/* =========================
   INITIAL SCREEN
   ========================= */

mainMenu.style.display =
    "flex";


gameArea.style.display =
    "none";