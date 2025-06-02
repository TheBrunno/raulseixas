function getAllAlbums(){
    fetch('/dashboard/getAllAlbums', { method: "GET" })
    .then(response => response.json())
    .then(json => {
        const album_container = document.getElementById('album_container');

        for(let i=0; i<json.length; i++){
            let img = './assets/imgs/img.svg';
            if(json[i].srcCapa) img = '../../'+json[i].srcCapa;

            let views = 0;
            if(json[i].views_album) views = json[i].views_album;

            album_container.innerHTML += `
                <a href="edit_album_adm.html?fkalbum=${json[i].id_album}" class="album">
                    <div class="left_album">
                        <img src="${img}">
                        ${json[i].album}
                    </div>
                    <div class="right_album">
                        ${views} views
                        <img src="assets/imgs/editsong.svg">
                    </div>
                </a>
            `;
        }
    })
}