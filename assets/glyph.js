Game.Glyph = function(chr, foreground, background) {
	//instantiate properties to dea\fault if they aren't pasesd
	this._char = chr || ' ';
	this._foreground = foreground || 'white';
	this._background = background || 'black';
};

//creating standard getters for the glyupsh
Game.Glyph.prototype.getChar = function() {
	return this._char;
}

Game.Glyph.prototype.getBackground = function() {
	return this._background;
}

Game.Glyph.prototype.getForeground = function() {
	return this._foreground;
}
