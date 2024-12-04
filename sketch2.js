// GIF and Sound Libraries
let myGif;
let startGif, flashGif, openGif, wrtntextGif, fulltxtGif, baseGif, slashRGif, slashLGif, gameoverGif;
let cursorImage;
let dragonHealth = 40;
let maxHealth = 40;
let dragonDead = false;

let startSound, start2Sound, bossFightSound, slashSound, endSound;

function preload() {
  // Loading GIFs
  startGif = loadImage("start.GIF");
  flashGif = loadImage("flash.gif");
  openGif = loadImage("open.gif");
  wrtntextGif = loadImage("wrtntext.gif");
  fulltxtGif = loadImage("fulltxt.GIF");
  baseGif = loadImage("base.GIF");
  slashRGif = loadImage("slashR.GIF");
  slashLGif = loadImage("slashL.GIF");
  gameoverGif = loadImage("gameover.gif");

  // Loading Sounds
  startSound = loadSound("start.mp3");
  start2Sound = loadSound("start2.mp3");
  bossFightSound = loadSound("bossfight.mp3");
  slashSound = loadSound("slash.mp3");
  endSound = loadSound("end.mp3");

  // Load cursor image
  cursorImage = loadImage("mouse.PNG");
}

function setup() {
  createCanvas(1920, 1100);
  noCursor();

  startSound.play();
  resetGame();
}

function draw() {
  if (!dragonDead) {
    image(baseGif, 0, 0, width, height);
    drawHealthBar();

    if (myGif !== baseGif) {
      if (myGif === slashRGif || myGif === slashLGif) {
        let xPos = (width - myGif.width) / 2;
        let yPos = (height - myGif.height) / 2;
        image(myGif, xPos, yPos);
      } else {
        image(myGif, 0, 0, width, height);
      }
    }

    image(cursorImage, mouseX - cursorImage.width / 2, mouseY - cursorImage.height / 2);

    // Game logic
    if (!flashPlaying && !openPlaying && !wrtntextPlaying && !fulltxtPlaying && !basePlaying) {
      noFill();
      noStroke();
      rect(815, 645, 285, 70);
    }

    // Handle transitions between GIFs
    if (flashPlaying && !flashGif.isPlaying()) {
      openPlaying = true;
      myGif = openGif;
      myGif.play();
      if (!bossFightSound.isPlaying()) {
        bossFightSound.loop();
      }
      flashPlaying = false;
    }

    if (openPlaying && !openGif.isPlaying()) {
      wrtntextPlaying = true;
      myGif = wrtntextGif;
      myGif.play();
      openPlaying = false;
    }

    if (wrtntextPlaying && !wrtntextGif.isPlaying()) {
      fulltxtPlaying = true;
      myGif = fulltxtGif;
      myGif.play();
      wrtntextPlaying = false;
    }

    if (basePlaying && !baseGif.isPlaying()) {
      baseGif.loop();
    }

    if (dragonDead) {
      gameOver();
    }
  } else {
    image(gameoverGif, 0, 0, width, height);
    image(cursorImage, mouseX - cursorImage.width / 2, mouseY - cursorImage.height / 2);
  }
}

function mousePressed() {
  if (gameOverPlaying) {
    if (mouseX > 780 && mouseX < 780 + 370 && mouseY > 280 && mouseY < 280 + 85) {
      resetGame();
    }
  } else {
    if (!flashPlaying && !openPlaying && !wrtntextPlaying && !fulltxtPlaying && !basePlaying &&
      mouseX > 815 && mouseX < 815 + 285 && mouseY > 645 && mouseY < 645 + 70) {
      if (startSound.isPlaying()) {
        startSound.stop();
      }
      start2Sound.play();

      flashPlaying = true;
      myGif = flashGif;
      myGif.play();
    }

    if (fulltxtPlaying && mousePressed) {
      fulltxtPlaying = false;
      basePlaying = true;
      myGif = baseGif;
      myGif.loop();
    }

    if (basePlaying) {
      if (slashToggle) {
        myGif = slashRGif;
        myGif.play();
      } else {
        myGif = slashLGif;
        myGif.play();
      }
      slashToggle = !slashToggle;

      dragonHealth--;

      if (slashSound && !slashSound.isPlaying()) {
        slashSound.play();
      }

      if (dragonHealth <= 0) {
        dragonDead = true;
      }
    }
  }
}

function drawHealthBar() {
  fill(0);
  rect(367, 34, 395, 32);
  fill(255, 0, 0);
  let healthWidth = map(dragonHealth, 0, maxHealth, 0, 395);
  rect(367, 34, healthWidth, 32);
}

function gameOver() {
  gameOverPlaying = true;
  myGif = gameoverGif;
  myGif.loop();

  if (bossFightSound.isPlaying()) {
    bossFightSound.stop();
  }

  if (endSound && !endSound.isPlaying()) {
    endSound.loop();
  }
}

function resetGame() {
  dragonHealth = maxHealth;
  dragonDead = false;
  gameOverPlaying = false;

  flashPlaying = false;
  openPlaying = false;
  wrtntextPlaying = false;
  fulltxtPlaying = false;
  basePlaying = false;
  slashToggle = false;

  myGif = startGif;
  myGif.loop();

  if (bossFightSound.isPlaying()) {
    bossFightSound.stop();
  }

  if (endSound && endSound.isPlaying()) {
    endSound.stop();
  }

  if (startSound) {
    startSound.stop();
    startSound.play();
  }
}

