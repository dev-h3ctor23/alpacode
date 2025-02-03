document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".navbar-menu a[data-section]");
    const sections = document.querySelectorAll(".section");

    // Mostrar la primera sección por defecto
    sections[0].classList.add("active");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove("active"));

            // Remover clase activa de todos los enlaces
            menuLinks.forEach(menu => menu.classList.remove("active"));

            // Mostrar la sección correspondiente
            const targetSection = document.getElementById(link.dataset.section);
            if (targetSection) {
                targetSection.classList.add("active");
            }

            // Resaltar el enlace activo
            link.classList.add("active");
        });
    });

    // Manejo del submenú de "Grupos"
    const menuToggle = document.querySelector(".menu-toggle");
    const submenu = document.querySelector(".submenu");

    menuToggle.addEventListener("click", (event) => {
        event.preventDefault();
        submenu.style.display = submenu.style.display === "flex" ? "none" : "flex";
    });
});


document.getElementById("menuBtn").addEventListener("click", function() {
    let sidebar = document.querySelector(".sidebar");
    let content = document.querySelector(".content");

    sidebar.classList.toggle("hidden");

    if (sidebar.classList.contains("hidden")) {
        content.style.marginLeft = "-270px";
        content.style.width = "100%";
    } else {
        content.style.marginLeft = "0";
        content.style.width = "calc(100% - 270px)";
    }
});



// ASISTENCIA
// Datos predeterminados con los integrantes de cada grupo
const groupMembersData = {
    1: ['Juan Pérez', 'Maria García', 'Pedro López'],
    2: ['Ana Sánchez', 'Luis Gómez', 'Carlos Fernández'],
    3: ['Sofia Rodríguez', 'Tomás Ruiz', 'Luis Díaz'],
};

// Obtener los elementos del DOM
const groupSelect = document.getElementById('group');
const groupMembersContainer = document.getElementById('groupMembers');

// Función para mostrar los miembros del grupo seleccionado en la tabla
function showGroupMembers() {
    // Obtenemos el grupo seleccionado
    const selectedGroup = groupSelect.value;
    
    // Limpiamos la tabla antes de agregar nuevos miembros
    groupMembersContainer.innerHTML = '';

    // Comprobamos si hay miembros para el grupo seleccionado
    if (groupMembersData[selectedGroup]) {
        groupMembersData[selectedGroup].forEach(member => {
            // Creamos una fila de la tabla para cada miembro
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = member;

            const attendedCell = document.createElement('td');
            const attendedCheckbox = document.createElement('input');
            attendedCheckbox.type = 'checkbox';
            attendedCheckbox.name = `attendance_${member}`;
            attendedCell.appendChild(attendedCheckbox);

            const absentCell = document.createElement('td');
            const absentCheckbox = document.createElement('input');
            absentCheckbox.type = 'checkbox';
            absentCheckbox.name = `attendance_${member}`;
            absentCell.appendChild(absentCheckbox);

            row.appendChild(nameCell);
            row.appendChild(attendedCell);
            row.appendChild(absentCell);

            groupMembersContainer.appendChild(row);

            // funcionalidad para que no se puedan seleccionar ambos checkboxes
            attendedCheckbox.addEventListener('change', function() {
                if (attendedCheckbox.checked) {
                    absentCheckbox.checked = false; // Desmarcar el otro
                }
            });

            absentCheckbox.addEventListener('change', function() {
                if (absentCheckbox.checked) {
                    attendedCheckbox.checked = false; // Desmarcar el otro
                }
            });
        });
    }
}

// Evento para cuando el usuario seleccione un grupo
groupSelect.addEventListener('change', showGroupMembers);

// Función para manejar el envío del formulario
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí se procesa la asistencia. Por ejemplo, mostramos en consola.
    const formData = new FormData(this);

    formData.forEach((value, key) => {
        console.log(key, value); // Imprime el nombre del miembro y su estado de asistencia
    });

    alert('Asistencia guardada!');
});

// Llamamos a la función para mostrar los miembros cuando cargue la página
showGroupMembers();
