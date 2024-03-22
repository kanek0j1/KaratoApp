
let number = 0;

let growth = 0.0;
let leafColor = [139, 209, 89];

let isDone = false
function setup() {
    isDone = false
	let cnv = createCanvas(windowWidth * 0.85, windowHeight * 0.85);
	cnv.parent("canvas-container");
}

function windowResized() {
	resizeCanvas(windowWidth * 0.85, windowHeight * 0.85);
}

async function draw() {
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
	let level = parseInt(localStorage.getItem("level")); // 文字列を数値に変換


		growth = frameCount * 0.02; // frameCountを利用してgrowthを増加させる
		let maxGrowth = 5.1; // levelに応じて成長限界を決める

		if (growth >= maxGrowth) {
			growth = maxGrowth; // 成長限界を超えないようにする
		}

        // 木が完成しているとき一度だけ呼ぶ
        if(growth === maxGrowth && !isDone) {
            isDone = true
            // canvasを画像に変換

            const canvas = document.getElementById('defaultCanvas0');
            const dataUrl = canvas.toDataURL(); // Data URLを取得
            console.log(dataUrl);

            // Data URLからBlobへの変換
            const fetchResponse = await fetch(dataUrl); // Data URLをFetch APIで扱う
            const blob = await fetchResponse.blob(); // レスポンスをBlobとして取得

            // Firebase Storageにアップロード
            const storage = getStorage();
            const auth = getAuth();
            const storageRef = ref(storage, auth.currentUser.uid + '/images/' + `${new Date().toISOString()}.png`);

            // Blobを使用してアップロード
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            }).catch((error) => {
                console.error('Upload failed', error);
            });
	}


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
		let r = 139,
			g = 209,
			b = 89;

		// 数値に変換
		let happyValue = parseInt(happyclore);
		let angryValue = parseInt(angryclore);
		let sadValue = parseInt(sadclore);
		let funValue = parseInt(funclore);

		// 値に基づいて色を変更
		if (happyValue ==null, angryValue ==null, sadValue == null, funValue == null) {
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
						newCommand += "FF";
						break;
					case "X":
						newCommand += "F[+X]F[-X+]X";
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




document.addEventListener('DOMContentLoaded', () => {
    // URLSearchParamsを使用してクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const happyValue = urlParams.get('happy');
    const angryValue = urlParams.get('angry');
    const sadValue = urlParams.get('sad');
    const funValue = urlParams.get('fun');
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
    let r = 0, g = 0, b = 0;

    // 数値に変換
    let happyValue = parseInt(happyclore);
    let angryValue = parseInt(angryclore);
    let sadValue = parseInt(sadclore);
    let funValue = parseInt(funclore);

// 値に基づいて色を変更
if(happyValue + angryValue + sadValue + funValue <= 4){
 r = 139, g = 209, b = 89;
}else {
    if (happyValue) { // 喜び（黄色を強調）
        r += 40 * happyValue; g += 40 * happyValue; b += 2 * happyValue;
    }
    if (angryValue) { // 怒り（赤を強調）
        r += 50 * angryValue; g -= 30 * angryValue; b -= 30 * angryValue;
    }
    if (sadValue) { // 哀しみ（青を強調）
        r -= 10 * sadValue; g -= 10 * sadValue; b += 110 * sadValue;
    }
    if (funValue) { // 楽しい（緑を強調し全体的に明るく）
        r -= 5 * funValue; g += 50 * funValue; b -= 5 * funValue;
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
                    newCommand += "FF";
                    break;
                case "X":
                        newCommand += "F[+X]F-[-X]++[-X+]X";
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
