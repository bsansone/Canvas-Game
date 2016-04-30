//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  
//  Base game code modeled off of :
//  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
//
//  New Game designed by Brandon Sansone
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 
// gameCanvas
//
var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 600;
c.height = 500;
document.getElementById("gameCanvas").appendChild(c);

// 
// progressBarCanvas
//
var c2 = document.createElement("canvas");
var ctx2 = c2.getContext("2d");
c2.width = 600;
c2.height = 10;
var width = 600;
var height = 10;
var val = 0;
var max = 20;
document.getElementById("progressBarCanvas").appendChild(c2);

//
// progressBarBackground
//
ctx2.fillStyle = '#bfbfbf';
ctx2.clearRect(0, 0, c2.width, c2.height);
ctx2.fillRect(0, 0, width, height);

//
// gameCanvasBackground
//
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    backgroundReady = true;
};
backgroundImage.src = "imgs/background.png";

//
// cookieMonster img
//
var cookieMonsterReady = false;
var cookieMonsterImage = new Image();
cookieMonsterImage.onload = function () {
    cookieMonsterReady = true;
};
cookieMonsterImage.src = "imgs/cookieMonsterIcon.png";

//
// cookie img
//
var cookieReady = false;
var cookieImage = new Image();
cookieImage.onload = function () {
    cookieReady = true;
};
cookieImage.src = "imgs/cookie.png";

//
// carrot img
//
var carrotReady = false;
var carrotImage = new Image();
carrotImage.onload = function () {
    carrotReady = true;
};
carrotImage.src = "imgs/carrot.png";

//
// broccoli img
//
var broccoliReady = false;
var broccoliImage = new Image();
broccoliImage.onload = function () {
    broccoliReady = true;
};
broccoliImage.src = "imgs/broccoli.png";

//
// objects
//
var cookieMonster = {
    speed: 250, // movement in pixels per second
    x: 0,
    y: 0
};
var cookie = {
    x: 0,
    y: 0
};
var carrot = {
    x: 0,
    y: 0
};
var broccoli = {
    x: 0,
    y: 0
};
var cookiesEaten = 0;

//
// keyboard controls
//
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//
// reset game when cookie or vegetable is eaten
//
var reset = function () {
    // cookie monster gets put in center of screen
    cookieMonster.x = c.width / 2;
    cookieMonster.y = c.height / 2;

    // Put cookie somewhere randomly on canvas
    cookie.x = 32 + (Math.random() * (c.width - 64));
    cookie.y = 32 + (Math.random() * (c.height - 64));
    // Put carrot somewhere randomly on canvas
    carrot.x = 32 + (Math.random() * (c.width - 64));
    carrot.y = 32 + (Math.random() * (c.height - 64));
    // Put broccoli somewhere randomly on canvas
    broccoli.x = 32 + (Math.random() * (c.width - 64));
    broccoli.y = 32 + (Math.random() * (c.height - 64));
};

//
// update objects
//
var update = function (modifier) {
    if (38 in keysDown) { // pressing 'up' key
        cookieMonster.y -= cookieMonster.speed * modifier;
    }
    if (40 in keysDown) { // pressing 'down' key
        cookieMonster.y += cookieMonster.speed * modifier;
    }
    if (37 in keysDown) { // pressing 'left' key
        cookieMonster.x -= cookieMonster.speed * modifier;
    }
    if (39 in keysDown) { // pressing 'right' key
        cookieMonster.x += cookieMonster.speed * modifier;
    }

    //
    // vegetable eaten!
    //
    if (
        cookieMonster.x <= (carrot.x + 32) && carrot.x <= (cookieMonster.x + 32) && cookieMonster.y <= (carrot.y + 32) && carrot.y <= (cookieMonster.y + 32)
    ) {
        val--;
        cookiesEaten--;
        reset();
    }
    if (
        cookieMonster.x <= (broccoli.x + 32) && broccoli.x <= (cookieMonster.x + 32) && cookieMonster.y <= (broccoli.y + 32) && broccoli.y <= (cookieMonster.y + 32)
    ) {
        val--;
        cookiesEaten--;
        reset();
    }
    //
    // cookie eaten!
    //
    if (
        cookieMonster.x <= (cookie.x + 32) && cookie.x <= (cookieMonster.x + 32) && cookieMonster.y <= (cookie.y + 32) && cookie.y <= (cookieMonster.y + 32)
    ) {
        ++val;
        ++cookiesEaten;
        if (cookiesEaten < 20) {
            reset();
        } else {
            document.getElementById("gameCanvas").style.display = "none";
            document.getElementById("progress-title").innerHTML = "Completed!";
        }
    }
};

//
// draw objects
//
var render = function () {
    if (backgroundReady) {
        ctx.drawImage(backgroundImage, 0, 0);
    }
    if (cookieMonsterReady) {
        ctx.drawImage(cookieMonsterImage, cookieMonster.x, cookieMonster.y);
    }
    if (cookieReady) {
        ctx.drawImage(cookieImage, cookie.x, cookie.y);
    }
    if (carrotReady) {
        ctx.drawImage(carrotImage, carrot.x, carrot.y);
    }
    if (broccoliReady) {
        ctx.drawImage(broccoliImage, broccoli.x, broccoli.y);
    }

    //
    // canvas score
    //
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Cookies Eaten: " + cookiesEaten, 32, 32);

    //
    // progressBarFill
    //
    ctx2.fillStyle = '#1b5cd6';
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    ctx2.fillRect(0, 0, fillVal * width, height);
};

//
// main
//
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    //
    // request to do this again
    //
    requestAnimationFrame(main);
};

// cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// play the game
var then = Date.now();
reset();
main();