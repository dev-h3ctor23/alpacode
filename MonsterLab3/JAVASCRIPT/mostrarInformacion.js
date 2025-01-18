// Función para mostrar los participantes en la página
function mostrarParticipantes() {
    let listaDiv = document.getElementById('participantes-lista');

    // Limpiar la lista antes de mostrarla
    listaDiv.innerHTML = '';

    // Recorrer el array de participantes y mostrar la información
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
            <button onclick="editarParticipante(${index})">Editar</button>
        `;
        listaDiv.appendChild(participanteDiv);
    });
}

// Función para editar los datos de un participante
function editarParticipante(index) {
    let participante = participantes[index];

    // Cargar los datos en los campos de edición
    document.getElementById('firstName').value = participante.nombre;
    document.getElementById('lastName').value = participante.apellido;
    document.getElementById('curso').value = participante.curso;
    document.getElementById('dob').value = participante.fechaNacimiento;
    document.getElementById('allergy-food').value = participante.alergiaAlimentos;
    document.getElementById('allergy-medicine').value = participante.alergiaMedicamentos;
    document.getElementById('medicine').value = participante.medicamentoActual;
    document.getElementById('username-contact-emergency').value = participante.contactoEmergencia;
    document.getElementById('phone-contact-emergency').value = participante.telefonoEmergencia;

    // Eliminar el participante de la lista antes de actualizarlo
    participantes.splice(index, 1);
}

// Cargar la lista de participantes al cargar la página
window.onload = mostrarParticipantes;
