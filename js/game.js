// global variables
let canvas;
let ctx;
let WIDTH = 600;
let HEIGHT = 400;

// get user input from keyboard
let keysDown = {};
let keysUp = {};

let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

const levelChars = {
    ".": "empty",
    "#": Square,
}

function buildLevel(plan, width){
    // setup arrays to hold information from gameplan
    let newRow = [];
    let newGrid = [];

    for (i of plan){
        if (i != "\n"){
            newRow.push(i);
        }
        if (newRow.lenght % width == 0 && newRow.lenght != 0){
            console.log(newRow.lenght);
            newGrid.push(newRow);
            newRow = [];
            console.log(newGrid);
        }
    }
    console.log(newRow);
    return newGrid;
}

buildLevel(gamePlan, 22);

addEventListener("keydown", function (event){
    keysDown[event.key] = true;
    console.log("key down is " + keysDown[event.key]);
    console.log(keysDown);
}, false);

addEventListener("keyup", function (event){
    // keysUp[event.key] = true;
    delete keysDown[event.key];
    console.log(keysDown);
    console.log(keysUp);
}, false);

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

class Square {
    constructor(id, x, y, speed, w, h, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        }
        create(x, y, speed, w, h, color){
            return new Square(x, y, speed, w, h, color);
        }

        update(){
            if (this.x >= WIDTH-this.w || this.x < 0){
                // console.log("I fell off the side!!!!")
                this.speed = -this.speed;
            }
            this.x += this.speed;
            // this.y += Math.random()*5*this.speed;
            // console.log(this.x);
        };
        draw(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        };
    }

class Player extends Square {
    constructor(id, x, y, speed, w, h, color, hitpoints){
        super(id, x, y, speed, w, h, color);
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
        }
        update(){
            if ('w' in keysDown){
                this.y -= this.speed;
            }
            if ('a' in keysDown){
                this.x -= this.speed;
            }
            if ('s' in keysDown){
                this.y += this.speed;
            }
            if ('d' in keysDown){
                this.x += this.speed;
            }
            
            // this.y += Math.random()*5*this.speed;
            // console.log(this.x);
        };
    }

    function readLevel() {
        /* 
        Create array to hold starting actors or elements on the screen
        */
        let startActors = [];
        /* read game plan - the 'i' below will be the 'y' value */
        for (i of gamePlan) {
            console.log(i + " will be the y value...");
            /* checks to see if we hit a newline;
            if not, set variable 'type' to the current level character
            in hte object we created called levelChars
            */
            if (i != "\n") {
                let type = levelChars[i];
                /* if level type is a 'string', not a class
                push it into start actors as is
                
                */
                if (typeof type == "string") {
                    startActors.push(type);
                    console.log('string found');
                }
                /* if it is not a string, it will be a class
                as we've written it; if it is a class, push a 
                newly created object into the startActors, 
                with all necessary arguments or values.
                In this case, x,y,w,h,color
                
                */
                else {
                    i = new type;
                    startActors.push(i.create(10, 20, 30, 40, 'red'))
                }
            }
        }
        console.log(startActors);
    }
    

// instantiations...
let player1 = new Player("Me", WIDTH/2, HEIGHT/2, 1, 40, 40, 'rgb(100, 100, 100)', 100);
let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

let allSprites = [oneSquare, twoSquare, threeSquare, player1];


function update(){
    for (i of allSprites){
        // console.log(i);
        i.update();
    }

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites){
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}