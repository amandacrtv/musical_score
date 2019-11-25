let SELECTED_COLOR_SWATCH = returnRandom(GLOBAL_SWATCHES);
let SELECTED_BUTTON = '';
let size = RESETED_SIZE;
let CURRENT_ELEMENT = null;
let ELEMENTS = [];
let CURRENT_INDEX = 0;

let CURRENT_TIMER = DEFAULT_TIMER;

const s = (sketch) => {

    sketch.masterVolume(0.8); 

    sketch.mousePressed = () => {
        size = RESETED_SIZE;
    };

    sketch.mouseReleased = () => {
        if (CURRENT_ELEMENT) {
            CURRENT_ELEMENT.hide(sketch);
            CURRENT_ELEMENT.playable = true;
            ELEMENTS.push(CURRENT_ELEMENT);
        }
        CURRENT_ELEMENT = null;
    };

    sketch.setup = () => {
        sketch.createCanvas(windowWidth-BAR_WIDTH, windowHeight);
        sketch.background(BACKGROUND_COLOR);
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(windowWidth-BAR_WIDTH, windowHeight);
    };

    sketch.draw = () => {
        
        if (RESET_CANVA) {
            sketch.background(BACKGROUND_COLOR);
            ELEMENTS = [];
            CURRENT_INDEX = 0;
            RESET_CANVA = false;    
        }
        
        if (sketch.mouseIsPressed) {
            size += 1;
            if (SELECTED_BUTTON != '' && sketch.mouseX > 0 && sketch.mouseY > 0) {
                if (CURRENT_ELEMENT) {
                    CURRENT_ELEMENT.hide(sketch);
                    CURRENT_ELEMENT.changeSize(size);
                    CURRENT_ELEMENT.display(sketch);
                }
                else {
                    switch (SELECTED_BUTTON) {
                        case 'flower-button':
                            CURRENT_ELEMENT = new flower(size);
                            break;
                        case 'cloud-button':
                            CURRENT_ELEMENT = new cloud(size);
                            break;
                        case 'star-button':
                            CURRENT_ELEMENT = new star(size);
                            break;
                        case 'moon-button':
                            CURRENT_ELEMENT = new moon(size);
                            break;
                        case 'butterfly-button':
                            CURRENT_ELEMENT = new butterfly(size);  
                            break;
                    }
                    let pos = createVector(sketch.mouseX, sketch.mouseY);
                    if (CURRENT_ELEMENT) {
                        CURRENT_ELEMENT.initialize(pos);
                        CURRENT_ELEMENT.display(sketch);         
                    }
                }
            }
        }
        
        if (frameCount % 60 == 0 && ELEMENTS.length > 0 && CURRENT_TIMER > 0) CURRENT_TIMER --;
        
        if (CURRENT_TIMER == 0 && ELEMENTS.length > 0) { 
            if (CURRENT_INDEX > 0) ELEMENTS[CURRENT_INDEX-1].hide(sketch);    
            if (CURRENT_INDEX == ELEMENTS.length) CURRENT_INDEX = 0;
            ELEMENTS[CURRENT_INDEX].display(sketch);
            CURRENT_INDEX++;
            CURRENT_TIMER = DEFAULT_TIMER;
        }
        
    };

};

new p5(s, 'canvas');