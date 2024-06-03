let timer; 
let minutes = 25; 
let seconds = 0; 
let isPaused = true; 
let enteredTime = null; 
let pomodoroStatus = false;
let pomodoroFokus;

let statusHTML = document.getElementById('status');

// Icons
let iconStart = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="100" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg> ';
let iconPause = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="100" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>';
let iconFocus = '<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target" style="vertical-align: -.15em; margin-right: -.2em;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
let iconBreak = '<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee" style="vertical-align: -.15em; margin-right: -.2em;"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>';
//

let pauseText = iconPause + ' Pause';
let defaultStatus = '<svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer" style="vertical-align: -.15em; margin-right: -.2em;"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg> Timer';

function notify() {
    const notification = new Notification('Timer:', {
        body: `Die Zeit ist abgelaufen!`,
        icon: `icon.png`
    });
}

function notifyPause() {
    const notification = new Notification('Pomodoro:', {
        body: `Fokussitzung fertig. Jetzt kommen 5min Pause!`,
        icon: `icon.png`
    });
}

function notifyFokus() {
    const notification = new Notification('Pomodoro:', {
        body: `Pause beendet! Jetzt kommen 25min Fokus.`,
        icon: `icon.png`
    });
}

function playAudio(pos) {
    if (pos === 1) {
        var audio = new Audio('sessionEnd.wav');
        audio.play();
    }
    if (pos === 2) {
        var audio = new Audio('sessionStart.wav');
        audio.play();
    }
  }
  
function startTimer() { 
    timer = setInterval(updateTimer, 1000); 
} 
  
function updateTimer() { 
    const timerElement = 
        document.getElementById('timer'); 
    timerElement.textContent =  
        formatTime(minutes, seconds); 
  
    if (minutes === 0 && seconds === 0) { 
        clearInterval(timer);

        if (pomodoroStatus === false) {
            playAudio(1);
            notify();
        }

        if (pomodoroStatus === true) {

            if (pomodoroFokus === true) {
                playAudio(1);
                notifyPause();
                pomodoroFokus = !pomodoroFokus;
                minutes = 5;
                seconds = 5;
                isPaused = false; 
                const timerElement = 
                    document.getElementById('timer'); 
                timerElement.textContent = 
                    formatTime(minutes, seconds); 
                clearInterval(timer); 
                const pauseResumeButton = 
                    document.querySelector('.control-buttons button'); 
                pauseResumeButton.innerHTML = pauseText; 
                startTimer();
                statusHTML.innerHTML = iconBreak + ' Pause';

            } else if (pomodoroFokus === false) {
                playAudio(2);
                notifyFokus();
                pomodoroFokus = !pomodoroFokus;
                minutes = 25;
                seconds = 5;
                isPaused = false; 
                const timerElement = 
                    document.getElementById('timer'); 
                timerElement.textContent = 
                    formatTime(minutes, seconds); 
                clearInterval(timer); 
                const pauseResumeButton = 
                    document.querySelector('.control-buttons button'); 
                pauseResumeButton.innerHTML = pauseText; 
                startTimer();
                statusHTML.innerHTML = iconFocus + ' Fokus';

            }
        }

    } else if (!isPaused) { 
        if (seconds > 0) { 
            seconds--; 
        } else { 
            seconds = 59; 
            minutes--; 
        } 
    } 
} 
  
function formatTime(minutes, seconds) { 
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
} 
  
function togglePauseResume() { 
    const pauseResumeButton = 
        document.querySelector('.control-buttons button'); 
    isPaused = !isPaused; 
  
    if (isPaused) { 
        clearInterval(timer); 
        pauseResumeButton.innerHTML = iconStart +' Start'; 
    } else { 
        startTimer(); 
        pauseResumeButton.innerHTML = pauseText; 
    } 
} 
  
function restartTimer() { 
    clearInterval(timer); 
    minutes = enteredTime || 25; 
    seconds = 0; 
    isPaused = false; 
    const timerElement = 
        document.getElementById('timer'); 
    timerElement.textContent = 
        formatTime(minutes, seconds); 
    const pauseResumeButton = 
        document.querySelector('.control-buttons button'); 
    pauseResumeButton.innerHTML = pauseText; 
    startTimer(); 
    statusHTML.innerHTML = defaultStatus;
    pomodoroStatus = false;
} 

/*
function chooseTime(stunden, minuten, sekunden) { 
    const newTime = prompt('Zeit in Minuten angeben:'); 
    if (!isNaN(newTime) && newTime > 0) { 
        enteredTime = parseInt(newTime); 
        minutes = enteredTime; 
        seconds = 0; 
        isPaused = false; 
        const timerElement = 
            document.getElementById('timer'); 
        timerElement.textContent = 
            formatTime(minutes, seconds); 
        clearInterval(timer); 
        const pauseResumeButton = 
            document.querySelector('.control-buttons button'); 
        pauseResumeButton.textContent = 'Pause'; 
        startTimer(); 
    } else { 
        alert('Bitte eine Zahl echt'+ 
              ' größer als Null eingeben!'); 
    } 
} 
*/

function chooseTime(minuten, sekunden) { 

    if ((minuten !== 0) || (sekunden !== 0)) { 
        minutes = minuten; 
        seconds = sekunden; 
        isPaused = false; 
        const timerElement = 
            document.getElementById('timer'); 
        timerElement.textContent = 
            formatTime(minutes, seconds); 
        clearInterval(timer); 
        const pauseResumeButton = 
            document.querySelector('.control-buttons button'); 
        pauseResumeButton.innerHTML = pauseText; 
        startTimer(); 
        statusHTML.innerHTML = defaultStatus;
        pomodoroStatus = false;
    } else { 
        alert('Bitte eine Zahl echt'+ 
              ' größer als Null eingeben!'); 
    } 
} 

const formEingabe = document.querySelector('form');

formEingabe.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let newTime;

    document.querySelectorAll('[type="text"]').forEach(txt => {
        newTime = txt.value;
    })

    let hours = parseInt(newTime.substr(0, 2));
    let minutesInput = parseInt(newTime.substr(3, 2));

    let secondsEntered = parseInt(newTime.substr(6, 2));
    let minutesEntered = minutesInput + hours * 60;

    chooseTime(minutesEntered, secondsEntered);
    
    /*
    console.log(newTime);

    console.log(hours);
    console.log(minutesInput);
    console.log(seconds);
    */
}) 

function Pomodoro() {
    statusHTML.innerHTML = iconFocus +' Fokus';
    pomodoroStatus = true;
    pomodoroFokus = true;
    minutes = 25;
    seconds = 0;
    isPaused = false; 
    const timerElement = 
        document.getElementById('timer'); 
    timerElement.textContent = 
        formatTime(minutes, seconds); 
    clearInterval(timer); 
    const pauseResumeButton = 
        document.querySelector('.control-buttons button'); 
    pauseResumeButton.innerHTML = pauseText; 
    startTimer();
}