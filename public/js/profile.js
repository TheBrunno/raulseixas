function carregarInfoPerfil(){
    const photoLocal = document.getElementById('img_perfil');
    const usernameLocal = document.getElementById('username');
    const emailLocal = document.getElementById('useremail');
    const prestigeLocal = document.getElementById('userprestige');
    
    const photo = sessionStorage.getItem("foto");
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("nome");
    const prestige = sessionStorage.getItem("prestigio");

    if(!email || email == 'null'){
        window.location.href = "login.html";
    }

    if(photo == 'null'){
        photoLocal.src = './assets/imgs/default_user_photo.png';
    }else{
        photoLocal.src = photo;
    }

    emailLocal.innerHTML = email;
    usernameLocal.innerHTML = name;
    prestigeLocal.innerHTML = prestige+' de prestígio';
}

function sair(){
    sessionStorage.clear();
    window.location.href = "login.html";
}

function upload(){
    const photoLocal = document.getElementById('img_perfil');
    const uploadedFile = document.getElementById('input_img').files[0];

    if(uploadedFile){
        const formData = new FormData();
        formData.append('id', sessionStorage.getItem('id'));
        formData.append('userpfp', uploadedFile);

        fetch('http://localhost:3333/adm/upload/userpfp', {
            method: 'POST',
            body: formData
        }).then((res) => {
            res.json().then((data) => {
                photoLocal.src = data.file;
                sessionStorage.setItem('foto', data.file);
            })
        })
    }

    // console.log(uploadedFile);
}