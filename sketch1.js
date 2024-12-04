let img;
let eyeImages = [];
let currentImage = 0;
let lines;
let isTyping = true;
let currentText = "A7#lG5r!@4J-?^1fH&9$25scWf2 $*tU^6*cA@b4Zu!5c-create1$0 #i$%xas@            6CAfb(H >X$mS                 *lsCa $*D-)                   vz! c$5b;                Of)4ti He^dx[o             D*k@23h 3$[cSjbv9$hxa.Gi76Bs=a|c-1% s&fc8memory(5'O6ej@8$0uf!b*";
let textBuffer = "";
let typingIndex = 0;
let textSpeed = 30;
let binaryFont;
let wordsToHighlight = ["create", "memory"];

let textAreaX = 290;
let textAreaY = 70;
let textAreaWidth = 400;
let textAreaHeight = 300;
let lineHeight = 30;
let maxLines;

let greenDots = [];
let dotsClicked = [];
let clickedCount = 0;
let brightnessEffect = false;
let dotsVisible = false;
let revealText = true;
let blackout = false;
let glowPulse = 0;

function preload() {
    eyeImages[0] = loadImage("assets/eye front.JPG");
    eyeImages[1] = loadImage("assets/eye tl.JPG");
    eyeImages[2] = loadImage("assets/eye tr.JPG");
    eyeImages[3] = loadImage("assets/eye bl.JPG");
    eyeImages[4] = loadImage("assets/eye br.JPG");
    img = loadImage("assets/eye front 2.JPG");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    binaryFont = createFont("monospaced", 24);
    lines = [];
    maxLines = textAreaHeight / lineHeight;

    for (let i = 0; i < 5; i++) {
        greenDots.push(createVector(random(width), random(height)));
        dotsClicked.push(false);
    }

    img.loadPixels();
}

function draw() {
    if (blackout) {
        background(0);
        applyBrightnessEffect();
    } else {
        background(0);
        updateEyePosition();

        let pixelated = eyeImages[currentImage].get();
        pixelateImage(pixelated, 3);
        image(pixelated, width / 2 - pixelated.width / 2, height / 2 - pixelated.height / 2);
    }

    if (brightnessEffect) {
        applyBrightnessEffect();
    }

    if (dotsVisible) {
        drawGlowingGreenDots();
    }

    if (revealText && isTyping) {
        startTypingText();
    }
    if (revealText) {
        displayText();
    }
}

function updateEyePosition() {
    if (mouseX < width / 2.5 && mouseY < height / 2) {
        currentImage = 1;
    } else if (mouseX > 2.5 * width / 4 && mouseY < height / 2) {
        currentImage = 2;
    } else if (mouseX < width / 2.5 && mouseY > height / 2) {
        currentImage = 3;
    } else if (mouseX > 2.5 * width / 4 && mouseY > height / 2) {
        currentImage = 4;
    } else {
        currentImage = 0;
    }
}

function pixelateImage(img, pixelSize) {
    img.loadPixels();
    for (let x = 0; x < img.width; x += pixelSize) {
        for (let y = 0; y < img.height; y += pixelSize) {
            let c = img.get(x, y);
            for (let dx = 0; dx < pixelSize; dx++) {
                for (let dy = 0; dy < pixelSize; dy++) {
                    if (x + dx < img.width && y + dy < img.height) {
                        img.set(x + dx, y + dy, c);
                    }
                }
            }
        }
    }
    img.updatePixels();
}

function applyBrightnessEffect() {
    let maxdist = 60;
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let loc = x + y * img.width;
            let r = red(img.pixels[loc]);
            let d = dist(x, y, mouseX, mouseY);
            let adjustbrightness = 255 * (maxdist - d) / maxdist;
            r += adjustbrightness;
            r = constrain(r, 0, 255);
            img.pixels[loc] = color(r);
        }
    }
    img.updatePixels();
    image(img, 0, 0);
}

function startTypingText() {
    if (typingIndex < currentText.length) {
        let c = currentText.charAt(typingIndex);
        typingIndex++;
        textBuffer += c;
        delay(textSpeed);
    } else {
        isTyping = false;
    }
}

function displayText() {
    textFont(binaryFont);
    textSize(24);
    textAlign(LEFT, TOP);

    let currentY = textAreaY;
    let words = split(textBuffer, ' ');
    let line = "";

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        if (textWidth(testLine) > textAreaWidth) {
            drawLineWithHoverEffect(line, currentY);
            line = words[i] + " ";
            currentY += lineHeight;

            if (currentY >= textAreaY + textAreaHeight) {
                return;
            }
        } else {
            line += words[i] + " ";
        }
    }

    if (line.length > 0) {
        drawLineWithHoverEffect(line, currentY);
    }
}

function drawLineWithHoverEffect(line, yPosition) {
    let xPosition = textAreaX;
    let lineLength = line.length;

    for (let i = 0; i < lineLength; i++) {
        let c = line.charAt(i);
        let charWidth = textWidth(c);

        if (c === ' ') {
            xPosition += charWidth;
            continue;
        }

        let isPartOfHighlightedWord = false;

        for (let targetWord of wordsToHighlight) {
            let wordStart = line.indexOf(targetWord);
            if (wordStart !== -1 && i >= wordStart && i < wordStart + targetWord.length) {
                let wordWidth = textWidth(targetWord);
                if (mouseX >= textAreaX + textWidth(line.substring(0, wordStart)) &&
                    mouseX <= textAreaX + textWidth(line.substring(0, wordStart)) + wordWidth &&
                    mouseY >= yPosition && mouseY <= yPosition + lineHeight) {

                    noStroke();
                    fill(0, 230, 0);
                    rect(xPosition - (i - wordStart) * charWidth, yPosition, wordWidth, lineHeight);

                    fill(0);
                    if (mouseIsPressed) {
                        handleWordClick(targetWord);
                    }
                    isPartOfHighlightedWord = true;
                }
            }
        }

        if (!isPartOfHighlightedWord) {
            fill(0);
            text(c, xPosition, yPosition);
        }

        xPosition += charWidth;
    }
}

function handleWordClick(word) {
    if (word === "create") {
        dotsVisible = true;
    } else if (word === "memory") {
        blackout = true;
    }
}

function mousePressed() {
    // Handle mouse pressed logic, like changing images or triggering events
    dotsClicked[clickedCount] = true;
    clickedCount = (clickedCount + 1) % greenDots.length;
}
