(function() {

  new p5(function(p){
    
    var blobs;
    var blobGraph;
    var bg;
    let currentBg = './images/xample.webp'; 
    const imgs = [
      './images/a1.jpeg',
      './images/a2.jpeg',
      './images/a3.jpeg',
      './images/a4.jpeg',
    ];
    let noiseScale ={
      r: 0.0, 
      g: 0.0, 
      b: 0.0, 
    };
  
    p.preload = function () {
      let randomImage = Math.round(Math.random()* (imgs.length-1)); 
      console.log(randomImage);
      bg = p.loadImage(imgs[randomImage]);
      //bg = p.loadImage(currentBg);
    }; 
  
    
    p.setup = function () {
       
      var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('p5parent');

      blobGraph = p.createGraphics(p.windowWidth, p.windowHeight);      

      blobs = [
        // new Blob(blobGraph, 200, 200, 20),
        // new Blob(blobGraph, p.windowWidth * .4, p.windowHeight / 2, 70),
        // new Blob(blobGraph, p.windowWidth * .3, p.windowHeight - 100, 65),
      ];
      getJson('./database/Glaciars.JSON').then(data => {
        //console.log(data.glaciars);
        //using the data
       //blobs.push(...data.glaciars.map(elem=>new Blob(blobGraph,p.random(0,900) , p.random(0,400), elem.startSize / 20,elem.name )))
        blobs.push(...data.glaciars.map(elem=>new Blob(blobGraph,p.windowWidth/2 ,100, elem.startSize / 40,elem.name )))
      });
    }
    

    const linesInfo = (blob, index, noiseVal) =>{
      p.strokeWeight(noiseVal.g / 18)
      p.stroke(noiseVal.r, noiseVal.g, noiseVal.b); 
      let sgt = index+1 > blobs.length-1? blobs.length-1 :  index+1;
      p.line(blob.pos.x,blob.pos.y,blobs[sgt].pos.x,blobs[sgt].pos.y); 
      //p.text(`blob: ${blob.name}`, blob.pos.x,blob.pos.y )
     
    }

    p.draw = function () {
      p.clear(); 
      blobGraph.clear();
      noiseScale.r += 0.01; 
      noiseScale.g += 0.1; 
      noiseScale.b += 0.2; 
      let noiseVal = {
        r: Math.round( p.noise(noiseScale.r)* 255),
        g: Math.round( p.noise(noiseScale.g)* 255),
        b: Math.round( p.noise(noiseScale.b)* 255),
      }
      blobs.forEach((blob, index) => {
        blob.draw();
        blob.computeDisplay();
        blob.moveRandom();
        linesInfo(blob, index, noiseVal); 
      });
      var copy = p.createImage(p.windowWidth, p.windowHeight);
      copy.copy(bg, 0, 0, bg.width, bg.height, 0, 0, p.windowWidth, p.windowHeight);
      copy.mask(blobGraph);

      p.image(copy, 0, 0);

      // blobs.forEach((elem)=>{
      //   //elem.move(focusPoint.x, focusPoint.y)
      // });

      
    }
    p.mouseClicked = function() {
      blobs.push(new Blob(blobGraph, p.mouseX, p.mouseY, p.random(5,200), 'generated'))
      // blobs[0].display = !blobs[0].display;
      // blobs.splice(0,1); 

      // blobs.forEach(function(blob){
      //   blob.toggle();
      // });
    }
    p.windowResized =()=>{
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    } 
    var title = document.querySelector('.title');
    // title.addEventListener('mouseenter', p.mouseClicked);
    // title.addEventListener('mouseleave', p.mouseClicked);

  });

})();
