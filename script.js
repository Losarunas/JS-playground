let firstCardFlipped = false;
let gamePause = false;
let gameOverVar = false;
let countFlips = 0;
let numOfCardsInGame = 0;
let cardsFlipped = 0;
let firstCard, secondCard;

const easyBtn = document.querySelector(".btnEasy"),
    normalBtn = document.querySelector(".btnNormal"),
    hardBtn = document.querySelector(".btnHard"),
    levelsUI = document.querySelector(".levels"),
    countFlipsUI = document.querySelector(".flips-count"),
    messageUI = document.querySelector(".message"),
    cardListEl = document.querySelector(".card-list");


easyBtn.addEventListener("click", function (e) {
    removeBtn();
    createCards(4);
    timer(5);
    e.preventDefault();
});

normalBtn.addEventListener("click", function (e) {
    removeBtn();
    createCards(7);
    timer(45);
    e.preventDefault();
});

hardBtn.addEventListener("click", function (e) {
    removeBtn();
    createCards(10);
    timer(60);
    e.preventDefault();
});

function removeBtn() {
    //Remove all buttons
    while (levelsUI.firstChild) {
        levelsUI.removeChild(levelsUI.firstChild);
    }

    // Create new button 'reset'
    resetBtn = document.createElement('a');
    resetBtn.setAttribute('class', 'reset-btn');
    resetBtn.setAttribute('href', '#');
    resetBtn.innerHTML = "Reset";
    levelsUI.appendChild(resetBtn);

    resetButton();
}

function createCards(numOfCards) {

    numOfCardsInGame = numOfCards;

    // Create two same cards
    for (let y = 0; y < 2; y++) {

        // Create cards
        for (let i = 0; i < numOfCards; i++) {
            // Create div .card
            let div = document.createElement("div");
            div.classList.add("card");
            div.style.order = randomNum();

            // Create card back 
            let back = document.createElement("div");
            back.classList.add("back");
            let imgBack = document.createElement("img");
            imgBack.src = `./img/${i+1}.png`;
            back.appendChild(imgBack);
            div.appendChild(back);

            // Create card front
            let front = document.createElement("div");
            front.classList.add("front");
            let img = document.createElement("img");
            img.src = './img/back.png';
            front.appendChild(img);
            div.appendChild(front);

            // Append all
            cardListEl.appendChild(div);
        }
    }
    flipCards();

}

function flipCards() {

    // Looping through all created cards
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((e) => {
        e.addEventListener("click", flipCard);
    });
}

function flipCard() {
    if (gamePause) return;
    this.classList.add("flip");
    let element = this;
    countFlips++;
    countFlipsUI.innerHTML = countFlips;
    startGame(element);
}

function resetButton() {
    resetBtns = document.querySelector('.reset-btn');
    resetBtns.addEventListener("click", function (e) {
        location.reload();
        e.preventDefault();
    });
}

function startGame(element) {
    if (!firstCardFlipped) {
        firstCard = element;
        firstCardFlipped = true;
    } else {
        secondCard = element;

        if (firstCard === secondCard) {
            console.log("Dont cheat;x!");
            secondCard = '';
        } else {
            checkCards();
            firstCardFlipped = false;
            
            // Check all cards flipped
            if (numOfCardsInGame === cardsFlipped) {
                gameOver("You won!", "green");
            }
        }
    }
}

function checkCards() {
    if (firstCard.firstElementChild.innerHTML === secondCard.firstElementChild.innerHTML) {
        removeListener();
        cardsFlipped++;
    } else {
        gamePause = true;
        setTimeout(function () {
            unflipCards();
            gamePause = false;
        }, 600);
    }
}

function removeListener() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard = '';
    secondCard = '';
}

function timer(timeleft) {
    let downloadTimer = setInterval(function () {
        if (gameOverVar) return;
        document.querySelector(".timer").innerHTML = timeleft + " s";
        timeleft -= 1;

        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.querySelector(".timer").innerHTML = "Game Over";
            gamePause = true;
            gameOver("Time! You lost!", "red");
        }
    }, 1000);
}

function gameOver(msgText, msgColor) {
    messageUI.style.opacity = 1;
    messageUI.style.background = msgColor;
    messageUI.innerHTML = msgText;
    console.log("you Won");
    gameOverVar = true;
    removeMessage();
}

function removeMessage() {
    setTimeout(function () {
            messageUI.style.opacity = 0;
        },
        4000);

}

function randomNum() {
    let number = Math.floor(Math.random() * (numOfCardsInGame * 2) + 1);
    return number;
}
