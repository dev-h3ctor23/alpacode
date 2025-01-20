
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("show");
}


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



// Obtener el input y el span de error
// Seleccionar los campos del formulario
const nameInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const nameInputRegister = document.getElementById("user-register");
const emailInput = document.getElementById("email");
const passwordInputRegister = document.getElementById("password-register");

// Seleccionar los spans de error
const nameError = document.getElementById("name-error");
const passwordError = document.getElementById("password-error");
const nameErrorRegister = document.getElementById("name-error-register");
const emailError = document.getElementById("email-error");
const passwordErrorRegister = document.getElementById("password-error-register"); // Corregido para coincidir con el HTML

// Seleccionar los divs contenedores
const userFieldDiv = nameInput.closest(".input-field");
const passwordFieldDiv = passwordInput.closest(".input-field");
const userRegisterFieldDiv = nameInputRegister.closest(".input-field");
const emailFieldDiv = emailInput.closest(".input-field");
const passwordRegisterFieldDiv = passwordInputRegister.closest(".input-field");

// Datos de usuarios (bd)
const users = [
    { username: "ricardo", email: "ricado@gmail.com", password: "Ricardo123" },
    { username: "hector", email: "hector@gmail.com", password: "Hector123" },
    { username: "miryam", email: "miryam@gmail.com",password: "Miryam123" }
];

// Función para validar campos
function validateField(field, errorSpan, fieldDiv) {
    if (field.value.trim() === "") {
        // Mostrar error
        errorSpan.style.display = "inline";
        fieldDiv.classList.add("focused");
    } else {
        // Ocultar error
        errorSpan.style.display = "none";
        fieldDiv.classList.remove("focused");
    }
}

// Usamos focusout para detectar cuando el campo pierde el foco
nameInput.addEventListener("focusout", () => validateField(nameInput, nameError, userFieldDiv));
passwordInput.addEventListener("focusout", () => validateField(passwordInput, passwordError, passwordFieldDiv));

// Función para validar el nombre de usuario en tiempo real y cuando se pierde el foco
function validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv) {
    const username = nameInputRegister.value.trim();

    // Validación si el usuario ya existe
    if (users.some(user => user.username === username)) {
        nameErrorRegister.style.display = "inline";
        nameErrorRegister.textContent = "El usuario ya existe";
        userRegisterFieldDiv.classList.add("focused");
    } else if (username === "") {
        // Validación si el campo está vacío
        nameErrorRegister.style.display = "inline";
        nameErrorRegister.textContent = "Este campo es obligatorio";
        userRegisterFieldDiv.classList.add("focused");
    } else {
        // Si no hay errores, se oculta el mensaje
        nameErrorRegister.style.display = "none";
        userRegisterFieldDiv.classList.remove("focused");
    }
}

nameInputRegister.addEventListener("input", () => validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv));


// Expresión regular para validar el correo electrónico
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Función para validar el correo electrónico
function validateEmail(emailInput, emailError, emailFieldDiv) {
    const email = emailInput.value.trim();

    if (email === "") {
        emailError.style.display = "inline";
        emailError.textContent = "Este campo es obligatorio";
        emailFieldDiv.classList.add("focused");
    } else if (!emailRegex.test(email)) {
        // Si no pasa la validación
        emailError.style.display = "inline";
        emailError.textContent = "Por favor ingresa un correo electrónico válido";
        emailFieldDiv.classList.add("focused");
    } else {
        // Si el correo es válido
        emailError.style.display = "none";
        emailFieldDiv.classList.remove("focused");
    }
}

// Validar el correo al perder el foco
emailInput.addEventListener("focusout", () => validateEmail(emailInput, emailError, emailFieldDiv));


// Función para validar la contraseña
function validatePassword(passwordInputRegister, passwordErrorRegister, passwordRegisterFieldDiv) {
    //se opbtiene el valor de la contraseña sin espacios en blanco
    const password = passwordInputRegister.value.trim();

    // Expresión regular para validar la contraseña (mínimo de 5 caracteres, al menos una letra mayúscula, una letra minúscula y un número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,16}$/;

    if (password === "") {
        // Si la contraseña está vacía
        passwordErrorRegister.style.display = "inline";
        passwordErrorRegister.textContent = "Este campo es obligatorio";
        passwordRegisterFieldDiv.classList.add("focused");
        // Si la contraseña no cumple con los requisitos se muestra el error se utiliza el metodo test de la expresión regular
    } else if (!passwordRegex.test(password)) {
        passwordErrorRegister.style.display = "inline";
        passwordErrorRegister.textContent = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y debe tener entre 5 y 16 caracteres";
        passwordRegisterFieldDiv.classList.add("focused");
    } else {
        // Si la contraseña es válida se quita el mensaje de error
        passwordErrorRegister.style.display = "none";
        passwordRegisterFieldDiv.classList.remove("focused");
    }
}

/// Validar la contraseña al perder el foco
passwordInputRegister.addEventListener("focusout", () => validatePassword(passwordInputRegister, passwordErrorRegister, passwordRegisterFieldDiv));


const loginForm = document.querySelector(".sign-in-form");
const registerForm = document.querySelector(".sign-up-form");
const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");

// Función para Validar Login
function validateLogin(event) {
    event.preventDefault();
    const username = nameInput.value.trim();
    const password = passwordInput.value.trim();

    loginMessage.textContent = "";

    //Con find busca el usuario en los datos 
    const user = users.find(user => user.username === username);

    if (!user) {
        nameError.style.display = "inline";
        nameError.textContent = "Usuario no encontrado";
    } else if (user.password !== password) {
        passwordError.style.display = "inline";
        passwordError.textContent = "Contraseña incorrecta";
    } else {
        loginMessage.textContent = "Inicio de sesión exitoso";
        nameError.style.display = "none";
        passwordError.style.display = "none";
        loginForm.reset();
    }
}

// Función para Registrar Usuario
function registerUser(event) {
    event.preventDefault();
    const username = nameInputRegister.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInputRegister.value.trim();

    //en caso no se completen todos los campos se muestra el error
    if (!username || !email || !password) {
        nameErrorRegister.style.display = "inline";
        nameErrorRegister.textContent = "Todos los campos son obligatorios";
        return;
    }

    //se verifica si el usuario ya existe tambien al enviar el formulario
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        nameErrorRegister.style.display = "inline";
        nameErrorRegister.textContent = "El usuario ya existe";
    } else {
        users.push({ username, email, password });
        registerMessage.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
        nameErrorRegister.style.display = "none";
        registerForm.reset();
    }
}

// Eventos para los formularios de login y registro
loginForm.addEventListener("submit", validateLogin);
registerForm.addEventListener("submit", registerUser);




