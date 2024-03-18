document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#btn-submit').forEach(button => {
        button.addEventListener('click', function() {
            // happyの値を取得
            let happyValue = document.querySelector('input[name="happy"]:checked').value;
            console.log('Happy: ' + happyValue);

            // angryの値を取得
            let angryValue = document.querySelector('input[name="angry"]:checked').value;
            console.log('Angry: ' + angryValue);

            // sadの値を取得
            let sadValue = document.querySelector('input[name="sad"]:checked').value;
            console.log('Sad: ' + sadValue);

            // funの値を取得
            let funValue = document.querySelector('input[name="fun"]:checked').value;
            console.log('Fun: ' + funValue);
        });
    });
});