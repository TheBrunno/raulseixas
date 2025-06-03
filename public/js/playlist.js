function closePlaylistModal(){
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.add('hidden');
}

function openPlaylistModal(){
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.remove('hidden');
}

function getPlaylistsByUser(){
    fetch('/playlist/getPlaylistsByUserId/'+sessionStorage.getItem('id'), { method: 'GET' })
    .then(result => result.json())
    .then(data => {
        const playlist_container = document.getElementsByClassName('playlist_container')[0];

        if(data.length == 0){
            playlist_container.innerHTML += `
                <div>
                    <p>Nenhuma playlist encontrada, crie uma na <a href="profile.html">página de perfil</a>.</p>
                </div>
            `;
        }else{
            for(let i=0; i<data.length; i++){
                playlist_container.innerHTML += `
                    <div class="playlist">
                        <p>${data[i].playlist}</p>
                        <p>${data[i].qtd_musica} músicas</p>
                    </div>
                `;
            }
        }

    })
}