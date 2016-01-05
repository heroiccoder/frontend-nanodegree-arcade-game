// Enemies our player must avoid
var lineOne = 60;
var lineTwo = 140;
var lineThree = 223;
var lines = [0, 60, 140, 223, 306, 390];
var columns = [0, 101, 202, 303, 404];
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = Math.floor(Math.random() * 600) - 100;
    this.line = Math.floor(Math.random() * 3) + 1;
    this.y = lines[this.line];
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * game.maxSpeed()) + game.baseSpeed;
    this.width = 101;
};
var laneHeight = 80;
var laneWidth = 100;

Enemy.prototype.checkCollision = function()
{
    if(this.line == player.line)
    {
        leftPlayerBorder = player.x+20;
        rightPlayerBorder = player.x+player.width;
        leftEnemyBorder = this.x+2;
        rightEnemyBorder = this.x-2+this.width;
        if((rightEnemyBorder >= leftPlayerBorder && leftPlayerBorder >= this.x) || (rightPlayerBorder >= leftEnemyBorder && rightPlayerBorder <= rightEnemyBorder))
        {
            // There is a collision
            return true;
        }
    }
    return false;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(game.active)
    {
        if(this.checkCollision())
        {
            game.loseLife();
        } else {
            if(this.x <505)
            {
                this.x = this.x + this.speed * dt;
            } else {
                this.x = -100;
                this.line = Math.floor(Math.random() * 3) + 1;
                this.y = lines[this.line];
            }
        }
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var UserInterface = function() {

};

UserInterface.prototype.start = function()
{
    game.start();
    player.playerName = document.getElementById('playerName').value;
    document.getElementById('startButton').setAttribute("disabled", "disabled");
    document.getElementById('playerName').setAttribute("disabled", "disabled");
};

UserInterface.prototype.updateScore = function(score)
{
    document.getElementById('score').innerText = ''+score;
};

UserInterface.prototype.updateLevel = function(level)
{
    document.getElementById('level').innerText = ''+level;
};

UserInterface.prototype.updateLives = function(lives)
{
    var images = '';
    for(var i = 0; i < lives; i++)
    {
        images = images + '<img src="images/Heart.png" height="50px" />';
    }
    document.getElementById('livesLeft').innerHTML = images;
};

UserInterface.prototype.lost = function()
{
    document.getElementById('highScore').innerText = game.highestScore;
    document.getElementById('startButton').removeAttribute("disabled");
    document.getElementById('playerName').removeAttribute("disabled");
    if(game.highestScore == game.score)
    {
        document.getElementById('playerHighScore').innerText = player.playerName;
        alert("Congrats!! You achieved a new high score!");
    } else {
        alert("Game Over! Try again!");
    }
};

var ui = new UserInterface();


var Game = function() {
    this.highestScore=0;
    this.init();
};

Game.prototype.init = function()
{
    this.level = 1;
    this.baseSpeed = 40;
    this.score = 0;
    this.active = false;
};

Game.prototype.lost = function()
{
    if(this.score>this.highestScore)
    {
        this.highestScore = this.score;
    }
    ui.lost();
    this.stop();
};

Game.prototype.loseLife = function()
{
    if(--player.lives == 0)
    {
        this.lost();
    } else {
        var lives = player.lives;
        ui.updateLives(player.lives);
        game.reset();
        player.lives = lives;
    }
};

Game.prototype.stop = function()
{
    this.active = false;
};

Game.prototype.instantiateEnemies = function(enemiesLeft) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
    if(--enemiesLeft>0)
    {
        setTimeout(300, this.instantiateEnemies(enemiesLeft));
    }
};

Game.prototype.enemies = function() {
    var enemies = (3 + Math.floor((this.level-1) / 2));
    return enemies;
};
Game.prototype.reset = function() {
    allEnemies = [];
    this.instantiateEnemies(this.enemies());
    var playerName = player.playerName;
    player = new Player();
    player.playerName = playerName;
};

Game.prototype.start = function() {
    this.init();
    this.reset();
    this.active = true;
};

Game.prototype.levelUp = function() {
    this.level = this.level + 1;
    this.score = this.score + this.level * 100;
    this.baseSpeed = this.baseSpeed * 1.1;
    ui.updateLevel(this.level);
    ui.updateScore(this.score);
    this.reset();
};

Game.prototype.maxSpeed = function() {
    return (1 + (this.level -1) / 4) * this.baseSpeed;
};
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.lastPressedKey = undefined;
    this.column = 2;
    this.line = 4;
    this.x = columns[this.column];
    this.y = lines[this.line];
    this.lives = 3;
    this.width = 80;
    this.playerName='';
};

Player.prototype.updateCharacter = function(character)
{
    this.sprite = character;
}

Player.prototype.updateX = function() {
    this.x = columns[this.column];
};

Player.prototype.updateY = function() {
    this.y = lines[this.line];
};

//Player.startingX = columns[2];
//Player.startingY = lines[4];
Player.prototype.checkLeftBoundary = function() {
    if(this.column >= 1)
    {
        return true;
    }
    return false;
    /*
    if(this.x>=laneWidth)
    {
        return true;
    } else {
        return false;
    }*/
};

Player.prototype.checkRightBoundary= function() {
    if(this.column <= 3)
    {
        return true;
    }
    return false;
    /*if(this.x<4 * laneWidth)
    {
        return true;
    } else {
        return false;
    }*/
};
Player.prototype.checkUpperBoundary= function() {
    if(this.line >=1)
    {
        return true;
    }
    return false;
    /*if(this.y>=laneHeight/2)
    {
        return true;
    } else {
        return false;
    }*/
};
Player.prototype.checkBottomBoundary= function() {
    if(this.line <=4)
    {
        return true;
    }
    return false;
    /*if(this.y<Player.startingY)
    {
        return true;
    } else {
        return false;
    }*/
};
Player.prototype.update = function() {
    if(game.active)
    {
        if(this.lastPressedKey!=undefined)
        {
            switch(this.lastPressedKey)
            {
                case 'left':
                    if(this.checkLeftBoundary())
                    {
                        this.column = this.column-1;
                        this.updateX();
                    }
                    break;
                case 'right':
                    if(this.checkRightBoundary())
                    {
                        this.column = this.column+1;
                        this.updateX();
                    }
                    break;
                case 'up':
                    if(this.checkUpperBoundary())
                    {
                        this.line = this.line-1;
                        this.updateY();
                    }
                    break;
                case 'down':
                    if(this.checkBottomBoundary())
                    {
                        this.line = this.line+1;
                        this.updateY();
                    }
                    break;
                default:
                    break;
            }
            this.lastPressedKey=undefined;
        }
        if(this.line == 0)
        {
            game.levelUp();
        }
    } else {
        this.lastPressedKey=undefined;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.lastPressedKey = key;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game();
var allEnemies = [];
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
