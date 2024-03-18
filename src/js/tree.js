function setup() {
    let cnv = createCanvas(windowWidth * 0.85, windowHeight * 0.9); // キャンバスを作成
    cnv.parent('canvas-container'); // キャンバスをmainタグ内に配置している
    noLoop(); // draw関数を1回だけ実行
}

function windowResized() {
    resizeCanvas(windowWidth * 0.85, windowHeight* 0.9); // ウィンドウサイズが変更された際にキャンバスサイズを再調整
}

function draw() {
    // ここにtreeのコードを追加していく！！！！
    let repeat = 2; // 繰り返し回数
            let command = gen_command(repeat); // コマンドの生成

            let distance = 60; // 進む距離
            let angle = PI / 4; // 回転角度（ラジアン）

            push();
            translate(windowWidth /2.5, windowHeight * 0.9); // 描画の開始位置

            for (const c of command) {
                switch (c) {
                    case "F": // 前進して線を描画
                        line(0, 0, 0, -distance); //y軸-60にライン
                        translate(0, -distance); //y軸を-60移動=上に伸びていく
                        break;
                    case "+": // 時計回りに回転
                        rotate(angle);
                        break;
                    case "-": // 反時計回りに回転
                        rotate(-angle);
                        break;
                    case "[": // 現在の状態を保存
                        push();
                        break;
                    case "]": // 最後に保存した状態に戻る
                        pop();
                        break;
                    default:
                        break;
                }
            }
            pop();
}

function gen_command(repeat) {
    let command = "F";
    for (let i = 0; i < repeat; i++) {
        let com = "";
        for (const k of command) {
            switch (k) {
                case "F":
                    com += "F[+F]F[-F]F";
                    break;
                default:
                    com += k;
                    break;
            }
        }
        command = com;
    }

    return command;
}
