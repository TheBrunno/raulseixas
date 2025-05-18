let audio;
let divPai;
let progress;

let currentTime;
let duration;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #F9B631 0%, #F9B631 ${value}%, white ${value}%, white 100%)`;
}

function resetStates(){
    const allSongs = document.getElementsByClassName('song');
    for(let i=0; i<allSongs.length; i++){
        allSongs[i].classList.remove('expanded');
        try{
            audio.pause();
            allSongs[i].getElementsByClassName('pauseorresume')[0].innerHTML = 'resume';
        }catch(err){
            continue;
        }
    }
}

function play(element) {
    divPai = element.parentElement.parentElement;
    const audioEscolhido = divPai.getElementsByTagName('audio')[0];

    // se entrar aq, é pq eu estou pausando o audio atual
    if (audio === audioEscolhido && !audio.paused) {
        audio.pause();
        element.innerHTML = 'resume';
        return;
    }

    resetStates();

    divPai.parentElement.classList.add('expanded');
    audio = audioEscolhido;

    progress = divPai.querySelector('input[type="range"]')
    currentTime = divPai.querySelector('.times span:nth-child(1)')
    duration = divPai.querySelector('.times span:nth-child(2)')

    audio.play();
    element.innerHTML = 'pause';

    audio.addEventListener('timeupdate', () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
        updateProgressBar();
    });

    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
}
