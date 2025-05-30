function getAllAlbums(){
    fetch('/dashboard/getAllAlbums', { method: "GET" })
    .then(response => response.json())
    .then(json => {
        const album_container = document.getElementById('album_container');

        for(let i=0; i<json.length; i++){
            album_container.innerHTML += `
                <a href="edit_album_adm.html?fkalbum=${json[i].id_album}" class="album">
                    <div class="left_album">
                        <img src="../../${json[i].srcCapa}">
                        ${json[i].album}
                    </div>
                    <div class="right_album">
                        ${json[i].views_album} views
                        <img src="assets/imgs/editsong.svg">
                    </div>
                </a>
            `;
        }
    })
}