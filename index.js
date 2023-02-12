const grid = document.querySelector(".grid");
const score = document.querySelector(".score");

const larguraJanela = 1200;
const alturaJanela = 700;

const larguraUser = 180;
const alturaUser = 20;

const larguraBlock = 160;
const alturaBlock = 25;

const ballDimension = 25;

let speed = 7
let xDirection = -speed
let yDirection = -speed


class Bloco {
    constructor(top, left) {
        this.top = top;
        this.left = left;

    }


}

class User extends Bloco {
    constructor(top, left) {
        super(top, left);
        this.bottom = top + alturaUser;
        this.rigth = left + larguraUser;

    }

    atualizarPosicao(xDirection, yDirection) {
        this.top += yDirection;
        this.left += xDirection;
        this.bottom += yDirection;
        this.rigth += xDirection;
    }


}
class Ball extends Bloco {
    constructor(top, left) {
        super(top, left);

        this.bottom = top + ballDimension;
        this.rigth = left + ballDimension;

    }


    atualizarPosicao(xDirection, yDirection) {
        this.top += yDirection;
        this.left += xDirection;
        this.bottom += yDirection;
        this.rigth += xDirection;
    }
}
class Block extends Bloco {
    constructor(top, left) {
        super(top, left);
        this.bottom = top + alturaBlock;
        this.rigth = left + larguraBlock;

    }
}

const newUser = new User(675, 510)
const newBall = new Ball(630, 590)


const blocks = [
    new Block(10, 10),
    new Block(10, 180),
    new Block(10, 350),
    new Block(10, 520),
    new Block(10, 690),
    new Block(10, 860),
    new Block(10, 1030),
    new Block(45, 10),
    new Block(45, 180),
    new Block(45, 350),
    new Block(45, 520),
    new Block(45, 690),
    new Block(45, 860),
    new Block(45, 1030),
    new Block(80, 10),
    new Block(80, 180),
    new Block(80, 350),
    new Block(80, 520),
    new Block(80, 690),
    new Block(80, 860),
    new Block(80, 1030),

]

function criarBlocos(p, index) {
    const block = document.createElement("div")
    block.classList.add("block")
    block.setAttribute("style", `top: ${p.top}px; left: ${p.left}px`)
    block.setAttribute("id", `${index}`)
    grid.appendChild(block)
}

blocks.forEach(criarBlocos)

function gerarUsuario() {
    const block = document.createElement("div")
    block.classList.add("user")
    block.setAttribute("style", `top: ${newUser.top}px; left: ${newUser.left}px`)
    grid.appendChild(block)
}

gerarUsuario()

function moverusuario() {
    const user = document.querySelector(".user");
    user.setAttribute("style", `top: ${newUser.top}px; left: ${newUser.left}px`)
}

document.addEventListener("keydown", handleKey)


function handleKey(dados) {

    switch (dados.key) {
        case "ArrowRight": if (newUser.left < larguraJanela - larguraUser) {
            newUser.atualizarPosicao(15, 0);
            moverusuario();
        } break;

        case "ArrowLeft": if (newUser.left > 0) {
            newUser.atualizarPosicao(-15, 0);
            moverusuario();
        } break;

        default: return;
    }
}

//ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall()
grid.appendChild(ball)

function drawBall() {
    ball.setAttribute("style", `top: ${newBall.top}px; left: ${newBall.left}px`)
}

function moveBall() {

    newBall.atualizarPosicao(xDirection, yDirection)
    drawBall()
    checkColission()
    colissionUser()

    blocks.forEach(colissionBlocks)


}

const timerId = setInterval(moveBall, 30)

function checkColission() {

    if (newBall.left >= larguraJanela - ballDimension) {
        xDirection = -speed
    } else if (newBall.left <= 0) {
        xDirection = speed
    }

    if (newBall.top <= 0) {
        yDirection = speed
    }

    if (newBall.top >= alturaJanela - ballDimension) {
        yDirection = -speed
        clearInterval(timerId);
        document.removeEventListener("keydown", handleKey)
        score.style.display = "block"

    }
}

function colissionUser() {

    if (newBall.bottom - newUser.top >= 0 && newBall.bottom - newUser.top <= speed &&
        newBall.rigth >= newUser.left &&
        newBall.left <= newUser.rigth) {

        yDirection *= -1;

    } else if (
        newBall.rigth - newUser.left >= 0 && newBall.rigth - newUser.left <= speed &&
        newBall.bottom >= newUser.top &&
        newBall.top <= newUser.bottom) {

        xDirection *= -1;
    } else if (
        newBall.left - newUser.rigth >= 0 && newBall.left - newUser.rigth <= speed &&
        newBall.bottom >= newUser.top &&
        newBall.top <= newUser.bottom) {

        xDirection *= -1;
    }
}

function colissionBlocks(blocks, index) {

    let coll = false

    if (newBall.bottom - blocks.top >= 0 && newBall.bottom - blocks.top <= speed &&
        newBall.rigth >= blocks.left &&
        newBall.left <= blocks.rigth) {

        yDirection *= -1;
        coll = true

    } else if (newBall.top - blocks.bottom >= 0 && newBall.top - blocks.bottom <= speed &&
        newBall.rigth >= blocks.left &&
        newBall.left <= blocks.rigth) {

        yDirection *= -1;
        coll = true


    } else if (
        newBall.rigth - blocks.left >= 0 && newBall.rigth - blocks.left <= speed &&
        newBall.bottom >= blocks.top &&
        newBall.top <= blocks.bottom) {

        xDirection *= -1;
        coll = true
    } else if (
        newBall.left - blocks.rigth >= 0 && newBall.left - blocks.rigth <= speed &&
        newBall.bottom >= blocks.top &&
        newBall.top <= blocks.bottom) {

        xDirection *= -1;
        coll = true
    }

    if (coll) {
        let bloco = document.getElementById(`${index}`)
        grid.removeChild(bloco)
        console.log(bloco)
    }

}
