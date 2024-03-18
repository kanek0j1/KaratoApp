function setup() {
    let cnv = createCanvas(windowWidth * 0.85, windowHeight / 1.11); // キャンバスを作成
    cnv.parent('canvas-container'); // キャンバスをmainタグ内に配置している
    noLoop(); // draw関数を1回だけ実行
}

function draw() {
    background(235); // キャンバスの背景色を指定
    // ここにtreeのコードを追加していく！！！！
}

function windowResized() {
    resizeCanvas(windowWidth * 0.85, windowHeight); // ウィンドウサイズが変更された際にキャンバスサイズを再調整
}
