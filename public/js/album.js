function obterAlbumInfo() {
    const album = document.getElementById('nome_album');
    const subtituloAlbum = document.getElementById('subtitulo_album');
    const descricao = document.getElementById('descricao');
    const containerMusicas = document.getElementById('song_container');
    const capa = document.getElementById('capa');
    const avaliacao = document.getElementById('avaliacao');
    const descricao_avaliacao = document.getElementById('descricao_avaliacao');

    fetch('http://localhost:3333/album/getAlbumWithSongs/1', {
        method: "GET"
    }).then((result) => {
        result.json().then((res) => {
            console.log(res);

            album.innerHTML = res[0].album;
            subtituloAlbum.innerHTML = res[0].subtitulo;
            descricao.innerHTML = res[0].descricao;
            capa.src = res[0].capa;
            avaliacao.innerHTML = res[0].avaliacao.replace('.', ',');
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
                            src="../../${res[0].src_musica}"></audio>
                        <input type="range" id="progress" value="0">
                        <div class="times">
                            <span id="current_time">00:00</span>
                            <span id="duration">${res[i].duracao.replace("00:", "")}</span>
                        </div>
                        <div class="controls">
                            <span class="material-symbols-outlined">
                                skip_previous
                            </span>
                            <span class="material-symbols-outlined" onclick="play(this)">
                                resume
                            </span>
                            <span class="material-symbols-outlined">
                                skip_next
                            </span>
                        </div>
                    </div>
                </div>
                `
            }
        });
    });

    fetch()
}