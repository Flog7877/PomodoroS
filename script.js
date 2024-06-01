let timer; 
let minutes = 25; 
let seconds = 0; 
let isPaused = true; 
let enteredTime = null; 

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
        playAudio(1);
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
        pauseResumeButton.textContent = 'Start'; 
    } else { 
        startTimer(); 
        pauseResumeButton.textContent = 'Pause'; 
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
    pauseResumeButton.textContent = 'Pause'; 
    startTimer(); 
} 
  
function chooseTime() { 
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

