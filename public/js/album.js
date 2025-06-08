function obterAlbumInfo() {
    const album = document.getElementById('nome_album');
    const subtituloAlbum = document.getElementById('subtitulo_album');
    const descricao = document.getElementById('descricao');
    const containerMusicas = document.getElementById('song_container');
    const capa = document.getElementById('capa');
    const avaliacao = document.getElementById('avaliacao');
    const stars_container = document.getElementById('stars_container');
    const descricao_avaliacao = document.getElementById('descricao_avaliacao');

    const params = new URLSearchParams(window.location.search);
    let albumId = params.get('id');

    if (!Number(albumId)) albumId = 1;


    fetch('/album/getAlbumWithSongs/' + albumId + '/0', {
        method: "GET"
    }).then((result) => {
        result.json().then(async (res) => {
            console.log(res);
            if (res.length == 0) window.location = '/'

            album.innerHTML = res[0].album;
            subtituloAlbum.innerHTML = res[0].subtitulo;
            descricao.innerHTML = res[0].descricao;
            capa.src = res[0].capa;

            let avaliacao_value = res[0].avaliacao;
            for (let i = 0; i < 5; i++) {
                if (avaliacao_value >= 1) {
                    stars_container.innerHTML += '<img src="assets/imgs/star_filled.svg">';
                    avaliacao_value--;
                } else if (avaliacao_value > 0) {
                    stars_container.innerHTML += '<img src="assets/imgs/star_half.svg">';
                    avaliacao_value = 0;
                } else {
                    stars_container.innerHTML += '<img src="assets/imgs/star.svg">';
                }
            }

            try {
                avaliacao.innerHTML = res[0].avaliacao.replace('.', ',');
            } catch (err) {
                console.log(err)
            }
            descricao_avaliacao.innerHTML = res[0].descricaoAvaliacao;

            containerMusicas.innerHTML = '';
            for (let i = 0; i < res.length; i++) {
                containerMusicas.innerHTML += `
                    <div class="song">
                        <div class="song_photo">
                            <img src="../../${res[0].capa}">
                        </div>
                        <div class="name_controlers">
                            <span class="name_song">${res[i].musica}</span>
                            <audio id="audio"
                                src="../../${res[i].src_musica}" lrc="${res[i].src_lrc}" idBD="${res[i].id_musica}" fkAlbum=${res[i].id_album}></audio>
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
                                <span class="material-symbols-outlined" onclick="openPlaylistModal(${res[i].id_musica}, ${res[i].id_album})">
                                    library_add
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }

            const curiosidades = document.getElementById('curiosidades');
            await fetch("/album/getCards/" + albumId, { method: "GET" }).then((result) => {
                result.json().then(data => {
                    for (let i = 0; i < data.length; i++) {
                        curiosidades.innerHTML += `
                            <div class="curiosities_card">
                                <img src="${data[i].srcFoto}">
                                <p>${data[i].descricao}</p>
                            </div>
                        `;
                    }

                    const comentariosContainer = document.getElementById('comentario_container');
                    fetch("/comment/getAllByAlbum/" + albumId, { method: 'GET' }).then((result) => {
                        result.json().then(data => {
                            for (let i = 0; i < data.length; i++) {
                                let foto = 'assets/imgs/default_user_photo.png';
                                let proprio = '';
                                if (data[i].foto) {
                                    foto = `../../${data[i].foto}`;
                                }
                                if (data[i].idUsuario == sessionStorage.getItem('id')) proprio = 'proprio';
                                comentariosContainer.innerHTML += `
                                    <div class="comment ${proprio}">
                                        <div class="comment_info">
                                            <div class="profile">
                                                <div class="profile_photo">
                                                    <img src="${foto}">
                                                </div>
                                                <span>${data[i].nome}</span>
                                            </div>
                                            <div class="comment_data">
                                                ${data[i].comentario}
                                            </div>
                                        </div>
                                        <div class="comment_buttons">
                                            <span class="material-symbols-outlined">
                                                arrow_upward
                                            </span>
                                            <span class="material-symbols-outlined">
                                                arrow_downward
                                            </span>
                                        </div>
                                    </div>
                                `;
                            }
                        })
                    })
                })
            })
        });
    });
}

function sendComment() {
    const comment = document.getElementById('ipt_comment').value;
    const comentariosContainer = document.getElementById('comentario_container');
    const albumId = 1;
    const userId = sessionStorage.getItem('id');
    console.log(userId)

    fetch("/comment/create", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "fkUsuario": userId,
            "fkAlbum": albumId,
            "comment": comment
        })
    }).then((res) => {
        document.getElementById('ipt_comment').value = '';
        let foto = sessionStorage.getItem('foto');
        if (foto == 'null') {
            foto = `assets/imgs/default_user_photo.png`;
        }

        comentariosContainer.innerHTML += `
                    <div class="comment proprio">
                        <div class="comment_info">
                            <div class="profile">
                                <div class="profile_photo">
                                    <img src="${foto}">
                                </div>
                                <span>${sessionStorage.getItem('nome')}</span>
                            </div>
                            <div class="comment_data">
                                ${comment}
                            </div>
                        </div>
                        <div class="comment_buttons">
                            <span class="material-symbols-outlined">
                                arrow_upward
                            </span>
                            <span class="material-symbols-outlined">
                                arrow_downward
                            </span>
                        </div>
                    </div>
                `;
        comentariosContainer.scrollTo({
            top: comentariosContainer.scrollHeight,
            behavior: 'smooth'
        });
    }).catch((err) => {
        console.log(err);
    })
}

function verificarAvaliacao() {
    const params = new URLSearchParams(window.location.search);
    let albumId = params.get('id');

    if (!Number(albumId)) albumId = 1;

    fetch(`/avaliacao/verify/${sessionStorage.getItem('id')}/${albumId}`, { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            if (json == 0) {
                document.body.insertAdjacentHTML('beforeend', `
                    <div class="avaliacao" id="avaliacao_container" onclick="expandAvaliacao()">
                        <div class="avaliacao_button">
                            <span class="material-symbols-outlined">
                                star_half
                            </span>
                            Avalie esse álbum
                        </div>
                        <div class="avaliacao_container" id="avaliacao_hidden">
                            <span class="material-symbols-outlined" onclick="registrarAvaliacao(this)">
                                star
                            </span>
                            <span class="material-symbols-outlined" onclick="registrarAvaliacao(this)">
                                star
                            </span>
                            <span class="material-symbols-outlined" onclick="registrarAvaliacao(this)">
                                star
                            </span>
                            <span class="material-symbols-outlined" onclick="registrarAvaliacao(this)">
                                star
                            </span>
                            <span class="material-symbols-outlined" onclick="registrarAvaliacao(this)">
                                star
                            </span>
                        </div>
                    </div>
                `);
            }
        });
}


function expandAvaliacao() {
    avaliacao_hidden.style.display = 'block';
    avaliacao_container.classList.add('expanded')
}

function hiddenAvaliacao() {
    avaliacao_container.style.display = 'none';
}

function registrarAvaliacao(local) {
    let contStars = 1;
    for (let i = 0; i < 5; i++) {
        if (local.previousElementSibling) {
            local = local.previousElementSibling;
            contStars++;
        }
    }

    const stars = avaliacao_hidden.querySelectorAll('span');
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('material-symbols-outlined-filled');
    }

    for (let i = 0; i < contStars; i++) {
        stars[i].classList.add('material-symbols-outlined-filled');
    }

    const params = new URLSearchParams(window.location.search);
    let albumId = params.get('id');

    if (!Number(albumId)) albumId = 1;

    fetch('/avaliacao/register', {
        method: 'POST', headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fkAlbum: albumId,
            fkUsuario: sessionStorage.getItem('id'),
            avaliacao: contStars
        })
    })

    setTimeout(() => {
        hiddenAvaliacao();
    }, 500)
}