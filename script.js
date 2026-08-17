/* ============================================ */
/* CONTENEDOR DE LOS NÚMEROS */
/* ============================================ */

const container =
    document.getElementById("numbersContainer");


/* ============================================ */
/* CREAR NÚMEROS DEL 00 AL 99 */
/* ============================================ */

for (let i = 0; i < 100; i++) {

    /*
       Formato:

       0  -> 00
       1  -> 01
       9  -> 09
       10 -> 10
       99 -> 99
    */

    const numero =
        i.toString().padStart(2, "0");


    /*
       Crear una casilla invisible
       encima del número original
       de la imagen.
    */

    const celda =
        document.createElement("div");


    /*
       Ejemplo:

       Número 13 tendrá:

       numero
       num-13
    */

    celda.classList.add(
        "numero",
        `num-${numero}`
    );


    /*
       Agregar la casilla
       a la cuadrícula.
    */

    container.appendChild(celda);

}
