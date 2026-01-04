let currentPage = window.location.pathname;


// Login functionality
const email_default = "camilas.cisg@gmail.com";
const pass_default = "Cami12345";

if (currentPage === "/index.html") {
    let email_input = $(".email");
    let pass_input = $(".password");
    const login_form = $(".login_form");

    if (email_input) {
        login_form.submit((e) => {
        e.preventDefault();
        if(email_default === email_input.val() && pass_default === pass_input.val()) {
            window.alert("Login exitoso");
            window.location.href = "menu.html";
        } else {
            alerta =`<div class="alert alert-danger" role="alert">
                        Email o contraseña incorrectos. Inténtalo de nuevo.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
            $(".alerta").html(alerta);
            pass_input.val("");
            pass_input.focus();
         }
        });
    }
}
// Menu ref buttons
let deposit_ref = document.querySelector(".deposit_ref");
let sendmoney_ref = document.querySelector(".sendmoney_ref");
let transactions_ref = document.querySelector(".transactions_ref");
let total_amount = document.querySelector(".total_amount");

if (!isNaN(localStorage.getItem("total_amount")) && window.location.pathname === "/menu.html") {
    total_amount.textContent = "$" + localStorage.getItem("total_amount");
} else if (isNaN(localStorage.getItem("total_amount")) && window.location.pathname === "/menu.html") {
    total_amount.textContent = "$60000";
    localStorage.setItem("total_amount", "60000");
}

if (deposit_ref) {
    deposit_ref.addEventListener("click", () => {
        window.alert("Redirigiendo a Depositar");
        window.location.href = "deposit.html";
    });
}

if (sendmoney_ref) {
    sendmoney_ref.addEventListener("click",() => {
        window.alert("Redirigiendo a Enviar Dinero");
        window.location.href = "sendmoney.html";
    });
}

if (transactions_ref) {
    transactions_ref.addEventListener("click",() => {
        window.alert("Redirigiendo a Ultimos Movimientos");
        window.location.href = "transactions.html";
    });
}

// Deposit functionality
let deposit_form = document.querySelector(".deposit_form");
let deposit_input = document.querySelector(".deposit_input");

if (currentPage === "/deposit.html") {
    let trx_detail = $(".trx_detail");
    let mssg_exito = $(".alert-container");
    let saldo = $(".saldo_container"); 
    saldo.html(`Saldo actual: $${localStorage.getItem("total_amount")}`);


    if (deposit_form) {
        deposit_form.addEventListener("submit",(e) => {
            e.preventDefault();
            let amount = parseFloat(deposit_input.value);     
            
            // Store transaction details
            let deposit_hist= { "date": new Date(),
                                "datetime": new Date().toLocaleDateString("es-CL") + " " + new Date().toLocaleTimeString("es-CL"),
                                "amount": amount,
                                "mssg": "Deposito a la cuenta",
                                "data_type":"Deposito"};
            // Save deposit records
            if (!localStorage.getItem("transactions")) {
                deposit_array = [];
                deposit_array.push(deposit_hist);
                localStorage.setItem("transactions", JSON.stringify(deposit_array));
            } else {
                old_deposit = JSON.parse(localStorage.getItem("transactions"));
                old_deposit.push(deposit_hist);
                localStorage.setItem("transactions", JSON.stringify(old_deposit));
            }
            
            // Update account amount
            if (localStorage.getItem("total_amount")) {
                amount += parseFloat(localStorage.getItem("total_amount"));
            }

            localStorage.setItem("total_amount", parseFloat(amount));
            let saldo = $(".saldo_container");
            saldo.html(`Saldo actual: $${localStorage.getItem("total_amount")}`);

            // show last deposit
            trx_detail.addClass("show");
            trx_detail.html(`Monto ultimo deposito: $${deposit_input.value} realizado el ${new Date().toLocaleDateString("es-CL") + " " + new Date().toLocaleTimeString("es-CL")}`)
            setTimeout(() => {
            trx_detail.removeClass("show");
            }, 5000);

            deposit_input.value = "";
            mssg_exito.html(`Depósito realizado con éxito, serás redireccionado al menú principal en breve`).addClass("alert alert-success");
            setTimeout(() => {
                window.location.href = "/menu.html";
            }, 2000);
        });
    }
}
// Send Money functionality
let send_form = document.querySelector(".send_form");
let send_input = document.querySelector(".send_input");

if (currentPage === "/sendmoney.html") {
    let msg_exito_send = $(".msg_exito_send");

// Select user from user_list
    let users_list = document.querySelector(".users_list");
    let selected_user = null;
    if (users_list) {
        users_list.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;
            users_list.querySelectorAll("li").forEach(u =>
                u.classList.remove("selected")
            );
            li.classList.add("selected");
            selected_user = li.dataset.id;
        });
    }

// Send money to contacts
    if (send_form) {
        send_form.addEventListener("submit", (e) => {
            e.preventDefault();
            let amount = parseFloat(send_input.value);
            if (amount>0 && selected_user) {
                if(localStorage.getItem("total_amount")) {
                    let total_amount = parseFloat(localStorage.getItem("total_amount"));
                    total_amount -= amount;

                    if (total_amount < 0) {
                        window.alert("Fondos insuficientes para realizar la transferencia/retiro.");
                        send_input.value = "";
                        return;
                    }

                    localStorage.setItem("total_amount", parseFloat(total_amount));
                    send_input.value = "";
                    msg_exito_send.html(`Transferencia/Retiro realizado con éxito`).addClass("alert alert-success");
                } else {
                    window.alert("Fondos insuficientes para realizar la transferencia/retiro.");
                    send_input.value = "";
                    return;
                }

                // Store transaction details
                let send_hist= {    "date": new Date(),
                                    "datetime": new Date().toLocaleDateString("es-CL") + " " + new Date().toLocaleTimeString("es-CL"),
                                    "amount": amount,
                                    "mssg": `Transferencia para ${selected_user}`,
                                    "data_type":"Transferencia"};
                
                if (!localStorage.getItem("transactions")) {
                    send_array = [];
                    send_array.push(send_hist);
                    localStorage.setItem("transactions", JSON.stringify(send_array));
                } else {
                    old_send = JSON.parse(localStorage.getItem("transactions"));
                    old_send.push(send_hist);
                    localStorage.setItem("transactions", JSON.stringify(old_send));
                }
            }
        else {window.alert("Por favor asegurarse de seleccionar un contacto en la lista y que el monto sea mayor a 0")} 
        });
    }
}
// Add new users to contacts list
let new_user = document.querySelector(".new_user");
let cbu = document.querySelector(".new_cbu");
let alias = document.querySelector(".new_alias");
let banco = document.querySelector(".new_banco");
let form_newUser = document.querySelector(".addUser_form");
let users_list = document.querySelector(".users_list");

if (form_newUser) {
    form_newUser.addEventListener("submit", (e) => {
        e.preventDefault();
        let user = new_user.value;
        let cbu_value = cbu.value;
        let alias_value = alias.value;
        let banco_value = banco.value;

        let user_list_new = {
            "data-id": user,
            "name": user, 
            "cbu": cbu_value, 
            "alias": alias_value, 
            "banco": banco_value};
        
        let user_array = [];
        user_array.push(user_list_new);

        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify(user_array));
        } else {
            old_users = JSON.parse(localStorage.getItem("users"));
            old_users.push(user_list_new);
            localStorage.setItem("users", JSON.stringify(old_users));
        }
        $("#newUser").modal("hide");
    });
    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));
        users.forEach((user) => {
            let user_html= `<li class="list-group-item" data-id="${user.name}">
                                <div class="contact-info">
                                <span class="contact-name">${user.name}</span>
                                <span class="contact-details">CBU: ${user.cbu}, Alias: ${user.alias}, Banco: ${user.banco}</span>
                            </div>
                            </li>
                            `;
            users_list.innerHTML += user_html;
    });
    }
}

// Search user in contact list
if (currentPage === "/sendmoney.html") {
    let search_input = document.querySelector("#search_input");
    let search_list = document.querySelectorAll(".users_list li");

    search_input.addEventListener("input", () => {
        let search = search_input.value.toLowerCase();

        search_list.forEach(li => {
            let name = li.querySelector(".contact-name").textContent.toLowerCase();

            if (name.includes(search)) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
    });
}


// Transactions list functionality
let trans_list = document.querySelector(".transactions_list");
if (localStorage.getItem("transactions") && currentPage === "/transactions.html") {
    let transactions= JSON.parse(localStorage.getItem("transactions"));
    transactions.sort((a,b) => new Date(b.date) - new Date(a.date));
    transactions.forEach((transaction) => {
        let trans = `<li class = "list-group-item" data-id=${transaction.data_type}>${transaction.datetime} - $${transaction.amount} - ${transaction.mssg}</li>`;
        trans_list.innerHTML += trans;
    });

     // Send list according to filter
    function ultMovimientos(filter = "Todos") {
        trans_list.innerHTML = ""; // Limpiar lista
        transactions.forEach(transaction => {
            if (filter === "Todos" || transaction.data_type === filter) {
                let li = `<li class="list-group-item" data-id="${transaction.data_type}">
                            ${transaction.datetime} - $${transaction.amount} - ${transaction.mssg}
                          </li>`;
                trans_list.innerHTML += li;
            }
        });
    }

    // Show everything
    ultMovimientos();

    // Filtering by button option
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let filter = btn.getAttribute("data-filter");
            ultMovimientos(filter);
        });
    });
};

console.log("Script cargado");