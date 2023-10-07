var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML, ".");
  });
}
var chnge = document.querySelectorAll(".emp").length;

for (var i = 0; i < chnge; i++) {
  (function (index) {
    var button = document.querySelectorAll(".emp")[index];
    button.addEventListener("click", function () {
      if (button.classList.contains("pressedEmp")) {
        button.classList.remove("pressedEmp");
      } else {
        button.classList.add("pressedEmp");
      }
    });
  })(i);
}

function sliderChange1(val) {
  document.getElementById("sliderVal1").innerHTML = val;
}
function sliderChange2(val) {
  document.getElementById("sliderVal2").innerHTML = val;
}

var isStopped = false;
document.querySelector(".stop").addEventListener("click", function () {
  isStopped = true;
  console.log("pressed");
});

document.querySelector(".play").addEventListener("click", function () {
  isStopped = false;

  var numberOfDrumButtons = [];
  var delay = 0;
  var speed = 100 - document.getElementById("inputSpeed").value;
  var loop = document.getElementById("inputLoop").value;
  // console.log(speed);
  // console.log(loop);
  // Iterate over each set of buttons
  for (var j = 0; j < loop; j++) {
    for (var i = 0; i < 15; i++) {
      numberOfDrumButtons[i] = document.querySelectorAll(".beat" + i).length;

      // Create a closure to capture the current value of i and delay
      (function (i, delay) {
        var time = setTimeout(function () {
          var buttons = document.querySelectorAll(".beat" + i);
          if (isStopped == true) {
            console.log("see");
            clearTimeout(time);
            numberOfDrumButtons = [];
            return;
          }
          for (var j = 0; j < numberOfDrumButtons[i]; j++) {
            var button = buttons[j];
            buttonAnimation(i, ".music");
            if (button.classList.contains("pressedEmp")) {
              var buttonInnerHTML = button.innerHTML;
              makeSound(buttonInnerHTML);
            }
          }
        }, delay);
      })(i, delay);

      delay += numberOfDrumButtons[i] * speed; // Accumulate the delay
    }
  }
});

document.addEventListener("keypress", function (event) {
  makeSound(event.key);

  buttonAnimation(event.key, ".");
});

function makeSound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log(key);
  }
}

function buttonAnimation(currentKey, str) {
  console.log(str);
  var activeButton = document.querySelector(str + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
// function buttonAnimationRemove(currentKey) {

//   var activeButton = document.querySelector(".music" + currentKey);

//     activeButton.classList.remove("pressed");
// }
