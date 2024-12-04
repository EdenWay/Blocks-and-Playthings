let img, eyeImages = [], currentImage = 0;
let lines = [], isTyping = true, currentText = "A7#lG5r!@...";
let textBuffer = "", typingIndex = 0, textSpeed = 30;
let textAreaX = 290, textAreaY = 70, textAreaWidth = 400, textAreaHeight = 300;
let lineHeight = 30, maxLines, binaryFont;
let greenDots = [], dotsClicked = [], clickedCount = 0;
let brightnessEffect = false, dotsVisible = false, revealText = true, blackout = false;
let glowPulse = 0, meshes = [];

function preload() {
    eyeImages[0] = loadImage('assets/eye front.JPG');
    eyeImages[1] = loadImage('assets/eye tl.JPG');
    eyeImages[2] = loadImage('assets/eye tr.JPG');
    eyeImages[3] = loadImage('assets/eye bl.JPG');
    eyeImages[4] = loadImage('assets/eye br.JPG');
    img = loadImage('assets/eye front 2.JPG');
}

function setup() {
    let canvas = createCanvas(960, 540, WEBGL);
    canvas.parent('canvas-container');
    frameRate(30);
    binaryFont = createFont('monospace', 24);
    textFont(binaryFont);
    maxLines = floor(textAreaHeight / lineHeight);

    for (let i = 0; i < 5; i++) {
        greenDots.push(createVector(random(width), random(height)));
        dotsClicked.push(false);
    }
}

function draw() {
    background(0);
    // ... (rest of your Processing code translated here)
}

function mousePressed() {
    // ... (existing mousePressed logic)
}
