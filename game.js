var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    setTimeout(function () {
          nextSequence();
        }, 100);
    // nextSequence();
    started=true;
  }
});

function playSound(button){
  var audio = new Audio("sounds/"+button+".mp3");
  audio.play();
}

function animatePress(button){
  $("."+button).fadeOut(75).fadeIn(75);
}

function startOver(){
  level=0;
  started=false;
  gamePattern =[];
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Gamer Over, Press Any key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);

    startOver();
  }
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
