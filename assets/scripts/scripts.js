/*
*****************************************
*****************************************

# Code Quiz Homework

* Timer based quiz application on coding fundamentals.

* Start with landing page to begin quiz

  * ?? Offer the choice of different quizzes??

  * Let user take the timed quiz
    * Check user's answers
    * Score user based on correct answers and time used
    * Display final score
    * Allow user to save their score
    * Display a list of high scores

*****************************************
*****************************************
*/

// Global Variables
var questionCount = 0;
var secondsLeft = 0;
var currentScore = 0;
var highScores = [];

// Called to fetch any scores from storage when page loads
fetchScores();

// Display a question and its options as a list of buttons.
function displayQuestion(num) {
  $("#questionHead").text(questions[num].title);

  for (var j = 0; j < questions[num].choices.length; j++) {
    $("#questionOptions").append(
      "<li class='list-inline-item border-0 mb-n2'><a class='choice btn btn-primary' tabindex=" +
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
      "data-trigger": "focus",
      "data-placement": "bottom"
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
  $("#timer").addClass("d-none");
  $("#score").addClass("d-none");
}

/* Handles click event on the score save form.
N.B. DOES NOT HANDLE PROPERLY IF USER HITS ENTER */
$("#save").click(function() {
  event.preventDefault();
  $("#saveModal").modal("hide");
  fetchScores();
  $("#name").text("");
  switchPage();
  resetStart();
});

function fetchScores() {
  // Fetches scored stores from local storage or returns an empty array if it doesn't exist.
  var storedScores = JSON.parse(localStorage.getItem("storedScores") || "[]");

  // Only pushes a new score to the array if the user entered a value for their name.
  if ($("#name").val() != 0) {
    var userScore = {
      name: $("#name").val(),
      score: currentScore
    };
    storedScores.push(userScore);
  }

  // Clears out content of high score list so it can be refilled.
  $("#highScoreList").html("");

  // Iterates through the scores and appends them to the score list
  for (var i = 0; i < storedScores.length; i++) {
    $("#highScoreList").append(
      "<li class='list-group-item border-0'>" +
        storedScores[i].name +
        "---" +
        storedScores[i].score
    );
  }
  // Updates local storage
  localStorage.setItem("storedScores", JSON.stringify(storedScores));

  // Sets the name field to blank so the same score isn't added repeatedly
  $("#name").text("");
}

// Changes the page when a nav link is clicked display
$(".nav-link").click(function() {
  switchPage();
});

// Toggles display of elements
function switchPage() {
  $("#quizPage").toggleClass("active");
  $("#highScorePage").toggleClass("active");
  $("#quizBody").toggleClass("d-none");
  $("#highScoresDiv").toggleClass("d-none");
}

// Resets the score and question count so user can take the quiz again
function resetStart() {
  $("#start").toggleClass("d-none");
  questionCount = 0;
  currentScore = 0;
}
