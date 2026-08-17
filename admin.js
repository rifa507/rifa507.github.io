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

    apiKey: "AIzaSyD-R7A-HrgyZskFg4i8zPpmv6Roqix8Ohg",

    authDomain: "rifa507.firebaseapp.com",

    databaseURL:
        "https://rifa507-default-rtdb.firebaseio.com",

    projectId: "rifa507",

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
/* CREAR NÚMEROS 00 - 99 */
/* ============================================ */

for (let i = 0; i < 100; i++) {

    const numero =
        i.toString().padStart(2, "0");


    const boton =
        document.createElement("button");


    boton.classList.add(
        "numero-admin"
    );


    boton.textContent =
        numero;


    boton.dataset.numero =
        numero;


    numerosAdmin.appendChild(
        boton
    );


    /* ======================================== */
    /* CAMBIAR ESTADO */
/* ======================================== */

    boton.addEventListener(
        "click",
        async function () {

            const numero =
                this.dataset.numero;


            const estaOcupado =
                this.classList.contains(
                    "ocupado"
                );


            const numeroRef =
                ref(
                    database,
                    `numeros/${numero}`
                );


            try {

                await set(
                    numeroRef,
                    {
                        ocupado: !estaOcupado
                    }
                );

            }

            catch (error) {

                alert(
                    "No se pudo cambiar el número."
                );

                console.error(error);

            }

        }
    );

}


/* ============================================ */
/* INICIAR SESIÓN */
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


            mensaje.textContent = "";

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
/* ESCUCHAR NÚMEROS EN TIEMPO REAL */
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


                    boton.classList.remove(
                        "ocupado"
                    );


                    if (
                        estado &&
                        estado.ocupado === true
                    ) {

                        boton.classList.add(
                            "ocupado"
                        );

                    }

                }
            );

    }
);