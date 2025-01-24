/************************************ 
 * MANEJO DE PASOS Y BARRA DE PROGRESO
 ************************************/
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.querySelector(".progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

/* Botón Siguiente */
nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Evitamos navegación
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

/* Botón Atrás */
prevBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

/* Actualiza la visualización de los pasos del formulario */
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.remove("form-step-active");
  });
  formSteps[formStepsNum].classList.add("form-step-active");
}

/* Actualiza la barra de progreso */
function updateProgressbar() {
  progressSteps.forEach((progressStep, index) => {
    if (index <= formStepsNum) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });
  // Calcula el ancho de la barra según el paso actual
  progress.style.width =
    (formStepsNum / (progressSteps.length - 1)) * 100 + "%";
}

/************************************
 * CAPTURAR DATOS Y MOSTRAR MODAL DE CONFIRMACIÓN
 ************************************/
const btnShowModal = document.getElementById("btnShowModal");
const myModal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modal-body");

// Al dar clic en “Mostrar Resumen”, recopilamos datos y mostramos el modal
btnShowModal.addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  // Generar HTML con el resumen
  let resumenHTML = `
    <p><strong>Nombre Niño:</strong> ${datos.nombre} ${datos.apellido}</p>
    <p><strong>DNI Niño:</strong> ${datos.dni}</p>
    <p><strong>Fecha Nac.:</strong> ${datos.fechaNacimiento}</p>
    <hr>
    <p><strong>Alérgico a alimentos:</strong> ${datos.alergiaAlimentos}</p>
    <p><strong>Alérgico a medicamentos:</strong> ${datos.alergiaMedicamentos}</p>
    <p><strong>Medicamento actual:</strong> ${datos.medicamentoActual}</p>
    <p><strong>Contacto emergencia:</strong> ${datos.contactoEmergencia}</p>
    <p><strong>Tel. emergencia:</strong> ${datos.telefonoEmergencia}</p>
    <hr>
    <p><strong>Forma de pago:</strong> ${datos.formaPago}</p>
    <hr>
    <p><strong>Responsable:</strong> ${datos.nombreResp} ${datos.apellidosResp}</p>
    <p><strong>DNI Responsable:</strong> ${datos.dniResp}</p>
    <p><strong>Tel. Responsable:</strong> ${datos.telefonoResp}</p>
    <p><strong>Relacion con Niño:</strong> ${datos.relacionResp}</p>
  `;
  modalBody.innerHTML = resumenHTML;
  myModal.style.display = "block";
});

// Cerrar modal al hacer clic en la X
closeModal.addEventListener("click", () => {
  myModal.style.display = "none";
});

/* Si deseas cerrar modal haciendo clic fuera del contenido */
window.addEventListener("click", (event) => {
  if (event.target === myModal) {
    myModal.style.display = "none";
  }
});

/************************************
 * FUNCIÓN PARA OBTENER DATOS DEL FORMULARIO
 ************************************/
function obtenerDatosFormulario() {
  let nombre = document.getElementById("firstName").value.trim();
  let apellido = document.getElementById("lastName").value.trim();
  let dni = document.getElementById("dni").value.trim();
  let fechaNacimiento = document.getElementById("dob").value.trim();

  let alergiaAlimentos = document.getElementById("allergy-food").value.trim();
  let alergiaMedicamentos = document.getElementById("allergy-medicine").value.trim();
  let medicamentoActual = document.getElementById("medicine").value.trim();
  let contactoEmergencia = document.getElementById("username-contact-emergency").value.trim();
  let telefonoEmergencia = document.getElementById("phone-contact-emergency").value.trim();

  // Forma de pago
  let formaPago = "";
  const formaPagoSeleccionada = document.querySelector('input[name="formaPago"]:checked');
  if (formaPagoSeleccionada) {
    formaPago = formaPagoSeleccionada.id;
  }

  let nombreResp = document.getElementById("NombreResp").value.trim();
  let apellidosResp = document.getElementById("ApellidosResp").value.trim();
  let dniResp = document.getElementById("dniResp").value.trim();
  let telefonoResp = document.getElementById("TelefonoResp").value.trim();
  let relacionResp = document.getElementById("relacionResp").value.trim();

  return {
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    alergiaAlimentos,
    alergiaMedicamentos,
    medicamentoActual,
    contactoEmergencia,
    telefonoEmergencia,
    formaPago,
    nombreResp,
    apellidosResp,
    dniResp,
    telefonoResp,
    relacionResp,
  };
}

/************************************
 * GUARDAR INFORMACIÓN (AJAX)
 ************************************/
const btnGuardarDatos = document.getElementById("btnGuardarDatos");
btnGuardarDatos.addEventListener("click", () => {
  const datos = obtenerDatosFormulario();

  // Validar campos mínimos del lado del cliente
  if (!datos.dni || !datos.nombre || !datos.apellido || !datos.fechaNacimiento) {
    alert("Faltan campos obligatorios del niño.");
    return;
  }
  if (!datos.formaPago) {
    alert("Seleccione una forma de pago.");
    return;
  }
  if (!datos.dniResp) {
    alert("Falta DNI del responsable.");
    return;
  }

  // Petición AJAX (Fetch) a nuestro PHP
  fetch("../server/registrar_participante.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((respData) => {
      if (respData.success) {
        alert("¡Datos almacenados correctamente!");
        // Cerrar modal
        myModal.style.display = "none";
        // (Opcional) Redirigir a otra página
        // window.location.href = "gracias.html";
      } else {
        alert("Error al guardar: " + (respData.error || "Desconocido"));
      }
    })
    .catch((err) => {
      console.error("Error de fetch:", err);
      alert("Ocurrió un error en la comunicación con el servidor.");
    });
});
