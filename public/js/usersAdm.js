function getUsers() {
    fetch('/dashboard/getAllUsers', { method: 'GET' }).then(response => response.json())
        .then((json) => {
            const usuarios_container = document.getElementById('usuarios_container');

            for (let i = 0; i < json.length; i++) {
                let foto;
                if(json[i].foto !== 'null' && json[i].foto) foto = json[i].foto;
                else foto = './assets/imgs/default_user_photo.png'
                usuarios_container.innerHTML += `
                    <a href="" class="usuario">
                        <div class="left">
                            <img src="../../${foto}">
                            <p class="nome">${json[i].nome}</p>
                            <p class="email">${json[i].email}</p>
                        </div>
                        <div class="right">
                            <img src="assets/imgs/prestige.svg">
                            <p>${json[i].prestigio} de prestígio</p>
                        </div>
                    </a>
                `;
            }
        })
}