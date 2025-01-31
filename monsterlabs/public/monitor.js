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
});
