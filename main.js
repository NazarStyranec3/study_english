
let week = false; 
let current_name_cleanin
var choose_button = []
let words = [];
let wavesurfer;
let words_ukr = [];
let words_eng = [];
let wavesurfers = [];
let activeWave = null;

function startGame() {
    wavesurfers.forEach(ws => {
        try {
            ws.stop();     // ⛔ зупини звук
            ws.destroy();  // 💀 видали
        } catch(e) {}
    });
    wavesurfers = [];
    words_ukr = [];
    words_eng = [];
    const word_fool = [

        ['зміна','shift'],
        ['клієнт','customer'],
        ['товар','stock'],
        ['полиця','shelf'],
        ['замовлення','order'],

        ['доставка','delivery'],
        ['каса','cash register'],
        ['ціна','price'],
    
        ['працівник','employee'],
        ['співробітник','staff'],
        ['керівник','supervisor'],
    

        ['втомлений','tired'],
        ['готовий','ready'],
        ['вечір','evening'],

        ['майже','almost'],
        ['завжди','always'],
        ['інколи','sometimes'],
        ['ніколи','never'],

        ['потрібно','need'],
        ['хотіти','want'],
        ['можу','can'],
        ['повинен','must'],

        ['ще','still'],
        ['вже','already'],
        ['ще не','not yet'],

        ['зараз','now'],
        ['потім','later'],
        ['скоро','soon'],

        ['тут','here'],
        ['там','there'],
        ['всюди','everywhere'],

        ['дуже','very'],
        ['трохи','a little'],
        ['достатньо','enough'],

        ['правильно','correct'],
        ['неправильно','wrong'],
        ['можливо','maybe'],

        ['проблема','problem'],
        ['рішення','solution'],
        ['питання','question'],
        ['відповідь','answer'],

        ['починати','start'],
        ['закінчувати','finish'],
        ['продовжувати','continue'],

        ['чекати','wait'],
        ['знаходити','find'],
        ['пояснити','explain'],

        ['запитувати','ask'],
        ['відповідати','answer'],
        ['казати','say']

    ];

    // нові 6 слів
    words = word_fool.sort(() => Math.random() - 0.5).slice(0, 6);


    
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
        const b_3 = document.getElementById(`button_${i+1}_3`); 

        b_1.style.backgroundColor = "";
        b_1.style.pointerEvents = "auto";
        b_2.style.backgroundColor = "";
        b_2.style.pointerEvents = "auto";
        
        if (b_3) {
            b_3.style.backgroundColor = "";
            b_3.style.pointerEvents = "auto";
        }

        audio(`audio_${i+1}`, words_eng[i], i+1);
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
                        // audio_adn_text(Math.random() < 0.5)
                        wavesurfers.forEach(ws => {
                            ws.destroy();
                        });
                        wavesurfers = [];
                        startGame(); 
                    }, 30);
                }
            }

            choose_button.length = 0;
        }, 50);
    }
}
function audio_adn_text(audio){
    if (audio === false) {
        const playerWrappers_audi = document.querySelectorAll('.player-wrapper');
        playerWrappers_audi.forEach(wrapper => {
            wrapper.style.display = "none";
        });
        for (let i = 1; i < 7; i++) {
            console.log(i);
            const playerWrapper_text = document.getElementById(`button_${i}_2`);
            playerWrapper_text.style.display = "";
        }
        return; // Не ініціалізуємо wavesurfer, не виводимо плеєр
   
    }
    else{
        for (let i = 1; i < 7; i++) {
            console.log(i);
            const playerWrapper_text = document.getElementById(`button_${i}_2`);
            playerWrapper_text.style.display = "none";
        }
        const playerWrappers_audi = document.querySelectorAll('.player-wrapper');
        playerWrappers_audi.forEach(wrapper => {
            wrapper.style.display = "";
        });
        return; // Не ініціалізуємо wavesurfer, не виводимо плеєр
    }
}

function audio(id, audio_name, index) {
    
    const ws = WaveSurfer.create({
        container: `#${id}`,
        waveColor: 'rgba(255, 255, 255, 0.6)',
        progressColor: '#3390ec',
        cursorWidth: 0,
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 50,
        backend: 'WebAudio',
        url: `audio/audio_${audio_name}.mp3`,
        normalize: true,
    });
    wavesurfers.push(ws); // ✅ важливо
    const playBtn = document.getElementById(`playPauseBtn_${index}`);
    const icon = document.getElementById(`icon_${index}`);
    const timeEl = document.getElementById(`time_${index}`);
    playBtn.addEventListener('click', () => {

        // 🔥 ГОЛОВНЕ: стопаємо інші аудіо
        if (activeWave && activeWave !== ws) {
            activeWave.pause();
            activeWave.seekTo(0);

            // повертаємо іконку попереднього
            const prevIndex = wavesurfers.indexOf(activeWave) + 1;
            const prevIcon = document.getElementById(`icon_${prevIndex}`);
            if (prevIcon) prevIcon.textContent = '▶';
        }

        ws.playPause();

        // встановлюємо активний
        activeWave = ws;
    });


    ws.on('play', () => icon.textContent = '⏸');
    ws.on('pause', () => icon.textContent = '▶');

    ws.on('ready', () => {
        timeEl.textContent = `0:00 / ${formatTime(ws.getDuration())}`;
    });

    ws.on('audioprocess', () => {
        timeEl.textContent =
            `${formatTime(ws.getCurrentTime())} / ${formatTime(ws.getDuration())}`;
    });
    ws.on('timeupdate', (currentTime) => {
        const duration = ws.getDuration();
    
        timeEl.textContent =
            `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });
    ws.on('ready', () => {
        ws.seekTo(0);
        ws.pause();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // audio_adn_text(Math.random() < 0.5)
    audio_adn_text(true)
    startGame()

    for (let row = 1; row <= 6; row++) {
        for (let col = 1; col <= 3; col++) {
            let buttonId = `button_${row}_${col}`;
            document.getElementById(buttonId).addEventListener('click', function() {
                let dataType;


                if (this.closest('.player-wrapper')) {
                    dataType = 'audio';
                    click_button(choose_button, buttonId, words_eng[row-1], words);
                } else {
                    dataType = 'unknown';
                    click_button(choose_button, buttonId, this.textContent, words);
                }
                
                
           
            });
        }
    }
    
});





