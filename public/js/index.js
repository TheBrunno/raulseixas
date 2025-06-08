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