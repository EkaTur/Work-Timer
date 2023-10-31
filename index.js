const interval = document.querySelectorAll('.interval'); 

const timePar = document.querySelector('#timePar');
const startBtn = document.querySelector('#btnStart');
const headerTwo = document.querySelector('#headerTwo');
const breakLeft = document.querySelector('#breakLeft');
const parBreak = document.querySelector('#parBreak');
const player = document.querySelector('#player');


const data = [
    {
        time: 25 * 60,
        break: 5 * 60,
        par: '25:00',
    },
    {
        time: 45 * 60,
        break: 5 * 60,
        par: '45:00',
    }
] 

let time = 0;
let breakTime = 0;
let timerID = null;
let timerRunning = false;

function stopTimer() {
    timerRunning = false;
    timerID =  clearInterval(timerID);
    startBtn.innerHTML = `START`;
}

startBtn.addEventListener('click', check);

function check() {
    timerRunning ? stopTimer() : startTime();
}

function startTime() {
    
    timerRunning = true;
    startBtn.innerHTML = 'STOP';
    resetSettings();

    let min = Math.floor(time / 60);
    let sec = time % 60;

    if (sec < 10) {
        sec = '0' + sec;
    }

    timePar.textContent = `${min}:${sec}`;

    timerID = setInterval(function () { 
        time--;

        min = Math.floor(time / 60);
        sec = time % 60;

        if (sec < 10) {
            sec = '0' + sec;
        }

        timePar.textContent = `${min}:${sec}`;

        if (time === 0) {
            clearInterval(timerID);
            time = 0;
            if (document.querySelector('.one').checked) {
                breakTime = 1 * 60;
            }
            else if (document.querySelector('.two').checked) {
                breakTime = 2 * 60;
            }
            anim();
            headerTwo.style.display = 'block';
            breakLeft.style.display = 'block';
            parBreak.style.display = 'block';

            player.play();

            let breakMin = Math.floor(breakTime / 60);
            let breakSec = breakTime % 60;

            if (breakSec < 10) {
                breakSec = '0' + breakSec;
            }

            parBreak.textContent = `${breakMin}:${breakSec}`;

            let breakTimerID = setInterval(function () {
                breakTime--;

                breakMin = Math.floor(breakTime / 60);
                breakSec = breakTime % 60;

                if (breakSec < 10) {
                    breakSec = '0' + breakSec;
                }

                parBreak.textContent = `${breakMin}:${breakSec}`;

                if (breakTime === 0) {
                    clearInterval(breakTimerID);
                    breakTime = 0;
                    player.play();
                    clearInterval(timerID);
                    if (document.querySelector('.one').checked) {
                        time = 1 * 60;
                    }
                    else if (document.querySelector('.two').checked) {
                        time = 2 * 60;
                    }
                    startTime();
                }
            }, 1000);
        }
    }, 1000);
}

const removeStyle = () => {
    interval.forEach(element => element.classList.remove('addedStyle'))
};

interval.forEach((element, index) => {
    element.addEventListener('click', () => {
        removeStyle();
        resetSettings();
        btnStart.removeAttribute('disabled');
        timePar.textContent = data[index].par;
        element.classList.add('addedStyle');

        time = data[index].time;
        breakTime = data[index].break;
    })
});

function resetSettings() {
    clearInterval(timerID);
    timerID = null;
    headerTwo.style.display = 'none';
    breakLeft.style.display = 'none';
    parBreak.style.display = 'none';
}

function anim() {
    gsap.from('#breakContainer', {x: -200, opacity: 0, delay: 1, duration: 1.5})
}

gsap.from('.headerOne', { y: -200, opacity: 0, duration: 1, delay: 1 })
gsap.from('.headerThree', { y: -300, opacity: 0, duration: 1.5, delay: 1.5 })
gsap.from('.interval', { x: -200, opacity: 0, duration: 1.5, delay: 2.5, stagger: 1 })
gsap.from('span', { x: -200, opacity: 0, duration: 1.5, delay: 2, stagger: 1 })
gsap.from('#timePar', { x: -200, opacity: 0, duration: 1.5, delay: 3 })
gsap.from('#btnStart', { y: -500, opacity: 0, duration: 1.5, delay: 3.5, ease: 'bounce' })