function enviarDados() {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('repeat_password');
    const buttonSend = document.getElementById('buttonSend');

    const errors = document.querySelectorAll(".error_message");

    for (let error of errors) {
        error.remove();
    }

    let valido = true;

    // nome de usuario
    if (!username.value) {
        username.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira um nome!</span>");
        valido = false;
    } else if (username.value.length <= 3) {
        username.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira um nome com mais de 3 caracteres!</span>");
        valido = false;
    }

    // email
    if (!email.value) {
        email.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira um email!</span>");
        valido = false;
    } else if (email.value.indexOf("@") == -1) {
        email.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira um email válido!</span>");
        valido = false;
    }

    // senha
    if (!password.value) {
        password.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira uma senha!</span>");
        valido = false;
    } else if (password.value.length < 8) {
        password.insertAdjacentHTML("afterend", "<span class=\"error_message\">Insira uma senha com no mínimo 8 caracteres!</span>");
        valido = false;
    }

    // repeticao da senha
    if (passwordRepeat.value !== password.value) {
        passwordRepeat.insertAdjacentHTML("afterend", "<span class=\"error_message\">Senha não coincide!</span>");
        valido = false;
    }

    if (valido) {
        fetch("http://localhost:3333/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username.value,
                email: email.value,
                password: password.value
            }),
        }).then((response) => {
            if(response.status == 403){
                buttonSend.insertAdjacentHTML("afterend", "<span style=\"width: 100%; text-align: center\" class=\"error_message\">Conta já existe, <a href=\"login.html\">faça login</a></span>");
            }else{
                window.location.href = "login.html";
            }
        })
        .catch((data) => console.log(data))
    }

}