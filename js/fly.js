"use strict"

var app = app|| {};

app.Fly = function(){
	function Fly(x , y, speed){
	
		this.y = y;
		this.x = x;
		this.xVelocity = speed;
		this.yVelocity = 0;
		this.direction = true;
		this.width = 25;
		this.height = 25;
		this.active = true;
		this.imageA = undefined;
		this.imageAFlip = undefined;
		this.imageA = new Image();
		this.imageA.src = app.IMAGES['FlySheet'];
		this.imageAFlip = new Image();
		this.imageAFlip.src = app.IMAGES['FlySheetFlip'];
		
		this.imageSwitch = 0;
		
		if(Math.random() * 10 > 5)
		{
			this.direction = true;
		}
		else{
			this.direction = false;
		}
		
	};
	
	var p = Fly.prototype;
	
	p.draw = function(ctx){
			this.imageSwitch++;
			var halfW = this.width/2;
			var halfH = this.height/2;
			if(this.direction == true)
			{
				if(this.imageSwitch <= 20)
				{
					ctx.drawImage(this.imageA,0,0, 25,25, this.x - halfW, this.y - halfH, this.width, this.height);
				}
				if(this.imageSwitch > 20)
				{
					ctx.drawImage(this.imageA,25,0,25,25, this.x - halfW, this.y - halfH, this.width, this.height);
				}
			}
			if(this.direction == false)
			{
				if(this.imageSwitch<= 20)
				{
					ctx.drawImage(this.imageAFlip,0,0, 25,25, this.x - halfW, this.y - halfH, this.width, this.height);
				}
				if(this.imageSwitch > 20)
				{
					ctx.drawImage(this.imageAFlip,25,0,25,25, this.x - halfW, this.y - halfH, this.width, this.height);
				}
			
			}
			if(this.imageSwitch > 40)
			{
				this.imageSwitch = 0;
			}
			
		
			
		
	};
	
	p.update = function(dt){
		if(this.direction == true)
		{
			this.x += this.xVelocity;
		}
		else
		{
			this.x -= this.xVelocity;
		}
		
		
		
		
		if (this.active == true)
		{
			if(this.x >= 800  && this.direction == true)
			{
				this.x = -10
			}
			if(this.x <= -100  && this.direction ==false)
			{
				this.x = 800
			}
	
		}
	
	};
	
	
	
	
	return Fly;
}();