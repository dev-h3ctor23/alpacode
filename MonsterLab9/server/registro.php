<?php
// 1. Incluir la conexión a la base de datos
include 'conexion.php';

// 2. Verificamos si la petición viene por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 3. Recuperar datos del formulario de registro
    //    Ajustar los name=... según tu formulario
    $username   = isset($_POST['user-register']) ? trim($_POST['user-register']) : null;
    $email      = isset($_POST['email']) ? trim($_POST['email']) : null;
    $password   = isset($_POST['password-register']) ? trim($_POST['password-register']) : null;
    $dni        = isset($_POST['dni']) ? trim($_POST['dni']) : null;
    $nombre     = isset($_POST['nombre']) ? trim($_POST['nombre']) : null;
    $apellido   = isset($_POST['apellido']) ? trim($_POST['apellido']) : null;
    $telefono   = isset($_POST['telefono']) ? trim($_POST['telefono']) : null;

    // 4. Validar datos en el servidor (básico)
    if (empty($username) || empty($email) || empty($password) 
        || empty($dni) || empty($nombre) || empty($apellido)) {
        
        // Redirigir al login con un mensaje de error por campos incompletos
        header("Location: ../HTML/login.html?error=empty_fields");
        exit;
    }


    // 6. Iniciar transacción para garantizar consistencia
    $conn->begin_transaction();

    try {
        // 7. Insertar en la tabla Usuario (nombre_tipo por defecto 'padre')
        $sqlUsuario = "INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo)
                       VALUES (?, ?, ?, 'padre')";

        $stmtUser = $conn->prepare($sqlUsuario);
        $stmtUser->bind_param("sss", $username, $email, $password);
        $stmtUser->execute();

        // 8. Obtener el id del nuevo usuario insertado
        $lastUserId = $conn->insert_id;

        // 9. Insertar en la tabla Padre
        $sqlPadre = "INSERT INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
                     VALUES (?, ?, ?, ?, ?)";

        $stmtPadre = $conn->prepare($sqlPadre);
        $stmtPadre->bind_param("ssssi", $dni, $nombre, $apellido, $telefono, $lastUserId);
        $stmtPadre->execute();

        // 10. Confirmar la transacción
        $conn->commit();

        // 11. Redirigir al login con mensaje de éxito
        header("Location: ../HTML/login.html?msg=registered_successfully");
        exit;

    } catch (Exception $e) {
        // 12. Deshacer transacción si ocurre algún error
        $conn->rollback();

        // 13. Manejar error de clave duplicada (usuario o correo ya existente)
        if ($conn->errno === 1062) {
            // Redirigir con un mensaje de error específico
            header("Location: ../HTML/login.html?error=user_or_email_exists");
        } else {
            // Redirigir con un mensaje de error genérico
            header("Location: ../HTML/login.html?error=unexpected_error");
        }
        exit;
    } finally {
        // Cerrar los statements (buena práctica)
        $stmtUser->close();
        $stmtPadre->close();
    }

} else {
    // Si no es POST, redirigimos al login o a donde consideres oportuno
    header("Location: ../HTML/login.html?error=invalid_method");
    exit;
}

// Cerrar la conexión
$conn->close();
?>
