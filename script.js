/* ============================================ */
/* FIREBASE */
/* ============================================ */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


/* ============================================ */
/* CONFIGURACIÓN DE FIREBASE */
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


/* ============================================ */
/* CONTENEDOR DE LOS NÚMEROS */
/* ============================================ */

const container =
    document.getElementById("numbersContainer");


/* ============================================ */
/* CREAR NÚMEROS DEL 00 AL 99 */
/* ============================================ */

for (let i = 0; i < 100; i++) {

    const numero =
        i.toString().padStart(2, "0");


    const celda =
        document.createElement("div");


    celda.classList.add(
        "numero",
        `num-${numero}`
    );


    celda.dataset.numero =
        numero;


    container.appendChild(celda);

}


/* ============================================ */
/* ESCUCHAR FIREBASE EN TIEMPO REAL */
/* ============================================ */

const numerosRef =
    ref(database, "numeros");


onValue(
    numerosRef,

    function(snapshot) {

        const datos =
            snapshot.val() || {};


        document
            .querySelectorAll(".numero")
            .forEach(
                function(celda) {

                    const numero =
                        celda.dataset.numero;


                    const estado =
                        datos[numero];


                    /*
                       Quitar estado anterior
                    */

                    celda.classList.remove(
                        "ocupado"
                    );


                    /*
                       Si Firebase dice
                       ocupado = true
                    */

                    if (
                        estado &&
                        estado.ocupado === true
                    ) {

                        celda.classList.add(
                            "ocupado"
                        );

                    }

                }
            );

    }
);
