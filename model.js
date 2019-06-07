function Game(playerGrid, computerGrid, playerShips,computerShips){
    this.playerGrid = playerGrid
    this.computerGrid = computerGrid;
    this.playerShips = playerShips;
    this.computerShips = computerShips;
}

function Ship(size, location, shipName){
    this.size = size;
    this.location = location;
    this.shipName = shipName;
    this.hits = 0;
    this.sunk = false;
}

function initPlayerShips(playerShips){
    playerShips.carrier = new Ship(5, [], SHIPNAMES.CARRIER);
    playerShips.battleShip = new Ship(4, [], SHIPNAMES.BATTLESHIP);
    playerShips.cruiser = new Ship(3, [], SHIPNAMES.CRUISER);
    playerShips.submarine = new Ship(3, [], SHIPNAMES.SUBMARINE);
    playerShips.destroyer = new Ship(2, [], SHIPNAMES.DESTROYER);
    playerShips.shipsSunk = 0;
    playerShips.selectedRow;
    playerShips.selectedCol;
    playerShips.selectedShip;}

function initComputerShips(computerShips){
    computerShips.carrier = new Ship(5, [], SHIPNAMES.CARRIER);
    computerShips.battleShip = new Ship(4, [], SHIPNAMES.BATTLESHIP);
    computerShips.cruiser = new Ship(3, [], SHIPNAMES.CRUISER);
    computerShips.submarine = new Ship(3, [], SHIPNAMES.SUBMARINE);
    computerShips.destroyer = new Ship(2, [], SHIPNAMES.DESTROYER);
    computerShips.shipsSunk = 0;
    computerShips.hasHitPlayer = false;
    computerShips.lastHitCoordinates = [];
    computerShips.firstHitCoordinates = [];
    computerShips.guessCounter = 0;
    computerShips.failSafe = false;
}

function playerShips(){
    this.carrier;
    this.battleShip;
    this.cruiser;
    this.submarine;
    this.destroyer;
    this.shipsSunk;
    this.selectedRow;
    this.selectedCol;
    this.selectedShip;
}

function computerShips(){
    this.carrier;
    this.battleShip;
    this.cruiser;
    this.submarine;
    this.destroyer;
    this.hasHitPlayer;
    this.lastHitCoordinates;
    this.firstHitCoordinates;
}

function initializeGame(){
    playerGrid = createGrid(10,10);
    computerGrid = createGrid(10,10);
    playerShips = new playerShips();
    computerShips = new computerShips();
    initPlayerShips(playerShips);
    initComputerShips(computerShips);
    var game = new Game(playerGrid, computerGrid, playerShips, computerShips)
    return game;
}

function createGrid(row,col){
    var grid = new Array();
    for(var c = 0; c < col; c++){
        grid[c] = new Array();
        for(var r = 0; r < row; r++){
            grid[c][r] = "";
        }
    }
    return grid;
}

function placeShip(ship,row,col,alignment,grid){
    var size = ship.size;
    if(GridCheck(ship,row,col,alignment,grid) !== false){

        if(alignment == ALIGNMENT.HORIZONTAL){
            for(var i = 0; i < size; i++){
                var cleanRow = +row;
                var cleanCol = +col + i;
                grid[cleanRow][cleanCol] = "=";
                ship.location.push([row,col+i]);
            }
        }

        if(alignment == ALIGNMENT.VERTICAL){
            for(var i = 0; i < size; i++){
                var cleanRow = +row + i;
                var cleanCol = +col;
                grid[cleanRow][cleanCol] = "=";
                ship.location.push([row+i,col]);
            }
        }
    }
    else {
        return false;
    }
}

function GridCheck(ship,row,col,alignment,grid){
    var size = ship.size;
    if(row < 10 && col < 10){
        var cleanRow = +row;
        var cleanCol = + col;
        if(alignment == ALIGNMENT.HORIZONTAL){
            horizontalGridCheck(cleanRow,cleanCol,grid,size);
        }
        else if(alignment == ALIGNMENT.VERTICAL){
            verticalGridCheck(cleanRow,cleanCol,grid,size);
        }
    }
    else {
        return false;
    }
}

function horizontalGridCheck(row,col,grid,size){
    if(col+size > 10){
        return false;
    }
    for(var i = 0; i < size; i++){
        if(grid[row][col+i] == "="){
            return false;
        }
    }
}

function verticalGridCheck(row,col,grid,size){
    if(row+size > 10){
        return false;
    }

    for(var i = 0; i < size; i++){
        if(grid[row+i][col] == "="){
            return false;
        }
    }
}

function launchMissile(row, col, enemyGrid, enemyShips){
    var missile;
    var coordinates = [row,col];
    if(cellCheck(row,col,grid)){
        if(grid[row][col] == ""){
            gridMiss(row,col,grid);
            missile = MISSLE.MISS;
        }
        else if (grid[row][col] == "="){
            gridHit(row,col,grid);
            missile = MISSLE.HIT;
            playSound(grid);
            markShipHit(enemy,coordinates);
        }
    }
    else {
        missile = MISSLE.RELAUNCH;
    }
}

function cellCheck(row,col,grid){
    var missile;
    if(row < 0 || row > 9 || col < 0 || col > 9){
        return false;
    }
    else if (grid[row][col] == "X" || grid[row][col] == "O"){
        return false;
    }
    return true;
}

function gridHit(row,col,grid){
    grid[row][col] = "X";
}

function gridMiss(row,col,grid){
    grid[row][col] = "O";
}

function markShipHit(enemy,coordinates){
    var hitShip = loopOverShips(enemy,coordinates);
    hitShip.hits++;
    playHit();
    checkSunk(enemy,hitShip,coordinates);


}

function loopOverShips(enemy,coordinates){
    for(var ship in enemy){
        var size = enemy[ship].size;
        for(var i =0; i < size; i++){
            var shipLocation = enemy[ship].location[i].toString();
            var point = coordinate.toString;
            if(shipLocation == point){
                return enemy[ships];
            }
        }
    }
}

function checkSunk(enemy,enemyShip,coordinates){
    if(enemyShip.size == enemyShip.hits){
        enemyShip.sunk = true;
        enemy.shipsSunk++;
        playSunk();
        if(enemyShip == playerShips){
        resetComputerTrackingLog();
        computerHitTracking(coordinates);
        alert("They sunk your " + playerShips[ship].shipName + "!");
        }
        else{
        alert('You sunk their ' + computerShips[ship].shipName + "!");
        }
    isGameOver(enemy);
    }
    else {
        computerHitTracking();
    }
}

function resetComputerTrackingLog(){
    computerShip.firstHitCoordinates = [];
    computuerShip.lastHitCoordinates = [];
    computerShip.hasHitPlayer = false;
    computerShips.guessCounter = 0;
}

function isGameOver(enemy){
    if(enemy.shipsSunk == 5){
        if(enemy == playerShips){
            computerWin();
        }
        else if (enemy == computerShips){
            computerWin();
        }
    }
}

function playerWin(){
    alert(WIN_NOTIFICATION.PLAYER);
    setWinRecord("playerWins");
}

function computerWin(){
    alert(WIN_NOTIFICATION.COMPUTER);
    setWinRecord("computerWins");
}

function computerHitTracking(coordinates){
var hitCoordinates = [row,col];
computerShips.firstHitCoordinates.push(hitCoordinates);
computerShips.lastHitCoordinates.push(hitCoordinates);
computerShips.hasHitPlayer = true;
}
