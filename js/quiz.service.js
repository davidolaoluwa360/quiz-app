const quizData = [
    {
        question: "What is the capital of Nigeria?",
        a: "Lagos",
        b: "Ibadan",
        c: "Abuja",
        d: "Akure",
        correct: "c"
    }, 
    {
        question: "What is the best programming language in 2019?",
        a: "Python",
        b: "Javascript",
        c: "C++",
        d: "Java",
        correct: "b"
    }, 
    {
        question: "Who is the current president of the United State?",
        a: "Florin Pop",
        b: "Naira Marley",
        c: "Donald Trump",
        d: "Biden",
        correct: "d"
    }, 
    {
        question: "What does HTML stands for?",
        a: "Hypertext Markup Language",
        b: "How To Make Love",
        c: "Holly Timer Markup Language",
        d: "Cascading stylesheet",
        correct: "a"
    },
    {
        question: "What Year was Javascript lunched?",
        a: "2020",
        b: "2007",
        c: "2018",
        d: "None Of The Above",
        correct: "d"
    },    
];

let quizApp = (function(){
    return{
        getQuestion: function(data){
            return quizData[data];
        },
        getQuestions: function(){
            return quizData;
        }
    };
})();

export {quizApp};