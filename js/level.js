"use strict";

var app = app|| {};

app.level = {
	floorLow: [],
	
	floorStartX: 75,
	floorEndX: 695,
	floorStartY:450,
	floorEndY: 490,

	
	
	
	
	//draws floors
	init : function(){
	
		for(var i = 0; i < 30; i++)
		{
			this.floorLow[i] = new app.floor(75 + (i*20), 450);
			this.floorLow[i].init();
		}	
		
	
	},
	//draws all the parts of the level
	draw : function(ctx){
	
		for(var i = 0; i < 30; i++)
		{
			this.floorLow[i].draw(ctx);
		}
		
		
	
	}


};

