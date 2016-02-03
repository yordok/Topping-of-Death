"use strict"

var app = app || {};

app.endscreen = {
	ctx: undefined,
	main: true,
	intruction: false,
	endImage: undefined,
	
	init: function(ctx, score){
		this.ctx = ctx;
		this.draw(ctx, score);
	},
	
	draw: function(ctx, score){
	
		
		//displays scorea dn you have been defeated
		ctx.font="36px Courier";
		ctx.fillStyle = "red";
		ctx.fillText("You Have Been Defeated", 140 ,200);
		ctx.fillText("Score: "+ score, 140 ,250);
		
		
		this.reload(3200);
			
		requestAnimationFrame(this.draw.bind(this));
		
		
			
			
		
	},
	
	reload: function(time){
	setTimeout(function(){window.location.reload(1);}, time);
	
	}
	


}