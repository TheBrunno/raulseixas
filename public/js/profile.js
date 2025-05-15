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