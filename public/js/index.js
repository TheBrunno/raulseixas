function getAlbuns(){
    fetch('/getAlbuns', { method: 'GET' }).then(result => result.json())
    .then(data => {
        const albumContainer = document.getElementById('albuns_container');

        albumContainer.innerHTML = '';

        for(let i=0; i<data.length; i++){
            albumContainer.innerHTML += `
                <a href="albums.html?id=${data[i].id_album}">
                    <img src="../../${data[i].srcCapa}">
                    <div class="infos">
                        <span>${data[i].album}</span>
                        <span>${data[i].subtitulo}</span>
                    </div>
                </a>
            `;
        }
    })
}

function getPopularSongs() {
    fetch('/getPopularSongs', { method: 'GET' }).then(result => result.json())
    .then(json => {
        const songPopularContainer = document.getElementById('popular_songs');

        songPopularContainer.innerHTML = '';

        for(let i=0; i<json.length; i++){
            songPopularContainer.innerHTML += `
                    <a href="albums.html?id=${json[i].idAlbum}">
                        <img src="../../${json[i].srcCapa}">
                        <div class="songs_infos">
                            <span>
                                ${json[i].musica}
                            </span>
                            <span>
                                ${json[i].album} 
                            </span>
                        </div>
                    </a>
            `;
        }
    })
}