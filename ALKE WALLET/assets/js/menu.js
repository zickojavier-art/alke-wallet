
$(document).ready(function(){

    // ANIMACIONES

    $(".dashboard-card").hide().fadeIn(1200);

    $(".action-card").hover(

        function(){

            $(this).addClass("shadow-lg");

        },

        function(){

            $(this).removeClass("shadow-lg");

        }

    );

    // SALDO
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "login.html";
}

$("#userName").text(currentUser.name);

$("#userBalance").text(
    "$" + currentUser.balance.toLocaleString("es-CL")
);

    // MOSTRAR SALDO

    $("#saldoTotal").text(
        "$" + Number(saldo).toLocaleString("es-CL")
    );

    // TRANSACCIONES

    let transactions =
        JSON.parse(localStorage.getItem("transactions"))
        || [];

    // CONTENEDOR

    const container = $("#recentTransactions");

    // LIMPIAR

    container.html("");

    // SI NO HAY MOVIMIENTOS

    if(transactions.length === 0){

        container.html(`

            <p class="text-center opacity-75">

                No existen movimientos recientes.

            </p>

        `);

    }else{

        // MOSTRAR SOLO LOS ÚLTIMOS 3

        transactions.slice(0,3).forEach(transaction => {

            // COLOR

            let amountClass =
                transaction.type === "Depósito"
                ? "text-success"
                : "text-danger";

            // SIGNO

            let amountSign =
                transaction.type === "Depósito"
                ? "+"
                : "-";

            // ICONO

            let icon =
                transaction.type === "Depósito"
                ? "bi-arrow-down"
                : "bi-arrow-up";

            let bgClass =
                transaction.type === "Depósito"
                ? "success-bg"
                : "danger-bg";

            // RENDER

            container.append(`

                <div class="transaction-item">

                    <div class="d-flex align-items-center gap-3">

                        <div class="transaction-icon ${bgClass}">

                            <i class="bi ${icon}"></i>

                        </div>

                        <div>

                            <h6 class="mb-0">

                                ${transaction.type}

                            </h6>

                            <small>

                                ${transaction.date}

                            </small>

                        </div>

                    </div>

                    <h6 class="${amountClass}">

                        ${amountSign}$${Number(transaction.amount).toLocaleString("es-CL")}

                    </h6>

                </div>

            `);

        });

    }

});



