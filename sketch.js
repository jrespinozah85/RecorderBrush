let layers;
let bSize;
let bColor;
let playBtn;
let recBtn;
let stpBtn;

let frms;
let cnt;

let mode;
const STOP = 0;
const RECORD = 1;
const PLAY = 2;

function setup() {
  createCanvas(640, 480);
  
  let container = createDiv();
  container.id("container");
  
  playBtn = createButton('<i class="fa-solid fa-play"></i>');
  playBtn.mousePressed(pressPlay);
  container.child(playBtn);
  
  recBtn = createButton('<i class="fa-solid fa-circle"></i>');
  recBtn.mousePressed(pressRec);
  container.child(recBtn);
  
  stpBtn = createButton('<i class="fa-solid fa-stop"></i>');
  stpBtn.addClass('selected');
  stpBtn.mousePressed(pressStop);
  container.child(stpBtn);
 
  bSize = createSlider(1, 10, 2);
  container.child(bSize);
  
  bColor = createColorPicker('black');
  container.child(bColor);
  
  
  layers = [];
  
  layers.push(createGraphics(width, height));
  layers[0].background(255);
  
  layers.push(createGraphics(width, height));
  layers.push(createGraphics(width, height));
  
  frms = [];
  cnt = 0;
  
  mode = STOP;
}

function draw() {
  image(layers[0], 0, 0);
  
  if (mode == RECORD){
    
    image(layers[1], 0, 0);
    
    let f;
    
    if (mouseIsPressed){

      f = createFrame(bSize.value(), bColor.color(), pmouseX, pmouseY, mouseX, mouseY);
      
    }else{
      f = createFrame();
    }
    
    frms.push(f);
    
    renderFrame(f, layers[1]);
    
  }else if(mode == PLAY){
    if (cnt==0){
      layers[2].clear();
    }
    
    image(layers[2], 0, 0);
    
    if (frms.length>0){
      let f = frms[cnt];
      renderFrame(f, layers[2]);
    }
    
    cnt++;
    cnt = cnt % frms.length;
    
  }else if(mode == STOP){
    image(layers[1], 0, 0);
  }
  
}

function keyPressed(){
  switch(keyCode){
    case 32:
      if (mode == STOP){
        pressPlay();
      }else{
        pressStop();
      }
      break;
    case 82:
      pressRec();
      break;
      
  }
}

function createFrame(_bs=0, _bc=0, _ax=0, _ay=0, _bx=0, _by=0){
  let f = {
    bS: _bs,
    bC: _bc,
    aX: _ax,
    aY: _ay,
    bX: _bx,
    bY: _by
  };
  
  return f;
}

function renderFrame(frm, layer){
  layer.strokeWeight(frm.bS);
  layer.stroke(frm.bC);
  layer.line(frm.aX,frm.aY,frm.bX,frm.bY);
}

function pressPlay(){
  mode = PLAY;
  cnt = 0;
  playBtn.addClass('selected');
  stpBtn.removeClass('selected');
  recBtn.removeClass('selected');
}

function pressStop(){
  mode = STOP;
  playBtn.removeClass('selected');
  stpBtn.addClass('selected');
  recBtn.removeClass('selected');
}

function pressRec(){
  mode = RECORD;
  playBtn.removeClass('selected');
  stpBtn.removeClass('selected');
  recBtn.addClass('selected');
}