/* Obtención del contenedor donde se mostrarán los números */
const container = document.getElementById('numbersContainer');

document.addEventListener("DOMContentLoaded", function () {
    const carteraImg = document.querySelector(".cartera-img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const close = document.querySelector(".close");

    // Asegura que el popup está oculto al cargar la página
    popup.style.display = "none";

    // Muestra el popup al hacer clic en la imagen
    carteraImg.addEventListener("click", function () {
        popup.style.display = "flex";
        popupImg.src = this.src;
    });

    // Cierra el popup al hacer clic en la 'X'
    close.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Cierra el popup al hacer clic fuera de la imagen
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});

/* Bucle para crear 100 números (del 00 al 99) */
for (let i = 0; i < 100; i++) {
    let num = i.toString().padStart(2, '0'); /* Formateo del número con dos dígitos */
    let div = document.createElement('div'); /* Creamos un div para cada número */
    div.classList.add('number', `num-${num}`); /* Asignamos la clase 'number' y la clase específica para el número */
    div.textContent = num; /* Establecemos el texto dentro del div */
    
    /* Añadimos el div con el número al contenedor */
    container.appendChild(div);
}

