const audio = document.getElementById('audio');
const playButton = document.getElementById('play_button');
const progress = document.getElementById('progress');

const currentTime = document.getElementById('current_time');
const duration = document.getElementById('duration');

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

playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = 'pause';
    } else {
        audio.pause();
        playButton.innerHTML = 'resume';
    }
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
    updateProgressBar();
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});