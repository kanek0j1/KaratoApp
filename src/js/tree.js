let growth = 0.0;
let leaf = 0;
let leafColor = [139, 209, 89];

function setup() {
    let cnv = createCanvas(windowWidth * 0.85, windowHeight * 0.85);
    cnv.parent('canvas-container');
    frameRate(20);
}
function changeLeafColor(happy, angry, sad, fun) {
    let r = 139, g = 209, b = 89;

    // 文字列を数値に変換
    let happyValue = parseInt(happy);
    let angryValue = parseInt(angry);
    let sadValue = parseInt(sad);
    let funValue = parseInt(fun);

    if (happyValue) r += 30 * happyValue; g += 30 * happyValue; b -= 5 * happyValue;
    if (angryValue) r += 30 * angryValue; g -= 5 * angryValue; b -= 5 * angryValue;
    if (sadValue) r -= 5 * sadValue; g -= 5 * sadValue; b += 30 * sadValue;
    if (funValue) r += 15 * funValue; g += 30 * funValue; b += 15 * funValue;

    leafColor = [r, g, b];
}

function windowResized() {
    resizeCanvas(windowWidth * 0.85, windowHeight * 0.85);
}

function draw() {
    background(255);
    stroke(0);

    let commands = genCommand(Math.floor(growth));
    let distance = 1.7 * growth;
    let angle = radians(25);

    translate(width / 2, height);
    let depth = 0;
    leaf = 0;

    for (let i = 0; i < commands.length; i++) {
        let currentCmd = commands.charAt(i);
        switch (currentCmd) {
            case "F":
                strokeWeight(map(depth, 0, growth, 5, 0));
                line(0, 0, 0, -distance);
                translate(0, -distance);
                break;
            case "+":
                rotate(angle);
                break;
            case "-":
                rotate(-angle);
                break;
            case "[":
                push();
                depth++;
                break;
            case "]":
                pop();
                depth--;
                leaf++;
                if(leaf > 6) {
                drawLeaf();
                }
                break;
        }
    }

    growth += 0.05;
    if (Math.floor(growth) >= 5) {
        growth = 5.5;
    }
}


document.addEventListener('DOMContentLoaded', () =>{
 const url = new URL(window.location.href);
 // クエリパラメータを取得
    const happyValue = url.searchParams.get('happy');
    const angryValue = url.searchParams.get('angry');
    const sadValue = url.searchParams.get('sad');
    const funValue = url.searchParams.get('fun');
    console.log(happyValue, angryValue, sadValue, funValue);


    // 文字列を数値に変換
    let happyclore = parseInt(happyValue);
    let angryclore = parseInt(angryValue);
    let sadclore = parseInt(sadValue);
    let funclore = parseInt(funValue);
//document.getElementById('#btn-submit').addEventListener('click', (event) => {
//     event.preventDefault(); // デフォルトの動作を防ぐ

//     // 各感情の値を取得
//     let happyValue = document.querySelector('input[name="happy"]:checked').value;
//     let angryValue = document.querySelector('input[name="angry"]:checked').value;
//     let sadValue = document.querySelector('input[name="sad"]:checked').value;
//     let funValue = document.querySelector('input[name="fun"]:checked').value;

//     // コンソールに出力
//     console.log('Happy: ' + happyValue);
//     console.log('Angry: ' + angryValue);
//     console.log('Sad: ' + sadValue);
//     console.log('Fun: ' + funValue);

//     // クエリパラメータを作成
//     let params = new URLSearchParams();
//     params.append('happy', happyValue);
//     params.append('angry', angryValue);
//     params.append('sad', sadValue);
//     params.append('fun', funValue);

//     // クエリパラメータを含むURLに遷移
//     window.location.href = 'index.html?' + params.toString();

//     // 葉の色を変更する（この関数の実装は省略）
   changeLeafColor(happyValue, angryValue, sadValue, funValue);
// });
});


function changeLeafColor(happyclore, angryclore, sadclore, funclore) {
    let r = 139, g = 209, b = 89;
    if (happyclore) r += 30; g += 30; b -= 5;
    if (angryclore) r += 30; g -= 5; b -= 5;
    if (sadclore) r -= 5; g -= 5; b += 30;
    if (funclore) r += 15; g += 30; b += 15;
    leafColor = [r, g, b];function changeLeafColor(happyclore, angryclore, sadclore, funclore) {
    let r = 139, g = 209, b = 89;


    if (happyValue) r += 30 * happyValue; g += 30 * happyValue; b -= 5 * happyValue;
    if (angryValue) r += 30 * angryValue; g -= 5 * angryValue; b -= 5 * angryValue;
    if (sadValue) r -= 5 * sadValue; g -= 5 * sadValue; b += 30 * sadValue;
    if (funValue) r += 15 * funValue; g += 30 * funValue; b += 15 * funValue;

    leafColor = [r, g, b];
}
}

function drawLeaf() {
    push();
    fill(...leafColor);
    noStroke();
    ellipse(0, 0, 13, 6);
    pop();
}

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