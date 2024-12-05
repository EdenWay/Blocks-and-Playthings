let myGif;
let font;
let textLines = [
  "Do you feel it?",
  "No one is here anymore.",
  "A silence that swallows everything.",
  "An echo of footsteps that are no longer there.",
  "We’re never meant to be part of the future.",
  "Fading before it even begins.",
  "Like the song of a bird who has come to love its cage.",
  "The bird forgets the sky.",
  "The cage becomes home.",
  "It is warm.",
  "But it is not free.",
  "This is going to hurt you a lot.",
  "And me, not at all.",
  "I lay back down in the grass.",
  "The earth doesn’t notice.",
  "I await the rain.",
  "But it never comes."
];

let currentLine = 0;
let displayedText = "";
let charIndex = 0;
let typingSpeed = 4;
let textColor = [204, 163, 35];
let showBackButton = false;

let windSound;
let typingSound;
let isTyping = false;

function preload() {
  myGif = loadImage("assets/1.gif");
  font = loadFont("assets/Constantia.ttf");
  windSound = loadSound("assets/wind.mp3");
  typingSound = loadSound("assets/typing_sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(windowWidth * 0.025);
  fill(textColor);
  textAlign(CENTER, BOTTOM);
  windSound.loop();
}

function draw() {
  background(0);

  let gifAspect = myGif.width / myGif.height;
  let canvasAspect = width / height;
  let gifWidth, gifHeight;

  if (gifAspect > canvasAspect) {
    gifWidth = width;
    gifHeight = width / gifAspect;
  } else {
    gifHeight = height;
    gifWidth = height * gifAspect;
  }

  imageMode(CENTER);
  image(myGif, width / 2, height / 2, gifWidth, gifHeight);

  if (!showBackButton) {
    if (frameCount % typingSpeed === 0 && charIndex < textLines[currentLine].length) {
      displayedText += textLines[currentLine][charIndex];
      charIndex++;

      if (!isTyping) {
        typingSound.loop();
        isTyping = true;
      }
    }

    if (charIndex >= textLines[currentLine].length && isTyping) {
      typingSound.stop();
      isTyping = false;
    }

    fill(textColor);
    text(displayedText, width / 2, height * 0.9);
  }

  if (showBackButton) {
    textAlign(LEFT, TOP);
    text("BACK", width * 0.02, height * 0.02);
  }
}

function mousePressed() {
  handleInteraction();
}

function touchStarted() {
  handleInteraction();
  return false; 
}

function handleInteraction() {
  if (showBackButton && mouseX > width * 0.02 && mouseX < width * 0.2 && mouseY > height * 0.02 && mouseY < height * 0.1) {
    window.location.href = "index.html";
  }

  if (charIndex >= textLines[currentLine].length) {
    if (currentLine < textLines.length - 1) {
      currentLine++;
      displayedText = "";
      charIndex = 0;
    } else {
      displayedText = "";
      showBackButton = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(windowWidth * 0.025);
}

