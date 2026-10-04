$(document).ready(function(){

    $(".dashboard-card").hide().fadeIn(1200);

    // USUARIO ACTUAL
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!currentUser){
        window.location.href = "login.html";
    }

    // MOSTRAR SALDO
    $("#availableBalance").text(
        "$" + currentUser.balance.toLocaleString("es-CL")
    );

    // CONTACTOS
    let contacts =
        JSON.parse(localStorage.getItem("contacts")) || [
            "Juan Pérez",
            "María González",
            "Pedro Ramírez",
            "Camila Torres"
        ];

    function saveContacts(){
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function showContacts(list){
        $("#contactList").html("");

        list.forEach(contact => {
            $("#contactList").append(`
                <div class="contact-item">
                    ${contact}
                </div>
            `);
        });
    }

    // AUTOCOMPLETE
    $("#contactSearch").on("keyup", function(){
        let value = $(this).val().toLowerCase();

        let filtered = contacts.filter(c =>
            c.toLowerCase().includes(value)
        );

        showContacts(filtered);
    });

    // SELECCIONAR CONTACTO
    $(document).on("click", ".contact-item", function(){
        $("#contactSearch").val($(this).text());
        $("#contactList").html("");
    });

    // AGREGAR CONTACTO
    $("#addContactBtn").click(function(){

        let newContact = $("#newContact").val();

        if(newContact === "") return;

        contacts.push(newContact);
        saveContacts();

        $("#newContact").val("");

        $("#sendMessage")
            .html("Contacto agregado correctamente")
            .removeClass("error-message")
            .addClass("success-message");
    });

    // TRANSFERENCIA
    $("#sendForm").submit(function(e){
        e.preventDefault();

        let contact = $("#contactSearch").val();
        let amount = Number($("#sendAmount").val());

        // VALIDACIONES
        if(contact === ""){
            $("#sendMessage")
                .html("Selecciona un contacto")
                .addClass("error-message");
            return;
        }

        if(amount <= 0 || isNaN(amount)){
            $("#sendMessage")
                .html("Ingresa un monto válido")
                .addClass("error-message");
            return;
        }

        if(amount > currentUser.balance){
            $("#sendMessage")
                .html("Saldo insuficiente")
                .addClass("error-message");
            return;
        }

        // RESTAR SALDO
        currentUser.balance -= amount;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // ACTUALIZAR UI
        $("#availableBalance").text(
            "$" + currentUser.balance.toLocaleString("es-CL")
        );

        // MENSAJE
        $("#sendMessage")
            .html("Transferencia realizada exitosamente")
            .removeClass("error-message")
            .addClass("success-message")
            .hide()
            .fadeIn();

        // LIMPIAR
        $("#sendAmount").val("");
        $("#contactSearch").val("");

        // HISTORIAL
        let transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        transactions.unshift({
            type: "Transferencia",
            amount: amount,
            status: "Completado",
            contact: contact,
            date: new Date().toLocaleDateString("es-CL")
        });

        localStorage.setItem("transactions", JSON.stringify(transactions));
    });

});