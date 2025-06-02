let audio;
let divPai;
let progress;
let lrc;
const times = [];
const lyrics = [];

let currentTime;
let duration;

function countViews (id, fkAlbum){
    fetch(`/song/view/${id}/${fkAlbum}`, { method: "GET" });
}

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

async function play(element) {
    divPai = element.parentElement.parentElement;
    const audioEscolhido = divPai.getElementsByTagName('audio')[0];

    song_title.innerHTML = divPai.childNodes[1].innerText;

    lrc = audioEscolhido.getAttribute('lrc');
    await getLyrics(lrc);
    
    // se entrar aq, é pq eu estou pausando o audio atual
    if (audio === audioEscolhido && !audio.paused) {
        audio.pause();
        element.innerHTML = 'resume';
        return;
    }
    
    const id = audioEscolhido.getAttribute('idBD');
    const fkAlbum = audioEscolhido.getAttribute('fkAlbum');
    
    countViews(id, fkAlbum);
    resetStates();

    divPai.parentElement.classList.add('expanded');
    audio = audioEscolhido;

    progress = divPai.querySelector('input[type="range"]')
    currentTime = divPai.querySelector('.times span:nth-child(1)')
    duration = divPai.querySelector('.times span:nth-child(2)')

    audio.play();
    element.innerHTML = 'pause';

    audio.addEventListener('timeupdate', async () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
        updateProgressBar();
        await syncLyrics(audio.currentTime);
    });

    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
}

async function getLyrics(lrcLocal) {
    times.length = 0;
    lyrics.length = 0;

    const response = await fetch(lrcLocal);

    const lrcArray = (await response.text()).split('\n');

    for(let i=5; i<lrcArray.length; i++){
        let secondsSong = Number(lrcArray[i].slice(1, 3))*60+Number(lrcArray[i].slice(4, 9))
        times.push(secondsSong);
        lyrics.push(lrcArray[i].slice(10, lrcArray[i].length));
    }
}

async function syncLyrics(time){
    for(let i=0; i<times.length; i++){
        if(times[i] > time){
            if(i == 0){
                previous1.innerHTML = '';
                previous.innerHTML = '';
                main_actual.innerHTML = lyrics[i];
                next.innerHTML = lyrics[i+1];
                next1.innerHTML = lyrics[i+2];
                next2.innerHTML = lyrics[i+3];
                next3.innerHTML = lyrics[i+4];
                next4.innerHTML = lyrics[i+5];
            }else if(i == 1){
                previous1.innerHTML = '';
                previous.innerHTML = '';
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = lyrics[i+2];
                next3.innerHTML = lyrics[i+3];
                next4.innerHTML = lyrics[i+4];
            }else if(i == 2){
                previous1.innerHTML = '';
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = lyrics[i+2];
                next3.innerHTML = lyrics[i+3];
                next4.innerHTML = lyrics[i+4];
            }else if(i == lyrics.length-4){
                previous1.innerHTML = lyrics[i-3];
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = lyrics[i+2];
                next3.innerHTML = lyrics[i+3];
                next4.innerHTML = '';
            }else if(i == lyrics.length-3){
                previous1.innerHTML = lyrics[i-3];
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = lyrics[i+2];
                next3.innerHTML = '';
                next4.innerHTML = ''; 
            }else if(i == lyrics.length-2){
                previous1.innerHTML = lyrics[i-3];
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = '';
                next3.innerHTML = '';
                next4.innerHTML = '';    
            }else if(i == lyrics.length-1){
                previous1.innerHTML = lyrics[i-3];
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = '';
                next2.innerHTML = '';
                next3.innerHTML = '';
                next4.innerHTML = '';    
            }else{
                previous1.innerHTML = lyrics[i-3];
                previous.innerHTML = lyrics[i-2];
                main_actual.innerHTML = lyrics[i-1];
                next.innerHTML = lyrics[i];
                next1.innerHTML = lyrics[i+1];
                next2.innerHTML = lyrics[i+2];
                next3.innerHTML = lyrics[i+3];
                next4.innerHTML = lyrics[i+4];
            }
            break;
        }
    }
}

function skipPrevious(actual, max){
    const songs = document.querySelectorAll('.song');

    if(actual == 0) play(songs[max-1].getElementsByClassName('pauseorresume')[0]);
    else play(songs[actual-1].getElementsByClassName('pauseorresume')[0]);
}

function skipNext(actual, max){
    const songs = document.querySelectorAll('.song');

    if(actual == max-1) play(songs[0].getElementsByClassName('pauseorresume')[0]);
    else play(songs[actual+1].getElementsByClassName('pauseorresume')[0]);
}