var Game = {
	_display: null,
	_currentScreen: null,
	init: function() {
		//initialization goes here
		this._display = new ROT.Display({width:120, height:40});
		var game = this;
		var bindEventToScreen = function(event) {
			window.addEventListener(event, function(e) {
				if (game._currentScreen !== null) {
					//send event type and data to the screen
					game._currentScreen.handleInput(event, e);
				}
			});
		}

		// Bind keyboard input events
    	bindEventToScreen('keydown');
    	bindEventToScreen('keyup');
    	bindEventToScreen('keypress');
	},

	getDisplay; function() {
		return this._display;
	},

	switchScreen: function(screen) {
		if (this._currentScreen !== null) {
			this._currentScreen.exit();
		}
		this._currentScreen = screen;
		if(this._currentScreen) {
			this._currentScreen.enter();
			this._currentScreen.render(this._display);
		}
	}
}



window.onload = function() {
	// Check if rot.js can work on this browser
	if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        // Initialize the game
        Game.init();
        // Add the container to our HTML page
        document.body.appendChild(Game.getDisplay().getContainer());
        Game.switchScreen(Game.Screen.startScreen);
    }
}
