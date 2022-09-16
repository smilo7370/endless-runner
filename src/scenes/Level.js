
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here
	initData() {
		this.platformSpeedRange = [300, 300];
		this.spawnRange = [80, 180];
		this.platformSizeRange = [90, 220];
		this.platformHeightRange = [-3, 3];
		this.platformHeighScale = 20;
		this.platformVerticalLimit = [0.4, 0.8];
		this.playerGravity = 900;
		this.jumpForce = 400;
		this.playerStartPosition = 200;
		this.jumps = 2;
		this.initialTime = 30;
	}

	create() {
		this.initData();
		// keeping track of added platforms
		this.addedPlatforms = 0;

		// Set Timer
		this.timeLeft = this.initialTime;
		console.log("Current Game Time: ", this.timeLeft);
		this.energyCont = this.add.sprite(this.game.config.width / 2, this.game.config.height / 9, "energycontainer").setScale(0.5);
		this.energyBar = this.add.sprite(this.energyCont.x + 23, this.energyCont.y, "energybar").setScale(0.5);
		this.energymask = this.add.sprite(this.energyCont.x / 2.25, this.energyBar.y, "energybar").setScale(0.5);
		this.energymask.visible = false;
		this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energymask);
		this.gameTimer = this.time.addEvent({
			delay: 700,
			callback: function () {
				this.timeLeft--;
				this.stepWidth = this.energymask.displayWidth / this.initialTime;
				this.energymask.x += this.stepWidth;
				if (this.timeLeft == 0) {
					this.scene.start("Level");
					alert("You Win!");
				}
			},
			callbackScope: this,
			loop: true
		});

		// group with all active platforms.
		this.platformGroup = this.add.group({
			removeCallback: function (platform) {
				platform.scene.platformPool.add(platform)
			}
		});

		// platform pool
		this.platformPool = this.add.group({
			removeCallback: function (platform) {
				platform.scene.platformGroup.add(platform)
			}
		});

		this.playerJumps = 0;

		this.addPlatform(this.game.scale.width, this.game.scale.width / 2, this.game.scale.height * this.platformVerticalLimit[1]);

		// adding the player;
		this.player = this.physics.add.sprite(this.playerStartPosition, this.game.scale.height * 0.7, "player");
		this.player.setGravityY(this.playerGravity);

		// setting collisions between the player and the platform group
		this.physics.add.collider(this.player, this.platformGroup, function () {
			// play "run" animation if the player is on a platform
		}, null, this);

		// checking for input
		this.input.on("pointerdown", this.jump, this);

		this.scale.on('orientationchange', function (orientation) {
			if (orientation === Phaser.Scale.PORTRAIT) {
				console.log("Device in Portrait Mode!");
			} else if (orientation === Phaser.Scale.LANDSCAPE) {
				console.log("Device in Landscape Mode!");
			}
		});

		this.editorCreate();
	}

	// the core of the script: platform are added from the pool or created on the fly
	addPlatform(platformWidth, posX, posY) {
		this.addedPlatforms++;
		let platform;
		if (this.platformPool.getLength()) {
			platform = this.platformPool.getFirst();
			platform.x = posX;
			platform.y = posY;
			platform.active = true;
			platform.visible = true;
			this.platformPool.remove(platform);
			platform.displayWidth = platformWidth;
			platform.tileScaleX = 1 / platform.scaleX;
		}
		else {
			platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
			this.physics.add.existing(platform);
			platform.body.setImmovable(true);
			platform.body.setVelocityX(Phaser.Math.Between(this.platformSpeedRange[0], this.platformSpeedRange[1]) * -1);
			this.platformGroup.add(platform);
		}
		this.nextPlatformDistance = Phaser.Math.Between(this.spawnRange[0], this.spawnRange[1]);
	}

	jump() {
		if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.jumps)) {
			if (this.player.body.touching.down) {
				this.playerJumps = 0;
			}
			this.player.setVelocityY(this.jumpForce * -1);
			this.playerJumps++;
			// stop animation below
		}
	}

	update() {
		// game over
		if (this.player.y > this.game.scale.height) {
			this.scene.start("Ban");
			console.log("You Lost!");
			localStorage.setItem("isPlayable", false);
		}
		this.player.x = this.playerStartPosition;

		// recycling platforms
		let minDistance = this.game.scale.width;
		let rightmostPlatformHeight = 0;
		this.platformGroup.getChildren().forEach(function (platform) {
			let platformDistance = this.game.scale.width - platform.x - platform.displayWidth / 2;
			if (platformDistance < minDistance) {
				minDistance = platformDistance;
				rightmostPlatformHeight = platform.y;
			}
			if (platform.x < - platform.displayWidth / 2) {
				this.platformGroup.killAndHide(platform);
				this.platformGroup.remove(platform);
			}
		}, this);

		// adding new platforms
		if (minDistance > this.nextPlatformDistance) {
			let nextPlatformWidth = Phaser.Math.Between(this.platformSizeRange[0], this.platformSizeRange[1]);
			let platformRandomHeight = this.platformHeighScale * Phaser.Math.Between(this.platformHeightRange[0], this.platformHeightRange[1]);
			let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
			let minPlatformHeight = this.game.scale.height * this.platformVerticalLimit[0];
			let maxPlatformHeight = this.game.scale.height * this.platformVerticalLimit[1];
			let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
			this.addPlatform(nextPlatformWidth, this.game.scale.width + nextPlatformWidth / 2, nextPlatformHeight);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
