// Detect iOS
function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

// Set user data
function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData))
}

// Generate a random number between to integers
function randomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Hide elements based on an array of ".class-names"
function hideElements(identifierArray) {
    identifierArray.forEach(className => {
        document.querySelectorAll(className).forEach((element) => {
            element.style.display = "none"
        })
    })
}

// Show elements based on an array of ".class-names"
function showElements(identifierArray) {
    identifierArray.forEach(className => {
        document.querySelectorAll(className).forEach((element) => {
            element.style.display = "flex"
        })
    })
}

// Loop sound
function loopSound() {
    this.play()
}

// Scroll along the x axis if the window isn't wide enough to fit the track
function scrollX() {
    let scrollPosition = 0
    let selectedHorse = document.getElementById(userData.betHorse)
    if (window.innerWidth < 1735 && raceStarted) {
        if (iOS()) {
            setTimeout(() => {
                window.scrollInterval = setInterval(function () {
                    console.log('------------ AUTO SCROLL RUNNING ON iOS')
                    scrollPosition += 2
                    document.getElementById("main").scrollTo(scrollPosition, 0)
                }, 10)
            }, 1500);
        } else {
            window.scrollInterval = setInterval(function () {
                console.log('------------ AUTO SCROLL RUNNING')
                if (selectedHorse.offsetLeft + 500 > window.innerWidth) {
                    selectedHorse.scrollIntoView()
                    // document.getElementById("main").scrollTo(selectedHorse.offsetLeft - 100, 0)
                }
                // Is this a better option?
                // horseList.forEach((horse) => {
                //     if(horse.horseElement.offsetLeft + 200 > window.innerWidth) {
                //         horse.horseElement.scrollIntoView()
                //     }
                // })

            }, 10)
        }
    }
}