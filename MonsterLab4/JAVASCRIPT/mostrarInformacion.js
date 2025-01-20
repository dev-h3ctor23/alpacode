// Función para mostrar los participantes en la página
function mostrarParticipantes() {
    let listaDiv = document.getElementById('participantes-lista');
    let formularioDiv = document.getElementById('formulario-edicion');

    formularioDiv.classList.add('hidden');
    listaDiv.classList.remove('hidden');

    listaDiv.innerHTML = '';

    participantes.forEach((participante, index) => {
        let participanteDiv = document.createElement('div');
        participanteDiv.classList.add('participante');

        participanteDiv.innerHTML = `
            <h3>Participante ${index + 1}</h3>
            <p><strong>Nombre:</strong> ${participante.nombre}</p>
            <p><strong>Apellido:</strong> ${participante.apellido}</p>
            <p><strong>Curso:</strong> ${participante.curso}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${participante.fechaNacimiento}</p>
            <p><strong>Alergia a alimentos:</strong> ${participante.alergiaAlimentos}</p>
            <p><strong>Alergia a medicamentos:</strong> ${participante.alergiaMedicamentos}</p>
            <p><strong>Medicamentos actuales:</strong> ${participante.medicamentoActual}</p>
            <p><strong>Contacto de emergencia:</strong> ${participante.contactoEmergencia}</p>
            <p><strong>Teléfono de emergencia:</strong> ${participante.telefonoEmergencia}</p>
            <p><strong>Nombre del Padre/Madre:</strong> ${participante.nombrePadreMadre}</p>
            <p><strong>Apellidos del Padre/Madre:</strong> ${participante.apellidosPadreMadre}</p>
            <p><strong>Email del Padre/Madre:</strong> ${participante.emailPadreMadre}</p>
            <p><strong>Teléfono del Padre/Madre:</strong> ${participante.telefonoPadreMadre}</p>
            <p><strong>Forma de Pago:</strong> ${participante.formaPago}</p>
            <p><strong>Nombre del Responsable de Recogida:</strong> ${participante.nombreResponsable}</p>
            <p><strong>Apellidos del Responsable de Recogida:</strong> ${participante.apellidosResponsable}</p>
            <p><strong>Email del Responsable de Recogida:</strong> ${participante.emailResponsable}</p>
            <p><strong>Teléfono del Responsable de Recogida:</strong> ${participante.telefonoResponsable}</p>
            <button onclick="editarParticipante(${index})">Editar</button>
        `;
        listaDiv.appendChild(participanteDiv);
    });
}

let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

function editarParticipante(index) {
    let participante = participantes[index];

    let formularioDiv = document.getElementById('formulario-edicion');
    if (!formularioDiv) {
        console.error("El contenedor para el formulario de edición no se encuentra.");
        return;
    }

    document.getElementById('participantes-lista').classList.add('hidden');
    formularioDiv.classList.remove('hidden');

    let formulario = `  
        <h3>Editar Participante</h3>
        <label for="nombre">Nombre: <input type="text" id="nombre" value="${participante.nombre}" /></label><br/>
        <label for="apellido">Apellido: <input type="text" id="apellido" value="${participante.apellido}" /></label><br/>
        <label for="curso">Curso: <input type="text" id="curso" value="${participante.curso}" /></label><br/>
        <label for="fechaNacimiento">Fecha de Nacimiento: <input type="date" id="fechaNacimiento" value="${participante.fechaNacimiento}" /></label><br/>
        <label for="alergiaAlimentos">Alergia a alimentos: <input type="text" id="alergiaAlimentos" value="${participante.alergiaAlimentos}" /></label><br/>
        <label for="alergiaMedicamentos">Alergia a medicamentos: <input type="text" id="alergiaMedicamentos" value="${participante.alergiaMedicamentos}" /></label><br/>
        <label for="medicamentoActual">Medicamentos actuales: <input type="text" id="medicamentoActual" value="${participante.medicamentoActual}" /></label><br/>
        <label for="contactoEmergencia">Contacto de emergencia: <input type="text" id="contactoEmergencia" value="${participante.contactoEmergencia}" /></label><br/>
        <label for="telefonoEmergencia">Teléfono de emergencia: <input type="tel" id="telefonoEmergencia" value="${participante.telefonoEmergencia}" /></label><br/>
        <label for="nombrePadreMadre">Nombre del Padre/Madre: <input type="text" id="nombrePadreMadre" value="${participante.nombrePadreMadre}" /></label><br/>
        <label for="apellidosPadreMadre">Apellidos del Padre/Madre: <input type="text" id="apellidosPadreMadre" value="${participante.apellidosPadreMadre}" /></label><br/>
        <label for="emailPadreMadre">Email del Padre/Madre: <input type="email" id="emailPadreMadre" value="${participante.emailPadreMadre}" /></label><br/>
        <label for="telefonoPadreMadre">Teléfono del Padre/Madre: <input type="tel" id="telefonoPadreMadre" value="${participante.telefonoPadreMadre}" /></label><br/>
        <label for="formaPago">Forma de Pago: <input type="text" id="formaPago" value="${participante.formaPago}" /></label><br/>
        <label for="nombreResponsable">Nombre del Responsable de Recogida: <input type="text" id="nombreResponsable" value="${participante.nombreResponsable}" /></label><br/>
        <label for="apellidosResponsable">Apellidos del Responsable de Recogida: <input type="text" id="apellidosResponsable" value="${participante.apellidosResponsable}" /></label><br/>
        <label for="emailResponsable">Email del Responsable de Recogida: <input type="email" id="emailResponsable" value="${participante.emailResponsable}" /></label><br/>
        <label for="telefonoResponsable">Teléfono del Responsable de Recogida: <input type="tel" id="telefonoResponsable" value="${participante.telefonoResponsable}" /></label><br/>
        <button onclick="guardarCambios(${index})">Guardar Cambios</button>
    `;

    formularioDiv.innerHTML = formulario;

    // Agregar validaciones a los inputs
    const inputs = formularioDiv.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            let mensajeError = document.createElement('div');
            mensajeError.classList.add('error-message');

            //  obtener el nombre del campo
            const label = formularioDiv.querySelector(`label[for="${input.id}"]`);
            const labelText = label ? label.innerText.replace(':', '') : 'Este campo';

            if (input.value.trim() === '') {
                mensajeError.textContent = `Este campo no puede estar vacío.`;
                input.parentElement.insertBefore(mensajeError, input);
            } else {
                if (input.parentElement.contains(mensajeError)) {
                    input.parentElement.removeChild(mensajeError);
                }
            }
        });
    });
}

