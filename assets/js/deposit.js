$(document).ready(function(){

    $(".dashboard-card").hide().fadeIn(1200);

    // USUARIO ACTUAL
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!currentUser){
        window.location.href = "login.html";
    }

    // MOSTRAR SALDO INICIAL
    $("#currentBalance").text(
        "$" + currentUser.balance.toLocaleString("es-CL")
    );

    // FORMULARIO
    $("#depositForm").submit(function(e){
        e.preventDefault();

        let amount = Number($("#depositAmount").val());

        // VALIDACIÓN
        if(amount <= 0 || isNaN(amount)){
            $("#depositMessage")
                .html("Ingresa un monto válido")
                .removeClass("success-message")
                .addClass("error-message");
            return;
        }

        // SUMAR SALDO
        currentUser.balance += amount;

        // GUARDAR USUARIO
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // ACTUALIZAR UI
        $("#currentBalance").text(
            "$" + currentUser.balance.toLocaleString("es-CL")
        );

        // MENSAJE
        $("#depositMessage")
            .html("Depósito realizado exitosamente")
            .removeClass("error-message")
            .addClass("success-message")
            .hide()
            .fadeIn();

        // LIMPIAR INPUT
        $("#depositAmount").val("");

        // HISTORIAL
        let transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        transactions.unshift({
            type: "Depósito",
            amount: amount,
            status: "Completado",
            date: new Date().toLocaleDateString("es-CL")
        });

        localStorage.setItem("transactions", JSON.stringify(transactions));
    });

});