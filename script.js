let quiz = [{
    question: "What is the longest that an elephant has lived?",
    answers: [17, 49, 86, 94],
    correct: 86
},
{
    question: "How many rings are on the Olympic flag?",
    answers: ["None", 4, 5, 7],
    correct: 5
},
{
    question: "How did Spider-Man get his powers?",
    answers: ["Military experiment gone awry", "Born with them", "Woke up with them after a strange dream", "Bitten by a radioactive spider"],
    correct: "Bitten by a radioactive spider"
},

{
    question: "In darts, what's the most points you can score with a single throw?",
    answers: [20, 50, 60, 100],
    correct: 60
},
{
    question: "Which of these animals does NOT appear in the Chinese zodiac?",
    answers: ["Bear", "Rabbit", "Dragon", "Dog"],
    correct: "Bear"
}]


let checkedAnswers = [""];
let currentQuestion = 0;
let backIsAllowed = 1;
let nextIsCalled = 0;

let checkboxes = document.getElementsByClassName("input-checkbox");

function checkOnlyOne(checkbox) {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].checked = false;
        }
    }
}

function start() {
    let username = document.getElementById("username").value;
    document.getElementsByTagName("h4")[0].innerHTML = username;
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementsByClassName("back-button")[0].style.display = "none";
    document.getElementsByClassName("quiz-questions")[0].style.display = "flex";
    next();
}

function isChecked() {
    let isChecked = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isChecked++
            break
        }
    }
    return isChecked != 0 ? true : false;
}

function unCheck() {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function next() {
    if (isChecked() || currentQuestion == 0 || backIsAllowed == 0) {
        if (currentQuestion == 0) {
            document.getElementsByClassName("back-button")[0].style.display = "none";
        }
        if (currentQuestion) {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkedAnswers[currentQuestion - 1] = quiz[currentQuestion - 1].answers[i];
                }
            }

        }
        if (currentQuestion == 1) {
            document.getElementsByClassName("back-button")[0].style.display = "flex";
        }

        document.getElementsByTagName("h5")[0].innerHTML = currentQuestion + 1 + ") " + quiz[currentQuestion].question;
        let ans = document.getElementsByClassName("content");
        for (let i = 0; i < ans.length; i++) {
            ans[i].innerHTML = quiz[currentQuestion].answers[i];

        }
        currentQuestion++;
        if (currentQuestion > 4) {
            document.getElementsByClassName("next-button")[0].style.display = "none";
            document.getElementsByClassName("finish-button")[0].style.display = "flex";
        }

        unCheck();
        if (backIsAllowed == 0 && nextIsCalled > 0) {
            nextIsCalled++;
        }
        if (backIsAllowed == 0 && nextIsCalled > 2) {
            nextIsCalled = 0;
            backIsAllowed = 1;
        }
    }

}

function back() {
    if (currentQuestion > 4) {
        document.getElementsByClassName("next-button")[0].style.display = "flex";
        document.getElementsByClassName("finish-button")[0].style.display = "none";
    }
    if (backIsAllowed) {
        currentQuestion -= 2;
        backIsAllowed--;
        nextIsCalled++;
        next();
    }
}


function finish() {
    if (isChecked()) {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedAnswers[currentQuestion - 1] = quiz[currentQuestion-1].answers[i];
            }
        }
        let score = 0;
        document.getElementsByClassName("finished-container")[0].style.display = "flex";
        document.getElementsByClassName("quiz-questions")[0].style.display = "none";

        let finishedQuestions = document.getElementsByClassName("f-question");
        let correctAnswers = document.getElementsByClassName("correct-answer");
        let userAnswers = document.getElementsByClassName("user-answer");
        for (let i = 0; i < finishedQuestions.length; i++) {
            finishedQuestions[i].innerHTML = i + 1 + ") " + quiz[i].question;
            correctAnswers[i].innerHTML += quiz[i].correct;
            userAnswers[i].innerHTML += checkedAnswers[i];
            if (checkedAnswers[i] == quiz[i].correct) {
                score++;
            }
        }
        document.getElementsByClassName("score-num")[0].innerHTML += score;
    }
}

function retake() {
    currentQuestion = 0;
    document.getElementsByClassName("finished-container")[0].style.display = "none";
    document.getElementsByClassName("finish-button")[0].style.display = "none";
    document.getElementsByClassName("next-button")[0].style.display = "flex";
    document.getElementsByClassName("score-num")[0].innerHTML = "Your score is: ";
    let correctAnswers = document.getElementsByClassName("correct-answer");
    let userAnswers = document.getElementsByClassName("user-answer");
    for (let i = 0; i < correctAnswers.length; i++) {
        correctAnswers[i].innerHTML = "Correct: ";
        userAnswers[i].innerHTML = "Your answer: ";
    }
    start();
}