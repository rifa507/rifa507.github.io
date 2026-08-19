/* ============================================ */
/* FIREBASE */
/* ============================================ */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";


import {
    getDatabase,
    ref,
    onValue,
    set
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* ============================================ */
/* CONFIGURACIÓN FIREBASE */
/* ============================================ */

const firebaseConfig = {

    apiKey:
        "AIzaSyD-R7A-HrgyZskFg4i8zPpmv6Roqix8Ohg",

    authDomain:
        "rifa507.firebaseapp.com",

    databaseURL:
        "https://rifa507-default-rtdb.firebaseio.com",

    projectId:
        "rifa507",

    storageBucket:
        "rifa507.firebasestorage.app",

    messagingSenderId:
        "538459352914",

    appId:
        "1:538459352914:web:be993904ba1d31e24b548b"

};


/* ============================================ */
/* INICIALIZAR */
/* ============================================ */

const app =
    initializeApp(firebaseConfig);

const database =
    getDatabase(app);

const auth =
    getAuth(app);


/* ============================================ */
/* ELEMENTOS */
/* ============================================ */

const loginBox =
    document.getElementById("loginBox");

const panelAdmin =
    document.getElementById("panelAdmin");

const correoInput =
    document.getElementById("correo");

const passwordInput =
    document.getElementById("password");

const loginBtn =
    document.getElementById("loginBtn");

const mensaje =
    document.getElementById("mensaje");

const cerrarSesion =
    document.getElementById("cerrarSesion");

const numerosAdmin =
    document.getElementById("numerosAdmin");


/* MODAL */

const modalFondo =
    document.getElementById("modalFondo");

const pasoDisponible =
    document.getElementById("pasoDisponible");

const pasoNombre =
    document.getElementById("pasoNombre");

const pasoOcupado =
    document.getElementById("pasoOcupado");

const pasoPagado =
    document.getElementById("pasoPagado");

const textoDisponible =
    document.getElementById("textoDisponible");

const numeroNombre =
    document.getElementById("numeroNombre");

const nombreCliente =
    document.getElementById("nombreCliente");

const errorNombre =
    document.getElementById("errorNombre");

const textoOcupado =
    document.getElementById("textoOcupado");

const textoPagado =
    document.getElementById("textoPagado");


/* BOTONES */

const ocuparSi =
    document.getElementById("ocuparSi");

const cancelarDisponible =
    document.getElementById("cancelarDisponible");

const guardarNombre =
    document.getElementById("guardarNombre");

const cancelarNombre =
    document.getElementById("cancelarNombre");

const marcarPagado =
    document.getElementById("marcarPagado");

const desocuparOcupado =
    document.getElementById("desocuparOcupado");

const cancelarOcupado =
    document.getElementById("cancelarOcupado");

const volverOcupado =
    document.getElementById("volverOcupado");

const desocuparPagado =
    document.getElementById("desocuparPagado");

const cancelarPagado =
    document.getElementById("cancelarPagado");


/* ============================================ */
/* VARIABLES */
/* ============================================ */

let numeroSeleccionado = null;

let datosActuales = {};


/* ============================================ */
/* CREAR 00 - 99 */
/* ============================================ */

for (let i = 0; i < 100; i++) {

    const numero =
        i.toString().padStart(2, "0");


    const item =
        document.createElement("div");

    item.classList.add(
        "numero-item"
    );


    const boton =
        document.createElement("button");

    boton.classList.add(
        "numero-admin"
    );

    boton.dataset.numero =
        numero;


    const numeroTexto =
        document.createElement("span");

    numeroTexto.classList.add(
        "numero-texto"
    );

    numeroTexto.textContent =
        numero;


    const nombre =
        document.createElement("div");

    nombre.classList.add(
        "nombre-cliente"
    );

    nombre.dataset.nombreNumero =
        numero;


    boton.appendChild(
        numeroTexto
    );

    boton.appendChild(
        nombre
    );

    item.appendChild(
        boton
    );

    numerosAdmin.appendChild(
        item
    );


    boton.addEventListener(
        "click",
        function () {

            numeroSeleccionado =
                this.dataset.numero;

            abrirOpcionesNumero();

        }
    );

}


/* ============================================ */
/* ABRIR SEGÚN ESTADO */
/* ============================================ */

function abrirOpcionesNumero() {

    ocultarPasos();


    const estado =
        datosActuales[numeroSeleccionado] || {};


    modalFondo.classList.add(
        "activo"
    );


    /* DISPONIBLE */

    if (
        estado.ocupado !== true
    ) {

        pasoDisponible.style.display =
            "block";

        textoDisponible.innerHTML =

            `¿Deseas <strong>OCUPAR</strong>
            el número
            <span class="numero-modal">
                ${numeroSeleccionado}
            </span>?`;

        return;

    }


    /* PAGADO */

    if (
        estado.pagado === true
    ) {

        pasoPagado.style.display =
            "block";

        textoPagado.innerHTML =

            `Número
            <span class="numero-modal">
                ${numeroSeleccionado}
            </span>
            <br>
            <span class="nombre-modal">
                ${estado.nombre || ""}
            </span>
            <br><br>
            Estado actual:
            <strong>PAGADO</strong>`;

        return;

    }


    /* OCUPADO */

    pasoOcupado.style.display =
        "block";

    textoOcupado.innerHTML =

        `Número
        <span class="numero-modal">
            ${numeroSeleccionado}
        </span>
        <br>
        <span class="nombre-modal">
            ${estado.nombre || ""}
        </span>
        <br><br>
        Estado actual:
        <strong>OCUPADO</strong>`;

}


/* ============================================ */
/* OCULTAR PASOS */
/* ============================================ */

function ocultarPasos() {

    pasoDisponible.style.display =
        "none";

    pasoNombre.style.display =
        "none";

    pasoOcupado.style.display =
        "none";

    pasoPagado.style.display =
        "none";

}


/* ============================================ */
/* DISPONIBLE -> PEDIR NOMBRE */
/* ============================================ */

ocuparSi.addEventListener(
    "click",
    function () {

        ocultarPasos();

        pasoNombre.style.display =
            "block";

        numeroNombre.textContent =
            numeroSeleccionado;

        nombreCliente.value =
            "";

        errorNombre.textContent =
            "";

        setTimeout(
            function () {

                nombreCliente.focus();

            },
            100
        );

    }
);


/* ============================================ */
/* GUARDAR OCUPADO */
/* ============================================ */

guardarNombre.addEventListener(
    "click",
    async function () {

        const nombre =
            nombreCliente.value.trim();


        if (nombre === "") {

            errorNombre.textContent =
                "Debes escribir un nombre.";

            return;

        }


        try {

            await set(
                ref(
                    database,
                    `numeros/${numeroSeleccionado}`
                ),
                {
                    ocupado: true,
                    pagado: false,
                    nombre: nombre
                }
            );

            cerrarModal();

        }

        catch (error) {

            console.error(error);

            errorNombre.textContent =
                "No se pudo guardar.";

        }

    }
);


/* ============================================ */
/* OCUPADO -> PAGADO */
/* ============================================ */

marcarPagado.addEventListener(
    "click",
    async function () {

        const estado =
            datosActuales[numeroSeleccionado] || {};


        try {

            await set(
                ref(
                    database,
                    `numeros/${numeroSeleccionado}`
                ),
                {
                    ocupado: true,
                    pagado: true,
                    nombre: estado.nombre || ""
                }
            );

            cerrarModal();

        }

        catch (error) {

            console.error(error);

            alert(
                "No se pudo marcar como pagado."
            );

        }

    }
);


/* ============================================ */
/* PAGADO -> OCUPADO */
/* ============================================ */

volverOcupado.addEventListener(
    "click",
    async function () {

        const estado =
            datosActuales[numeroSeleccionado] || {};


        try {

            await set(
                ref(
                    database,
                    `numeros/${numeroSeleccionado}`
                ),
                {
                    ocupado: true,
                    pagado: false,
                    nombre: estado.nombre || ""
                }
            );

            cerrarModal();

        }

        catch (error) {

            console.error(error);

            alert(
                "No se pudo cambiar el estado."
            );

        }

    }
);


/* ============================================ */
/* DESOCUPAR */
/* ============================================ */

async function desocuparNumero() {

    try {

        await set(
            ref(
                database,
                `numeros/${numeroSeleccionado}`
            ),
            {
                ocupado: false,
                pagado: false,
                nombre: ""
            }
        );

        cerrarModal();

    }

    catch (error) {

        console.error(error);

        alert(
            "No se pudo desocupar."
        );

    }

}


desocuparOcupado.addEventListener(
    "click",
    desocuparNumero
);


desocuparPagado.addEventListener(
    "click",
    desocuparNumero
);


/* ============================================ */
/* CANCELAR */
/* ============================================ */

cancelarDisponible.addEventListener(
    "click",
    cerrarModal
);

cancelarNombre.addEventListener(
    "click",
    cerrarModal
);

cancelarOcupado.addEventListener(
    "click",
    cerrarModal
);

cancelarPagado.addEventListener(
    "click",
    cerrarModal
);


/* ============================================ */
/* ENTER NOMBRE */
/* ============================================ */

nombreCliente.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            guardarNombre.click();

        }

    }
);


