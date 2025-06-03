function closePlaylistModal(){
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.add('hidden');
}

function openPlaylistModal(){
    const playlist_wrapper = document.getElementsByClassName('playlist_wrapper')[0];

    playlist_wrapper.classList.remove('hidden');
}