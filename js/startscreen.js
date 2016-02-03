"use strict"

var app = app || {};
//screen that begins game
app.startscreen = {
	ctx: undefined,
	main: true,
	intruction: false,
	startImage: undefined,
	InstructionsImage: undefined,
	
	init: function(ctx){
		this.ctx = ctx;
		
		this.startImage = new Image();
		this.startImage.src = app.IMAGES['StartScreen'];
		
		this.InstructionsImage = new Image();
		this.InstructionsImage.src = app.IMAGES['Instructions'];
		
		ctx.fillStyle = "red";
		ctx.fillRect(0,0, 750, 500);
		
		this.update();
	
	},
	update: function(){
	
		//console.log("state start update");
		this.clear(this.ctx);
		this.getInput();
		//draws the start screen if the state is at Start
		if(this.main == true)
		{
			this.ctx.drawImage(this.startImage, 0,0,750, 500);
		}
		//if player presses right he will be shown instructions
		if(this.instruction == true)
		{
			this.ctx.drawImage(this.InstructionsImage, 0,0,750, 500);
		}
		
		if(app.STATE.START== true)
		{
			requestAnimationFrame(this.update.bind(this));
		}
		//is the player presses left he will be brought to the game
		if(app.STATE.GAME == true)
		{
		app.main.app = app;
		app.main.level = app.level;
		app.main.init(app.player, this.ctx);
		};
	},
	
	clear: function(ctx)
	{
		//clears teh screen
		ctx.save();
		ctx.fillStyle = "red";
		ctx.fillRect(0,0, 750, 500);
		ctx.restore();
	},
	getInput: function(){
	//recieves input from the user
		if(app.keydown[app.KEYBOARD.KEY_RIGHT]==true)
		{
			console.log("pressedRight");
			this.main == false;
			this.instruction = true;
		}
		if(app.keydown[app.KEYBOARD.KEY_LEFT]==true)
		{
			app.STATE.START = false;
			app.STATE.GAME = true;
			console.log("pressedLeft");
			
		}
		
	},

}