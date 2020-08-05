let imagem;
let imagemReferencia;
let rabiscos = [];
let pincelTamanho = 200;

function preload() {
  imagem = loadImage('/assets/gradiente.jpg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imagemReferencia = createGraphics(windowWidth, windowHeight);
  imagemReferencia.image(imagem, 0, 0, width, height);
}

function draw() {
  background(255);
  for(const rabisco of rabiscos) {
    rabisco.desenhar();
  }

  noFill();
  stroke(0);
  circle(mouseX, mouseY, pincelTamanho);
  stroke(255);
  circle(mouseX, mouseY, pincelTamanho - 2);

}

function mousePressed() {
  let novoRabisco = new Risco(  createVector(mouseX, mouseY), 
                                imagemReferencia.get(mouseX, mouseY),
                                pincelTamanho);
  rabiscos.push(novoRabisco);
}

function mouseDragged() {
  let ultimoTraco = rabiscos[rabiscos.length - 1];
  ultimoTraco.tracar(createVector(mouseX, mouseY));
}

function mouseReleased() {
  let ultimoTraco = rabiscos[rabiscos.length - 1];
  ultimoTraco.finalizar(imagem.get(mouseX, mouseY));
}

function mouseWheel(event) {
  pincelTamanho += event.delta;
  if (pincelTamanho <= 10) {
    pincelTamanho = 10;
  }
}

function keyPressed() {
  clear();
  
}

class Risco {

  constructor(posicaoInicial, corInicial, tamanhoInicial) {
    this.posicaoInicial = posicaoInicial;
    this.posicaoHistorico = [posicaoInicial];
    this.corInicial = corInicial;
    this.corFinal = corInicial;
    this.tamanhoInicial = tamanhoInicial;
    this.finalizado = false;
  }

  tracar(posicao) {
    this.posicaoHistorico.push(posicao);
  }

  finalizar(cor) {
    this.corFinal = cor;
    this.finalizado = true;
  }

  desenhar() {

    if(this.finalizado) {
      
      for(let i = 0; i < this.posicaoHistorico.length; i++) {
        
        let corLerp = norm(i, 0, this.posicaoHistorico.length);
        let cor = lerpColor(color(this.corInicial), color(this.corFinal), corLerp);
        fill(cor);
        noStroke();
        circle(this.posicaoHistorico[i].x, this.posicaoHistorico[i].y, this.tamanhoInicial);
      }
    } else {
      for(const posicao of this.posicaoHistorico) {
        fill(0);
        noStroke();
        circle(posicao.x, posicao.y, pincelTamanho);
      }
    }
  }
}