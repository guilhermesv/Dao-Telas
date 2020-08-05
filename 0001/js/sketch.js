
//
let adesivos = [];
let nAdesivos = 10;


// Padronizando modulos para faciliar chamadas

let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let letras = [];
let limites = [];


// Variáveis da simulação

let espessura = 100;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Parede Direita
  limites[0].update(width + espessura/2, height/2);
  
  // Chão
  // limites[0].update(width/2, height + espessura/2, width, espessura));
  
  // Parede Esquerda;
  // limites.push(new Limite( -espessura/2, height/2, espessura, height*2));
  
  
}

function preload() {
  for (let i = 0; i < nAdesivos; i++) {
    let arquivo = nf(i + 1, 2, 0) + ".png";
    adesivos[i] = loadImage("assets/" + arquivo);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  

  // Parede Direita
  limites.push(new Limite( width + espessura/2, height/2, espessura, height*2));

  // Chão
  limites.push(new Limite( width/2, height + espessura/2, width, espessura));
  
  // Parede Esquerda;
  limites.push(new Limite( -espessura/2, height/2, espessura, height*2));
}


function mousePressed() {
  letras = [];
  World.clear(world, true);
}
function novoElemento(img) {
  let escala = 0.8;
  let largura = 550 * escala;
  let altura = 300 * escala;
  let angulo = random(TWO_PI);
  let minimo = largura;
  let maximo = width - largura;
  let x = random(minimo, maximo);
  if(letras.length < nAdesivos) {
    letras.push(new Adesivo(x, -height, largura, altura, angulo, img));
  }
}

// setInterval(novoElemento, 400);


function draw() {
  // clear();
  Engine.update(engine, 30);

  for (let i = 0; i < adesivos.length && (frameCount % 30) == 0; i++) {
    novoElemento(adesivos[i]);
  }

  for(letra of letras) {
    letra.show();
  }

  for(limite of limites) {
    // limite.update(mouseX, mouseY);
    limite.show();
  }

}

function keyPressed() {
  
  if( keyCode == 83) {
    save('daora.png');
  }
}