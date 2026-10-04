$(document).ready(function(){

    $(".wallet-card").hide().fadeIn(1200);

    $("#loginForm").submit(function(e){

        e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        if(email === "" || password === ""){

            $("#message")
                .html("Completa todos los campos")
                .removeClass("success-message")
                .addClass("error-message");

            return;
        }

        // ADMIN FIJO
        if(email === "admin@alke.cl" && password === "1234"){

    let adminUser = {
        name: "Administrador",
        email: "admin@alke.cl",
        balance: 4850000
    };

    localStorage.setItem(
        "currentUser",
        JSON.stringify(adminUser)
    );

            $("#message")
                .html("Bienvenido administrador")
                .removeClass("error-message")
                .addClass("success-message");

            setTimeout(() => {
                window.location.href = "menu.html";
            }, 1500);

            return;
        }

        // USUARIOS REGISTRADOS
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let validUser = users.find(user =>
            user.email === email &&
            user.password === password
        );

       if(validUser){

    if(validUser.balance === undefined){
        validUser.balance = 0;
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));

    $("#message")
        .html("Ingreso exitoso")
        .removeClass("error-message")
        .addClass("success-message");

    setTimeout(() => {
        window.location.href = "menu.html";
    }, 1500);
}else{

            $("#message")
                .html("Correo o contraseña incorrecta")
                .removeClass("success-message")
                .addClass("error-message");

        }

    });

});