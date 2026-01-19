let currentPage = window.location.pathname;

// Login functionality
const email_default = "camilas.cisg@gmail.com";
const pass_default = "Cami12345";

if (currentPage === "/index.html") {
    const email_input = document.querySelector(".email");
    const pass_input = document.querySelector(".password");
    const login_form = document.querySelector(".login_form");
    const alerta_container = document.querySelector(".alerta");

    if (login_form) {
        login_form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (
                email_default === email_input.value &&
                pass_default === pass_input.value
            ) {
                window.alert("Login exitoso");
                window.location.href = "menu.html";
            } else {
                alerta_container.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Email o contraseña incorrectos. Inténtalo de nuevo.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                pass_input.value = "";
                pass_input.focus();
            }
        });
    }
}

// Menu ref buttons
const deposit_ref = document.querySelector(".deposit_ref");
const sendmoney_ref = document.querySelector(".sendmoney_ref");
const transactions_ref = document.querySelector(".transactions_ref");
const total_amount = document.querySelector(".total_amount");

if (window.location.pathname === "/menu.html") {
    if (!isNaN(localStorage.getItem("total_amount"))) {
        total_amount.textContent = "$" + localStorage.getItem("total_amount");
    } else {
        total_amount.textContent = "$60000";
        localStorage.setItem("total_amount", "60000");
    }
}

if (deposit_ref) {
    deposit_ref.addEventListener("click", () => {
        window.alert("Redirigiendo a Depositar");
        window.location.href = "deposit.html";
    });
}

if (sendmoney_ref) {
    sendmoney_ref.addEventListener("click", () => {
        window.alert("Redirigiendo a Enviar Dinero");
        window.location.href = "sendmoney.html";
    });
}

if (transactions_ref) {
    transactions_ref.addEventListener("click", () => {
        window.alert("Redirigiendo a Ultimos Movimientos");
        window.location.href = "transactions.html";
    });
}

// Deposit functionality
const deposit_form = document.querySelector(".deposit_form");
const deposit_input = document.querySelector(".deposit_input");

if (currentPage === "/deposit.html") {
    const trx_detail = document.querySelector(".trx_detail");
    const mssg_exito = document.querySelector(".alert-container");
    const saldo = document.querySelector(".saldo_container");

    saldo.innerHTML = `Saldo actual: $${localStorage.getItem("total_amount")}`;

    if (deposit_form) {
        deposit_form.addEventListener("submit", (e) => {
            e.preventDefault();
            let amount = parseFloat(deposit_input.value);

            const deposit_hist = {
                date: new Date(),
                datetime: new Date().toLocaleDateString("es-CL") + " " + new Date().toLocaleTimeString("es-CL"),
                amount: amount,
                mssg: "Deposito a la cuenta",
                data_type: "Deposito"
            };

            const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
            transactions.push(deposit_hist);
            localStorage.setItem("transactions", JSON.stringify(transactions));

            amount += parseFloat(localStorage.getItem("total_amount") || 0);
            localStorage.setItem("total_amount", amount);

            saldo.innerHTML = `Saldo actual: $${amount}`;

            trx_detail.innerHTML = `Monto ultimo deposito: $${deposit_input.value} realizado el ${deposit_hist.datetime}`;
            trx_detail.classList.add("alert", "alert-success");

            deposit_input.value = "";

            mssg_exito.innerHTML = "Depósito realizado con éxito, serás redireccionado al menú principal en breve";
            mssg_exito.classList.add("alert", "alert-success");

            setTimeout(() => {
                window.location.href = "/menu.html";
            }, 2000);
        });
    }
}

// Send Money functionality
const send_form = document.querySelector(".send_form");
const send_input = document.querySelector(".send_input");

if (currentPage === "/sendmoney.html") {
    const msg_exito_send = document.querySelector(".msg_exito_send");
    const users_list = document.querySelector(".users_list");
    let selected_user = null;

    if (users_list) {
        users_list.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;

            users_list.querySelectorAll("li").forEach(u => u.classList.remove("selected"));
            li.classList.add("selected");
            selected_user = li.dataset.id;
        });
    }

    if (send_form) {
        send_form.addEventListener("submit", (e) => {
            e.preventDefault();
            let amount = parseFloat(send_input.value);
            let total = parseFloat(localStorage.getItem("total_amount") || 0);

            if (amount > 0 && selected_user && total >= amount) {
                total -= amount;
                localStorage.setItem("total_amount", total);

                const send_hist = {
                    date: new Date(),
                    datetime: new Date().toLocaleDateString("es-CL") + " " + new Date().toLocaleTimeString("es-CL"),
                    amount: amount,
                    mssg: `Transferencia para ${selected_user}`,
                    data_type: "Transferencia"
                };

                const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
                transactions.push(send_hist);
                localStorage.setItem("transactions", JSON.stringify(transactions));

                msg_exito_send.innerHTML = "Transferencia/Retiro realizado con éxito";
                msg_exito_send.classList.add("alert", "alert-success");
                send_input.value = "";
            } else {
                window.alert("Fondos insuficientes o contacto no seleccionado");
            }
        });
    }
}

// Add new users
const new_user = document.querySelector(".new_user");
const cbu = document.querySelector(".new_cbu");
const alias = document.querySelector(".new_alias");
const banco = document.querySelector(".new_banco");
const form_newUser = document.querySelector(".addUser_form");
const users_list = document.querySelector(".users_list");

if (form_newUser) {
    form_newUser.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = {
            name: new_user.value,
            cbu: cbu.value,
            alias: alias.value,
            banco: banco.value
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        const modalEl = document.getElementById("newUser");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    });

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => {
        users_list.innerHTML += `
            <li class="list-group-item" data-id="${user.name}">
                <div class="contact-info">
                    <span class="contact-name">${user.name}</span>
                    <span class="contact-details">CBU: ${user.cbu}, Alias: ${user.alias}, Banco: ${user.banco}</span>
                </div>
            </li>
        `;
    });
}

// Search user
if (currentPage === "/sendmoney.html") {
    const search_input = document.querySelector("#search_input");

    search_input.addEventListener("input", () => {
        const search = search_input.value.toLowerCase();
        document.querySelectorAll(".users_list li").forEach(li => {
            const name = li.querySelector(".contact-name").textContent.toLowerCase();
            li.style.display = name.includes(search) ? "" : "none";
        });
    });
}

// Transactions list
const trans_list = document.querySelector(".transactions_list");

if (localStorage.getItem("transactions") && currentPage === "/transactions.html") {
    const transactions = JSON.parse(localStorage.getItem("transactions"))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    function ultMovimientos(filter = "Todos") {
        trans_list.innerHTML = "";
        transactions.forEach(t => {
            if (filter === "Todos" || t.data_type === filter) {
                trans_list.innerHTML += `
                    <li class="list-group-item" data-id="${t.data_type}">
                        ${t.datetime} - $${t.amount} - ${t.mssg}
                    </li>
                `;
            }
        });
    }

    ultMovimientos();

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            ultMovimientos(btn.dataset.filter);
        });
    });
}

console.log("Script cargado");
