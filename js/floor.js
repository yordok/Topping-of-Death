"use strict"

var app = app || {};
//floor objects to draw
app.floor = function(){
	function floor(x, y){
	this.x = x;
	this.y = y;
	this.height = 20;
	this.width = 20;
	this.color = "yellow";
	this.image = undefined;
	
	
	};
	var p = floor.prototype;
	//initiate function
	p.init = function(){
		this.image = new Image();
		this.image.src = app.IMAGES['floorTile']
		console.log("floor inits")
	}
	//function draw
	p.draw = function(ctx){
		
		var halfW = this.width/2;
		var halfH = this.height/2;
		
	
		
		
		if(!this.image){
			//drwas the image to the screen
			ctx.save();
			ctx.fillStyle = this.color;
			this.fillRect(ctx, x - halfW, y - halfH, width, height,'yellow');
			ctx.restore();
		
		}
		else{
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		
		}
		
		
	
	
	}

		return floor;


}();