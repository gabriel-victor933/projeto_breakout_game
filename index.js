const grid = document.querySelector(".grid");
const score = document.querySelector(".score");

const larguraJanela = 1200;
const alturaJanela = 700;

const larguraUser = 180;
const alturaUser = 20;

const larguraBlock = 170;
const alturaBlock = 25;

const ballDimension = 25;

let speedUser = 27 + (Math.random() * 5 - 2);

let speedBall = 7 + (Math.random() * 3 - 1)
let xDirection = (Math.random() - 0.5) > 0 ? speedBall : -speedBall;
let yDirection = -speedBall

let contador = 0;




class Bloco {
    constructor(top, left, altura, largura) {
        this.top = top;
        this.left = left;
        this.bottom = top + altura;
        this.rigth = left + largura;

    }

    atualizarPosicao(xDirection, yDirection) {
        this.top += yDirection;
        this.left += xDirection;
        this.bottom += yDirection;
        this.rigth += xDirection;
    }

    setarPosicao(top, left, altura, largura) {
        this.top = top;
        this.left = left;
        this.bottom = top + altura;
        this.rigth = left + largura;

    }

    elementoHTML = undefined;

}

const userInitialPosition = { top: 675, left: 510 };
const ballInitialPosition = { top: (300 + Math.random() * 200), left: (200 + Math.random() * 800) };

const newUser = new Bloco(userInitialPosition.top, userInitialPosition.left, alturaUser, larguraUser)
const newBall = new Bloco(ballInitialPosition.top, ballInitialPosition.left, ballDimension, ballDimension)


let blocks = [
    new Bloco(10, 10, alturaBlock, larguraBlock),
    new Bloco(10, 180, alturaBlock, larguraBlock),
    new Bloco(10, 350, alturaBlock, larguraBlock),
    new Bloco(10, 520, alturaBlock, larguraBlock),
    new Bloco(10, 690, alturaBlock, larguraBlock),
    new Bloco(10, 860, alturaBlock, larguraBlock),
    new Bloco(10, 1030, alturaBlock, larguraBlock),
    new Bloco(45, 10, alturaBlock, larguraBlock),
    new Bloco(45, 180, alturaBlock, larguraBlock),
    new Bloco(45, 350, alturaBlock, larguraBlock),
    new Bloco(45, 520, alturaBlock, larguraBlock),
    new Bloco(45, 690, alturaBlock, larguraBlock),
    new Bloco(45, 860, alturaBlock, larguraBlock),
    new Bloco(45, 1030, alturaBlock, larguraBlock),
    new Bloco(80, 10, alturaBlock, larguraBlock),
    new Bloco(80, 180, alturaBlock, larguraBlock),
    new Bloco(80, 350, alturaBlock, larguraBlock),
    new Bloco(80, 520, alturaBlock, larguraBlock),
    new Bloco(80, 690, alturaBlock, larguraBlock),
    new Bloco(80, 860, alturaBlock, larguraBlock),
    new Bloco(80, 1030, alturaBlock, larguraBlock),

]


function criarBlocos(p, index) {
    const block = document.createElement("div")
    block.classList.add("block")
    block.setAttribute("style", `top: ${p.top}px; left: ${p.left}px`)
    block.setAttribute("id", `${index}`)
    p.elementoHTML = block
    grid.appendChild(block)
}

blocks.forEach(criarBlocos)

function gerarUsuario() {
    const block = document.createElement("div")
    block.classList.add("user")
    block.setAttribute("style", `top: ${newUser.top}px; left: ${newUser.left}px`)
    newUser.elementoHTML = block;
    grid.appendChild(block)
}

gerarUsuario()

function moverusuario() {

    if (newUser.left < 0) {
        newUser.setarPosicao(userInitialPosition.top, 0, alturaUser, larguraUser)
    }

    if (newUser.rigth > larguraJanela) {
        newUser.setarPosicao(userInitialPosition.top, larguraJanela - larguraUser, alturaUser, larguraUser)
        console.log(newUser)
    }

    const user = document.querySelector(".user");
    user.setAttribute("style", `top: ${newUser.top}px; left: ${newUser.left}px`)
}

document.addEventListener("keydown", handleKey)


function handleKey(dados) {

    switch (dados.key) {
        case "ArrowRight": if (newUser.rigth < larguraJanela) {
            newUser.atualizarPosicao(speedUser, 0);
            moverusuario();
        } break;

        case "ArrowLeft": if (newUser.left > 0) {
            newUser.atualizarPosicao(-speedUser, 0);
            moverusuario();
        } break;

        default: return;
    }
}

//ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall()
newBall.elementoHTML = ball;
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
        xDirection = -speedBall
    } else if (newBall.left <= 0) {
        xDirection = speedBall
    }

    if (newBall.top <= 0) {
        yDirection = speedBall
    }

    if (newBall.top >= alturaJanela - ballDimension) {
        yDirection = -speedBall
        clearInterval(timerId);
        document.removeEventListener("keydown", handleKey)
        score.style.display = "block"

    }
}

function colissionUser() {

    if (newBall.bottom - newUser.top >= 0 && newBall.bottom - newUser.top <= speedBall &&
        newBall.rigth >= newUser.left &&
        newBall.left <= newUser.rigth) {

        yDirection *= -1;

    } else if (
        newBall.rigth - newUser.left >= 0 && newBall.rigth - newUser.left <= speedBall &&
        newBall.bottom >= newUser.top &&
        newBall.top <= newUser.bottom) {

        xDirection *= -1;
    } else if (
        newBall.left - newUser.rigth >= 0 && newBall.left - newUser.rigth <= speedBall &&
        newBall.bottom >= newUser.top &&
        newBall.top <= newUser.bottom) {

        xDirection *= -1;
    }
}

function colissionBlocks(blocks) {

    let coll = false

    if (newBall.bottom - blocks.top >= 0 && newBall.bottom - blocks.top <= speedBall &&
        newBall.rigth >= blocks.left &&
        newBall.left <= blocks.rigth) {

        yDirection *= -1;
        coll = true

    } else if (newBall.top - blocks.bottom >= 0 && newBall.top - blocks.bottom <= speedBall &&
        newBall.rigth >= blocks.left &&
        newBall.left <= blocks.rigth) {

        yDirection *= -1;
        coll = true


    } else if (
        newBall.rigth - blocks.left >= 0 && newBall.rigth - blocks.left <= speedBall &&
        newBall.bottom >= blocks.top &&
        newBall.top <= blocks.bottom) {

        xDirection *= -1;
        coll = true
    } else if (
        newBall.left - blocks.rigth >= 0 && newBall.left - blocks.rigth <= speedBall &&
        newBall.bottom >= blocks.top &&
        newBall.top <= blocks.bottom) {

        xDirection *= -1;
        coll = true
    }

    if (coll) {
        grid.removeChild(blocks.elementoHTML)
        blocks.setarPosicao(-100, -100, alturaBlock, larguraBlock)
        contador++;
    }

    if (contador == 21) {
        clearInterval(timerId);
        document.removeEventListener("keydown", handleKey)
        score.innerHTML = "You win"
        score.style.display = "block"
    }

}
