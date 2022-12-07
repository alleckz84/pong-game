//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;   //velocidade da bolinha no eixo X
let velocidadeYBolinha = 6;   //velocidade da bolinha no eixo Y

//variaveis da raquete
let xRaquete = 5              // posição x da raquete
let yRaquete = 150            // posição y da raquete
let raqueteComprimento = 10;  // comprimento da raquete
let raqueteAltura = 90;       // altura da raquete

//variaveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound ("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);     //tamanho do background
  trilha.loop();
}

function draw() {
  background(0);                                             //desenha o background
  mostraBolinha ();                                          //desenha a bolinha
  movimentaBolinha();                                        //movimenta a bolinha
  verificaColisaoBorda();                                    //verifica a colisao da bolinha
  mostraRaquete(xRaquete, yRaquete);                         //mostra a raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();                                   //movimenta minha raquete
  verificaColisaoRaquete(xRaquete,yRaquete);                 //colisao da raquete
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente); //colisao raquete oponente
  movimentaRaqueteOponente();                                //movimenta raquete do oponente
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha (){
  circle (xBolinha, yBolinha, diametro)   //posicao inicial da bolinha e tamanho
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){ 
  if (xBolinha + raio > width ||   //se xbolinha + raio > largura ou
     xBolinha - raio < 0){         //xbolinha - raio < largura
  velocidadeXBolinha *= -1;        //velocidade da xbolinha -1
  }
  if (yBolinha + raio > height ||  //se ybolinha + raio > altura ou
      yBolinha - raio < 0){        //ybolinha - raio < altura
    velocidadeYBolinha *= -1;      //velocidade da ybolinha -1
  }
}

function mostraRaquete(x,y){
  rect (x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
   if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
   }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke (255);
  textAlign (CENTER);
  textSize (16);
  fill (color(255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255);
  text (meusPontos, 170, 26);
  fill (color(255, 140, 0));
  rect (450, 10, 40, 20);
  fill (255);
  text (pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 593){
    meusPontos += 1;
    ponto.play();
  }  
  if (xBolinha < 5){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
    if (xBolinha + raio > 600){
    xBolinha = 577
    }
}