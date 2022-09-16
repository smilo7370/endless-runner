class Boot extends Phaser.Scene {
	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}

function startGame()
{
	$("splashPage").hide();
	game = new Phaser.Game({
		type: Phaser.AUTO,
		width: 800,
		height: 600,
        backgroundColor: "#444444",
		parent: 'game-division',
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {
					y: 0
				},
				debug: true
			}
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		audio: {
			disableWebAudio: true
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Ban", Ban);
	game.scene.add("Boot", Boot, true);
	game.scene.start("Boot", {  });
}

$(document).ready(function() {
	startGame();
});