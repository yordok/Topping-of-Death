"use strict"


var app = app|| {};

app.Bomb = function(){
	function Bomb(x , y){
	
		this.x = x;
		this.y = y;
		this.width = 25;
		this.height = 25;
		this. speed = 4;
		this.image = new Image();
		this.timer = 0;
		
		
		this.image.src = app.IMAGES["dynamitesheet"];
	
	
	};
	
	var p = Bomb.prototype;
	
	p.update = function(){
		timer++;
		var imgSwitch = false;
		if(this.timer >= 10)
		{
			timer = 0;
		}
		if (this.timer< 9 && this.timer >5)
		{
			imgSwitch = true;
		}
		if (timer < 5)
		{
			imgSwitch = false;
		}
		p.draw(ctx, imgSwitch);
	
	};
	
	p.draw = function(ctx, imgSwitch){
		if(imgSwitch == true)
		{
			ctx.drawImage(this.image, 0,0, 25,25, this.x, this.y, 25,25);
		}
		else
		{
			ctx.drawImage(this.image,25,0,25,25, this.x, this.y, 25,25);
		}
		
	
	};
	
	
}