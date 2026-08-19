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
/* INICIALIZAR FIREBASE */
/* ============================================ */

const app =
    initializeApp(firebaseConfig);


const database =
    getDatabase(app);


const auth =
    getAuth(app);


/* ============================================ */
/* ELEMENTOS HTML */
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


/* ============================================ */
/* ELEMENTOS MODAL */
/* ============================================ */

const modalFondo =
    document.getElementById("modalFondo");


const pasoConfirmacion =
    document.getElementById("pasoConfirmacion");


const pasoNombre =
    document.getElementById("pasoNombre");


const textoModal =
    document.getElementById("textoModal");


const confirmarSi =
    document.getElementById("confirmarSi");


const cancelarOperacion =
    document.getElementById("cancelarOperacion");


const numeroNombre =
    document.getElementById("numeroNombre");


const nombreCliente =
    document.getElementById("nombreCliente");


const guardarNombre =
    document.getElementById("guardarNombre");


const cancelarNombre =
    document.getElementById("cancelarNombre");


const errorNombre =
    document.getElementById("errorNombre");


/* ============================================ */
/* VARIABLES TEMPORALES */
/* ============================================ */

let numeroSeleccionado = null;

let numeroEstaOcupado = false;


/* ============================================ */
/* CREAR NÚMEROS 00 - 99 */
/* ============================================ */

for (let i = 0; i < 100; i++) {

    const numero =
        i.toString().padStart(2, "0");


    /* CONTENEDOR */

    const item =
        document.createElement("div");


    item.classList.add(
        "numero-item"
    );


    /* BOTÓN */

    const boton =
        document.createElement("button");


    boton.classList.add(
        "numero-admin"
    );


    boton.dataset.numero =
        numero;


    /* NÚMERO */

    const numeroTexto =
        document.createElement("span");


    numeroTexto.classList.add(
        "numero-texto"
    );


    numeroTexto.textContent =
        numero;


    boton.appendChild(
        numeroTexto
    );


    /* NOMBRE */

    const nombre =
        document.createElement("div");


    nombre.classList.add(
        "nombre-cliente"
    );


    nombre.dataset.nombreNumero =
        numero;


    boton.appendChild(
        nombre
    );


    /* AGREGAR */

    item.appendChild(
        boton
    );


    numerosAdmin.appendChild(
        item
    );


    /* CLICK */

    boton.addEventListener(
        "click",
        function () {

            numeroSeleccionado =
                this.dataset.numero;


            numeroEstaOcupado =
                this.classList.contains(
                    "ocupado"
                );


            abrirConfirmacion();

        }
    );

}


/* ============================================ */
/* ABRIR CONFIRMACIÓN */
/* ============================================ */

function abrirConfirmacion() {

    pasoConfirmacion.style.display =
        "block";


    pasoNombre.style.display =
        "none";


    modalFondo.classList.add(
        "activo"
    );


    if (numeroEstaOcupado) {

        textoModal.innerHTML =

            `¿Deseas <strong>DESOCUPAR</strong>
            el número
            <span class="numero-modal">
                ${numeroSeleccionado}
            </span>?`;

    }

    else {

        textoModal.innerHTML =

            `¿Deseas <strong>OCUPAR</strong>
            el número
            <span class="numero-modal">
                ${numeroSeleccionado}
            </span>?`;

    }

}


/* ============================================ */
/* BOTÓN SÍ */
/* ============================================ */

confirmarSi.addEventListener(
    "click",
    async function () {

        /* SI ESTÁ OCUPADO -> DESOCUPAR */

        if (numeroEstaOcupado) {

            const numeroRef =
                ref(
                    database,
                    `numeros/${numeroSeleccionado}`
                );


            try {

                await set(
                    numeroRef,
                    {
                        ocupado: false,
                        nombre: ""
                    }
                );


                cerrarModal();

            }

            catch (error) {

                console.error(error);


                alert(
                    "No se pudo desocupar el número."
                );

            }

        }

        /* SI ESTÁ DISPONIBLE -> PEDIR NOMBRE */

        else {

            pasoConfirmacion.style.display =
                "none";


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

    }
);


/* ============================================ */
/* GUARDAR NOMBRE */
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


        const numeroRef =
            ref(
                database,
                `numeros/${numeroSeleccionado}`
            );


        try {

            await set(
                numeroRef,
                {
                    ocupado: true,
                    nombre: nombre
                }
            );


            cerrarModal();

        }

        catch (error) {

            console.error(error);


            errorNombre.textContent =
                "No se pudo guardar el número.";

        }

    }
);


/* ============================================ */
/* ENTER PARA GUARDAR */
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
/* CANCELAR */
/* ============================================ */

cancelarOperacion.addEventListener(
    "click",
    function () {

        cerrarModal();

    }
);


cancelarNombre.addEventListener(
    "click",
    function () {

        cerrarModal();

    }
);


/* ============================================ */
/* CERRAR MODAL */
/* ============================================ */

function cerrarModal() {

    modalFondo.classList.remove(
        "activo"
    );


    numeroSeleccionado =
        null;


    numeroEstaOcupado =
        false;


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
/* DETECTAR SESIÓN */
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

        const datos =
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
                        datos[numero];


                    const nombreDiv =
                        document.querySelector(
                            `[data-nombre-numero="${numero}"]`
                        );


                    boton.classList.remove(
                        "ocupado"
                    );


                    nombreDiv.textContent =
                        "";


                    if (
                        estado &&
                        estado.ocupado === true
                    ) {

                        boton.classList.add(
                            "ocupado"
                        );


                        nombreDiv.textContent =
                            estado.nombre || "";

                    }

                }
            );

    }
);