function guardarCambios(index) {
    let participante = participantes[index];

    // Recoger todos los inputs del formulario
    const inputs = document.querySelectorAll('#formulario-edicion input');
    let camposVacios = false;

    // Verificar si algún campo está vacío
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            camposVacios = true;
        }
    });

    // Si hay campos vacíos, mostrar el mensaje de error
    if (camposVacios) {
        let mensajeError = document.createElement('div');
        mensajeError.classList.add('error-message');
        mensajeError.textContent = "Faltan campos por completar";
        
        // Colocar el mensaje de error debajo del botón "Guardar Cambios"
        const formularioDiv = document.getElementById('formulario-edicion');
        const botonGuardar = formularioDiv.querySelector('button');
        if (!formularioDiv.contains(mensajeError)) {
            formularioDiv.insertBefore(mensajeError, botonGuardar.nextSibling);
        }

        return; // No guardar cambios si faltan campos por completar
    }

    // Guardar cambios si no hay campos vacíos
    participante.nombre = document.getElementById('nombre').value;
    participante.apellido = document.getElementById('apellido').value;
    participante.curso = document.getElementById('curso').value;
    participante.fechaNacimiento = document.getElementById('fechaNacimiento').value;
    participante.alergiaAlimentos = document.getElementById('alergiaAlimentos').value;
    participante.alergiaMedicamentos = document.getElementById('alergiaMedicamentos').value;
    participante.medicamentoActual = document.getElementById('medicamentoActual').value;
    participante.contactoEmergencia = document.getElementById('contactoEmergencia').value;
    participante.telefonoEmergencia = document.getElementById('telefonoEmergencia').value;
    participante.nombrePadreMadre = document.getElementById('nombrePadreMadre').value;
    participante.apellidosPadreMadre = document.getElementById('apellidosPadreMadre').value;
    participante.emailPadreMadre = document.getElementById('emailPadreMadre').value;
    participante.telefonoPadreMadre = document.getElementById('telefonoPadreMadre').value;
    participante.formaPago = document.getElementById('formaPago').value;
    participante.nombreResponsable = document.getElementById('nombreResponsable').value;
    participante.apellidosResponsable = document.getElementById('apellidosResponsable').value;
    participante.emailResponsable = document.getElementById('emailResponsable').value;
    participante.telefonoResponsable = document.getElementById('telefonoResponsable').value;

    participantes[index] = participante;
    localStorage.setItem("participantes", JSON.stringify(participantes));

    mostrarParticipantes();
    document.getElementById('formulario-edicion').innerHTML = '';
}


window.onload = mostrarParticipantes;
