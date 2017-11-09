//Principais
var canvas = document.getElementById("meu_canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var score1 = 0;
var score2 = 0;
var pl;
//Bola
var dy = 2;
var dx = 2;
var bolaR = 10;
//Jogador1
var paddleHeight1 = 70;
var paddleWidth1 = 10;
var paddleX1 = (canvas.width-paddleWidth1);
var paddle1Y = (canvas.height/2)-(paddleHeight1/2);
//Jogador2
var paddleHeight2 = 70;
var paddleWidth2 = 10;
var paddleX2 = 0;
var paddle2Y = (canvas.height/2)-(paddleHeight2/2);
//Movimentacao jogadores
var downPressed1 = false;
var upPressed1 = false;
var downPressed2 = false;
var upPressed2 = false;

document.addEventListener("keydown", keyDownHandler1, false);
document.addEventListener("keyup", keyUpHandler1, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);

//Jogador 1 Mov
function keyDownHandler1(e) {
    if(e.keyCode == 40) {
        downPressed1 = true;
    }
    else if(e.keyCode == 38) {
        upPressed1 = true;
    }
}
function keyUpHandler1(e) {
    if(e.keyCode == 40) {
        downPressed1 = false;
    }
    else if(e.keyCode == 38) {
        upPressed1 = false;
    }
}
//Jogador 2 Mov
function keyDownHandler2(e) {
    if(e.keyCode == 83) {
        downPressed2 = true;
    }
    else if(e.keyCode == 87) {
        upPressed2 = true;
    }
}
function keyUpHandler2(e) {
    if(e.keyCode == 83) {
        downPressed2 = false;
    }
    else if(e.keyCode == 87) {
        upPressed2 = false;
    }
}
//Desenhar
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, bolaR, 0, Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(paddleX1, paddle1Y, paddleWidth1, paddleHeight1);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, paddle2Y, paddleWidth2, paddleHeight2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore1() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Pontos: "+score1, 8, 20);
}

function drawScore2() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Pontos: "+score2, 405, 20);
}

function checkpoints(pl){
    if(pl == 1){
        x = canvas.width/2;
        y = canvas.height/2;
        dx = -dx;
        score1++;
        if(score2 == 3){
        alert("Jogador 2 venceu");
        document.location.reload();
    }
    }else if(pl == 2){
        x = canvas.width/2;
        y = canvas.height/2;
        score2++;
        if(score1 == 3){
        alert("Jogador 1 venceu");
        document.location.reload();
    }
    }

    if(score2 == 3){
        alert("Jogador 2 venceu");
        document.location.reload();
    }
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawPaddle1();
	drawPaddle2();
    drawScore1();
    drawScore2();

	if(y + dy > canvas.height-bolaR || y + dy < 0){
		dy = -dy;
	}
	//Jogador 1 colisao
	if(x + dx > canvas.width - paddleWidth1 - bolaR){
		if(y > paddle1Y+3 && y < paddle1Y+paddleHeight1+3){
			dx = -dx;
		}else {
            checkpoints(1);
		}
	}else if(x + dx < 0 + paddleWidth2 + bolaR){
		if(y > paddle2Y+3 && y < paddle2Y+paddleHeight2+3){
			dx = -dx;
		}else{
            checkpoints(2);
		}
	}

if(downPressed1 && paddle1Y < canvas.height-paddleHeight1) {
        paddle1Y += 5;
    }
    else if(upPressed1 && paddle1Y > 0) {
        paddle1Y -= 5;
    }
    if(downPressed2 && paddle2Y < canvas.height-paddleHeight2) {
        paddle2Y += 5;
    }
    else if(upPressed2 && paddle2Y > 0) {
        paddle2Y -= 5;
    }

    y += dy;
	x += dx;
	//console.log([x,y],[paddleX1,paddle1Y+paddleHeight1]);
}
setInterval(draw, 10);