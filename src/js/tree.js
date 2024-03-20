let growth = 0.0;
let leafColor = [139, 209, 89];

function setup() {
	let cnv = createCanvas(windowWidth * 0.85, windowHeight * 0.85);
	cnv.parent("canvas-container");
}

function windowResized() {
	resizeCanvas(windowWidth * 0.85, windowHeight * 0.85);
}

function draw() {
	background(255);
	// console.log("start");

	let commands = genCommand(growth);
	let distance = 1 * growth;
	let angle = radians(25);

	translate(width / 2, height);
	let depth = 0;

	for (let i = 0; i < commands.length; i++) {
		let currentCmd = commands.charAt(i);
		switch (currentCmd) {
			case "F":
				stroke("#C27526");
				strokeWeight(map(depth, 0, growth, 5, 0));
				line(0, 0, 0, -distance);
				translate(0, -distance);
				break;
			case "+":
				rotate(angle);
				drawLeaf();
				break;
			case "-":
				rotate(-angle);
				drawLeaf();
				break;
			case "[":
				push();
				depth++;
				break;
			case "]":
				pop();
				depth--;
				break;
		}
	}
	// console.log("end");
	let level = localStorage.getItem("level");
	console.log(level);

	growth = frameCount * 0.05;
	if (1 == level) {
		growth = 0.15;
	} else {
		growth = level * 0.3;
	}

	// 画像をBase64形式の文字列に変換
	// let base64String = png.canvas.toDataURL();

	// ローカルストレージに保存
	// localStorage.setItem('image_' + level, base64String);

	// canvasを画像に変換
	// let canvas = document.getElementById('defaultCanvas0');
	// console.log(canvas);

	document.addEventListener("DOMContentLoaded", () => {
		// URLSearchParamsを使用してクエリパラメータを取得
		const urlParams = new URLSearchParams(window.location.search);
		const happyValue = urlParams.get("happy");
		const angryValue = urlParams.get("angry");
		const sadValue = urlParams.get("sad");
		const funValue = urlParams.get("fun");
		console.log("happy = " + happyValue);
		console.log("angry = " + angryValue);
		console.log("sad = " + sadValue);
		console.log("fun = " + funValue);

		// 値の変換と葉の色の変更
		const happyclore = parseInt(happyValue);
		const angryclore = parseInt(angryValue);
		const sadclore = parseInt(sadValue);
		const funclore = parseInt(funValue);

		// クエリパラメータを含むURLに遷移
		//window.location.href = '../home.html?' +  parseInt.toInt();

		// 葉の色を変更する（この関数の実装は省略）
		changeLeafColor(happyclore, angryclore, sadclore, funclore);
	});

	function changeLeafColor(happyclore, angryclore, sadclore, funclore) {
		let r = 0,
			g = 0,
			b = 0;

		// 数値に変換
		let happyValue = parseInt(happyclore);
		let angryValue = parseInt(angryclore);
		let sadValue = parseInt(sadclore);
		let funValue = parseInt(funclore);

		// 値に基づいて色を変更
		if (happyValue + angryValue + sadValue + funValue <= 4) {
			(r = 139), (g = 209), (b = 89);
		} else {
			if (happyValue) {
				// 喜び（黄色を強調）
				r += 40 * happyValue;
				g += 40 * happyValue;
				b += 2 * happyValue;
			}
			if (angryValue) {
				// 怒り（赤を強調）
				r += 50 * angryValue;
				g -= 30 * angryValue;
				b -= 30 * angryValue;
			}
			if (sadValue) {
				// 哀しみ（青を強調）
				r -= 10 * sadValue;
				g -= 10 * sadValue;
				b += 110 * sadValue;
			}
			if (funValue) {
				// 楽しい（緑を強調し全体的に明るく）
				r -= 5 * funValue;
				g += 50 * funValue;
				b -= 5 * funValue;
			}
		}
		leafColor = [r, g, b];
	}

	function drawLeaf() {
		push();
		fill(...leafColor);
		noStroke();
		ellipse(0, 0, 13, 6);
		pop();
	}

	//生成パターン
	function genCommand(repeat) {
		let command = "X";
		for (let i = 0; i < repeat; i++) {
			let newCommand = "";
			for (let j = 0; j < command.length; j++) {
				switch (command[j]) {
					case "F":
						if (Math.random() < 0.5) {
							newCommand += "FF";
						} else {
							newCommand += "F-F";
						}
						break;
					case "X":
						newCommand += "F[+X]F[-X+]+X";
						break;
					default:
						newCommand += command[j];
						break;
				}
			}
			command = newCommand;
		}
		return command;
	}
}
