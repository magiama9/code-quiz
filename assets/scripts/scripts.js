/*
*****************************************
# Code Quiz Homework

* Timer based quiz application on coding fundamentals.

* Start with landing page to begin quiz

  *?? Offer the choice of different quizzes??

  * Let user take the timed quiz
    * Check user's answers
    * Score user based on correct answers and time used
    * Display final score
    * Allow user to save their score
    * Display a list of high scores

*****************************************


## Pseudocode

  * Make the start quiz button load the first question
  * Each question should automatically go to the next question if the answer is correct
  * Display the correct answer if the answer was wrong.
  
  * At the end of the quiz, display the user's final score.
  * Save the score to local storage

*****************************************

*/

// Global Variables
var questionCount = 0;
var secondsLeft = 0;
var currentScore = 0;
var highScores = { name: [], score: [] };

// Display a question and its options as a list of buttons.
function displayQuestion(num) {
  $("#questionHead").text(questions[num].title);

  for (var j = 0; j < questions[num].choices.length; j++) {
    $("#questionOptions").append(
      "<li class='list-group-item border-0'><a class='choice btn btn-primary' tabindex=" +
        j +
        ">" +
        questions[num].choices[j]
    );
  }
}
/* Check whether the selected answer is correct and iterate through 
 to the next question if the answer was correct. */
$("#questionBody").click(function(event) {
  var clickedIndex = parseInt($(event.target).attr("tabindex"));
  if (
    questions[questionCount].choices[clickedIndex] ==
    questions[questionCount].answer
  ) {
    console.log("Correct");
    questionCount++;
    currentScore += 10;
    clearQuestions();
    if (questionCount < questions.length) {
      displayQuestion(questionCount);
    } else {
      gameOver();
    }
  } else {
    currentScore -= 5;
    $(event.target).attr({
      "data-toggle": "popover",
      title: "Wrong Answer. Try Again",
      "data-trigger": "focus"
    });
    // Ensures popover only happens if a button is clicked, not a random space in the div
    if (clickedIndex >= 0) {
      $(event.target).popover("toggle");
    }
    console.log("Wrong");
  }
  updateScore();
});

// Clears out content of question area so next question can be filled in
function clearQuestions() {
  $("#questionHead").text("");
  $("#questionOptions").html("");
  $("body").popover("hide");
}

// Makes start button start the timer and display the first question
$("#start").click(function() {
  $(this).addClass("d-none");
  displayQuestion(questionCount);
  $("#timer").removeClass("d-none");
  $("#score").removeClass("d-none");
  timeLimit();
  timer();
});

// Determine time limit based on number of questions
function timeLimit() {
  secondsLeft = questions.length * 10;
  $("#timeLeft").text(secondsLeft);
}

// Countdown timer
function timer() {
  var timeRemaining = setInterval(function() {
    secondsLeft--;
    $("#timeLeft").text(secondsLeft);
    if (secondsLeft === 0) {
      $("#timeLeft").text("TIME'S UP!");
      clearQuestions();
      clearInterval(timeRemaining);

      // Waits two seconds after time running out then runs game end functions.
      setTimeout(function() {
        updateScore();
        gameOver();
      }, 2000);
    }
  }, 1000);
}

// Updates current score
function updateScore() {
  $("#currentScore").text(currentScore);
}

// Handles quiz end
function gameOver() {
  $("#finalScoreSpan").text(currentScore);
  $("#saveModal").modal();
  // $("#saveScore").removeClass("d-none");
  $("#timer").addClass("d-none");
  $("#score").addClass("d-none");
}

// Handles click/submit event on the score save form
$("#save").click(function() {
  event.preventDefault();
  save($("#name").val());
});

// Saves score to local storage and displays highscore list
function save(str) {
  highScores.score.push(currentScore);
  highScores.name.push(str);
  localStorage.setItem("highscores", JSON.stringify(highScores.score));
  localStorage.setItem("names", JSON.stringify(highScores.name));
  $("#saveModal").modal("hide");
  displayScores();
}

// Displays high scores list. Function is called in save()
function displayScores() {
  var highScoresStr = localStorage.getItem("highscores");
  var scoreNameStr = localStorage.getItem("names");
  highScores.score = JSON.parse(highScoresStr);
  highScores.name = JSON.parse(scoreNameStr);
  $("#highScoresDiv").removeClass("d-none");
  $("#saveScore").addClass("d-none");
  for (var i = 0; i < highScores.score.length; i++) {
    $("#highScoreList").append(
      "<li class='list-group-item border-0'>" +
        highScores.name[i] +
        ":" +
        highScores.score[i]
    );
  }
}
