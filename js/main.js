// The quiz App is been inported to the main.js
import {quizApp} from "./quiz.service.js";

// here the currentQustion index is been set to zero
let currentQuestion = 0;
// The selector below get the forms element from the Dom
const submit = document.querySelector("form");
// below determines the total users scores
const answers = [];
let score = 0;

// The function below loads the quiz
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

// The the window is been loaded the loadQuiz function triggers
window.onload = function(){
    loadQuiz(quizApp.getQuestion(currentQuestion));
};

// The function below checks if the checked answers are correct
function checkAnswer(value){
    const correct = quizApp.getQuestion(currentQuestion).correct;
    return value.value === correct ? {value: "correct"} : {value: "incorrect", answer: correct, question_num: currentQuestion + 1};
} 

// The function below deselect the radio button
function deSelectRadio(){
    let inputElm = document.getElementsByTagName("input");
    Array.from(inputElm).forEach(elm => {
        elm.checked = false;
    });
}

// The function below contains an html that display the users scores
function displayAnswers(totalScore, questionNumber){
    const displayScore = 
    `<div>
        <h1 style="text-align: center; color: #8e44ad; font-weight:bolder">Your Score</h1> 
        <p style="text-align: center; font-weight:bolder; font-size: 1.4rem">${totalScore} / ${questionNumber}</p>
    </div>`;
    return displayScore;
}

// here is an event handler that triggers when the form is been submitted
submit.addEventListener("submit", (event) => {
    const element = submit.elements.options;

    // here I am checking if the the checked value is none then I prevent the user from submitting
    if(element.value === "")
    {
        event.preventDefault();
    }
    else
    {
        // here the users score is been stored
        answers.push(checkAnswer(element));
        if(checkAnswer(element).value === "correct"){
            score++;
        }

        // if the length of the quiz data is equal to the currentQuestion
        // then the we display the score and then disabled the submit button
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
            // if there is still more question that means when the submit button is click and it is not null
            // we increment the currentQuestion and load anotherquiz
            deSelectRadio();
            currentQuestion++;
            loadQuiz(quizApp.getQuestion(currentQuestion));
        }
        // event.preventDefault is used here to prevent the form from submitting
        event.preventDefault();
    }
});


