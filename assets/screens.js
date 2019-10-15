Game.Screen = {};

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
				Game.switchScreen(Game.Screen.playScreen);
			}
		}
	}
}

//define play screen

Game.Screen.playScreen = {
	enter: function() {console.log('enterd play screen');},
	exit: function() { console.log("Exited play screen."); },
	render: function(display) {
		display.drawText(3,5, "%c{red}%b{white}Welcome. Ready to roll your stats?");
		display.drawText(4,6, "Press [ENTER] to roll, or [ESC] to quit");
	},
	handleInput: function(inputType, inputData) {
		if (inputType === 'keydown') {
			//if enter is pressed we will go to the win screen
			//escape quits
			if (inputData.keyCode === ROT.VK_RETURN) {
				Game.switchScreen(Game.Screen.winScreen);
			} else if (inputData.keyCode === ROT.VK_ESCAPE) {
				Game.switchScreen(Game.Screen.loseScreen)
			}
		}
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