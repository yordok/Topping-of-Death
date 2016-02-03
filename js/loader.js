"use strict";

var app = app || {};

//array of key values
app.KEYBOARD = {
	"KEY_LEFT": 37,

	"KEY_RIGHT": 39,

	"KEY_Z": 90,
	
	"KEY_X": 88,
	
	"KEY_C": 67,
	


}
//input array
app.keydown =[];
//onload
app.STATE = {START: true, GAME: false, END: false};
	




window.onload = function(){
	console.log("window.onload called");
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	
	if(app.STATE.START == true)
	{
		app.startscreen.init(ctx);
		
	};
	
	
	
	//sets
	
	
	//keydown event listener
	window.addEventListener("keydown", function(e){
	app.keydown[e.keyCode] = true;
	//console.log(app.keydown[e.keyCode]);
	});
	//keyup event listener
	window.addEventListener("keyup", function(e){
	app.keydown[e.keyCode] = false;
	//console.log("keyup=" + e.keyCode);
	});
	//loading images
	app.queue = new createjs.LoadQueue(false);
	app.queue.loadManifest([
		{id: "floorTile", src:"images/floortile.png"},
		{id: "PlayerSheetLeft", src:"images/PlayerSheetLeft.png"},
		{id: "PlayerSheetRight", src:"images/PlayerSheetRight.png"},
		{id: "PlayerJumpLeft", src:"images/PlayerJumpLeft.png"},
		{id: "PlayerJumpRight", src:"images/PlayerJumpRight.png"},
		{id: "Background", src:"images/background.png"},
		{id: "FlySheet", src:"images/FlySheet.png"},
		{id: "FlySheetFlip", src:"images/FlySheetFlip.png"},
		{id: "StartScreen", src:"images/StartScreen.png"},
		{id: "Instructions", src:"images/Instructions.png"},
		
		
		{id: "DynamiteSheet", src:"images/dynamitesheet.png"},
		
		{id: "Background_music", src:"sounds/background_song.mp3"},
		{id: "JumpSFX", src:"sounds/Jump.wav"},
		{id: "ShootSFX", src:"sounds/Shoot.wav"},
		{id: "HitSFX", src:"sounds/Hit.wav"},
		{id: "HurtSFX", src:"sounds/Hurt.wav"}
		
		
		]);
	
}
//setting images to an aray
app.IMAGES = {
	floorTile: "images/floortile.png",
	PlayerSheetLeft: "images/PlayerSheetLeft.png",
	PlayerSheetRight: "images/PlayerSheetRight.png",
	PlayerJumpLeft: "images/PlayerJumpLeft.png",
	PlayerJumpRight: "images/PlayerJumpRight.png",
	Background: "images/background.png",
	FlySheet: "images/FlySheet.png",
	FlySheetFlip: "images/FlySheetFlip.png",
	StartScreen: "images/StartScreen.png",
	Instructions: "images/Instructions.png",
	DynamiteSheet: "images/dynamitesheet.png",
	
	
	

}

app.SOUNDS = {

	Jump: "sounds/Jump.wav",
	Shoot: "sounds/Shoot.wav",
	Hit: "sounds/Hit.wav",
	Background_music: "sounds/background_song.mp3",
	Hurt: "sounds/Hurt.wav"



}
