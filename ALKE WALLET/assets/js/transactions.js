
$(document).ready(function(){

    // Animación

    $(".dashboard-card").hide().fadeIn(1200);

    // OBTENER TRANSACCIONES

    let transactions =
        JSON.parse(localStorage.getItem("transactions"))
        || [];

    // RENDER

    function renderTransactions(data){

        $("#transactionsTable").html("");

        // SI NO HAY DATOS

        if(data.length === 0){

            $("#transactionsTable").append(`

                <tr>

                    <td colspan="5" class="text-center py-5">

                        No existen movimientos registrados.

                    </td>

                </tr>

            `);

            return;

        }

        // RECORRER DATOS

        data.forEach(transaction => {

            let amountClass =
                transaction.type === "Depósito"
                ? "text-success"
                : "text-danger";

            let amountSign =
                transaction.type === "Depósito"
                ? "+"
                : "-";

            $("#transactionsTable").append(`

                <tr>

                    <td>
                        ${transaction.type}
                    </td>

                    <td>
                        ${transaction.contact || "-"}
                    </td>

                    <td>
                        ${transaction.date}
                    </td>

                    <td>

                        <span class="custom-badge badge-success">

                            ${transaction.status}

                        </span>

                    </td>

                    <td class="${amountClass} fw-bold">

                        ${amountSign}$${Number(transaction.amount).toLocaleString("es-CL")}

                    </td>

                </tr>

            `);

        });

    }

    // MOSTRAR

    renderTransactions(transactions);

    // BUSCADOR

    $("#searchTransaction").on("keyup", function(){

        let value =
            $(this).val().toLowerCase();

        let filtered =
            transactions.filter(transaction =>

                transaction.type.toLowerCase().includes(value)
                ||

                (transaction.contact &&
                transaction.contact.toLowerCase().includes(value))

            );

        renderTransactions(filtered);

    });

    // VACIAR HISTORIAL

    $("#clearHistoryBtn").click(function(){

        if(confirm("¿Deseas eliminar el historial?")){

            localStorage.removeItem("transactions");

            transactions = [];

            renderTransactions(transactions);

        }

    });

});
