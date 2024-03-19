var userData = {
    funds: 100000, // Set starting cash here
    betHorse: null,
    betAmount: 0,
}


function placeHorseBet(horseId) {
    let userBetText = document.getElementById("user-bet-text")
    userData.betHorse = horseId
    saveUserData()
    userBetText.textContent = `You bet $${userData.betAmount} on ${userData.betHorse}!`
    showElements(["#start-button"])
    hideElements([".bet-button", "#dollar-container"])
}

function getUserTotalMoney() {
    return userData.funds; // Return the user's total funds from the userData object
}

function placeAllMoneyBet() {
    var totalMoney = getUserTotalMoney(); // Assume this function returns the user's total money
    placeDollarBet(totalMoney);



}


function placeDollarBet(amount) {
    let userFundsContainer = document.getElementById("user-funds-container")
    let userFundsText = document.getElementById("user-funds-text")
    if (!raceStarted) {
        document.getElementById("tutorial-button").disabled = true;
        
        // Check if the bet amount is greater than 0

        if (amount <= 0) {
            clearTimeout(window.fundsAlert);
            userFundsContainer.innerHTML = `<div style='color: rgb(211, 0, 0)'>Not enough funds! $<span id="user-funds-text">${userData.funds}</span></div>`;
            window.fundsAlert = setTimeout(() => {
                userFundsContainer.innerHTML = `Your funds: $<div id="user-funds-text">${userData.funds}</div>`;
            }, 2000);
            return;
        }
        
        if (amount > userData.funds) {
            clearTimeout(window.fundsAlert);
            userFundsContainer.innerHTML = `<div style='color: rgb(211, 0, 0)'>Not enough funds! $<span id="user-funds-text">${userData.funds}</span></div>`;
            window.fundsAlert = setTimeout(() => {
                userFundsContainer.innerHTML = `Your funds: $<div id="user-funds-text">${userData.funds}</div>`;
            }, 2000);
            return;
        }

        cashSound.currentTime = 0
        cashSound.play()
        userData.betAmount += amount
        userData.funds -= amount
        saveUserData()
        document.getElementById("user-bet-text").textContent = `You bet $${userData.betAmount}!`
        userFundsText.textContent = userData.funds
        showElements([".bet-button"])

        // Floating numbers indicating subtraction of funds
        let damageText = document.createElement("div")
        damageText.textContent = `-$${amount}`
        damageText.className = "damage-text"
        userFundsText.appendChild(damageText)
    }
}

function resetUser() {
    if(confirm("Are you sure you would like to reset your funds?")) {
        localStorage.clear()
        userData = {
            funds: 100000, 
            betHorse: null,
            betAmount: 0,
        }
        saveUserData()
        document.getElementById("user-bet-text").innerHTML = `Make a bet!`
        document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${userData.funds}</div>`
        toggleMenu()
        window.location.reload()
    }
}

// var user = {


//     placeHorseBet: function(horseId) {
//         this.betHorse = horseId
//         document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount} on ${this.betHorse}!`
//         showElements(["#start-button"])
//         hideElements([".bet-button", "#dollar-container"])
//     },

//     placeDollarBet: function(amount) {
//         if(!raceStarted) {
//             document.getElementById("tutorial-button").disabled = true
//             if(amount > user.funds) {
//                 clearTimeout(window.fundsAlert)
//                 document.getElementById("user-funds-container").innerHTML = `<div style='color: rgb(211, 0, 0)'>Not enough funds! $${this.funds}</div>`
//                 window.fundsAlert = setTimeout(() => {
//                     document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${this.funds}</div>`
//                 }, 2000);
//                 return
//             }
//             document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${this.funds}</div>`

//             this.betAmount += amount
//             this.funds -= amount
//             document.getElementById("user-funds-text").textContent = this.funds
//             document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount}!`
//             showElements([".bet-button"])

//             let damageText = document.createElement("div")
//             damageText.textContent = `-$${amount}`
//             damageText.className = "damage-text"
//             document.getElementById("user-funds-text").appendChild(damageText)

//         }
//     }
// }