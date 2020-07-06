// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var nob = 50;

const p = document.querySelector('p');
var count = nob;
p.textContent = "Ball count: " + count;


// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

//Created a constructor for object BALL 
// function Ball(x, y, velX, velY, color, size) {
//     this.x = x;
//     this.y = y;
//     this.velX = velX;
//     this.velY = velY;
//     this.color = color;
//     this.size = size;
// }

// Ball.prototype.draw = function () {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//     ctx.fill();
// }

// Ball.prototype.update = function () {
//     if ((this.x + this.size) >= width) {
//         this.velX = -(this.velX);
//     }

//     if ((this.x - this.size) <= 0) {
//         this.velX = -(this.velX);
//     }

//     if ((this.y + this.size) >= height) {
//         this.velY = -(this.velY);
//     }

//     if ((this.y - this.size) <= 0) {
//         this.velY = -(this.velY);
//     }

//     this.x += this.velX;
//     this.y += this.velY;
// }

// Ball.prototype.collisionDetect = function () {
//     for (let j = 0; j < balls.length; j++) {
//         if (!(this === balls[j])) {
//             const dx = this.x - balls[j].x;
//             const dy = this.y - balls[j].y;
//             const distance = Math.sqrt(dx * dx + dy * dy);

//             if (distance <= this.size + balls[j].size) {
//                 balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
//             }
//         }
//     }
// }

class Shape {
    constructor(x, y, velX, velY, exist) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exist = exist;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, exist, color, size) {

        super(x, y, velX, velY, exist);
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                }
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exist, color, size) {
        super(x, y, velX, velY, exist);
        this.color = color;
        this.size = size;
    }

    draw() {

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y - this.size) <= 0) {
            this.y += this.size;
        }
    }

    setControls() {

        let _this = this;
        window.onkeydown = function (e) {
            if (e.keyCode === 65 || e.keyCode === 37) {
                _this.x -= _this.velX;
            } else if (e.keyCode === 68 || e.keyCode === 39) {
                _this.x += _this.velX;
            } else if (e.keyCode === 87 || e.keyCode === 38) {
                _this.y -= _this.velY;
            } else if (e.keyCode === 83 || e.keyCode === 40) {
                _this.y += _this.velY;
            }
            this.console.log(e.keyCode);
        }
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {

            if (balls[j].exist === 'true') {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= this.size + balls[j].size) {
                    balls[j].exist = 'false';
                    count--;
                    console.log("Number of balls = " + balls.length + " and count = " + count);
                    p.textContent = "Ball count: " + count;

                    if (count === 0) {
                        cancelAnimationFrame(loop);
                        var replay = document.getElementById("alertBox");
                        replay.style.display = "inline-block";
                        var yesbtn = document.getElementById("yes");
                        var nobtn = document.getElementById("no");
                        var btn = false;
                        yesbtn.addEventListener('click', function () {
                            console.log("Yes button clicked");
                            btn = true;
                            replay.style.display = "none";
                            reset();
                            game();
                            loop();
                        })

                        nobtn.addEventListener('click', function () {
                            console.log("No button clicked");
                            if (btn === true) {
                                console.log("Yes button already clicked ! Time to Return");
                            } else {
                                replay.style.display = "none";
                            }
                        })
                    }
                }
            }
        }
    }
}

var balls = [];
var ec;

function reset() {

    balls = [];
    count = nob;
}

function game() {

    let i = 0;
    while (i < nob) {
        let size = random(10, 20);
        let ball = new Ball(
            // ball position always drawn at least one ball width
            // away from the edge of the canvas, to avoid drawing errors
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-10, 10),
            random(-10, 10),
            'true',
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            size
        );

        balls.push(ball);
        i++;
    }

    let size = 15;
    ec = new EvilCircle(
        random(0 + size, width - size),
        random(0 + size, height - size),
        20,
        20,
        'true',
        'white',
        size
    );

    ec.setControls();

}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {

        if (balls[i].exist === 'true') {

            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }

        ec.draw();
        ec.checkBounds();
        ec.collisionDetect();
    }
    requestAnimationFrame(loop);
}

game();
loop();