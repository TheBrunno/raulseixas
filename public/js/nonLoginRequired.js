function nonLoginRequired(){
    const email = sessionStorage.getItem('email');

    if(email && email != 'null') window.location.href = 'profile.html';
}