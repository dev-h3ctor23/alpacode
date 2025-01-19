const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.querySelector(".progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

/* Event Listener para boton siguiente */
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

/* Event Listener para boton atras */
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

/* siguiente y atras */
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });
  formSteps[formStepsNum].classList.add("form-step-active");
}

/* barra de progreso */
function updateProgressbar() {
  progressSteps.forEach((progressStep, index) => {
    if (index < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });
  progress.style.width =
    (formStepsNum / (progressSteps.length - 1)) * 100 + "%";
}

document.addEventListener("DOMContentLoaded", () => {
  const mensajesValidacion = {
    required: "Este campo es obligatorio.",
    email: "Por favor, ingrese un correo electrónico válido.",
    tel: "Por favor, ingrese un número de teléfono válido.",
  };

  function mostrarMensajeDeValidacion(entrada, mensaje) {
    let elementoMensaje = entrada.nextElementSibling;
    if (
      !elementoMensaje ||
      !elementoMensaje.classList.contains("validation-message")
    ) {
      elementoMensaje = document.createElement("span");
      elementoMensaje.classList.add("validation-message");
      entrada.parentNode.appendChild(elementoMensaje);
    }
    elementoMensaje.textContent = mensaje;
    entrada.classList.add("invalid");
  }

  function limpiarMensajeDeValidacion(entrada) {
    const elementoMensaje = entrada.nextElementSibling;
    if (
      elementoMensaje &&
      elementoMensaje.classList.contains("validation-message")
    ) {
      elementoMensaje.textContent = "";
    }
    entrada.classList.remove("invalid");
  }

  function validarEntrada(entrada) {
    const valor = entrada.value.trim();
    const tipo = entrada.type;

    limpiarMensajeDeValidacion(entrada);

    if (!valor) {
      mostrarMensajeDeValidacion(entrada, mensajesValidacion.required);
      return false;
    }

    if (tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      mostrarMensajeDeValidacion(entrada, mensajesValidacion.email);
      return false;
    }

    if (tipo === "tel" && !/^\+?[0-9]{7,15}$/.test(valor)) {
      mostrarMensajeDeValidacion(entrada, mensajesValidacion.tel);
      return false;
    }

    return true;
  }

  const entradas = document.querySelectorAll(".form input, .form textarea");
  entradas.forEach((entrada) => {
    entrada.addEventListener("blur", () => validarEntrada(entrada));
  });

  function enfocarEnPrimeraEntradaInvalida() {
    const entradasInvalidas = document.querySelectorAll(".invalid");
    if (entradasInvalidas.length > 0) {
      entradasInvalidas[0].focus();
    }
  }

  botonesNext.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!validarPaso()) {
        e.preventDefault();
        enfocarEnPrimeraEntradaInvalida();
      }
    });
  });

  const botonEnviar = document.querySelector('input[type="submit"]');
  botonEnviar.addEventListener("click", (e) => {
    let todoValido = true;

    pasosFormulario.forEach((paso) => {
      const entradas = paso.querySelectorAll("input, textarea");
      entradas.forEach((entrada) => {
        if (!validarEntrada(entrada)) {
          todoValido = false;
        }
      });
    });

    if (!todoValido) {
      e.preventDefault();
      enfocarEnPrimeraEntradaInvalida();
    }
  });
});

//Almanesamiento de datos del participante / tutores legales, BBDD
// Array donde se almacenarán los datos de los participantes
let participantes = [];

// Función para registrar los datos del formulario
function registrarParticipante(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtener los valores de los campos del formulario
  let nombre = document.getElementById("firstName").value;
  let apellido = document.getElementById("lastName").value;
  let curso = document.getElementById("curso").value;
  let fechaNacimiento = document.getElementById("dob").value;
  let alergiaAlimentos = document.getElementById("allergy-food").value;
  let alergiaMedicamentos = document.getElementById("allergy-medicine").value;
  let medicamentoActual = document.getElementById("medicine").value;
  let contactoEmergencia = document.getElementById(
    "username-contact-emergency"
  ).value;
  let telefonoEmergencia = document.getElementById(
    "phone-contact-emergency"
  ).value;

  // Crear un objeto con los datos
  let participante = {
    nombre,
    apellido,
    curso,
    fechaNacimiento,
    alergiaAlimentos,
    alergiaMedicamentos,
    medicamentoActual,
    contactoEmergencia,
    telefonoEmergencia,
  };

  // Almacenar el objeto en el array
  participantes.push(participante);

  console.log(participantes); // Imprimir los datos en la consola
}

// Evento para cuando se envía el formulario
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe y redirija

  // Llama a la función para registrar al participante
  registrarParticipante(event);

  // mostrar mensaje
  const mensaje = document.getElementById("message-register");
  mensaje.textContent = "Registro completado";
  mensaje.style.textAlign = "center";

  // DOM
  //const formulario = document.getElementById("registrationForm");
  //formulario.appendChild(mensaje);  // esto el mensaje al final del formulario
});


document
  .getElementById("MostrarParticipante")
  .addEventListener("click", function () {
    // Redirige a la página de mostrar información
    window.location.href = "../HTML/mostrarInformacion.html";
  });

document.getElementById("VolverInicio").addEventListener("click", function () {
  // Redirige a la página de inicio
  window.location.href = "../HTML/login.html";
});
