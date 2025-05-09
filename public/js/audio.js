let audio;
let divPai;
let progress;

let currentTime;
let duration;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
}

function updateProgressBar() {
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #F9B631 0%, #F9B631 ${value}%, white ${value}%, white 100%)`;
}

function play(element) {
    divPai = element.parentElement.parentElement;

    divPai.parentElement.classList.add('expanded');

    audio = divPai.getElementsByTagName('audio')[0];
    progress = divPai.querySelector('input[type="range"]')
    currentTime = divPai.querySelector('.times span:nth-child(1)')
    duration = divPai.querySelector('.times span:nth-child(2)')

    if (audio.paused) {
        audio.play();
        element.innerHTML = 'pause';
    } else {
        audio.pause();
        element.innerHTML = 'resume';
    }

    audio.addEventListener('timeupdate', () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
        updateProgressBar();
    });

    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
};
