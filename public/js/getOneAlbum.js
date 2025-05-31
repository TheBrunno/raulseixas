function getOneAlbum(fkalbum){
    fetch("/album/getCards/" + fkalbum, { method: "GET" })
    .then(result => result.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            curiosidades.innerHTML += `
                <div class="curiosities_card">
                    <img src="${json[i].srcFoto}">
                    <p>${json[i].descricao}</p>
                </div>
            `;
        }
    })

    fetch('/album/getAlbumWithSongs/' + fkalbum)
    .then(result => result.json())
    .then(json => {
        const title = document.getElementById('ipt_titulo');
        const subtitle = document.getElementById('ipt_subtitulo');
        const description = document.getElementById('ipt_descricao');
        const ratingDescription = document.getElementById('ipt_descricao_avaliacao');

        title.value = json[0].album;
        subtitle.value = json[0].subtitulo;
        description.value = json[0].descricao;
        ratingDescription.value = json[0].descricaoAvaliacao;

        const containerSongs = document.getElementById('songContainer');
        containerSongs.innerHTML = '';

        for(let i=0; i<json.length; i++){
            containerSongs.innerHTML += `
            <div class="song">
                <p>${json[i].musica}</p>
                <div class="info">
                    <p class="duration">${json[i].duracao.replace('00:', '')}</p>
                    <img src="../../${json[i].capa}">
                </div>
            </div>
            `;
        }

        console.log(json)
    })
}