/* ============================================ */
/* CERRAR MODAL */
/* ============================================ */

function cerrarModal() {

    modalFondo.classList.remove(
        "activo"
    );

    ocultarPasos();

    numeroSeleccionado =
        null;

    nombreCliente.value =
        "";

    errorNombre.textContent =
        "";

}


/* ============================================ */
/* LOGIN */
/* ============================================ */

loginBtn.addEventListener(
    "click",
    async function () {

        const correo =
            correoInput.value.trim();

        const password =
            passwordInput.value;


        if (
            correo === "" ||
            password === ""
        ) {

            mensaje.textContent =
                "Escribe tu correo y contraseña.";

            return;

        }


        mensaje.textContent =
            "Entrando...";


        try {

            await signInWithEmailAndPassword(
                auth,
                correo,
                password
            );

            mensaje.textContent =
                "";

        }

        catch (error) {

            console.error(error);

            mensaje.textContent =
                "Correo o contraseña incorrectos.";

        }

    }
);


/* ============================================ */
/* CERRAR SESIÓN */
/* ============================================ */

cerrarSesion.addEventListener(
    "click",
    async function () {

        await signOut(auth);

    }
);


/* ============================================ */
/* ESTADO SESIÓN */
/* ============================================ */

onAuthStateChanged(
    auth,
    function (usuario) {

        if (usuario) {

            loginBox.style.display =
                "none";

            panelAdmin.style.display =
                "block";

        }

        else {

            loginBox.style.display =
                "block";

            panelAdmin.style.display =
                "none";

        }

    }
);


/* ============================================ */
/* FIREBASE EN TIEMPO REAL */
/* ============================================ */

const numerosRef =
    ref(
        database,
        "numeros"
    );


onValue(
    numerosRef,
    function (snapshot) {

        datosActuales =
            snapshot.val() || {};


        document
            .querySelectorAll(
                ".numero-admin"
            )
            .forEach(
                function (boton) {

                    const numero =
                        boton.dataset.numero;

                    const estado =
                        datosActuales[numero] || {};

                    const nombreDiv =
                        document.querySelector(
                            `[data-nombre-numero="${numero}"]`
                        );


                    boton.classList.remove(
                        "ocupado",
                        "pagado"
                    );

                    nombreDiv.textContent =
                        "";


                    if (
                        estado.ocupado === true
                    ) {

                        nombreDiv.textContent =
                            estado.nombre || "";


                        if (
                            estado.pagado === true
                        ) {

                            boton.classList.add(
                                "pagado"
                            );

                        }

                        else {

                            boton.classList.add(
                                "ocupado"
                            );

                        }

                    }

                }
            );

    }
);
