<?php
session_start();
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['user']) ? trim($_POST['user']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($username) || empty($password)) {
        header('Location: ../HTML/login.html?error=empty_fields');
        exit;
    }

    $sql = "SELECT id_usuario, nombre_usuario, contrasena, nombre_tipo 
            FROM Usuario 
            WHERE nombre_usuario = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado && $resultado->num_rows === 1) {
        $fila = $resultado->fetch_assoc();

        // Aquí la comparación con password_verify o texto plano.
        // Si usaste password_hash en el registro:
        // if (password_verify($password, $fila['contrasena'])) {
        //     ...
        // }

        if ($password === $fila['contrasena']) {
            // Guardamos el nombre del usuario en sesión
            $_SESSION['nombre_usuario'] = $fila['nombre_usuario'];
            
            // Preparar la consulta SQL para obtener el dni del padre
            $sql_dni_usuario = "SELECT p.dni_padre
                FROM Usuario u
                JOIN Padre p ON u.id_usuario = p.id_usuario
                WHERE u.nombre_usuario = ?";
        
            // Crear una declaración preparada para evitar inyecciones SQL
            $stmt = $conn->prepare($sql_dni_usuario);
            $stmt->bind_param('s', $_SESSION['nombre_usuario']); // Vincular el parámetro
            $stmt->execute();
            $result = $stmt->get_result();
        
            if ($result && $result->num_rows > 0) {
                $dni_padre = $result->fetch_assoc()['dni_padre'];
                $_SESSION['dni_padre'] = $dni_padre; // Opcional: Guardar el DNI en la sesión
            } else {
                // Manejo de errores en caso de que no se encuentre un padre asociado
                echo "Error: No se encontró un padre asociado.";
                exit;
            }
        
            // Redirigir a panel
            header('Location: ../HTML/panel-de-padres.html');
            exit;
        } else {
            header('Location: ../HTML/login.html?error=invalid_credentials');
            exit;
        }
    } else {
        header('Location: ../HTML/login.html?error=invalid_credentials');
        exit;
    }

    $stmt->close();
    $conn->close();
} else {
    header('Location: ../HTML/login.html?error=invalid_method');
    exit;
}
?>
