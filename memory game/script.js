
let game_data = {
    face: [
        "img/monsters-01.png",
        "img/monsters-02.png",
        "img/monsters-03.png",
        "img/monsters-04.png",
        "img/monsters-05.png",
        "img/monsters-06.png",
        "img/monsters-07.png",
        "img/monsters-08.png",
        "img/monsters-01.png",
        "img/monsters-02.png",
        "img/monsters-03.png",
        "img/monsters-04.png",
        "img/monsters-05.png",
        "img/monsters-06.png",
        "img/monsters-07.png",
        "img/monsters-08.png",
    ],
    temp: false,
    firstCard: undefined,
    secondCard: undefined,
    count: 0,
    loader: 5
}
game_data.face.sort(() => 0.5 - Math.random());
const img = document.querySelectorAll("img");

create_game();

function create_game() {
    img.forEach((e, index) => {
        e.addEventListener("click", function () {
            valid(e, index);
        });
    });
}

function valid(ele, index) {
    if (game_data.firstCard == undefined || game_data.secondCard == undefined) {
        ele.setAttribute("src", game_data.face[index]);
        if (!game_data.temp) {
            game_data.firstCard = ele;
            game_data.temp = true;
        } else {
            game_data.secondCard = ele;
            game_data.temp = false;
        }
        if (game_data.firstCard.getAttribute("id") == game_data.secondCard.getAttribute("id")) {
            game_data.secondCard = undefined;
            game_data.temp = true;
        }
        else if (game_data.firstCard != undefined && game_data.secondCard != undefined) {
            checkMatch();
        }
    }
}


function checkMatch() {
    if (game_data.firstCard.getAttribute("src") == game_data.secondCard.getAttribute("src") &&
        game_data.firstCard.getAttribute("id") != game_data.secondCard.getAttribute("id")) {
        document.getElementById("result").innerHTML = "Match";
        document.getElementById("result").style.color = "gold";
        game_data.score++;
        setTimeout((a, b) => {
            document.getElementById("result").innerHTML = "";
            a.style.visibility = 'hidden';
            b.style.visibility = 'hidden';
        }, 1000, game_data.firstCard, game_data.secondCard);
        game_data.count++;
        if (game_data.count == 8) {
            counter();
        }
    } else {
        document.getElementById("result").innerHTML = "Not match,but don't worry try again";
        document.getElementById("result").style.color = "#d9534f";
        setTimeout((a, b) => {
            document.getElementById("result").innerHTML = "";
            a.setAttribute("src", "img/back_card.png");
            b.setAttribute("src", "img/back_card.png");
        }, 1000, game_data.firstCard, game_data.secondCard);
    }
    game_data.firstCard = undefined;
    game_data.secondCard = undefined;
    game_data.temp = false;
}

function restGame() {
    game_data.count = 0;
    game_data.loader = 5;
    game_data.score = 0;
    game_data.face.sort(() => 0.5 - Math.random());
    document.getElementById("result").innerHTML = ``;
    img.forEach((e) => {
        e.setAttribute("src", "img/back_card.png");
        e.style.visibility = "visible";
    });
}

function counter() {
    let myTimer = setInterval(function () {
        document.getElementById("result").innerHTML = `Congratulations! You found them all!.The new game strating: ${game_data.loader}`;
        game_data.loader--;
        if (game_data.loader == -1) {
            clearInterval(myTimer);
            restGame();
        }
    }, 1000);
}