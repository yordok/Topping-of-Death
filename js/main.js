"use strict";

var app = app || {};

app.main = {
	//class level variables
	ctx: undefined,
	canvas: undefined,
	WIDTH: 750,
	HEIGHT: 500,
	player: undefined,
	app: undefined,
	level: undefined,
	enemyList: [],
	backgroundImage: undefined,
	HitSFX: undefined,
	HurtSFX: undefined,
	backgroundSong: undefined,
	Score: 0,
	Multiplier: 0,
	
	//initiate function
	init : function(Player, ctx){
		console.log("main.init called");
		
		this.HitSFX = new Audio();
		this.HitSFX.src = app.SOUNDS['Hit'];
		
		this.HurtSFX = new Audio();
		this.HurtSFX.src = app.SOUNDS['Hurt'];
		
		this.backgroundSong = new Audio();
		this.backgroundSong.src = app.SOUNDS['Background_music'];
		
		this.backgroundSong.loop = true;
		this.backgroundSong.play();
		
		this.backgroundImage = new Image();
		this.backgroundImage.src = app.IMAGES['Background'];
		
		this.ctx = ctx;
		
		this.player = Player;
		this.player.init();
		
		

		this.level.init();
		
		//last thing to be called
		this.update();
	},
	
	
	
	//gets input and calls appropriate move funtions
	getInput: function(dt){
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT]==true)
		{
			//console.log("pressedRight");
			this.player.moveRight(dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT]==true)
		{
			//console.log("pressedLeft");
			this.player.moveLeft(dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_Z]==true)
		{
			//console.log("pressedZ");
			this.player.jump(dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_X]==true)
		{
			//console.log("pressedX");
			this.player.shoot(this.player.x, this.player.y);
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_Z]==false)
		{
			//console.log("jump release");
			this.player.stopJump();
		}
		
	},
	
	
	//update game
	update: function(){
		//clear screen
		this.ctx.clearRect(0,0, this.WIDTH, this.HEIGHT);
		
		
		//draw background
		this.ctx.drawImage(this.backgroundImage,0,0,this.WIDTH, this.HEIGHT);
		
		//gets input from user
		this.getInput(this.player.dt);
		
		//updates and draws the player
		this.player.update();
		this.player.draw(this.ctx);
		
		//draws the level to the ground
		this.level.draw(this.ctx);
		
		//draws the hud
		app.HUD.update(this.ctx, this.player.health, this.Score, this.Multiplier);
		
	
		//adds enemies to the game
		this.addEnemies();
		//checks for endgame state
		this.endGame(this.player.health);
		//updates and draws all enemies
		for(var i = 0; i < this.enemyList.length; i++)
		{
			if (this.enemyList[i].active == true)
			{
				this.enemyList[i].update(this.dt);
				this.enemyList[i].draw(this.ctx);
			}
		}
		//checks if you shot an enemy
		this.collideBullet();
		//checks if the enemy  has colliede with the player
		this.collideEnemyPlayer();
		//stops game is end condition has been met
		if(app.STATE.END == true)
		{
			app.endscreen.init(this.ctx, this.Score);
		}
		if(app.STATE.GAME == true)
		{
		
			requestAnimationFrame(this.update.bind(this));
	
		}
	},
	
	addEnemies: function(){
		var p = this.enemyList
		var activeCount = 0;
		//checks to see how many active enemies are in the game
		for(var i = 0; i < p.length; i++)
		{
			if(p[i].active == true)
			{
				activeCount++;
			}
			
		}
		
		for(var i = 0; i < p.length; i++)
		{
			//this recycles indexes in the enemt array once an enemy has been defeated
			if(p[i].active == false)
			{
				if(activeCount < 10)
				{
					p[i] =new app.Fly(-10,  (Math.random()* 325) + 100, (Math.random()*4) + 1);
				}
			}
		}
		//adds 10 enemies when the game is initialized
		if (p.length < 10)
		{
			
				p.push(new app.Fly(-10,  (Math.random()* 325) + 100, (Math.random()*4) +1));
			
		}
	
	},
	//checks for bullet collision.
	collideBullet: function(){
	var bullet = this.player.playerBullets;
	var enemy = this.enemyList;
	
		for(var i = 0; i < enemy.length; i++)
		{
			for(var j = 0; j < bullet.length; j++)
			{
				if(bullet[j].active == true)
				{
				
					if((bullet[j].x <= enemy[i].x + enemy[i].width/2) && (bullet[j].x >= enemy[i].x - enemy[i].width/2 ))
					{
						if((bullet[j].y <= enemy[i].y + enemy[i].height/2) && (bullet[j].y >= enemy[i].y - enemy[i].height/2))
						{
							//sets both to inactive
							bullet[j].active = false;
							enemy[i].active = false;
							//if the multiplier is less than 0 set it to 0
							if(this.Multiplier < 0)
							{
								this.Multiplier = 0;
							}
							//adds + 5 to multiplier
							this.Multiplier += 5;
							//calcs the score;
							this.Score = this.Score + (10 * this.Multiplier);
							this.HitSFX.play();
						}
					}
				
				
				}
				
				
				
			}
			
		}
	
	},
	//if the player and enemy collide
	collideEnemyPlayer: function(){
		var enemy = this.enemyList;
		var rect1 = {x:this.player.x, y:this.player.y, width:this.player.PlayerWidth, height:this.player.PlayerHeight};
		for(var i = 0; i < enemy.length; i++)
		{
			var rect2 = {x:enemy[i].x, y:enemy[i].y, width:enemy[i].width, height:enemy[i].height};
			
			if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) 
			{
				//subtracts from multiplier
				this.Multiplier--;
				this.HurtSFX.play();
				this.player.health--;
				
			}
		
		
	
		}
	},
	
	endGame: function(health){
		if (health <=0)
		{	//ends game if health is equal to 0
			app.STATE.GAME = false;
			app.STATE.END = true;
		}
	
	
	}
	
	

};