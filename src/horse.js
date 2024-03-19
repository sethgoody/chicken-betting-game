// Creating images on the DOM
function newImage(url, x, y) {
  let image = document.createElement("img");
  image.src = url;
  image.style.position = "absolute";
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  document.body.append(image);
  return image;
}

// Generating Bojack with a function to start racing
function BoJack(x, y) {
  const runGif = "./assets/BoJack/run.gif";
  const standImg = "./assets/BoJack/tile015.png";
  const element = newImage(standImg, x, y);

  function startRace() {
    element.src = runGif; // Change to running gif when race starts
    let currentPosition = x;

    const interval = setInterval(() => {
      currentPosition += 10; // Adjust the speed if need be
      element.style.left = `${currentPosition}px`;

      // This stops the horse at the end of the viewport - can change to fit track
      if (currentPosition > window.innerWidth - 100) {
        clearInterval(interval);
        element.src = standImg;
      }
    }, 50); // Adjust the interval as needed for smoother animation
  }

  return {
    startRace: startRace,
  };
}

// Placing BoJack on the track
let horse1 = [
    BoJack(150, 250),
    Bullseye()
]

// Links start race button with the start race function
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".start-button")
    .addEventListener("click", function () {
      horse1.startRace();

      document.querySelector(".start-button").style.display = "none";
    });
});
