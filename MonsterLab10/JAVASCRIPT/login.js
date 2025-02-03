// =========== MOSTRAR/OCULTAR MENÚ (ejemplo) ===========
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("show");
}

// =========== TOGGLE ENTRE FORMULARIOS ===========
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

document.getElementById("reg").addEventListener("click", function() {
    window.location.href = "../HTML/registroParticipante.html";
});

// =========== OBTENER REFERENCIAS A CAMPOS Y SPANS DE ERROR ===========

// Login
const loginForm = document.querySelector(".sign-in-form");
const nameInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const nameError = document.getElementById("name-error");
const passwordError = document.getElementById("password-error");
const userFieldDiv = nameInput.closest(".input-field");
const passwordFieldDiv = passwordInput.closest(".input-field");
const loginMessage = document.getElementById("login-message");

// Registro
const registerForm = document.querySelector(".sign-up-form");
const nameInputRegister = document.getElementById("user-register");
const emailInput = document.getElementById("email");
const passwordInputRegister = document.getElementById("password-register");
const nameErrorRegister = document.getElementById("name-error-register");
const emailError = document.getElementById("email-error");
const passwordErrorRegister = document.getElementById("password-error-register");
const userRegisterFieldDiv = nameInputRegister.closest(".input-field");
const emailFieldDiv = emailInput.closest(".input-field");
const passwordRegisterFieldDiv = passwordInputRegister.closest(".input-field");
const registerMessage = document.getElementById("register-message");

// Campos adicionales de Registro
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const dniInput = document.getElementById("dni");
const telefonoInput = document.getElementById("telefono");

const nombreErrorRegister = document.getElementById("nombre-error-register");
const apellidoErrorRegister = document.getElementById("apellido-error-register");
const dniErrorRegister = document.getElementById("dni-error-register");
const telErrorRegister = document.getElementById("tel-error-register");

const nombreDiv = nombreInput.closest(".input-field");
const apellidoDiv = apellidoInput.closest(".input-field");
const dniDiv = dniInput.closest(".input-field");
const telefonoDiv = telefonoInput.closest(".input-field");

// =========== FUNCIONES DE VALIDACIÓN GENÉRICAS ===========

/**
 * Valida si un campo está vacío. 
 * Muestra u oculta error en base a ello.
 */
function validateField(field, errorSpan, fieldDiv) {
    if (field.value.trim() === "") {
        errorSpan.style.display = "inline";
        errorSpan.textContent = "Este campo es obligatorio";
        fieldDiv.classList.add("focused");
    } else {
        errorSpan.style.display = "none";
        fieldDiv.classList.remove("focused");
    }
}

/**
 * Valida el nombre de usuario en el formulario de registro.
 */
function validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv) {
    const username = nameInputRegister.value.trim();
    if (username === "") {
        nameErrorRegister.style.display = "inline";
        nameErrorRegister.textContent = "Este campo es obligatorio";
        userRegisterFieldDiv.classList.add("focused");
    } else {
        nameErrorRegister.style.display = "none";
        userRegisterFieldDiv.classList.remove("focused");
    }
}

/**
 * Valida el email con una expresión regular.
 */
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function validateEmail(emailInput, emailError, emailFieldDiv) {
    const email = emailInput.value.trim();

    if (email === "") {
        emailError.style.display = "inline";
        emailError.textContent = "Este campo es obligatorio";
        emailFieldDiv.classList.add("focused");
    } else if (!emailRegex.test(email)) {
        emailError.style.display = "inline";
        emailError.textContent = "Por favor ingresa un correo electrónico válido";
        emailFieldDiv.classList.add("focused");
    } else {
        emailError.style.display = "none";
        emailFieldDiv.classList.remove("focused");
    }
}

/**
 * Valida la contraseña:
 * - Mínimo 5 caracteres y máximo 16
 * - Debe contener al menos 1 letra mayúscula, 1 minúscula y 1 dígito
 */
function validatePassword(passwordInputRegister, passwordErrorRegister, passwordRegisterFieldDiv) {
    const password = passwordInputRegister.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,16}$/;

    if (password === "") {
        passwordErrorRegister.style.display = "inline";
        passwordErrorRegister.textContent = "Este campo es obligatorio";
        passwordRegisterFieldDiv.classList.add("focused");
    } else if (!passwordRegex.test(password)) {
        passwordErrorRegister.style.display = "inline";
        passwordErrorRegister.textContent = 
            "La contraseña debe tener entre 5 y 16 caracteres, incluir mayúscula, minúscula y al menos un número";
        passwordRegisterFieldDiv.classList.add("focused");
    } else {
        passwordErrorRegister.style.display = "none";
        passwordRegisterFieldDiv.classList.remove("focused");
    }
}

/**
 * Valida el DNI (ejemplo: 7 u 8 dígitos).
 * Ajusta según la normativa de tu país.
 */
const dniRegex = /^[0-9]{7,8}$/;
function validateDNI(dniInput, dniErrorRegister, dniDiv) {
    const dniValue = dniInput.value.trim();
    if (dniValue === "") {
        dniErrorRegister.style.display = "inline";
        dniErrorRegister.textContent = "Este campo es obligatorio";
        dniDiv.classList.add("focused");
    } else if (!dniRegex.test(dniValue)) {
        dniErrorRegister.style.display = "inline";
        dniErrorRegister.textContent = "DNI inválido. Deben ser 7 u 8 dígitos numéricos";
        dniDiv.classList.add("focused");
    } else {
        dniErrorRegister.style.display = "none";
        dniDiv.classList.remove("focused");
    }
}

