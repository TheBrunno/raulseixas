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
                if (!data[i].capa) data[i].capa = './assets/imgs/img.svg';
                else data[i].capa = '../../' + data[i].capa;
                local.innerHTML += `
                    <a class="playlist" href="./playlist_page.html?idPlaylist=${data[i].idPlaylist}">
                        <img src="${data[i].capa}">
                        <p>${data[i].playlist}</p>
                    </a>
                `;
            }
        });
}

function getPlaylistSongsById() {
    fetch('/playlist/getSongsOfAPlaylistUsingId/' + new URLSearchParams(window.location.search).get('idPlaylist'), {
        method: 'GET'
    }).then((result) => {
        result.json().then((res) => {
            const containerMusicas = document.getElementById('song_container');
            for (let i = 0; i < res.length; i++) {
                if (res[i].musica) {
                    try {
                        containerMusicas.innerHTML += `
                        <div class="song">
                            <div class="song_photo">
                                <img src="../../${res[i].srcCapa}">
                            </div>
                            <div class="name_controlers">
                                <span class="name_song">${res[i].musica}</span>
                                <audio id="audio"
                                    src="../../${res[i].srcMusica}" lrc="${res[i].srcLRC}" idBD="${res[i].idMusica}" fkAlbum=${res[i].idAlbum}></audio>
                                <input type="range" id="progress" value="0">
                                <div class="times">
                                    <span id="current_time">00:00</span>
                                    <span id="duration">${res[i].duracao.replace("00:", "")}</span>
                                </div>
                                <div class="controls">
                                    <span class="material-symbols-outlined" onclick="skipPrevious(${i}, ${res.length})">
                                        skip_previous
                                    </span>
                                    <span class="material-symbols-outlined pauseorresume" onclick="play(this)">
                                        resume
                                    </span>
                                    <span class="material-symbols-outlined" onclick="skipNext(${i}, ${res.length})">
                                        skip_next
                                    </span>
                                </div>
                            </div>
                        </div>
                        `
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        })
    })
}