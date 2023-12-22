const questions = [
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is the last letter of the Greek alphabet?",
        "correct_answer": "Omega",
        "incorrect_answers": [
            "Mu",
            "Epsilon",
            "Kappa"
        ]
    },
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "easy",
        "question": "According to Sherlock Holmes, &quot;If you eliminate the impossible, whatever remains, however improbable, must be the...&quot;",
        "correct_answer": "Truth",
        "incorrect_answers": [
            "Answer",
            "Cause",
            "Source"
        ]
    },
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What was the original name of the search engine &quot;Google&quot;?",
        "correct_answer": "BackRub",
        "incorrect_answers": [
            "CatMassage",
            "SearchPro",
            "Netscape Navigator"
        ]
    },
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which country, not including Japan, has the most people of japanese decent?",
        "correct_answer": "Brazil",
        "incorrect_answers": [
            "China",
            "South Korea",
            "United States of America"
        ]
    },
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "hard",
        "question": "How many notes are there on a standard grand piano?",
        "correct_answer": "88",
        "incorrect_answers": [
            "98",
            "108",
            "78"
        ]
    },
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "hard",
        "question": "In the MMO RPG &quot;Realm of the Mad God&quot;, what dungeon is widely considered to be the most difficult?",
        "correct_answer": "The Shatter&#039;s",
        "incorrect_answers": [
            "Snake Pit",
            "The Tomb of the Acient&#039;s",
            "The Puppet Master&#039;s Theater"
        ]
    }
]

// your game code goes here


function startGame() {
    const playerName = document.getElementById('playerName').value;
    if (playerName.trim() !== '') {
        alert('Hello ' + playerName + '! Click On Play and Let\'s start the game!');

        // We will now be redirected to the quiz page
        const playButton = document.createElement('button');
        playButton.innerText = 'Play';
        playButton.classList.add('btn');
        playButton.addEventListener('click', () => {
            window.location.href = 'playground.html';
        });

        const ctaContainer = document.querySelector('.cta');
        ctaContainer.innerHTML = '';
        ctaContainer.appendChild(playButton);
    } else {
        alert('Please enter your name.');
    }
}

const questionTimeLimit = 15; // Time limit for each question in seconds
let timer; // Timer variable

function startTimer() {
    let timeRemaining = questionTimeLimit;
    const timerDisplay = document.getElementById('timer');

    timer = setInterval(() => {
        timerDisplay.innerText = `Time left: ${timeRemaining} seconds`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            timerDisplay.innerText = 'Time\'s up!';
            // Move to the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                displayResults();
            }
        }

        timeRemaining--;
    }, 1000); // Update every second
}

function resetTimer() {
    clearInterval(timer);
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = ''; // Clear timer display
}



const answerButtons = document.getElementById('answer-buttons');
let currentQuestionIndex = 0;
let score = 0;
let isQuestionDisplayed = false; 
let correctCounter = 0;


function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];

    const answerChoices = [...question.incorrect_answers, question.correct_answer];

    questionContainer.innerHTML = `
        <h1>Question ${currentQuestionIndex + 1}:</h1>
        <p>${question.question}</p>
        <div id="answer-buttons">
            ${answerChoices.map((choice, index) => `
                <button class="ans-btn" onclick="selectAnswer(this)">${choice}</button>
            `).join('')}
        </div>
        <p>Correct Answers: ${correctCounter}</p>
    `;

    isQuestionDisplayed = true;
    
}

function showCorrectAnswer() {
    const question = questions[currentQuestionIndex];
    alert(`The correct answer is: ${question.correct_answer}`);
}

function displayResults() {

    const questionCard = document.querySelector('.question-card');
    questionCard.innerHTML = `
        <h2>Results</h2>
        <p>Total Questions: ${questions.length}</p>
        <p>Correct Answers: ${correctCounter}</p>
        <p>Incorrect Answers: ${questions.length - correctCounter}</p>
        <p>Your Score: ${score}/${questions.length}</p>
    `;

    const controlButton = document.getElementById('control-btn');
    controlButton.style.display = 'block';
    controlButton.innerText = 'Play Again';
    controlButton.addEventListener('click', () => {
        // Redirect to the index page
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', displayQuestion);


function selectAnswer(button) {
    if (!isQuestionDisplayed) {
        return;  // Do nothing if the question is not displayed yet
    }

    const selectedAnswer = button.innerText;
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.correct_answer;

    if (selectedAnswer === correctAnswer) {
        // Correct Answer
        alert('Correct Answer!');
        score++;
        correctCounter++;
    } else {
        // Incorrect answer but will also tell the user the correct answer
        alert(`Wrong Answer! The correct answer is: ${correctAnswer}`);
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // No more questions
        const controlBtn = document.getElementById('control-btn');
        controlBtn.style.display = 'block';
        alert(`Quiz Ended!`);
    }
}

const controlButton = document.getElementById('control-btn');
controlButton.addEventListener('click', displayResults);

