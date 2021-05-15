class Blob {
    
  constructor (p, x, y, size){
    this.p = p; //argument
    this.pos = p.createVector(x, y); //vector who represents the position x and y
    this.size = 0; // innit size, 0 cause the blobs at the beginning are hidden
    this.finalSize = size; //actual size we want
    this.display = true; //activates the blobs growth
    this.copyCat = this.pos.copy(); 

    this.col = p.color(255, 255, 0);

    this.leftOffset = p.random(4125123125123);
    this.rightOffset = p.random(4125123125123);
    this.genOffset = p.random(4125123125123);
    this.step = 0.01;
    this.amount = 0;
    this.focusPoint = {
      x: p.random(100,600),
      y:p.random(100,600),
    }
  }

  computeDisplay(){
    var diff = this.finalSize - this.size;
    var vel = this.p.map(diff, this.finalSize, 0, 50, 15); //show up velocity
    if(this.display && this.size < this.finalSize){
      this.size += vel;
    }
    if(!this.display && this.size > 0){
      this.size -= vel;
    }
  }

  draw(){
    var { p, pos, size } = this;
    if(size <= 0) return;
    var mov = 40;
    this.genOffset += 0.01;
    pos = pos.copy().add(p.noise(this.genOffset + 45145) * mov - mov/2, p.noise(this.genOffset + 249999) * mov - mov/2);
    size = size + p.noise(this.genOffset + 65135135) * 150;

    // left
    this.leftOffset += 0.01;
    var left = this.getSideVars(this.leftOffset, -.5, pos, size);
    
    // right
    this.rightOffset += 0.01;
    var right = this.getSideVars(this.rightOffset, .5, pos, size);

    p.fill(this.col, 0, 0);
    p.noStroke();

    // down half
    p.bezier(left.center.x, left.center.y,
              left.bottom.x, left.bottom.y,
              right.bottom.x, right.bottom.y,
              right.center.x, right.center.y);

    left.center.y++;
    left.top.y++;
    right.center.y++;
    right.top.y++;
    //up half
    p.bezier(left.center.x, left.center.y,
              left.top.x, left.top.y,
              right.top.x, right.top.y,
              right.center.x, right.center.y);
    
    return
    // p.fill(255);
    // [left, right].forEach(function (side) {
    //   ['top', 'bottom', 'center'].forEach(function (key){
    //     p.ellipse(side[key].x, side[key].y, 20, 20);
    //   })
    // })
  }

  getSideVars(offset, mov, pos, size){
    var { p } = this;

    var rot = p.noise(offset) * p.PI / 4 - p.PI / 8;

    var posMov = 10;
    pos = pos.copy().add(p.noise(offset + 2532) * posMov - posMov/2, p.noise(offset + 25231245123) * posMov - posMov/2);

    var bottom = p.createVector(0, size * .50 + p.noise(offset + 65125265) * 100);
    bottom.rotate(rot);
    bottom.add(pos);
    bottom.add(size * mov, 0);

    var top = p.createVector(0, size * .5 + p.noise(offset + 211512) * 100);
    top.rotate(rot + p.PI);
    top.add(pos);
    top.add(size * mov, 0);
    
    var center = p.createVector(pos.x - size * mov * -1, pos.y);

    return {
      top: top,
      center: center,
      bottom: bottom
    }
  }  
  move(x, y){
    let v1 = this.p.createVector(this.copyCat.x, this.copyCat.y);
    let v2 = this.p.createVector(x, y);
    if (this.amount > 1 || this.amount < 0) {
      // this.step *= -1;
      this.step = 0;
    }
    this.amount += this.step;
    let v3 = p5.Vector.lerp(v1, v2, this.amount);
    this.pos.x = v3.x; 
    this.pos.y = v3.y;   
  }
  moveRandom(){
    this.move(this.focusPoint.x, this.focusPoint.y); 
  }
  toggle(){
    this.display = !this.display;
  }
}