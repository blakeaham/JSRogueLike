var Game = {
	_display: null,
	_currentScreen: null,
	_screenWidth: 120,
	_screenHeight: 40,
	init: function() {
		//initialization goes here
		this._display = new ROT.Display({width: this._screenWidth,
                                     height: this._screenHeight});
		var game = this;
		var bindEventToScreen = function(event) {
			window.addEventListener(event, function(e) {
				if (game._currentScreen !== null) {
					//send event type and data to the screen
					game._currentScreen.handleInput(event, e);
					//clear screen
					game._display.clear();
					//re-render
					game._currentScreen.render(game._display);
				}
			});
		}

		// Bind keyboard input events
    	bindEventToScreen('keydown');
    	//bindEventToScreen('keyup');
    	//bindEventToScreen('keypress');
	},

	getDisplay: function() {
		return this._display;
	},
	getScreenWidth: function() {
		return this._screenWidth;
	},
	getScreenHeight: function () {
		return this._screenHeight;
	},

	switchScreen: function(screen) {
		if (this._currentScreen !== null) {
			this._currentScreen.exit();
		}
		this.getDisplay().clear();
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
