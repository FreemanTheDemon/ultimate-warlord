ok, here's the plan:

- manage unit splitting correctly - redux?
- implement turn system
- implement attack
- limit movement
- 
- implement password stuff (use prior assignment for reference)
- set up and add some mild design for the main page of the website

- App.js
    - This is the king, the hub of the whole app

- Body.js
    - Contains the Game and any styles for the body of the page

- Footer.js
    - Just a footer, probably has a p tag

- Header.js
    - Has the title of the game and probably some buttons to go to a login/signup page

- Game.js
    - The game itself
    - Contains GameActions and will have many Tiles

- GameActions.js
    - has some buttons
        - End turn
        - Deselect
        - Select next unit

- Details.js
    - shows the details of whatever you have clicked
        - maybe have it tell you what terrain you've selected
        - will handle the production of units from castles
        - will show you what units are on the tile you've clicked on (and potentially provide the option to select specific units on that tile)

- Tile.js
    - Each tile has some basic data associated with it
        - what the image on the tile is
        - are there unit(s) on this tile?
            - if so, display the topmost unit
            - display a flag or a number next to the unit that indicates how many units are there
            - has the unit been clicked?
                - display little box around unit so the player knows it is selected
                - (cannot select units in other tiles at the same time)
    - If an unit is selected and another tile is clicked
        - handle the movement of that unit
            - move towards the target tile (show the picture moving from tile to tile)
            - shortest distance
    - If an enemy unit/castle is selected, attack
        - show Battle.js

- Batte.js
    - takes in the values of the two opposing armies
    - also takes into account the terrain of the defender
    - displays a box of the battle, with the units involved on both sides
    - delete units one at a time on a timer until one side wins
    - remove the units on the map