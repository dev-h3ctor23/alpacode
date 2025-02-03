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
        formStep.classList.remove("form-step-active")
    })
    formSteps[formStepsNum].classList.add("form-step-active");
}

/* barra de progreso */
function updateProgressbar() {
    progressSteps.forEach((progressStep, index) => {
        if ( index < formStepsNum + 1 ) {
            progressStep.classList.add('progress-step-active')
            
            
        } else {
            progressStep.classList.remove('progress-step-active')
        }
    })
    progress.style.width = ((formStepsNum) / (progressSteps.length - 1)) * 100 + "%";
    
}

/* Obtener el input y el span de error
y seleccionar los campos del formulario*/

const nameInput = document.getElementById("firstName");
const apellidoInput = document.getElementById("lastName");
const cursoInput = document.getElementById("curso");

// Seleccionar los spans de error

const nameError = document.getElementById("name-error");       // Error del nombre
const apellidoError = document.getElementById("apellido-error"); // Error del apellido
const cursoError = document.getElementById("curso-error");       // Error del curso

// Seleccionar los divs contenedores

const nameFieldDiv = nameInput.closest(".input-field");       // Contenedor del nombre
const apellidoFieldDiv = apellidoInput.closest(".input-field"); // Contenedor del apellido
const cursoFieldDiv = cursoInput.closest(".input-field");       // Contenedor del curso

// Datos usuario, BBDD
const users = [
    { username: "ricardo", email: "ricado@gmail.com", password: "Ricardo123" },
    { username: "hector", email: "hector@gmail.com", password: "Hector123" },
    { username: "miryam", email: "miryam@gmail.com",password: "Miryam123" }
];

// Función para validar campos

function validateField(field, errorSpan, fieldDiv) {          // Validar campos de entrada  
    if (field.value.trim() === "") {                          // Si el campo está vacío
        errorSpan.style.display = "inline";                   // Mostrar error
        fieldDiv.classList.add("focused");                    // Estilo para indicar que el campo está activo
    }
    else {
        errorSpan.style.display = "none";                     // Ocultar error
        fieldDiv.classList.remove("focused");                 // Estilo para indicar que el campo no está activo
    }                                                        
}

// Agregar evento blur a cada variable cuando se pierda el foco sin rellenar los campos

nameInput.addEventListener("blur", () => validateField(nameInput, nameError, nameFieldDiv));
apellidoInput.addEventListener("blur", () => validateField(apellidoInput, apellidoError, apellidoFieldDiv));
cursoInput.addEventListener("blur", () => validateField(cursoInput, cursoError, cursoFieldDiv));

// Función para validar el nombre de usuario en tiempo real y cuando se pierde el foco

function validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv) {
    const username = nameInputRegister.value.trim();         // Obtener el valor del nombre de usuario
    if (users.some(user => user.username === username)) {    // Validar si el usuario ya existe
        nameErrorRegister.style.display = "inline";          // Mostrar error
        nameErrorRegister.textContent = "El usuario ya existe";
        userRegisterFieldDiv.classList.add("focused");       // Estilo para indicar que el campo está activo
    }
    else if (username === "") {                              // Validar si el campo está vacío
        nameErrorRegister.style.display = "inline";          // Mostrar error
        nameErrorRegister.textContent = "Este campo es obligatorio";
        userRegisterFieldDiv.classList.add("focused");       // Estilo para indicar que el campo está activo
    }
    else {
        nameErrorRegister.style.display = "none";            // Ocultar error
        userRegisterFieldDiv.classList.remove("focused");    // Estilo para indicar que el campo no está activo
    }
}

// Se valida el nombre de usuario en tiempo real y mantener el mensaje si ya existe
nameInputRegister.addEventListener("input", () => validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv));

// Se agrega el evento blur hasta que se corrija el error del nombre de usuario
nameInputRegister.addEventListener("blur", () => validateUsername(nameInputRegister, nameErrorRegister, userRegisterFieldDiv));

nameInputRegister.addEventListener("input", validateUsername);

// Se agrega el evento blur hasta que se corrija el error del nombre de usuario
apellidoInput.addEventListener("blur", () => validateUsername(apellidoInput, apellidoError, apellidoFieldDiv));

// Se agrega el evento blur hasta que se corrija el error del nombre de usuario
cursoInput.addEventListener("blur", () => validateUsername(cursoInput, cursoError, cursoFieldDiv)); 
