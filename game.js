var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var started = false;
var level = 0;


//Εκκίνηση του game με το πάτημα ενός οποιουδήποτε κουμπιού
$(document).keydown(function() {
  if (!started)    //Επιστρέφει true αν το started = false
  {
    started = true;
    nextSequence();
  }
});


//Δημιουργία μιας τυχαίας ακολουθίας από buttons και εμφάνιση αυτής με χρήση animation και ήχου
function nextSequence() {
  clickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //Τυχαίος αριθμός από 0 έως και 3
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


/*Κάθε φορά που κλικάρω ένα από 4 buttons, το id του (π.χ green) προστίθεται στον πίνακα clickedPattern
και ανάλογα με το id του button ακούγεται και ο αντίστοιχος ήχος. Για το κλικ υπάρχει συγκεκριμένο animation*/
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  clickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(clickedPattern.length - 1);   //-1 γιατί οι πίνακες (εντός της checkAnswer) ξεκινάνε από το 0
});


//Ο ήχος που ακούγεται εξαρτάται κάθε φορά από την παράμετρο name, που θα είναι το id κάποιου button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Εμφάνιση animation (css) για συγκεκριμένο χρονικό διάστημα όταν κλικάρω button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(counter) {
  if (gamePattern[counter] === clickedPattern[counter])  //Αν ο χρήστης πατήσει το σωστό button
  {
    if (clickedPattern.length === gamePattern.length)   //Αν ο χρήστης έχει πατήσει το σωστό pattern-πλήθος από buttons
    {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game over" + "<br>" + " Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//Ξανά από την αρχή (αρχικοποιο΄ύνται-μηδενίζονται τα δεδομένα)
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
