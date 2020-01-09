// Constant

const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 15;
const stepBackgroundMove = 80;
const limitPercentageFirstVP = 0.5;


var element = oxo.elements.createElement({
  type: 'div', 
  class: 'fire',
  obstacle: false, 
  styles: {
    transform: 'translate(400px, 200px)'
  },
  appendTo: 'body'
});

const obstacleGeneratedScenarioList = [
  [{
    "type": "fireball",
    "translateX": 800
  }, {
    "type": "fireball",
    "translateX": 500
  }, {
    "type": "fireball",
    "translateX": 430
  }],
   [{
      "type": "fireball",
      "translateX": 700
    }, {
      "type": "fireball",
      "translateX": 500
    }],
    [{
      "type": "fireball",
      "translateX": 450
    }],
]; 

let obstacleGeneratedList = []

function createObstacle(type, translateX, astronaute) {
  let obstacle = oxo.elements.createElement({
      type: 'div', 
      class: 'obstacle ' + type, 
      obstacle: false,
      styles: {
        transform: 'translateX(' + translateX + 'px)'
      },
      appendTo: 'body'
  });

  oxo.elements.onCollisionWithElementOnce(obstacle, astronaute, function() {
    oxo.screens.loadScreen('game-over', function() {});
  });
  
  return obstacle
}

// helper
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function launchIntro() {
  oxo.screens.loadScreen('intro', function() {
    const buttonPlay = document.querySelector('button.start');
    buttonPlay.addEventListener('click', function () {
      launchGame()
    });
  });
} 

function isRandomTranslateXAlreadySet(newRandomTransform) {
  let isAlreadySet = false
  fireballGeneratedlist.forEach(function(fireball) {
    let fireballTranform = fireball.style.transform
    if (fireballTranform == newRandomTransform) {
      isAlreadySet = true
    }
  });

  return isAlreadySet;
}

function generateObstacleLine(astronaute) {
  let indexRandom = getRandomInt(0, obstacleGeneratedScenarioList.length - 1);
  console.log("scenario index choose " + indexRandom );
  let scenarioChooseWithObstacleList = obstacleGeneratedScenarioList[indexRandom];

  scenarioChooseWithObstacleList.forEach(function (obstacleInfo) {
    obstacleGeneratedList.push(createObstacle(obstacleInfo.type, obstacleInfo.translateX, astronaute))
  })

  setInterval(function () {
    obstacleGeneratedList.forEach(function (obstacle) {
      //console.log(obstacle);
      oxo.animation.move(obstacle, 'down', 20);
    })
  }, 800);
}

function launchGame() {
  oxo.screens.loadScreen('game', function() {
    
    const selectors = {
      "astronaute": document.querySelector("div.astronaute"),
      "background": document.querySelector("body.game")
    };

    // Init backgroundPositionY to the end minus viewport
    backgroundYPosition = 800;
    selectors.background.style.backgroundPositionY = backgroundYPosition + "px";
    
    // Init positin astronaute
    oxo.animation.setPosition(selectors.astronaute, { x: 600, y: 400 });
    
    startEventListenerOnKeyPads(selectors);

    //generateObstacleLine(selectors.astronaute);

    let obstacleInterval = setInterval(function () {
      generateObstacleLine(selectors.astronaute);
    }, 8000);

    setTimeout(function () {
      clearInterval(obstacleInterval);
      let allObstacle = document.querySelectorAll("div.obstacle");
      allObstacle.forEach(function (obstacle) {
        obstacle.remove();
      })
    }, 29600);



  });
}

function startEventListenerOnKeyPads(selectors) {
  
  oxo.inputs.listenKey('right', function () {
    console.log("right");
    oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");
    oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
  });

  oxo.inputs.listenKey('up', function () {
    console.log("up");
    oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);

  });

    oxo.inputs.listenKey('down', function () {
      console.log("down");
      oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);
    
    });

  }


launchIntro()


