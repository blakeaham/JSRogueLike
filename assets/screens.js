Game.Screen = {};
//let;s see how fast I can get wihtthis new mechanical keyboard.
//define start screen
Game.Screen.startScreen = {
	enter: function() { console.log('entered the start screen');},
	exit: function() {console.log('exited start screen');},
	render: function(display) {
		//render prompt to screen
		display.drawText(1,1, "%c{yellow}Javascript Roguelike");
		display.drawText(1,2, "Press [Enter] to start!");
	},
	handleInput: function(inputType, inputData) {
		//when Enter is pressed, go to play screen
		if (inputType === 'keydown') {
			if (inputData.keyCode === ROT.VK_RETURN) {
				Game.switchScreen(Game.Screen.welcomeScreen);
			}
		}
	}
}

Game.Screen.welcomeScreen = {
	enter : function(){},
	exit : function(){},
	render : function(display) {
		display.drawText(3,5, "%c{red}%b{white}Welcome. Ready to roll your stats?");
		display.drawText(4,6, "Press [ENTER] to roll, or [ESC] to quit");
	},
	handleInput : function(inputType, inputData) {
		if (inputType === 'keydown') {
			//if enter is pressed we will go to the win screen
			//escape quits
			if (inputData.keyCode === ROT.VK_RETURN) {
				Game.switchScreen(Game.Screen.playScreen);
			} else if (inputData.keyCode === ROT.VK_ESCAPE) {
				Game.switchScreen(Game.Screen.loseScreen)
			}
		}
	}
}

//define play screen

Game.Screen.playScreen = {
	_map: null,
	_centerX: 0,
	_centerY: 0,
	enter: function() {
		var map = [];
		var mapWidth = 500;
        var mapHeight = 500;
		for (var x = 0; x < mapWidth; x++) {
			//create nested array for y vals
			map.push([]);
			//add all tiles
			for (var y = 0; y < mapHeight; y++) {
				map[x].push(Game.Tile.nullTile);
			}
		}
		var generator = new ROT.Map.Cellular(mapWidth, mapHeight);
		generator.randomize(0.5);

		var totalIterations = 3;
		//iterate to smooth map
		for (var i = 0; i < totalIterations-1; i++) {
			generator.create();
		}

		//smooth one more and update map
		generator.create(function(x,y,v) {
			if (v === 1) {
				map[x][y]= Game.Tile.floorTile;
			} else {
				map[x][y] = Game.Tile.wallTile;
			}
		});
		//create map from tiles
		this._map = new Game.Map(map);
	},
	exit: function() { console.log("Exited play screen."); },
	render: function(display) {
		var screenWidth = Game.getScreenWidth();
		var screenHeight = Game.getScreenHeight();
		var topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
		topLeftX= Math.min(topLeftX, this._map.getWidth() - screenWidth);
		var topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
		topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);

		//iterate map cells
		for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
			for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
				//fetch correct glyph and draw
				var glyph = this._map.getTile(x, y).getGlyph();
				display.draw(
					x - topLeftX,
					y - topLeftY,
					glyph.getChar(),
					glyph.getForeground(),
					glyph.getBackground());
			}

		}
		// Render the cursor
        display.draw(
            this._centerX - topLeftX, 
            this._centerY - topLeftY,
            '@',
            'white',
            'black');
		
	},
	handleInput: function(inputType, inputData) {

        if (inputType === 'keydown') {
            // If enter is pressed, go to the win screen
            // If escape is pressed, go to lose screen
            if (inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.winScreen);
            } else if (inputData.keyCode === ROT.VK_ESCAPE) {
                Game.switchScreen(Game.Screen.loseScreen);
            }
            // Movement
            if (inputData.keyCode === ROT.VK_LEFT) {
                this.move(-1, 0);
            } else if (inputData.keyCode === ROT.VK_RIGHT) {
                this.move(1, 0);
            } else if (inputData.keyCode === ROT.VK_UP) {
                this.move(0, -1);
            } else if (inputData.keyCode === ROT.VK_DOWN) {
                this.move(0, 1);
            }
        }    
	},
	move: function(dX, dY) {
		//positive dX is move right 0 means same
		this._centerX = Math.max(0,
			Math.min(this._map.getWidth() - 1, this._centerX + dX));
		// Positive dY means movement down
        // negative means movement up
        // 0 means none
        this._centerY = Math.max(0,
            Math.min(this._map.getHeight() - 1, this._centerY + dY));
	}
}

Game.Screen.winScreen = {
    enter: function() {    console.log("Entered win screen."); },
    exit: function() { console.log("Exited win screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
}

Game.Screen.loseScreen = {
    enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You died! Press [ENTER] to start again!");
        }
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
			if (inputData.keyCode === ROT.VK_RETURN) {
				Game.switchScreen(Game.Screen.startScreen);
			}
		}     
    }
}




/*  ---screen obj template---
enter : function()
exit : function()
render : function(display)
handleInput : function(inputType, inputData)
*/