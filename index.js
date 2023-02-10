const grid = document.querySelector(".grid");

const larguraJanela = 1200;
const alturaJanela = 700;

const larguraUser = 180;
const alturaUser = 20;


class Usuario {
    constructor(top, left) {
        this.top = top;
        this.left = left;

    }
}

const newUser = new Usuario(670, 510)


const blocks = [
    { top: 10, left: 10 },
    { top: 10, left: 180 },
    { top: 10, left: 350 },
    { top: 10, left: 520 },
    { top: 10, left: 690 },
    { top: 10, left: 860 },
    { top: 10, left: 1030 },
    { top: 45, left: 10 },
    { top: 45, left: 180 },
    { top: 45, left: 350 },
    { top: 45, left: 520 },
    { top: 45, left: 690 },
    { top: 45, left: 860 },
    { top: 45, left: 1030 },
    { top: 80, left: 10 },
    { top: 80, left: 180 },
    { top: 80, left: 350 },
    { top: 80, left: 520 },
    { top: 80, left: 690 },
    { top: 80, left: 860 },
    { top: 80, left: 1030 },
]

function criarBlocos(p) {
    const block = document.createElement("div")
    block.classList.add("block")
    block.setAttribute("style", `top: ${p.top}px; left: ${p.left}px`)
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
            newUser.left += 15;
            moverusuario();
        } break;

        case "ArrowLeft": if (newUser.left > 0) {
            newUser.left -= 15;
            moverusuario();
        } break;

        default: return;
    }
}