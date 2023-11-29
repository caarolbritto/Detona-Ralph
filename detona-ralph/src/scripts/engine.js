const state = {
   view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-Left"),
    score: document.querySelector("#score"),
},
   values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
   }, 
    actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
   },
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() { 
    /*quadrado aleatório que vai sortear um inimigo*/
/*Limpar a classe inimiga de todos os quadrados*/
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    /*sortear um número de 1 a 9*/
    let randomNumber = Math.floor(Math.random() * 9); 
    /*Sortear um número aleatório de 1 a 9. Pegar a parte inteira de um número e multiplicar por 9*/
    let randomSquare = state.view.squares[randomNumber]; 
    /*Pegar o quadrado do número que foi sorteado */
    randomSquare.classList.add("enemy"); 
    /*adicionar a classe inimiga dele */
    state.values.hitPosition = randomSquare.id;
}

/*Mover o inimigo */
/*function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity) /*a cada x tempo ele vai chamar a função randomSquare
    para adicionar um inimigo em uma caixinha temporária. Tempo em milisegundos (1000)*/
/*Está guardando dentro de uma variável o tempo, guardando o intervalo e é chamado a cada 1000 milisegundos 
}*/


function addListenerHitBox() {
    /*Listener = (Conceito universal) alguém que fica ouvindo alguma ação. Alguém que você associa o evento e ele fica ouvindo alguma ação para ser executada.*/
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
            /*se o quadrado que o usuário clicou for igual ao quadrado que foi sorteado aleatoriamente, vou guardar no state*/
                state.values.result++;
                /*somar a pontuação com +1*/
                state.view.score.textContent = state.values.result; 
                /*alterar o visual do score*/
                state.values.hitPosition = null;   
                /*voltar para nulo para o usuário não ficar clicando no mesmo lugar e ficar pontuando*/
                playSound();
            }
            });
    });
}

function initialize() {
    //moveEnemy();
    addListenerHitBox();
}
    
initialize();

