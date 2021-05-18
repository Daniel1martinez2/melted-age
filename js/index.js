(function() {

  new p5(function(p){
    
    var blobs;
    var blobGraph;
    var bg;
    let currentBg = './images/xample.webp'; 
    p.preload = function () {
      bg = p.loadImage(currentBg);
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
       blobs.push(...data.glaciars.map(elem=>new Blob(blobGraph,p.random(0,900) , p.random(0,400), elem.startSize / 20)))
      });
    }
    
    p.draw = function () {
      p.clear(); 
      blobGraph.clear();
      blobs.forEach(function (blob) {
        blob.draw();
        blob.computeDisplay();
      });
      var copy = p.createImage(p.windowWidth, p.windowHeight);
      copy.copy(bg, 0, 0, bg.width, bg.height, 0, 0, p.windowWidth, p.windowHeight);
      copy.mask(blobGraph);
      p.image(copy, 0, 0);


      blobs.forEach((elem)=>{
        //elem.move(focusPoint.x, focusPoint.y)
        elem.moveRandom();
      
      });
      p.strokeWeight(10)
      p.stroke(255,0,0); 
      blobs.forEach((blob,index)=>{
        let sgt = index+1 > blobs.length-1? blobs.length-1 :  index+1;
        p.line(blob.pos.x,blob.pos.y,blobs[sgt].pos.x,blobs[sgt].pos.y); 
      }); 
    }
    p.mouseClicked = function() {
      blobs.push(new Blob(blobGraph, p.mouseX, p.mouseY, p.random(5,200)),)
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