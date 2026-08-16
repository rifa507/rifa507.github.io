/* ============================================= */
/* CONTENEDOR DE LOS NÚMEROS */
/* ============================================= */

const container =
    document.getElementById("numbersContainer");


/* ============================================= */
/* ESTADOS */
/* ============================================= */

const estados = [

    "disponible",

    "apartado",

    "pagado"

];


/* ============================================= */
/* CARGAR DATOS GUARDADOS */
/* ============================================= */

let numerosGuardados =
    JSON.parse(
        localStorage.getItem("rifaEstados")
    ) || {};


/* ============================================= */
/* CREAR NÚMEROS DEL 00 AL 99 */
/* ============================================= */

for (let i = 0; i < 100; i++) {

    /* Convertimos por ejemplo:

       0  = 00
       1  = 01
       9  = 09
       10 = 10

    */

    const numero =
        i.toString().padStart(2, "0");


    /* Crear botón */

    const celda =
        document.createElement("button");


    celda.classList.add("numero");


    /* Guardamos el número */

    celda.dataset.numero = numero;


    /* ========================================= */
    /* BUSCAR ESTADO GUARDADO */
    /* ========================================= */

    const estadoActual =
        numerosGuardados[numero]
        || "disponible";


    aplicarEstado(
        celda,
        estadoActual
    );


    /* ========================================= */
    /* CLICK */
/* ========================================= */

    celda.addEventListener(
        "click",
        function () {

            cambiarEstado(
                celda,
                numero
            );

        }
    );


    /* Agregar al tablero */

    container.appendChild(celda);

}



/* ============================================= */
/* CAMBIAR ESTADO */
/* ============================================= */

function cambiarEstado(celda, numero) {


    /* Estado actual */

    let estadoActual =
        celda.dataset.estado;


    /* Buscar posición */

    let posicion =
        estados.indexOf(estadoActual);


    /* Siguiente estado */

    posicion++;


    /* Si llega al final vuelve al principio */

    if (posicion >= estados.length) {

        posicion = 0;

    }


    const nuevoEstado =
        estados[posicion];


    /* Aplicar visualmente */

    aplicarEstado(
        celda,
        nuevoEstado
    );


    /* Guardar */

    numerosGuardados[numero] =
        nuevoEstado;


    guardarDatos();

}



/* ============================================= */
/* APLICAR ESTADO AL NÚMERO */
/* ============================================= */

function aplicarEstado(celda, estado) {


    /* Quitar estados anteriores */

    celda.classList.remove(
        "estado-disponible",
        "estado-apartado",
        "estado-pagado"
    );


    /* Agregar estado nuevo */

    celda.classList.add(
        "estado-" + estado
    );


    /* Guardarlo en el elemento */

    celda.dataset.estado = estado;

}



/* ============================================= */
/* GUARDAR EN EL NAVEGADOR */
/* ============================================= */

function guardarDatos() {

    localStorage.setItem(

        "rifaEstados",

        JSON.stringify(
            numerosGuardados
        )

    );

}



/* ============================================= */
/* REINICIAR TODOS LOS NÚMEROS */
/* ============================================= */

document
    .getElementById("reiniciar")
    .addEventListener(
        "click",
        function () {


            const confirmar =
                confirm(
                    "¿Seguro que deseas poner todos los números disponibles?"
                );


            if (!confirmar) {

                return;

            }


            /* Borrar memoria */

            localStorage.removeItem(
                "rifaEstados"
            );


            numerosGuardados = {};


            /* Cambiar todos visualmente */

            document
                .querySelectorAll(".numero")
                .forEach(
                    function (celda) {

                        aplicarEstado(
                            celda,
                            "disponible"
                        );

                    }
                );

        }
    );
