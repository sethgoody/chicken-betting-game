// // Create and append horses images to the DOM
// function newImage(url, x, y) {
//     let image = document.createElement("img");
//     image.src = url;
//     image.style.position = "absolute";
//     image.style.left = `${x}px`;
//     image.style.top = `${y}px`;
//     document.body.append(image);
//     return image;
//   }

//   // Function to create a horse object with a name and starting position, and a method to start its race
//   function createHorse(name, x, y) {
//     const runGif = `./assets/${name}/run.gif`;
//     const standImg = `./assets/${name}/tile015.png`;
//     const element = newImage(standImg, x, y);

//     function startRace() {
//       element.src = runGif;
//       let currentPosition = x;

//       const interval = setInterval(() => {
//         currentPosition += 10; // Moves horse 10px to the right ----- adjust if need
//         element.style.left = `${currentPosition}px`;

//         if (currentPosition > window.innerWidth - 100) {
//           clearInterval(interval);
//           element.src = standImg;
//         }
//       }, 50);
//     }

//     return { startRace };
//  // }

//   // // Initialize multiple horses
//   // let horses = [
//   //   createHorse("BoJack", 150, 220),
//   //   createHorse("Copenhagen", 150, 320),
//   //   createHorse("Bullseye", 150, 420),
//   //   createHorse("Pegasus", 150, 520),
//   //   createHorse("Rusty", 150, 620)

//   // ];

//   // Start races and hide button on click
//   document.addEventListener("DOMContentLoaded", () => {
//     document.querySelector(".start-button").addEventListener("click", function () {
//       horses.forEach(horse => horse.startRace());
//       this.style.display = "none";
//     });
//   });

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
