
let week = false; 
let current_name_cleanin
var choose_button = []
let words = [];

function startGame() {

    const word_fool = [
        ['робота','work'],
        ['зміна','shift'],
        ['начальник','boss'],
        ['клієнт','customer'],
        ['товар','stock'],
        ['склад','warehouse'],
        ['полиця','shelf'],
        ['коробка','box'],
        ['замовлення','order'],
        ['доставка','delivery'],
    
        ['каса','cash register'],
        ['ціна','price'],
        ['знижка','discount'],
        ['оплата','payment'],
        ['квиток','ticket'],
    
        ['працівник','employee'],
        ['група','group'],
        ['співробітник','staff'],
        ['керівник','supervisor'],
        ['офіс','office'],
    
        ['швидко','fast'],
        ['повільно','slow'],
        ['зайнятий','busy'],
        ['втомлений','tired'],
        ['готовий','ready'],
    
        ['ранок','morning'],
        ['вечір','evening'],
        ['день','day'],
        ['тиждень','week'],
        ['час','time']
    ];

    // нові 6 слів
    words = word_fool.sort(() => Math.random() - 0.5).slice(0, 6);

    let words_ukr = [];
    let words_eng = [];

    for (let i = 0; i < words.length; i++) {
        words_ukr.push(words[i][0]);
        words_eng.push(words[i][1]);
    }

    words_ukr.sort(() => Math.random() - 0.5);
    words_eng.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 6; i++) {
        document.getElementById(`button_${i+1}_1`).textContent = words_ukr[i];
        document.getElementById(`button_${i+1}_2`).textContent = words_eng[i];

        // скидаємо стиль
        document.getElementById(`button_${i+1}_1`).style.backgroundColor = "";
        document.getElementById(`button_${i+1}_2`).style.backgroundColor = "";
        document.getElementById(`button_${i+1}_1`).disabled = false;
        document.getElementById(`button_${i+1}_2`).disabled = false;

        const b_1 = document.getElementById(`button_${i+1}_1`);
        const b_2 = document.getElementById(`button_${i+1}_2`);

        b_1.style.backgroundColor = "";
        b_1.style.pointerEvents = "auto";
        b_2.style.backgroundColor = "";
        b_2.style.pointerEvents = "auto";
   
    }
}

function click_button(choose_button, buttonId, word, words_list){
    const btn = document.getElementById(buttonId);

    choose_button.push({ word: word, id: buttonId });

    btn.style.backgroundColor = "#82ca9d";

    if (choose_button.length === 2) {

        let w1 = choose_button[0].word;
        let w2 = choose_button[1].word;

        let correct = false;

        for (let pair of words_list) {
            if (
                (pair[0] === w1 && pair[1] === w2) ||
                (pair[0] === w2 && pair[1] === w1)
            ) {
                correct = true;
                break;
            }
        }

        setTimeout(() => {
            if (!correct) {
                choose_button.forEach(item => {
                    document.getElementById(item.id).style.backgroundColor = "";
                });
            } else {
                choose_button.forEach(item => {
                    const element = document.getElementById(item.id);
                    element.style.backgroundColor = "#545752";
                    element.style.pointerEvents = "none";
               
                });
                // 🔥 ВИДАЛЯЄМО ПАРУ
                for (let i = words.length - 1; i >= 0; i--) {
                    if (
                        words[i][0] === w1 || words[i][1] === w1 ||
                        words[i][0] === w2 || words[i][1] === w2
                    ) {
                        words.splice(i, 1);
                    }
                }

                // 🔥 ПЕРЕВІРКА ВИГРАШУ
                if (words.length === 0) {
                    setTimeout(() => {
                        startGame(); 
                    }, 30);
                }
            }

            choose_button.length = 0;
        }, 50);
    }
}

function audio(){

        const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgba(255, 255, 255, 0.3)',
        progressColor: '#3390ec',
        cursorWidth: 0,
        barWidth: 3,
        barGap: 3,
        barRadius: 3,
        height: 50,
        backend: 'MediaElement',
        url: 'audio/audio_week.mp3', // Перевір, щоб файл був тут!
    });

    // 2. Отримуємо елементи
    const playBtn = document.getElementById('playPauseBtn');
    const icon = document.getElementById('icon');

    // 3. Відслідковування кліку (додаємо лог для перевірки в консолі)
    playBtn.addEventListener('click', function() {
        console.log("Кнопку натиснуто!"); // Якщо це з'явиться в консолі (F12) — клік працює
        wavesurfer.playPause();
    });

    // 4. Зміна іконок
    wavesurfer.on('play', () => {
        icon.textContent = '⏸';
    });

    wavesurfer.on('pause', () => {
        icon.textContent = '▶';
    });

    // Повернення на початок після завершення
    wavesurfer.on('finish', () => {
        icon.textContent = '▶';
        wavesurfer.setTime(0); 
    });

    // Перевірка на помилку завантаження файлу
    wavesurfer.on('error', (err) => {
        console.error("Помилка WaveSurfer:", err);
    });
};

document.addEventListener('DOMContentLoaded', function() {

    startGame()

    for (let row = 1; row <= 6; row++) {
        for (let col = 1; col <= 2; col++) {
            let buttonId = `button_${row}_${col}`;
            document.getElementById(buttonId).addEventListener('click', function() {
                click_button(choose_button, buttonId, this.textContent, words);
           
            });
        }
    }
    audio()
});





