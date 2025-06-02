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
        const albumImg = document.getElementById('albumImg');

        title.value = json[0].album;
        subtitle.value = json[0].subtitulo;
        description.value = json[0].descricao;
        ratingDescription.value = json[0].descricaoAvaliacao;
        albumImg.src = '../../'+json[0].capa;

        const containerSongs = document.getElementById('songContainer');
        containerSongs.innerHTML = '';

        for(let i=0; i<json.length; i++){
            containerSongs.innerHTML += `
            <div class="song">
                <p>${json[i].musica}</p>
                <div class="info">
                    <p class="duration">${(json[i].duracao).replace('00:', '')}</p>
                    <img src="../../${json[i].capa}">
                </div>
            </div>
            `;
        }

        console.log(json)
    })
}

function uploadCuriosityCardImagePreview(){
    const imgLocal = document.getElementById('imgCuriosity');
    const uploadedFile = document.getElementById('input_img_curiosities').files[0];

    if(uploadedFile){
        const reader = new FileReader();
        reader.onload = (e) => {
            imgLocal.src = e.target.result;
        }
        reader.readAsDataURL(uploadedFile);
    }
}

function createCuriosity(){
    const uploadedFile = document.getElementById('input_img_curiosities').files[0];
    const description = document.getElementById('ipt_descricao_curiosidades').value;

    if(uploadedFile){
        const formData = new FormData();
        formData.append('fkAlbum', new URLSearchParams(window.location.search).get('fkalbum'));
        formData.append('photo', uploadedFile);
        formData.append('descricao', description);
        
        fetch('/adm/upload/card', { 
            method: 'POST',
            body: formData
        }).then(() => {
            location.reload();
        })
    }

}

function uploadSongOrLRC(element){
    const parentElement = element.parentElement;
    const svgPathLocal = parentElement.querySelector('path');
    const uploadedFile = parentElement.querySelector('input').files[0];

    if(uploadedFile){
        if(svgPathLocal.getAttribute('id') == 'song'){
            svgPathLocal.setAttribute('fill', '#33ad33');
        }else{
            svgPathLocal.setAttribute('stroke', '#33ad33');
        }
        parentElement.style.opacity = '30%';
        element.style.display = 'none';
    }
}

function uploadSongWithLRCFile(){
    const lrcFile = document.getElementById('lrc_upload').files[0];
    const songFile = document.getElementById('song_upload').files[0];
    const songTitle = document.getElementById('ipt_songname').value;

    if(lrcFile && songFile && songTitle){
        fetch('/song/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: songTitle,
                fkAlbum: new URLSearchParams(window.location.search).get('fkalbum')
            })
        }).then(result => result.json())
            .then(json => {
                console.log(json)

                const formDataSong = new FormData();
                formDataSong.append('fkAlbum', new URLSearchParams(window.location.search).get('fkalbum'));
                formDataSong.append('song', songFile);
                formDataSong.append('id', json.id);

                const formDataLRC = new FormData();
                formDataLRC.append('fkAlbum', new URLSearchParams(window.location.search).get('fkalbum'));
                formDataLRC.append('songLRC', lrcFile);
                formDataLRC.append('id', json.id);

                fetch('/adm/upload/song', {
                    method: 'POST',
                    body: formDataSong
                }).then(() => {
                    fetch('/adm/upload/songLRC', {
                        method: 'POST',
                        body: formDataLRC
                    }).then(() => {
                        location.reload();
                    })
                })

            })
    }
}


function changeAlbumImage(){
    const fkAlbum = new URLSearchParams(window.location.search).get('fkalbum');
    const file = document.getElementById('ipt_album_photo').files[0];
    const albumImg = document.getElementById('albumImg');

    if(file){
        const formdata = new FormData();

        formdata.append('id', fkAlbum);
        formdata.append('cover', file);
        
        fetch('/adm/upload/cover', { 
            method: 'POST', 
            body: formdata
        }).then((response) => response.json())
        .then(data => {
            albumImg.src = data.src;
        })
    }


}