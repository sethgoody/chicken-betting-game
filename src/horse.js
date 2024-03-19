class Horse {
  constructor(id) {
      this.id = id
      this.speedMilliseconds = 40 // The lower this is, the faster the horse will go
      this.movementInterval = null
      this.randomizeSpeedTimer = null
      this.horseElement = document.getElementById(this.id)
      this.finishedStatus = false
  }

  // Reset race
  reset(){
      clearInterval(this.movementInterval);
      clearInterval(window.scrollInterval);
      this.horseElement.src = `./assets/${this.id}/tile015.png`
      this.horseElement.style.left = "0px";
      this.finishedStatus = false
  }

  // Stop horse movement
  stop(){
      if (!finishOrder.length) {
          showElements(["#menu-button"])
          if(userData.betHorse === this.id) {
              showWinPopup()
              userData.funds += (userData.betAmount * 5)
              console.log('------------ userData', userData)
              saveUserData()
              document.getElementById("user-funds-text").textContent = userData.funds
              document.getElementById("user-bet-text").textContent = `${this.id.toUpperCase()} WINS!`
          } else {
              loseSound.play()
              userData.betAmount = 0
              saveUserData()
              document.getElementById("user-bet-text").textContent = `${this.id} wins.`
              document.getElementById("user-funds-container").textContent = "Better luck next time!"
          }
      }
      finishOrder.push(this)
      if(userData.betHorse === this.id) {
          console.log('------------ BET HORSE FINISHED')
          userData.betHorse = null
          clearInterval(window.scrollInterval);
      }
      if (finishOrder.length === horseList.length) {
          gallopSound.currentTime = 0
          gallopSound.pause()
          document.getElementById("reset-button").style.display = "initial"
      }
      clearInterval(this.movementInterval);
      clearTimeout(this.randomizeSpeedTimer);
      this.horseElement.src = `./assets/${this.id}/tile015.png`
      this.finishedStatus = true
      // console.log('------------ Horse Finish Order:', finishOrder)
  }

  // Will be called repeatedly to randomize speed across the course
  setMovementSpeed() {
      clearInterval(this.movementInterval);
      let xPosition = this.horseElement.offsetLeft;
      this.movementInterval = setInterval(() => {
          let step = 5; // This changes how far right the horse will move each iteration
          if(xPosition < 1550) {
              xPosition = xPosition + step;
              this.horseElement.style.left= xPosition + "px"; // Horizontal movement
          } else {
              this.stop()
          }
      }, this.speedMilliseconds);

      if(xPosition < 1550) { 
          this.randomizeSpeedTimer = setTimeout(() => {
              this.speedMilliseconds = randomInteger(20, 60)
              this.setMovementSpeed()
          }, randomInteger(200, 1200));
      }
  }

  // Run across the screen at a random speed
  run(){
      this.horseElement.src = `./assets/${this.id}/run.gif` // Change the image to a running gif
      this.setMovementSpeed()
  }
}

 function startRace(horseElement) {
  let runGif = `./assets/${horseElement.id}/run.gif`; // Use the horse's ID to get the correct run GIF
  let standImg = `./assets/${horseElement.id}/tile015.png`; // Use the horse's ID to get the correct standing image

  horseElement.src = runGif;
  let currentPosition = 0; // Assuming the start position is 0

  const interval = setInterval(() => {
    currentPosition += 10; // Moves horse 10px to the right
    horseElement.style.left = `${currentPosition}px`;

    if (currentPosition > window.innerWidth - 100) {
      clearInterval(interval);
      horseElement.src = standImg;
    }
  }, 50);
}

// Start races and hide button on click
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".start-button")
    .addEventListener("click", function () {
      const horses = document.querySelectorAll(".horse"); 
      horses.forEach((horse) => {
        startRace(horse);
      });
      this.style.display = "none";
    });
});
