function isLogged(){
    const email = sessionStorage.getItem('email');
    if(email && email != 'null'){
        return true;
    }
    return false;
}

function showLinkProfilePhoto(){
    const logged = isLogged();
    let foto = sessionStorage.getItem('foto');

    const link = document.getElementById('loginouperfil');

    if(logged){
        if(!foto || foto == 'null') foto = './assets/imgs/default_user_photo.png';
        link.innerHTML = `<img src="${foto}">`;
        link.src = 'profile.html'
    }
}

function blockCommentsIfNotLogged(){
    const logged = isLogged();
    const comment_area = document.getElementById('comment_area');

    if(!logged){
        comment_area.innerHTML = `<p id="entre"><a href="login.html">Entre</a> para também poder fazer comentarios.</p>`;
    }
}