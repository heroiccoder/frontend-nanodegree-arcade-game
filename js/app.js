// Enemies our player must avoid
var lineOne = 60;
var lineTwo = 140;
var lineThree = 223;
var lines = [60, 140, 223, 306, 390];
var columns = [0, 100, 200, 300, 400];
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = Math.floor(Math.random() * 2) + 0;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * game.maxSpeed()) + game.baseSpeed;  
};
var laneHeight = 80;
var laneWidth = 100;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Game = function()
{
    this.level = 1;
    this.baseSpeed = 20;
    this.score = 0;
};

Game.prototype.reset = function()
{
    allEnemies = [];
    var enemyOne = new Enemy();
    var enemyTwo = new Enemy();
    var enemyThree = new Enemy();
    allEnemies.push(enemyOne);
    allEnemies.push(enemyTwo);
    allEnemies.push(enemyThree);
    player = new Player();
};

Game.prototype.start = function()
{
    this.reset();
};

Game.prototype.maxSpeed = function()
{
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
};

Player.prototype.updateX = function()
{
    this.x = columns[this.column];
};
Player.prototype.updateY = function()
{
    this.y = lines[this.line];
};

//Player.startingX = columns[2];
//Player.startingY = lines[4];
Player.prototype.checkLeftBoundary = function()
{
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

Player.prototype.checkRightBoundary= function()
{
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
Player.prototype.checkUpperBoundary= function()
{
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
Player.prototype.checkBottomBoundary= function()
{
    if(this.line <=3)
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
Player.prototype.update = function()
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
};

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key)
{
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
