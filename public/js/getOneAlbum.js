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
        console.log(json)
    })
}