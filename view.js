function createPlayerBoard(model,gridType) {
    var grid = model.playerGrid;
    var table = '';
    var size = grid.length;
    var rCounter = 0;
    for(var r = 0; r < size; r++){
        table += '<tr>';
        rCounter++;
        for(var c = 0; c < size; c++){
            rCounter++;
            var tileStatus = playerTileStatus(r,c,grid);
            var contents = generateTableContents(gridType,tileStatus,r,c,rCounter);
            table+= contents;
        }
            table+= '</tr>';
    }
    return '<table class="grid">' + table + '</table>';
}

function createComputerBoard(model,gridType) {
    var grid = model.computerGrid;
    var table = '';
    var size = grid.length;
    var rCounter = 0;
    for(var r = 0; r < size; r++){
        table += '<tr>';
        rCounter++;
        for(var c = 0; c < size; c++){
            rCounter++;
            var tileStatus = playerTileStatus(row,col,grid);
            var contents = generateTableContents(grid,tileStatus,r,c,rCounter);
            table+= contents;
        }
            table+= '</tr>';
    }
    return '<table class="grid">' + table + '</table>';
}

function checkHitStatus(row,col,modelGrid){
    if(modelGrid[row][col] == "X"){
        return TILE_STATUS.HIT;
    }
}
function checkMissStatus(row,col,modelGrid){
    if(modelGrid[row][col] == "O") {
        return TILE_STATUS.MISS;
    }
}
function checkShipStatus(row,col,modelGrid){
    if (modelGrid[row][col] == "="){
        return TILE_STATUS.SHIP;
    }
}

function playerTileStatus(row,col,modelGrid){
    var tileHit = checkHitStatus(row,col,modelGrid);
    if (checkForNull(tileHit)){
        return tileHit;
    }
    var tileMiss = checkMissStatus(row,col,modelGrid);
    if (checkForNull(tileMiss)){
        return tileMiss;
    }
    var tileShip = checkShipStatus(row,col,modelGrid);
    if (checkForNull(tileHit)){
        return tileShip;
    }
}

function computerTileStatus(row,col,modelGrid){
    var tileHit = checkHitStatus(row,col,modelGrid);
    if (checkForNull(tileHit)){
        return tileHit;
    }
    var tileMiss = checkMissStatus(row,col,modelGrid);
    if (checkForNull(tileMiss)){
        return tileMiss;
    }
}

function checkForNull(tileStatus){
    if(tileStatus == null){
        return false;
    }
    else return true;
}
function playHit(){
    var sound = new Audio("assets/explosion.wav");
    sound.play();
    sound.currentTime=0;
}

function playSunk(){
    var sound = new Audio("assets/sink.wav");
    sound.play();
    sound.currentTime=0;

}

function generateTableContents(gridType,tileStatus,row,col,rCounter){
    var contents;
    if (rCounter%2 == 0){
        contents = '<td class="blue_two gameboardCells ' + gridType + ' '+ tileStatus +'" data-x=' + row + ' data-y=' + col + '>' +  '</td>';
    }
    else {
        contents = '<td class="blue_one gameboardCells '+ gridType + ' ' + tileStatus +'" data-x=' + row + ' data-y=' + col + '>' + '</td>';
    }
    return contents;
}

function playerGridClick(model){

        $cells = $('.playerTable');
        $cells.on('click', function(e) {
            console.log(e.target.dataset.y);
            var y = e.target.dataset.y;
            var x = e.target.dataset.x;
            model.playerShips.selectedRow = x;
            model.playerShips.selectedCol = y;
            var contents = "(" + x + ", " + y + ")";
            this.innerHTML = contents;
            this.className += ' hit';
            $displayCells = $('#cellSelect');
            $displayCells.html(contents);
        });
}

function shipButtonClick(model){
    $shipButton = $(".shipButtons");
    $shipButton.on('click', function(e) {
    var shipName = this.id;
    model.playerShips.selectedShip = model.playerShips[shipName];
    });
}

function placePlayerShipsRandom(model){
    placeShip(model.playerShips.carrier,2,4,"horizontal",model.playerGrid);
    placeShip(model.playerShips.battleShip, 6,5,"horizontal", model.playerGrid);
    placeShip(model.playerShips.cruiser, 7,3,"vertical",model.playerGrid);
    placeShip(model.playerShips.submarine, 3, 1,"vertical",model.playerGrid);
    placeShip(model.playerShips.destroyer, 0,0,"vertical",model.playerGrid);
}

function randomShipsButton(model){
    $randomPlacement = $("#placeRandom");
    $randomPlacement.on('click', function(e){
        placePlayerShipsRandom(model);
    })
}

function orientationClick(model){
    $radioButtons = $('.alignmentRadio');
    $radioButtons.on('change', function(e){
        if(this.id == "vertical"){
            model.playerShips.selectedOrientation = this.id;
            console.log(this.id);
        }
        else if (this.id == "horizontal"){
            model.playerShips.selectedOrientation = this.id;
            console.log(this.id);
        }
    });
    //make a jquery based radio button event for clicks
    //either vertical or horizontal
}


//DOESNT WORK!!!
function placeShipButtonClick(model){
    $placeShipButton = $('#placeShipButton');
    $placeShipButton.on('click', function(e){
        var ship = model.playerShips.selectedShip;
        var row =  model.playerShips.selectedRow;
        var col =  model.playerShips.selectedCol;
        var alignment = model.playerShips.selectedOrientation;
        var grid = model.playerGrid;
        console.log(ship,row,col,alignment,grid);
        placeShip(ship,row,col,alignment,grid);
        updatePlayerGrid(model);
    });
}

function updatePlayerGrid(model){
    var playerTable = createPlayerBoard(game, "playerTable");
    var playerGrid = document.getElementById('playerBoardContainer');
    playerGrid.innerHTML = playerTable;
    playerGridClick(model);
}
