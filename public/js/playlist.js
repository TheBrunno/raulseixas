function closePlaylistModal() {
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.add('hidden');
}

function openPlaylistModal(idMusica, idAlbum) {
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.remove('hidden');

    getPlaylistsByUser(idMusica, idAlbum);
}

function getPlaylistsByUser(idMusica, idAlbum) {
    fetch('/playlist/getPlaylistsByUserId/' + sessionStorage.getItem('id'), { method: 'GET' })
        .then(result => result.json())
        .then(data => {
            const playlist_container = document.getElementsByClassName('playlist_container')[0];
            playlist_container.innerHTML = '';

            if (data.length == 0) {
                playlist_container.innerHTML += `
                <div>
                    <p>Nenhuma playlist encontrada, crie uma na <a href="profile.html">página de perfil</a>.</p>
                </div>
            `;
            } else {
                const idUsuario = sessionStorage.getItem('id');
                const playlists = [];
                let lastPlaylistId;

                console.log(data)

                for (let i = 0; i < data.length; i++) {
                    let permitido = true;
                    for (let j = 0; j < data[i].qtd_musica; j++) {
                        if (data[j].musica_id == idMusica) {
                            permitido = false;
                        }
                    }

                    if (lastPlaylistId != data[i].playlist_id) {
                        playlists.push({
                            permitido: permitido,
                            playlist: data[i].playlist,
                            qtd_musica: data[i].qtd_musica,
                            playlist_id: data[i].playlist_id
                        })
                    }
                    lastPlaylistId = data[i].playlist_id;

                }

                for (let i = 0; i < playlists.length; i++) {
                    if (playlists[i].permitido) {
                        playlist_container.innerHTML += `
                        <div class="playlist" onclick="putSongIntoPlaylist(${playlists[i].playlist_id}, ${idMusica}, ${idUsuario}, ${idAlbum})">
                            <p>${playlists[i].playlist}</p>
                            <p>${playlists[i].qtd_musica} músicas</p>
                        </div>
                    `;
                    } else {
                        playlist_container.innerHTML += `
                        <div class="playlist blocked_playlist">
                            <p>${playlists[i].playlist}</p>
                            <p>${playlists[i].qtd_musica} músicas</p>
                        </div>
                    `;
                    }
                }
            }

        })
}

function putSongIntoPlaylist(idPlaylist, idMusica, idUsuario, idAlbum) {
    fetch('/playlist/putSongIntoPlaylist/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idPlaylist,
            idMusica,
            idUsuario,
            idAlbum
        })
    }).then((result) => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

function getPlaylistsForPage() {
    fetch('/playlist/getPlaylistsByUserIdForPage/' + sessionStorage.getItem('id'), { method: 'GET' })
        .then((result) => result.json())
        .then((data) => {
            const local = document.getElementsByClassName('row')[0];

            for (let i = 0; i < data.length; i++) {
                if(!data[i].capa) data[i].capa = './assets/imgs/img.svg';
                else data[i].capa = '../../'+data[i].capa;
                local.innerHTML += `
                    <a class="playlist" href="./playlist_page.html?idPlaylist=${data[i].idPlaylist}">
                        <img src="${data[i].capa}">
                        <p>${data[i].playlist}</p>
                    </a>
                `;
            }

            local.innerHTML = html;
        });
}