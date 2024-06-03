let currentState = true;
self.onmessage = function ({data: {turn}}) {
    if (turn === 'off') {
        clearInterval(timer);
    }
    if (turn === 'on') {
        timer = setInterval(() => {
            self.postMessage({ currentState })                
        }, 1000);
    }
}
