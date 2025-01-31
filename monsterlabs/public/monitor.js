document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".navbar-menu a[data-section]");
    const sections = document.querySelectorAll(".section");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Ocultar todas las secciones
            sections.forEach(section => section.style.display = "none");

            // Mostrar la sección correspondiente
            const targetSection = document.getElementById(link.dataset.section);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });
});
