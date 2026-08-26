//DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionSpan = document.getElementById('question-length');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('question-length');
const resultMessage = document.getElementById('result-msg');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)
function startQuiz(){
    console.log('Quiz Started');
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove('active')
    quizScreen.classList.add('active')
    showQuestion();
}
function showQuestion (){
    // reset state
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;
    
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        // Dataset is prop of button element for storinrg custom data, .correct can be changed to anything
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })
}
function selectAnswer(event){
    // optimization check to ensure answer is not clicked twice fro multiple points
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    // Array.from converts the list to an array so we can use foreach loop
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        } else if(button === selectedButton) {
            button.classList.add('incorrect');
        }
    });
    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        // check for more questions
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);

}
function showResult(){
    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    const percentage = (score/quizQuestions.length) * 100;
    console.log(percentage)
    if(percentage<=40){
        resultMessage.textContent = "You're a failure! You can never make it!!"
        resultMessage.style.color = 'red'
    } else if(percentage===50){
        resultMessage.textContent = "You're just at the middle! Try a little harder to tip the scale"
    } else if(percentage<=60){
        resultMessage.textContent = "That was an average result! We get that everyday"
    } else if(percentage<=75){
        resultMessage.textContent = "Due bist gut genug!"
    } else if(percentage<=100){
        resultMessage.textContent = "Perfect! You're a fucking Genius!!!"
        resultMessage.style.color = 'green'
    }
}
function restartQuiz(){

    startQuiz();
    resultScreen.classList.remove('active');
    console.log('Quiz Restarted');
}
