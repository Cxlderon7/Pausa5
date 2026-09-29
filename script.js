// ======================================
// CONFIGURACIÓN DE PAUSA5
// ======================================

// Cada ejercicio dura 60 segundos.
// Para probar rápidamente puedes cambiar 60 por 5.
// Después vuelve a poner 60.

const DURACION_EJERCICIO = 60;


// Número de WhatsApp
// Sin +, espacios ni guiones.

const NUMERO_WHATSAPP = "56932594691";


// ======================================
// EJERCICIOS
// ======================================

const ejercicios = [
    {
        nombre: "Marcha en el lugar",
        emoji: "🚶",
        descripcion:
            "Mueve suavemente brazos y piernas para comenzar a activar tu cuerpo."
    },

    {
        nombre: "Sentadillas suaves",
        emoji: "🏋️",
        descripcion:
            "Realiza sentadillas controladas y mantén una postura cómoda."
    },

    {
        nombre: "Movilidad de hombros",
        emoji: "🙆",
        descripcion:
            "Haz círculos suaves con los hombros y mueve los brazos lentamente."
    },

    {
        nombre: "Elevación de rodillas",
        emoji: "🦵",
        descripcion:
            "Alterna las rodillas manteniendo un ritmo que te resulte cómodo."
    },

    {
        nombre: "Respiración y estiramiento",
        emoji: "🧘",
        descripcion:
            "Estira suavemente el cuerpo y termina respirando de manera tranquila."
    }
];


// ======================================
// ELEMENTOS HTML
// ======================================

const panelRutina =
    document.getElementById("panelRutina");

const rutinaCard =
    document.querySelector(".rutina-card");

const botonesComenzar =
    document.querySelectorAll(".iniciar-rutina");

const cerrarRutina =
    document.getElementById("cerrarRutina");

const progresoTexto =
    document.getElementById("progresoTexto");

const emojiRutina =
    document.getElementById("emojiRutina");

const nombreEjercicio =
    document.getElementById("nombreEjercicio");

const descripcionEjercicio =
    document.getElementById("descripcionEjercicio");

const temporizador =
    document.getElementById("temporizador");

const barraProgreso =
    document.getElementById("barraProgreso");

const mensajeTiempo =
    document.getElementById("mensajeTiempo");

const botonPausar =
    document.getElementById("botonPausar");

const botonSiguiente =
    document.getElementById("botonSiguiente");


// CONTACTO

const botonDudas =
    document.getElementById("botonDudas");

const cajaDudas =
    document.getElementById("cajaDudas");

const cerrarDudas =
    document.getElementById("cerrarDudas");

const abrirWhatsapp =
    document.getElementById("abrirWhatsapp");


// ======================================
// VARIABLES DE LA RUTINA
// ======================================

let ejercicioActual = 0;

let tiempoRestante = DURACION_EJERCICIO;

let intervalo = null;

let estaPausado = false;

let rutinaTerminada = false;


// ======================================
// ABRIR RUTINA
// ======================================

botonesComenzar.forEach((boton) => {

    boton.addEventListener("click", () => {

        iniciarRutina();

    });

});


function iniciarRutina() {

    clearInterval(intervalo);

    ejercicioActual = 0;

    rutinaTerminada = false;

    estaPausado = false;

    rutinaCard.classList.remove("completada");

    botonPausar.style.display = "block";

    botonPausar.textContent = "⏸ Pausar";

    botonSiguiente.textContent = "Siguiente →";

    panelRutina.classList.add("activo");

    document.body.classList.add("modal-abierto");

    cargarEjercicio();

}


// ======================================
// CARGAR EJERCICIO
// ======================================

function cargarEjercicio() {

    clearInterval(intervalo);

    estaPausado = false;

    tiempoRestante = DURACION_EJERCICIO;

    const ejercicio =
        ejercicios[ejercicioActual];

    progresoTexto.textContent =
        `Ejercicio ${ejercicioActual + 1} de ${ejercicios.length}`;

    emojiRutina.textContent =
        ejercicio.emoji;

    nombreEjercicio.textContent =
        ejercicio.nombre;

    descripcionEjercicio.textContent =
        ejercicio.descripcion;

    mensajeTiempo.textContent =
        "Ve a tu propio ritmo 💚";

    botonPausar.textContent =
        "⏸ Pausar";

    actualizarTemporizador();

    actualizarBarra();


    intervalo = setInterval(() => {

        if (estaPausado) {
            return;
        }

        tiempoRestante--;

        actualizarTemporizador();

        actualizarBarra();


        if (tiempoRestante <= 0) {

            clearInterval(intervalo);

            avanzarEjercicio();

        }

    }, 1000);

}


