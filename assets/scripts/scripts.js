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
function displayQuestion(i) {
  $("#questionHead").text(questions[i].title);

  for (var j = 0; j < questions[i].choices.length; j++) {
    $("#questionOptions").append(
      "<li><button class='choice' data-index=" +
        j +
        ">" +
        questions[i].choices[j] +
        "</button></li>"
    );
  }
}
// Check whether the selected answer is correct
$("#questionBody").click(function(event, i) {
  console.log(event.target);
  var clickedIndex = parseInt($(event.target).attr("data-index"));
  console.log(clickedIndex);
  if (questions[i].choices[clickedIndex] === questions[i].answer) {
    console.log("Correct");
  } else console.log("Wrong");
});

displayQuestion(5);
