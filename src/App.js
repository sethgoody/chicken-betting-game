let horseList = []
var finishOrder = []
var raceStarted = false
var loseSound
var cheerSound
var bugleSound
var startSound
var cashSound
var winSound
var gallopSound
let isTutorialActive = false
let isMenuUp = false
let isMuted = false

window.onload = (event) => {
    // Set up audio globals
    loseSound = new Audio('./assets/sounds/Disappointed.mp3')
    cheerSound = new Audio('./assets/sounds/Cheer.mp3')
    bugleSound = new Audio('./assets/sounds/Bugle.mp3')
    startSound = new Audio('./assets/sounds/Pistol.mp3')
    cashSound = new Audio('./assets/sounds/Cash.mp3')
    winSound = new Audio('./assets/sounds/Win.mp3')
    gallopSound = new Audio('./assets/sounds/Gallop.mp3');
    // Set scroll position correctly on mobile
    document.getElementById("raceway").scrollIntoView();
    document.getElementById("main").scrollLeft = 0
    // Create a horse object for each element on the page
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    // Set up auto-scroll
    scrollX()
    //Route user
    router()
    // Get local storage
    if(localStorage.getItem("userData")) {
        userData = JSON.parse(localStorage.getItem("userData"))
        document.getElementById('user-funds-text').textContent = userData.funds
        userData.betHorse = null
        userData.betAmount = 0
        saveUserData()
    } else {
        saveUserData()
    }
    // Check for tutorial URL
    if(/\?show_tutorial=true/g.test(window.location.href)) {
        if(userData.funds !== 0) {
            showTutorial()
        }
    } 
}

// Warn user before unloading if they have an active bet
window.onbeforeunload = (event) => {
    if(userData.betAmount) {
        return "You still have a bet!"
    }
};

// Handle resizing while the race is running
window.onresize = (event) => {
    clearInterval(window.scrollInterval)
    scrollX()
    console.log('------------ RESIZED')
}

// Future implementation of URL routes
function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    console.log('------------ url', url)
};

// Start the race
function startRace() {
    let countdownPopup = document.getElementById("countdown-popup")
    showElements(["#countdown-popup"])
    bugleSound.play()
    setTimeout(() => {
        countdownPopup.innerText = "2"
    }, 1000);
    setTimeout(() => {
        countdownPopup.innerText = "1"
    }, 2000);
    setTimeout(() => {
        startSound.play()
        gallopSound.play()
        gallopSound.addEventListener('ended', loopSound, false);
        hideElements(["#countdown-popup"])
        countdownPopup.innerText = "3"
        horseList.forEach((horse) => {
            horse.run()
        })
        scrollX()
    }, 3000);
    raceStarted = true
    if(isMenuUp) {
        toggleMenu()
    }
    hideElements([".bet-button", "#start-button", "#reset-button", "#menu-button"])
}

// Reset the horses
function resetRace() {
    raceStarted = false
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    userData.betAmount = 0
    userData.betHorse = null
    saveUserData()
    document.getElementById("start-button").disabled = false
    document.getElementById("tutorial-button").disabled = false
    document.getElementById("user-bet-text").textContent = "Make a bet!"
    document.getElementById("user-funds-container").innerHTML = `Your funds: $<span id="user-funds-text">${userData.funds}</span>`
    document.getElementById("main").scrollLeft = 0
    hideElements(["#reset-button"])
    showElements(["#dollar-container"])
    document.getElementById("tutorial-button").disabled = false
}

// Move menu up or down
function toggleMenu() {
    let menuElement = document.querySelector(".user-container")
    let menuButton = document.getElementById("menu-button")
    if(menuElement.classList.contains("expanded")) {
        menuElement.classList.remove("expanded")
        menuElement.classList.add("retracted")
        menuButton.textContent = "▲"
        isMenuUp = false
        hideAbout()
    } else {
        menuElement.classList.add("expanded")
        menuElement.classList.remove("retracted")
        menuButton.textContent = "▼"
        isMenuUp = true
    }
}

