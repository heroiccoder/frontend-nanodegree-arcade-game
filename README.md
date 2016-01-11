frontend-nanodegree-arcade-game
===============================

How to run the application
--------------------------
In order to run the application all you need to do is to open index.html in your web browser (it must be a browser able to run javascript and support html5).
There is no need to host it in a local or remote web server.

How to play the game
--------------------
i. Before Starting the game.
Every time you open the game, the leaderboard is clean. If you want, you can enter your name on the right top field so that when you get a highscore your name will stay there for as long as the session lasts.
You can choose your character by clicking in the picture of the character that you like. This is possible before starting the game as well as during the game.
In order to start the game you must click on "start game" on the right.

ii. Gameplay
The game "status" or "record", appears on the left. You can see how many lives you have left as well as your score.
To move your character you can only use the arrow keys. 
The objective of the game is to reach the water without touching any of the bugs. Every time you reach the water you level up, you get score (level * 100) and your character will return to the starting position.
Each level is increasingly more difficult than the last one. The speed of the bugs will increase a minimum of 10% and the number of enemies will be 3 + (level-1) / 2.
Every time a bug touches your character you will lose a life. If you are out of lives then the game will be over. If your score is greater than the last high schore, then you will be in the leaderboard. After the game has ended you have the option to start again.

Development Info
----------------
I changed three files: app.js, engine.js and index.html.

i. index.html
The changes in index.html include the addition of an interface to view and edit the player info on the right, an interface to view the game info on the left and the inclusion of bootstrap because of the included styles and the responsive grid system.

ii. app.js
This file contains most of the game logic. It contains the following classes: Enemy, Player, Game, UserInterface; as well as the instantiation of the classes.

a. Enemy class
Each enemy represents a bug. The enemy class handles the construction of the enemy object (default values in constructor), update of the bug position, checking if there was any collision with the player and notifiying the game in case there is a collision through the message game.loseLife().

b. Player class
The player class manages the player input, the prevention of the user running away from the limits of the canvas and contains the properties of the player state.

c. Game class
This is probably the most important class. It handles most of the aspects of the game logic and interacts with every other class. It instantiates enemies, the player, interacts with the user interface class by telling what to update and by receiving messages from it.

d. User Interface class
Receives events originated in index.html, processes them and interacts with the game to pass the message. Also, it receives messages from the game and posts them to the interface.


iii. Engine.js
This file went through minor changes. I adapted it to create the canvas in the place I wanted it (according to index.html), loaded other resources and changed the reset method.
