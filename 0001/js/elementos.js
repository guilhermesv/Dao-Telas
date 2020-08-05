class Adesivo {
  
  constructor(x, y, largura, altura, angulo, img) {
    let options = {
      friction: 1,
      frictionStatic: 1,
      frictionAir: 0.02,
      restitution: 0.2,
      chanfer: 4,
      angle: angulo,
    };
    this.body = Bodies.rectangle(x, y, largura, altura, options);
    this.largura = largura;
    this.altura = altura;
    this.adesivo = img;
    World.add(world, this.body);
  }
  
  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.adesivo, 0, 0, this.largura, this.altura);
    pop();

  }

}

class Limite {
  
  constructor(x, y, largura, altura) {
    let options = {
      friction: 1,
      frictionStatic: 1,
      restitution: 0,
      isStatic: true
    };
    this.body = Bodies.rectangle(x, y, largura, altura, options);
    this.largura = largura;
    this.altura = altura;
    World.add(world, this.body);
  }

  update(x, y) {
    let pos = createVector(x, y);
    Matter.Body.translate(this.body, pos);
    strokeWeight(10);
    stroke(0);
    
  }
  
  show() {
    let pos = this.body.position;

    push();
    translate(pos.x, pos.y); 
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(0, 0, this.largura, this.altura);
    pop();
  }

}