/*
// Constant
const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 10;
const stepBackgroundMove = 100; 
const limitPercentageFirstVP = 0.5;
const restartAstronauteToMoveFromBackground = 5000;
const heightBackground = 25578;


let astronauteYOffset = 0;
let backgroundYPosition = 0;

function launchIntro() {
  oxo.screens.loadScreen('intro', function() {
    const buttonPlay = document.querySelector('button.start');
    buttonPlay.addEventListener('click', function () {
      launchGame()
    });
  });
}

function launchGame() {
  oxo.screens.loadScreen('game', function() {
    
    const selectors = {
      "astronaute": document.querySelector("svg.astronaute"),
      "background": document.querySelector("body.game")
    };

    // Init backgroundPositionY to the end minus viewport
    backgroundYPosition = 6000;
    selectors.background.style.backgroundPositionY = backgroundYPosition + "px";

    startEventListenerOnKeyPads(selectors);
  });
}


function isAstronauteAtVPLimit(astronaute) {
  const limitCalculate = viewportWidth * limitPercentageFirstVP;
  const astronauteYposition = oxo.animation.getPosition(astronaute).y;
  console.log("Astronaute position y: " + astronauteYposition + " limit: " + limitCalculate);
  return astronauteYposition >= limitCalculate;
}

function isBackgroundNotAtTheEnd() {
  return backgroundXPosition > 0
}

function isBackgroundAfterLimit() {
  return backgroundXPosition >= restartAstronauteToMoveFromBackground
}

function startEventListenerOnKeyPads(selectors) {
  
  oxo.inputs.listenKey('right', function () {
    console.log("right");
    oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");
    oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
  });

  oxo.inputs.listenKey('up', function () {
    console.log("up");
    console.log("is the astronaute reach the limit VP ? => " + isAstronauteAtVPLimit(selectors.astronaute));
    
    // with extra
    // if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    // } else if (isBackgroundAfterLimit() == true) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    //   console.log(selectors.background.style.backgroundPositionX);
    // } else {
    //   backgroundXPosition += stepBackgroundMove;
    //   selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
    //   console.log(selectors.background.style.backgroundPositionX);
    // }


    if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
      oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);
    } else {
      backgroundYPosition += stepBackgroundMove;
      selectors.background.style.backgroundPositionY = backgroundYPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionY);
    }
  });

  oxo.inputs.listenKey('down', function () {
    console.log("down");

    if (isBackgroundNotAtTheEnd() == true) {
      backgroundYPosition -= stepBackgroundMove;
      selectors.background.style.backgroundPositionY = backgroundYPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionY);
    } else {
      astronauteYOffset -= stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);
    }
  });
}




// Start
launchIntro()



/*

// Constant
const viewportWidth = window.innerWidth; 
const viewportHeight = window.innerHeight;
const stepAstronauteMove = 10;
const stepBackgroundMove = 100; 
const limitPercentageFirstVP = 0.5;
const restartAstronauteToMoveFromBackground = 5000;


let astronauteXOffset = 0;
let backgroundXPosition = 0;

function launchIntro() {
  oxo.screens.loadScreen('intro', function() {
    const buttonPlay = document.querySelector('button.start');
    buttonPlay.addEventListener('click', function () {
      launchGame()
    });
  });
}

function launchGame() {
  oxo.screens.loadScreen('game', function() {
    
    const selectors = {
      "astronaute": document.querySelector("svg.astronaute"),
      "background": document.querySelector("body.game")
    };

    // Init backgroundPositionX to 0px
    selectors.background.style.backgroundPositionX = backgroundXPosition + "px";

    startEventListenerOnKeyPads(selectors);
  });
}


function isAstronauteAtVPLimit(astronaute) {
  const limitCalculate = viewportWidth * limitPercentageFirstVP;
  const astronauteXposition = oxo.animation.getPosition(astronaute).x;
  console.log("Astronaute position x: " + astronauteXposition + " limit: " + limitCalculate);
  return astronauteXposition >= limitCalculate;
}

function isBackgroundNotAtTheEnd() {
  return backgroundXPosition > 0
}

function isBackgroundAfterLimit() {
  return backgroundXPosition >= restartAstronauteToMoveFromBackground
}

function startEventListenerOnKeyPads(selectors) {
  
  oxo.inputs.listenKey('up', function () {
    console.log("up");
    oxo.animation.move(selectors.astronaute, 'up', stepAstronauteMove);
  });

  oxo.inputs.listenKey('down', function () {
    console.log("down");
    oxo.animation.move(selectors.astronaute, 'down', stepAstronauteMove);
  });

  oxo.inputs.listenKey('right', function () {
    console.log("right");
    console.log("is the astronaute reach the limit VP ? => " + isAstronauteAtVPLimit(selectors.astronaute));
    
    // with extra
    // if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    // } else if (isBackgroundAfterLimit() == true) {
    //   oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    //   console.log(selectors.background.style.backgroundPositionX);
    // } else {
    //   backgroundXPosition += stepBackgroundMove;
    //   selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
    //   console.log(selectors.background.style.backgroundPositionX);
    // }


    if (isAstronauteAtVPLimit(selectors.astronaute) == false) {
      oxo.animation.move(selectors.astronaute, 'right', stepAstronauteMove);
    } else {
      backgroundXPosition += stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    }
  });

  oxo.inputs.listenKey('left', function () {
    console.log("left");

    if (isBackgroundNotAtTheEnd() == true) {
      backgroundXPosition -= stepBackgroundMove;
      selectors.background.style.backgroundPositionX = backgroundXPosition * -1 + "px";
      console.log(selectors.background.style.backgroundPositionX);
    } else {
      astronauteXOffset -= stepAstronauteMove;
      oxo.animation.move(selectors.astronaute, 'left', stepAstronauteMove);
    }
  });
}



// Start
launchIntro()

*/