// Swap between muted and unmuted - can this be more dry?
function toggleMute() {
    let muteButton = document.getElementById("mute-button")
    if(!isMuted) {
        isMuted = true
        loseSound.muted = true;
        loseSound.pause();
        winSound.muted = true;
        winSound.pause();
        bugleSound.muted = true;
        bugleSound.pause();
        startSound.muted = true;
        startSound.pause();
        cashSound.muted = true;
        cashSound.pause();
        gallopSound.muted = true;
        gallopSound.pause()
        muteButton.innerText = "Unmute"
    } else {
        isMuted = false
        loseSound.muted = false;
        winSound.muted = false;
        bugleSound.muted = false;
        startSound.muted = false;
        cashSound.muted = false;
        gallopSound.muted = false
        muteButton.innerText = "Mute"
    }
}

// Display the about section
function showAbout() {
    hideElements([".flex-container", "#menu-button"])
    showElements(["#about"])
}

// Hide the about section - move to toggle function for consistency?
function hideAbout() {
    hideElements(["#about"])
    showElements([".flex-container", "#menu-button"])
}

// Show win popup
function showWinPopup() {
    cheerSound.play();
    winSound.play();
    winSound.addEventListener('ended', loopSound, false);

    let winAmountElement = document.getElementById("win-amount");
    let totalPayout = userData.betAmount * 5; // Calculate total payout
    let increment = Math.max(1, Math.floor(totalPayout / 1000)); // Determine increment dynamically

    window.moneyInterval = setInterval(() => {
        console.log('------------ MONEY INCREMENT RUNNING');
        let currentAmount = Number(winAmountElement.textContent);
        if (currentAmount < totalPayout) {
            winAmountElement.textContent = currentAmount + increment > totalPayout ? totalPayout : currentAmount + increment;
        } else {
            clearInterval(window.moneyInterval);
            winSound.currentTime = 0;
            winSound.pause();
        }
    }, 4); // Run as fast as possible, adjust if necessary

    showElements(["#win-popup"]);
    confetti.start();
    setTimeout(() => {
        confetti.stop();
    }, 4000);

    document.addEventListener('mouseup', function hidePopup(e) {
        var popup = document.getElementById('win-popup');
        if (!popup.contains(e.target)) {
            popup.style.display = 'none';
            document.getElementById("win-amount").textContent = 0;
            userData.betHorse = null;
            userData.betAmount = 0;
            saveUserData();
            this.removeEventListener('mouseup', hidePopup);
        }
    });
}

// Show the tutorial in multiple steps
async function showTutorial() {
    if(!isTutorialActive) {
        isTutorialActive = true
        let menuButton = document.getElementById("menu-button")
        document.getElementById("tutorial-button").disabled = true
        menuButton.style.display = "none"
        if(isMenuUp) {
            toggleMenu()
        }

        let multiContainerElement = document.getElementById("multi-container")
        let dollarContainerElement= document.getElementById("dollar-container")
        let dollarTooltip = document.createElement("div")
        dollarTooltip.textContent = `Bet an amount by tapping one or more of these bills`
        dollarTooltip.className = "tooltip arrow-down"
        multiContainerElement.appendChild(dollarTooltip)
        await new Promise(resolve => {
            dollarContainerElement.addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ DOLLAR CONTAINER LISTENER')
                if(e.target.className.split(' ').includes("dollar-button")) {
                    dollarTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
        })

        let userContainerElement = document.querySelector(".user-container")
        let horseTooltip = document.createElement("div")
        horseTooltip.textContent = `Choose the horse you think will win`
        horseTooltip.className = "tooltip arrow-up"
        userContainerElement.prepend(horseTooltip)
        await new Promise(resolve => {
            document.querySelector("#raceway").addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ RACEWAY CONTAINER LISTENER')
                if(e.target.className.split(' ').includes("bet-button")) {
                    horseTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
        })

        let startTooltip = document.createElement("div")
        startTooltip.textContent = `Tap to start!`
        startTooltip.className = "tooltip arrow-down start-tooltip"
        multiContainerElement.appendChild(startTooltip)
        await new Promise(resolve => {
            multiContainerElement.addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ MULTI CONTAINER LISTENER')
                if(e.target.id === "start-button") {
                    startTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
        })

        let displayContainerElement = document.getElementById("user-display-container")
        let displayTooltip = document.createElement("div")
        displayTooltip.textContent = `View your funds and bet status here`
        displayTooltip.className = "tooltip arrow-down display-tooltip"
        displayContainerElement.appendChild(displayTooltip)
        await new Promise(resolve => {
            setTimeout(() => {
                displayTooltip.remove()
                resolve()
            }, 4000);
        })

        isTutorialActive = false
    }
}