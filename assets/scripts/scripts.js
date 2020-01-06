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

// Display a question and its options as a list of buttons.
var questionCount = 0;

function displayQuestion(num) {
  $("#questionHead").text(questions[num].title);

  for (var j = 0; j < questions[num].choices.length; j++) {
    $("#questionOptions").append(
      "<li><button class='choice' data-index=" +
        j +
        ">" +
        questions[num].choices[j] +
        "</button></li>"
    );
  }
}
// Check whether the selected answer is correct
$("#questionBody").click(function(event) {
  console.log(event.target);
  var clickedIndex = parseInt($(event.target).attr("data-index"));
  console.log(clickedIndex);
  if (
    questions[questionCount].choices[clickedIndex] ==
    questions[questionCount].answer
  ) {
    console.log("Correct");
    questionCount++;
    clearQuestions();
    displayQuestion(questionCount);
  } else console.log("Wrong");
});

function clearQuestions() {
  $("#questionHead").text("");
  $("#questionOptions").html("");
}

displayQuestion(questionCount);
