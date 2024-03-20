// L-systemのコード本体

let lsystem;
let ruleset = [];
let turtle;
let count = 0;

function setup() {
	createCanvas(500, 500);

	// ここを変えれば良い
	lsystem = new Lsystem("F");
	ruleset.push(new Rule("F", "FF+[+F-F]-[-F+F]"));
	turtle = new Turtle(width / 2, height, height / 3, radians(30));
	// (亀の初めのx座標, 亀の初めのy座標, 一辺の長さ, 回転の角度)の順で指定
	turtle.rate = 0.5;

	console.log("Generarion " + count + " : " + lsystem.current);
}

function draw() {
	background(255);
	translate(turtle.startx, turtle.starty);
	turtle.render();
	noLoop();
}

function mousePressed() {
	lsystem.changeSentence();
	turtle.changeLength();
	count++;
	console.log("Generarion " + count + " : " + lsystem.current);
	redraw();
}

// クラス「Lsystem」
class Lsystem {
	constructor(_c) {
		this.current = _c;
	}

	changeSentence() {
		let newSentence = "";
		for (let i = 0; i < this.current.length; i++) {
			let c = this.current.charAt(i);
			let replace = "" + c;
			for (let j = 0; j < ruleset.length; j++) {
				if (c == ruleset[j].getCharacter()) {
					replace = ruleset[j].getRule();
					break;
				}
			}
			newSentence += replace;
		}
		this.current = newSentence;
	}
}

// クラス「Rule」
class Rule {
	constructor(_c, _r) {
		this.character = _c;
		this.RuleOfChange = _r;
	}

	getCharacter() {
		return this.character;
	}

	getRule() {
		return this.RuleOfChange;
	}
}

// クラス「Turtle」
class Turtle {
	constructor(_x, _y, _l, _t) {
		this.startx = _x;
		this.starty = _y;
		this.len = _l;
		this.theta = _t;
	}

	render() {
		for (let i = 0; i < lsystem.current.length; i++) {
			let c = lsystem.current.charAt(i);
			if (c == "F") {
				line(0, 0, 0, -this.len);
				translate(0, -this.len);
			} else if (c == "G") {
				translate(0, -this.len);
			} else if (c == "+") {
				rotate(this.theta);
			} else if (c == "-") {
				rotate(-this.theta);
			} else if (c == "[") {
				push();
			} else if (c == "]") {
				pop();
			}
		}
	}

	changeLength() {
		this.len *= this.rate;
	}
}