/**
 * Valida teléfono (ejemplo: 7 a 15 dígitos).
 */
const telRegex = /^[0-9]{7,15}$/;
function validateTelefono(telefonoInput, telErrorRegister, telefonoDiv) {
    const telValue = telefonoInput.value.trim();
    if (telValue === "") {
        telErrorRegister.style.display = "inline";
        telErrorRegister.textContent = "Este campo es obligatorio";
        telefonoDiv.classList.add("focused");
    } else if (!telRegex.test(telValue)) {
        telErrorRegister.style.display = "inline";
        telErrorRegister.textContent = "Debe contener entre 7 y 15 dígitos numéricos";
        telefonoDiv.classList.add("focused");
    } else {
        telErrorRegister.style.display = "none";
        telefonoDiv.classList.remove("focused");
    }
}

// =========== VALIDACIONES EN EVENTOS FOCUSOUT/INPUT ===========

// Login
nameInput.addEventListener("focusout", () => validateField(nameInput, nameError, userFieldDiv));
passwordInput.addEventListener("focusout", () => validateField(passwordInput, passwordError, passwordFieldDiv));

// Registro
nameInputRegister.addEventListener("focusout", () => validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv));
emailInput.addEventListener("focusout", () => validateEmail(emailInput, emailError, emailFieldDiv));
passwordInputRegister.addEventListener("focusout", () => validatePassword(passwordInputRegister, passwordErrorRegister, passwordRegisterFieldDiv));
nombreInput.addEventListener("focusout", () => validateField(nombreInput, nombreErrorRegister, nombreDiv));
apellidoInput.addEventListener("focusout", () => validateField(apellidoInput, apellidoErrorRegister, apellidoDiv));
dniInput.addEventListener("focusout", () => validateDNI(dniInput, dniErrorRegister, dniDiv));
telefonoInput.addEventListener("focusout", () => validateTelefono(telefonoInput, telErrorRegister, telefonoDiv));

// =========== FUNCIONES PARA EL SUBMIT DE LOS FORMULARIOS ===========

/**
 * Validación al enviar el formulario de Login.
 */
function validateLogin(event) {
    event.preventDefault();
    
    // Verificamos campos obligatorios en Login
    validateField(nameInput, nameError, userFieldDiv);
    validateField(passwordInput, passwordError, passwordFieldDiv);

    // Si no hay errores visibles, podemos procesar el login
    if (
        nameError.style.display === "none" &&
        passwordError.style.display === "none"
    ) {
        // Aquí colocarías la lógica real de login (AJAX o redirección, etc.)
        loginMessage.textContent = "Inicio de sesión exitoso";
        loginMessage.style.color = "green";
        // Ejemplo: window.location.href = "otra_pagina.html";
        loginForm.submit();
    }
}

/**
 * Validación al enviar el formulario de Registro.
 */
function registerUser(event) {
    event.preventDefault();

    // Lanzamos las validaciones campo por campo
    validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv);
    validateField(nombreInput, nombreErrorRegister, nombreDiv);
    validateField(apellidoInput, apellidoErrorRegister, apellidoDiv);
    validateDNI(dniInput, dniErrorRegister, dniDiv);
    validateTelefono(telefonoInput, telErrorRegister, telefonoDiv);
    validateEmail(emailInput, emailError, emailFieldDiv);
    validatePassword(passwordInputRegister, passwordErrorRegister, passwordRegisterFieldDiv);

    // Si todos los mensajes de error están ocultos, registramos
    if (
        nameErrorRegister.style.display === "none" &&
        nombreErrorRegister.style.display === "none" &&
        apellidoErrorRegister.style.display === "none" &&
        dniErrorRegister.style.display === "none" &&
        telErrorRegister.style.display === "none" &&
        emailError.style.display === "none" &&
        passwordErrorRegister.style.display === "none"
    ) {
        // Aquí colocarías la lógica real de registro (AJAX, guardar en BD, etc.)
        registerMessage.textContent = "Registro exitoso";
        registerMessage.style.color = "green";
        registerForm.submit();
        // Ejemplo: window.location.href = "pagina_de_bienvenida.html";
    }
}

// =========== ASOCIAR EVENTOS DE SUBMIT A LAS FUNCIONES =========== 
loginForm.addEventListener("submit", validateLogin);
registerForm.addEventListener("submit", registerUser);



// Suponiendo que en login.js, al cargar, leemos la URL
// Esta función obtiene los parámetros ?clave=valor de la URL
function getUrlParams() {
    const params = {};
    const queryString = window.location.search; // Ej: ?error=user_or_email_exists
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
    }
    return params;
}

// En algún lugar dentro de login.js:
window.addEventListener("DOMContentLoaded", () => {
    const params = getUrlParams();

    // Ejemplo: si hay un error de usuario/correo existente
    if (params.error === "user_or_email_exists") {
        alert("El usuario o correo ya existe. Intenta con otros datos.");
    }

    // Mensaje de registro exitoso
    if (params.msg === "registered_successfully") {
        alert("Registro exitoso. ¡Ya puedes iniciar sesión!");
    }
});
