let questions = ["What is the longest that an elephant has lived?", "How many rings are on the Olympic flag?", "How did Spider-Man get his powers?",
    "In darts, what's the most points you can score with a single throw?", "Which of these animals does NOT appear in the Chinese zodiac?"];
let answers = {
    0: [17, 49, 86, 94],
    1: ["None", 4, 5, 7],
    2: ["Military experiment gone awry", "Born with them", "Woke up with them after a strange dream", "Bitten by a radioactive spider"],
    3: [20, 50, 60, 100],
    4: ["Bear", "Rabbit", "Dragon", "Dog"]
}
let checkedAnswers = [];
let currentQuestion = 0;
let backIsAllowed = 0;

function start() {
    let username = document.getElementById("username").value;
    document.getElementsByTagName("h4")[0].innerHTML = username;
    document.getElementsByClassName("container")[0].style.display = "none";
    next();
}


function next() {
    document.getElementsByTagName("h5")[0].innerHTML = questions[currentQuestion];
    
    let ans = document.getElementsByClassName("content")
    for (let i = 0; i < 4; i++) {
        ans[i].innerHTML += answers[currentQuestion][i];
    }
    currentQuestion++;
}