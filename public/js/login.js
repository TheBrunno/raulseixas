function login(){
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const buttonSend = document.getElementById('buttonSend');

    const errors = document.querySelectorAll(".error_message");

    for (let error of errors) {
        error.remove();
    }

    let valido = true;

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
    }

    if(valido){
        fetch("http://localhost:3333/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
        }).then((response) => {

            if(response.status == 403){
                buttonSend.insertAdjacentHTML("afterend", "<span style=\"width: 100%; text-align: center\" class=\"error_message\">E-mail ou senha incorretos!</a></span>");
            }else{
                response.json().then((data) => {
                    console.log(data)
                    sessionStorage.setItem("email", data.email);
                    sessionStorage.setItem("foto", data.foto);
                    sessionStorage.setItem("id", data.id);
                    sessionStorage.setItem("nome", data.nome);
                    sessionStorage.setItem("prestigio", data.prestigio);
                    sessionStorage.setItem("contadorLogins", data.contadorLogins);
                    sessionStorage.setItem("isADM", data.isADM);

                    if(data.isADM){
                        window.location.href = "dashboard.html";
                    }else{
                        window.location.href = "profile.html";
                    }
                })
            }
                
        })
        .catch((data) => console.log(data))
    }
}