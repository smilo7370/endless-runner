
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(400, 450, "", {});
		progress.scaleX = 1.5;
		progress.scaleY = 1.5;
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		if(localStorage.getItem("isPlayable") == 'true') {
			this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
		}
		else {
			// alert("You are Banned for Losing Game!");
			this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Ban"));
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
