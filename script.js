const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Machine Language', correct: false },
            { text: 'Hyper Tool Multi Language', correct: false },
            { text: 'Home Text Markup Language', correct: false }
        ]
    },
    {
        question: 'Which language is used for styling web pages?',
        answers: [
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: true },
            { text: 'JavaScript', correct: false },
            { text: 'Python', correct: false }
        ]
    },
    {
        question: 'Which symbol is used for comments in JavaScript?',
        answers: [
            { text: '<!-- comment -->', correct: false },
            { text: '// comment', correct: true },
            { text: '# comment', correct: false },
            { text: '** comment **', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Creative Style System', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Which method is used to select an element in JavaScript?',
        answers: [
            { text: 'document.querySelector()', correct: true },
            { text: 'document.findElement()', correct: false },
            { text: 'document.getStyle()', correct: false },
            { text: 'document.select()', correct: false }
        ]
    }
];

const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const answerButtons = document.querySelector('.answer-buttons');
const nextBtn = document.querySelector('.next-btn');

const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const scoreText = document.querySelector('.score-text');
const restartBtn = document.querySelector('.restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');

    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer.text;

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hidden');
    answerButtons.innerHTML = '';
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }

        button.disabled = true;
    });

    nextBtn.classList.remove('hidden');
}

function showScore() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');

    scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
}

function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', startQuiz);

startQuiz();