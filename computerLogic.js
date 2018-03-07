function computerRandGuess(model){
    var grid = model.playerGrid;
    var enemy = model.playerShips;
    if(model.computerShips.hasHitPlayer == true){
        computerSmartGuess(model);
        return;
    }
    var row = generatePoint();
    var col = generatePoint();
    var missile = launchMissile(row,col,grid,enemy);
    if(missile == MISSLE.RELAUNCH){
        computerRandomGuess();
    }
    else if (missile == MISSLE.HIT){
        var coordinates = [row,col];
        computerHitTracking(coordinates);
    }
    generatePlayerGrid(model);
}

function computerSmartGuess(model){
    var grid = model.playerGrid;
    var enemy = model.playerShips;
    var newCoordinate = new Array();
    var lastHitLength = model.computerShips.lastHitCoodinates.length;
    var row = model.computerShips.lastHitCoordinates[lastHitLength-1][0];
    var col = model.computerShips.lastHitCoordinates[lastHitLength-1][1];
    newCoordinate = randomizeCoordinate(row,col);
    var missile = launchMissile(newCoordinate[0],newCoordinate[1],grid,enemy);
    if(model.computerShips.guessCounter > 15){
        resetComputerTrackingLog();
        computerRandomGuess(model);
    }
    if(missile == MISSLE.RELAUNCH && model.computerShips.guessCounter < 10){
        model.computerShips.guessCounter++;
        computerSmartGuess(model);
    }
    if(missile == MISSILE.HIT){
        model.computerShips.guessCounter = 0;
    }
    if (missile == MISSILE.MISS){
        model.computerShips.guessCounter = 0;
    }
    generatePlayerGrid(model);
}

function generatePoint(){
    return Math.floor(Math.random() * 10) + 0;
}

function randomizeCoordinate(row,col){
    var d4Roll = Math.floor(Math.random() * 4) + 1
    switch(d4Roll) {
        case 1:
            newCoordinate = [row+1,col];
            break;
        case 2:
            newCoordinate = [row-1,col];
            break;
        case 3:
            newCoordinate = [row,col+1];
            break;
        case 4:
            newCoordinate = [row, col-1];
        }
        return newCoordinate;
}