// ======================================
// ACTUALIZAR RELOJ
// ======================================

function actualizarTemporizador() {

    const minutos =
        Math.floor(tiempoRestante / 60);

    const segundos =
        tiempoRestante % 60;

    const minutosTexto =
        minutos.toString().padStart(2, "0");

    const segundosTexto =
        segundos.toString().padStart(2, "0");

    temporizador.textContent =
        `${minutosTexto}:${segundosTexto}`;

}


// ======================================
// BARRA DE PROGRESO
// ======================================

function actualizarBarra() {

    const tiempoTranscurrido =
        DURACION_EJERCICIO - tiempoRestante;

    const porcentaje =
        (tiempoTranscurrido / DURACION_EJERCICIO) * 100;

    barraProgreso.style.width =
        `${porcentaje}%`;

}


// ======================================
// PAUSAR / CONTINUAR
// ======================================

botonPausar.addEventListener("click", () => {

    estaPausado = !estaPausado;


    if (estaPausado) {

        botonPausar.textContent =
            "▶ Continuar";

        mensajeTiempo.textContent =
            "Rutina pausada";

    }

    else {

        botonPausar.textContent =
            "⏸ Pausar";

        mensajeTiempo.textContent =
            "Ve a tu propio ritmo 💚";

    }

});


// ======================================
// BOTÓN SIGUIENTE
// ======================================

botonSiguiente.addEventListener("click", () => {

    if (rutinaTerminada) {

        iniciarRutina();

        return;

    }

    avanzarEjercicio();

});


// ======================================
// AVANZAR EJERCICIO
// ======================================

function avanzarEjercicio() {

    clearInterval(intervalo);

    if (ejercicioActual < ejercicios.length - 1) {

        ejercicioActual++;

        cargarEjercicio();

    }

    else {

        completarRutina();

    }

}


// ======================================
// COMPLETAR RUTINA
// ======================================

function completarRutina() {

    clearInterval(intervalo);

    rutinaTerminada = true;

    rutinaCard.classList.add("completada");

    progresoTexto.textContent =
        "¡Pausa5 completada!";

    emojiRutina.textContent =
        "🎉";

    nombreEjercicio.textContent =
        "¡Excelente trabajo!";

    descripcionEjercicio.textContent =
        "Terminaste tus 5 minutos. Ahora puedes volver a tus actividades.";

    temporizador.textContent =
        "✓";

    barraProgreso.style.width =
        "100%";

    mensajeTiempo.textContent =
        "Te regalaste 5 minutos para ti 💚";

    botonPausar.style.display =
        "none";

    botonSiguiente.textContent =
        "↻ Repetir rutina";

}


// ======================================
// CERRAR RUTINA
// ======================================

function cerrarPanelRutina() {

    clearInterval(intervalo);

    panelRutina.classList.remove("activo");

    document.body.classList.remove("modal-abierto");

}


cerrarRutina.addEventListener(
    "click",
    cerrarPanelRutina
);


// Cerrar haciendo clic fuera de la tarjeta

panelRutina.addEventListener("click", (evento) => {

    if (evento.target === panelRutina) {

        cerrarPanelRutina();

    }

});


// Cerrar con ESC

document.addEventListener("keydown", (evento) => {

    if (
        evento.key === "Escape" &&
        panelRutina.classList.contains("activo")
    ) {

        cerrarPanelRutina();

    }

});


// ======================================
// VENTANA DE DUDAS
// ======================================

botonDudas.addEventListener("click", () => {

    cajaDudas.classList.toggle("activo");

});


cerrarDudas.addEventListener("click", () => {

    cajaDudas.classList.remove("activo");

});


// ======================================
// WHATSAPP
// ======================================

abrirWhatsapp.addEventListener("click", () => {

    if (NUMERO_WHATSAPP === "") {

        alert(
            "Primero debes agregar tu número de WhatsApp dentro de script.js."
        );

        return;

    }


    const mensaje =
        encodeURIComponent(
            "Hola, tengo una duda sobre Pausa5."
        );


    const enlace =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;


    window.open(
        enlace,
        "_blank",
        "noopener,noreferrer"
    );

});