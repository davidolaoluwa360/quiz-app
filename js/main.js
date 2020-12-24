import {quizApp} from "./quiz.service.js";


let currentQuestion = 0;
const submit = document.querySelector("form");
const answers = [];
let score = 0;

function loadQuiz(data){
    let questionName = document.getElementById("question-head");
    let optA = document.getElementById("a-text");
    let optB = document.getElementById("b-text");
    let optC = document.getElementById("c-text");
    let optD = document.getElementById("d-text");

    // Changing the document context
    questionName.innerHTML = data.question;
    optA.innerHTML =  data.a;
    optB.innerHTML = data.b;
    optC.innerHTML = data.c;
    optD.innerHTML = data.d;
}

window.onload = function(){
    loadQuiz(quizApp.getQuestion(currentQuestion));
};

function checkAnswer(value){
    const correct = quizApp.getQuestion(currentQuestion).correct;
    return value.value === correct ? {value: "correct"} : {value: "incorrect", answer: correct, question_num: currentQuestion + 1};
} 

function deSelectRadio(){
    let inputElm = document.getElementsByTagName("input");
    Array.from(inputElm).forEach(elm => {
        elm.checked = false;
    });
}

function displayAnswers(totalScore, questionNumber){
    const displayScore = 
    `<div>
        <h1 style="text-align: center; color: #8e44ad; font-weight:bolder">Your Score</h1> 
        <p style="text-align: center; font-weight:bolder; font-size: 1.4rem">${totalScore} / ${questionNumber}</p>
    </div>`;
    return displayScore;
}

submit.addEventListener("submit", (event) => {
    const element = submit.elements.options;

    if(element.value === "")
    {
        event.preventDefault();
    }
    else
    {
        answers.push(checkAnswer(element));
        if(checkAnswer(element).value === "correct"){
            score++;
        }

        if(currentQuestion === quizApp.getQuestions().length-1){
            let form= document.querySelector("form");
            let header = document.querySelector("#question-head");
            let quiz_header = document.querySelector(".quiz-header");
            form.style.display = "none";
            header.style.display = "none";

            const btn = document.getElementById("submit");
            btn.setAttribute("disabled", true);
            btn.innerHTML = "Congratulation You Made It";

            setInterval(() => {
                btn.style.display = "none";
            }, 4000);

            quiz_header.innerHTML = displayAnswers(score, currentQuestion + 1);
        }else{
            deSelectRadio();
            currentQuestion++;
            loadQuiz(quizApp.getQuestion(currentQuestion));
        }
        event.preventDefault();
    }
});


