
// You can write more code here

/* START OF COMPILED CODE */

class Ban extends Phaser.Scene {

	constructor() {
		super("Ban");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// text_1
		const text_1 = this.add.text(87.5, 279.619140625, "", {});
		text_1.text = "YOU ARE BANNED FOR LOSING!";
		text_1.setStyle({ "fontSize": "40px", "fontStyle": "bold" });

		// platform
		this.add.image(400, 358, "platform");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
