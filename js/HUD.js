"use strict"

var app = app || {};

app.HUD = {
	//dsiplays health bar, score and multiplier
		Health: 0,
		Score: 0,
		Multiplier: 0,
	
	update: function(ctx, health, score, multiplier){
		//update all 
		this.Health = health;
		this.Score = score;
		this.draw(ctx);
		this.Multiplier = multiplier;
		
	},
	draw: function(ctx){
		//draw all
		this.healthBar(this.Health, ctx);
		this.displayScore(ctx, this.Score);
		this.displayMultiplier(ctx, this.Multiplier);
	},
	healthBar: function(health, ctx){
		//draws health bar and keep[s track of it over time
		ctx.save();
		if (health> 60)
		{
			ctx.fillStyle = 'green';
		}
		if (health > 40 && health <= 60 )
		{
			ctx.fillStyle = 'yellow';
		}
		if (health <= 40 )
		{
			ctx.fillStyle = 'red';
		}
		ctx.font="14px Courier";
		ctx.fillRect(10,10, health*2, 20);
		ctx.fillStyle = "white";
		
		ctx.fillText("HEALTH " + health, 20, 25);
		ctx.restore();
	
	
	},
	
	displayScore: function(ctx, score){
	//draws the score to the screen
		ctx.save();
		ctx.fillStyle = "red";
		ctx.font="18px Courier";
		ctx.fillText("Score: "+ score, 600, 20);
		
		
		ctx.restore();
	
	},
	
	displayMultiplier:function(ctx, mult){
	//draws multiplier to screen
		if(mult< 0)
		{
			mult = 0;
		}
	
		ctx.save();
		ctx.fillStyle = "red";
		ctx.font="24px Courier";
		ctx.fillText("MULTIPLIER: "+ mult, 350, 20);
		
		
		ctx.restore();
	
	}

}