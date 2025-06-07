let posAnterior = 0;

const searchBar = document.getElementById('ipt_search');

searchBar.addEventListener('blur', () => {
    const result_local = document.getElementById('search_result');
    result_local.innerHTML = '';
    searchBar.value = '';
})

window.addEventListener('scroll', () => {
    const nav = document.getElementsByTagName('nav')[0];
    const posAtual = window.scrollY;
    
    if (posAtual > posAnterior) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    
    posAnterior = posAtual;
});

function search(){
    const searchBar = document.getElementById('ipt_search');
    
    fetch('/song/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            search: searchBar.value
        })
    }).then((resposne) => resposne.json())
    .then(json => {
        const result_local = document.getElementById('search_result');
        result_local.innerHTML = '';

        for(let i=0; i<json.length; i++){
            result_local.innerHTML += `
                <a href="/albums.html?id=${json[i].idAlbum}">
                    <img src="../../${json[i].capa}">
                    <div class="song_infos_search">
                        <div class="left_search">
                            <span>${json[i].musica}</span>
                            ●
                            <span>${json[i].album}</span>
                        </div>
                        <div class="right_search">
                            <span>${json[i].duracao.replace("00:", "")}</span>
                            <span class="material-symbols-outlined">
                                open_in_new
                            </span>
                        </div>
                    </div>
                </a>
            `;
        }
    })
}