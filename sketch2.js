import gifAnimation.Gif; //music by: David Renda and David Fesliyan
import processing.sound.*;

Gif myGif;
boolean flashPlaying = false;
boolean openPlaying = false;
boolean wrtntextPlaying = false;
boolean fulltxtPlaying = false;
boolean basePlaying = false;
boolean slashToggle = false;  
boolean gameOverPlaying = false;  

Gif startGif, flashGif, openGif, wrtntextGif, fulltxtGif, baseGif, slashRGif, slashLGif, gameoverGif;
PImage cursorImage;
int newWidth = 1200;
int newHeight = 1200;

int dragonHealth = 40;  
int maxHealth = 40;     
boolean dragonDead = false;

SoundFile startSound, start2Sound, bossFightSound, slashSound, endSound;

void setup() {
  size(1920, 1100, P2D); 
  frameRate(60);
  background(0);
  
  // Loading GIFs from the 'assets' folder
  startGif = new Gif(this, "assets/start.GIF");
  flashGif = new Gif(this, "assets/flash.gif");
  openGif = new Gif(this, "assets/open.gif");
  wrtntextGif = new Gif(this, "assets/wrtntext.gif");
  fulltxtGif = new Gif(this, "assets/fulltxt.GIF");
  baseGif = new Gif(this, "assets/base.GIF");
  slashRGif = new Gif(this, "assets/slashR.GIF");
  slashLGif = new Gif(this, "assets/slashL.GIF");
  gameoverGif = new Gif(this, "assets/gameover.gif");

  // Loading sounds from the 'assets' folder
  startSound = new SoundFile(this, "assets/start.mp3");
  start2Sound = new SoundFile(this, "assets/start2.mp3");
  bossFightSound = new SoundFile(this, "assets/bossfight.mp3");
  slashSound = new SoundFile(this, "assets/slash.mp3");  
  endSound = new SoundFile(this, "assets/end.mp3");

  startSound.play();
  resetGame();
  
  cursorImage = loadImage("assets/mouse.PNG"); // cursor image from assets
  cursorImage.resize(newWidth, newHeight);
  noCursor();
}

void draw() {
  if (!gameOverPlaying) {
    image(baseGif, 0, 0, width, height);
    drawHealthBar();

    if (myGif != baseGif) {
      if (myGif == slashRGif || myGif == slashLGif) {
        int xPos = (width - myGif.width) / 2;
        int yPos = (height - myGif.height) / 2;
        image(myGif, xPos, yPos); 
      } else {
        image(myGif, 0, 0, width, height); 
      }
    }

    image(cursorImage, mouseX - cursorImage.width / 2, mouseY - cursorImage.height / 2);

    if (!flashPlaying && !openPlaying && !wrtntextPlaying && !fulltxtPlaying && !basePlaying) {
      noFill();
      noStroke();
      rect(815, 645, 285, 70);  
    }

    if (flashPlaying && !flashGif.isPlaying()) {
      openPlaying = true;
      myGif = openGif;
      myGif.play();

      if (bossFightSound != null && !bossFightSound.isPlaying()) {
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

void mousePressed() {
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

      if (slashSound != null && !slashSound.isPlaying()) {
        slashSound.play();
      }

      if (dragonHealth <= 0) {
        dragonDead = true;  
      }
    }
  }
}

void drawHealthBar() {
  fill(0);
  rect(367, 34, 395, 32);  
  fill(255, 0, 0);
  float healthWidth = map(dragonHealth, 0, maxHealth, 0, 395); 
  rect(367, 34, healthWidth, 32);  
}

void gameOver() {
  gameOverPlaying = true;  
  myGif = gameoverGif;
  myGif.loop();  

  if (bossFightSound.isPlaying()) {
    bossFightSound.stop();
  }
  
  if (endSound != null && !endSound.isPlaying()) {
    endSound.loop();
  }
}

void resetGame() {
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
  
  if (endSound != null && endSound.isPlaying()) {
    endSound.stop();
  }

  if (startSound != null) {
    startSound.stop();
    startSound.play();
  }
}
