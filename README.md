# Code Quiz

This is the repository and application for the "Code Quiz" homework assignment.

## About This Application

This application is a simple quiz app currently testing basic JavaScript knowledge. The application is designed so that additional questions can be added without changing or breaking any functionality. The content, scoring, and timing dynamically update based on the number of available questions.

Currently, the quiz contains 10 questions about basic JavaScript terminology and functionality.

Users receive 10 points for each correct answer and lose 5 points for each incorrect answer. Users are able to save and view their scores.

## Technical

The application reads questions formatted as an array of objects loaded in from another file "/assets/scripts/questions.js". The application utilizes local storage to allow users to save and view their scores.

The application utilizes the following frameworks and libraries:
*Jquery
*Bootstrap
*Popper

## To-do List

*Implement open-source API to load quiz questions dynamically based on user selection.
*Order and number high scores from highest to lowest.
*Implement server-side storage of scores.
*Add responsive styling and accessibility.
