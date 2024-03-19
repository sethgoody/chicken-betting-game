// Create and append horses images to the DOM
function newImage(url, x, y) {
    let image = document.createElement("img");
    image.src = url;
    image.style.position = "absolute";
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    document.body.append(image);
    return image;
  }
  
  // Function to create a horse object with a name and starting position, and a method to start its race
  function createHorse(name, x, y) {
    const runGif = `./assets/${name}/run.gif`;
    const standImg = `./assets/${name}/tile015.png`;
    const element = newImage(standImg, x, y);
  
    function startRace() {
      element.src = runGif;
      let currentPosition = x;
  
      const interval = setInterval(() => {
        currentPosition += 10; // Moves horse 10px to the right ----- adjust if need
        element.style.left = `${currentPosition}px`;
  
        if (currentPosition > window.innerWidth - 100) {
          clearInterval(interval);
          element.src = standImg;
        }
      }, 50);
    }
  
    return { startRace };
  }
  
  // Initialize multiple horses
  let horses = [
    createHorse("BoJack", 150, 250),
    createHorse("Copenhagen", 150, 350),
    createHorse("Bullseye", 150, 450),
    createHorse("Pegasus", 150, 550),
    createHorse("Rusty", 150, 650)

  ];
  
  // Start races and hide button on click
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".start-button").addEventListener("click", function () {
      horses.forEach(horse => horse.startRace());
      this.style.display = "none";
    });
  });
  