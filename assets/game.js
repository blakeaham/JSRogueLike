window.onload = function() {
	// Check if rot.js can work on this browser
	
		// Create a display 80 characters wide and 20 characters tall
		var display = new ROT.Display({width:120, height:40});
		var container = display.getContainer();
		// Add the container to our HTML page
		document.body.appendChild(container);
		var foreground, background, colors;
		for (var i = 0; i < 25; i++) {
			// Calculate the foreground color, getting progressively darker
			// and the background color, getting progressively lighter.
			foreground = ROT.Color.toRGB([255 - (i*10),
			                              255 - (i*10),
			                              255 - (i*10)]);
			background = ROT.Color.toRGB([i*10, i*10, i*10]);
			// Create the color format specifier.
			colors = "%c{" + foreground + "}%b{" + background + "}";
			// Draw the text two columns in and at the row specified
			// by i
			display.drawText(2, i, colors + "Hello, world!");
		}
	
}