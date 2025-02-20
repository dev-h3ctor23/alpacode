<?php
header('Content-Type: application/json');
session_start();
include(__DIR__ . '/conexion.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id_usuario, nombre_usuario, contrasena, nombre_tipo FROM usuario WHERE nombre_usuario = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $stored_username, $stored_password, $user_type);

    if ($stmt->num_rows > 0) {
        $stmt->fetch();

        if (password_verify($password, $stored_password)) {
            // Guardamos en la sesión
            $_SESSION["username"] = $stored_username;
            $_SESSION["user_id"] = $id;
            $_SESSION["user_type"] = $user_type;

            // Devolvemos el JSON con el tipo de usuario
            echo json_encode(["status" => "success", "user_type" => $user_type]);
        } else {
            echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
    }

    $stmt->close();
    $conn->close();
}
?>
