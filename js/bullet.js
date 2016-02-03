//bullet.js
"use strict";

var app = app|| {};

app.Bullet = function(){
	function Bullet(x , y, speed, left){
		this.x = x;
		this.y = y;
		this. active = true;
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.width = 3;
		this.height = 3;
		this.speed = speed;
		this.color = "#FFF";
		this.isLeft = left;
		//fire bullet in direction player is facing
		if(this.isLeft)
		{
			this.xVelocity = -1;
		}
		else
		{
			this.xVelocity = 1;
		}
	
	};
	// prototype
	var p = Bullet.prototype;
	
	p.update = function(dt){
			//moves bullet along
			this.x += this.xVelocity *this.speed*dt;
			//console.log(this.xVelocity);
			
	};
	
	p.draw = function(ctx){
		//draws a small square to the screen
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	//checks if bullet is in bounds and if it is sets it to fls and stops calcualting values
	p.inBounds = function(){
		if(this.x < -110)
		{
			this.active = false;
		}
		if(this.x > 800)
		{
			this.active = false;
		}
	};
	
	
	return Bullet;

}();