"use strict";

var app = app || {};

app.player = {
	color: "red",
	x:200,
	y:200,
	PlayerWidth: 25,
	PlayerHeight: 35,
	health: 100,
	speed: 250,
	coolDownTimer: 40,
	shotCoolDown: false,
	Xvelocity:0,
	Yvelovity:0,
	dt: 1/60.00,
	gravity: 0.981/4,
	level: undefined,
	isJumping: false,
	floorLeftCollide: false,
	floorCollide: false,
	lookLeft: true,
	lookRight: false,
	playerBullets: [],
	halfHeight: 17.5,
	halfWidth: 12.5,
	animTimer: 0,
	playerImageLeft: undefined,
	playerImageRight: undefined,
	playerImageJumpLeft: undefined,
	playerImageJumpRight: undefined,
	JumpSFX: undefined,
	ShootSFX: undefined,
	accel: 10,
	Xaccel: 0,
	
	
	init: function(){
	console.log("player.init called");
	this.playerImageRight = new Image();
	this.playerImageRight.src = app.IMAGES['PlayerSheetRight'];
	
	this.playerImageLeft = new Image();
	this.playerImageLeft.src = app.IMAGES['PlayerSheetLeft'];
	
	this.playerImageJumpRight = new Image();
	this.playerImageJumpRight.src = app.IMAGES['PlayerJumpRight'];
	
	this.playerImageJumpLeft = new Image();
	this.playerImageJumpLeft.src = app.IMAGES['PlayerJumpLeft'];
	
	this.JumpSFX = new Audio();
	this.JumpSFX.src = app.SOUNDS['Jump'];
	
	this.ShootSFX = new Audio();
	this.ShootSFX.src = app.SOUNDS['Shoot'];
	},
	//move player left
	moveLeft: function(dt){
	
		//booleans change which way the player is faceing
		this.lookLeft = true;
		this.lookRight = false;
		
		//calcualtes the direction and the move speeds
		
			if (this.Xaccel > -4.5)
			{
			this.Xaccel -= .8;
			}
		
		
		this.Xvelocity = -1;
		this.x +=  this.Xaccel;
	
	},
	//move player right
	moveRight: function(dt){
	
		//booleans change which way the player is faceing
		this.lookLeft = false;
		this.lookRight = true;
		
		//calcualtes the direction and the move speeds
		
			if (this.Xaccel < 4.5)
			{
			this.Xaccel += .8;
			}
		
		this.Xvelocity = 1;
		this.x += this.Xaccel;
	},
	//make player jump
	jump: function(dt){
		//if the character is hitting the floor he can jump when the player presses input
		if(this.floorCollide == true)
		{
			this.isJumping = true;	
			this.JumpSFX.play();
		}
	},
	
	stopJump: function(){
		if(this.isJumping == true)
		{
		
		this.isJumping =false;
		this.accel = -1;
		}
	},
	//update
	update: function(){
		//calculate gravity and collision
		this.calculateGravity();
		this.checkCollision();
		//updates the bullets fired
		this.shootCooldown();
		if (this.y > 700){
			this.health = 0;
		
		}
		//set bullet to inactive if out of bounds
		for(var i=0; i< this.playerBullets.length; i++){
				this.playerBullets[i].inBounds
				if(this.playerBullets[i].active == true)
				{
					this.playerBullets[i].update(this.dt, this.lookLeft);
				}
			}
			
		
	},
	
	calculateGravity: function(){
			
			//if is not coldliding with the floor
			
			if(this.floorCollide == false && this.isJumping == false )
			{
				this.Yvelocity = 1;
				this.accel+=this.Yvelocity * this.gravity ;
				this.y += this.accel;
				
			}
			else//if it is colliding  with the floor
			{
				//set velocity to 0
				this.Yvelocity = 0;
				
				if(this.isJumping == true)
				{
					//jump up and calculate jump force until at the apex of the jump
					if(this.accel >= 0)
					{
					
					this.Yvelocity = -1;
					this.accel += this.Yvelocity * this.gravity;
					
					this.y -= this.accel ;
					
					}
					else
					{
						this.isJumping=false;
						
					}
					
				}

			}
			//decelerates the x acceleration
			if(this.Xaccel >.6)
			{
				
				this.Xaccel = this.Xaccel - .6;
				this.x = this.x + this.Xaccel;
				
			}
			else if(this.Xaccel < -.6)
			{
				
				this.Xaccel = this.Xaccel + .6;
				this.x = this.x + this.Xaccel;
				
			}
			else
			{
				this.Xaccel =0;
			}
			
	},
	//checks collsion between the player and the floor
	checkCollision: function(){
		//checks if the player is hitting bottom floor
			if((this.y + this.halfHeight >= app.level.floorStartY && this.y +this.halfHeight <= app.level.floorEndY))
			{
				if(this.x  >= app.level.floorStartX && this.x <= app.level.floorEndX)
				{
					//set values so the player can jump after
					
					this.floorCollide = true;
					this.y = app.level.floorStartY- this.halfHeight;
					this.accel =13;
					
				}
				else
				{
					this.floorCollide = false;
				}
				
			}
			else
			{
				this.floorCollide = false;
			}
			
	},
	
	draw: function(ctx){
		//half player values
		var halfW = 12.5;
		var halfH = 17.5;
			
			//adds to teh animation timer
			this.animTimer++;
		
			//if looking left draw left image
			if(this.lookLeft == true)
			{
				this.aimAssist(ctx, 0);
				
				if(this.floorCollide == true)
				{
					if(this.Xaccel < 0)
					{
					//animations code
						if(this.animTimer >= 15)
						{
							this.animTimer = 0;
						}
						if(this.animTimer <= 5)
						{
							ctx.drawImage(this.playerImageLeft, 0,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						if(this.animTimer > 5 && this.animTimer <= 10)
						{
							ctx.drawImage(this.playerImageLeft, 25,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						if(this.animTimer > 10)
						{
							ctx.drawImage(this.playerImageLeft, 50,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						
						
					}
					if(this.Xaccel ==0)
					{
						ctx.drawImage(this.playerImageLeft, 50,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						this.animTimer = 0;
					}
				}
				else
				{
					//animation code
					if(this.animTimer >= 25)
					{
						this.animTimer = 0;
					}
					if(this.animTimer <= 5)
					{
						ctx.drawImage(this.playerImageJumpLeft, 75,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 5 && this.animTimer <= 10)
					{
						ctx.drawImage(this.playerImageJumpLeft, 50,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 10 && this.animTimer <= 15)
					{
						ctx.drawImage(this.playerImageJumpLeft, 25,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 20)
					{
						ctx.drawImage(this.playerImageJumpLeft, 0,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					
						
				}
				
			}
			
					
			
			
			//if looking right draw right image
			
			if(this.lookRight == true)
			{
				this.aimAssist(ctx, 750);
				if(this.floorCollide == true)
				{
					if(this.Xaccel > 0)
					{
						if(this.animTimer <= 5)
						{
							ctx.drawImage(this.playerImageRight,50,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						if(this.animTimer > 5 && this.animTimer <= 10)
						{
							ctx.drawImage(this.playerImageRight,25,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						if(this.animTimer > 10)
						{
							ctx.drawImage(this.playerImageRight,0,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						}
						if(this.animTimer >= 15)
						{
							this.animTimer = 0;
						}
						
					}
					if(this.Xaccel ==0)
					{
						ctx.drawImage(this.playerImageRight,0,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
						this.animTimer = 0;
					}
				}
				else
				{
				//if he is jumping animate
					if(this.animTimer <= 5)
					{
						ctx.drawImage(this.playerImageJumpRight, 75,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 5 && this.animTimer <= 10)
					{
						ctx.drawImage(this.playerImageJumpRight, 50,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 10 && this.animTimer <= 15)
					{
						ctx.drawImage(this.playerImageJumpRight, 25,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer > 20  && this.animTimer <= 25)
					{
						ctx.drawImage(this.playerImageJumpRight, 0,0, 25,35, this.x-halfW, this.y-halfH, this.PlayerWidth, this.PlayerHeight);
					}
					if(this.animTimer >= 25)
					{
						this.animTimer = 0;
					}
						
				}
			}
			
			//draws bullets
			for(var i=0; i < this.playerBullets.length; i++){
				if(this.playerBullets[i].active == true)
				{
					this.playerBullets[i].draw(ctx);
				}
				
			}
			
	},
	//draws red line to assist with aiming
	aimAssist: function(ctx, direction){
		if(this.floorCollide == false)
		{
			ctx.save();
			ctx.strokeStyle = 'red';
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(direction, this.y);
			ctx.stroke();
			
			ctx.restore();
		}
	
	},
	//waits to allow you to fire again
	shootCooldown : function(){
	
		if(this.coolDownTimer > 0){
			if(this.shotCoolDown == true)
			{
				this.coolDownTimer -= 1;
			}
		}
		else
		{
			this.shotCoolDown = false;
		}
		if(this.shotCoolDown == false)
		{
			this.coolDownTimer = 40;
		}
		
		
	
	},
	
		//fire methods, creates a new bullet in playerBullet array
	shoot: function(x,y) {
		
		if(this.shotCoolDown == false)
		{
			this.playerBullets.push(new app.Bullet(x, y, 500, this.lookLeft));
			this.shotCoolDown = true;
			this.ShootSFX.play();
		}
			
	}

};