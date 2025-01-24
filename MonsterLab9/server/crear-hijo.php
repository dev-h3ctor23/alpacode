<?php
session_start();
header('Content-Type: application/json');

// Verificar si hay un usuario logueado
if (!isset($_SESSION['nombre_usuario'])) {
    echo json_encode(["success" => false, "error" => "No hay sesión iniciada"]);
    exit;
}

// En tu registro, podrías guardar el dni_padre en $_SESSION
// o consultar la base de datos para obtenerlo a partir de $_SESSION['nombre_usuario'].
// Supongamos que ya tenemos $_SESSION['dni_padre']
if (!isset($_SESSION['dni_padre'])) {
    echo json_encode(["success" => false, "error" => "No se encontró dni_padre en sesión"]);
    exit;
}

$dniPadre = $_SESSION['dni_padre'];

// Conexión
include 'conexion.php';

// Recibir datos
$dniNino = $_POST['dniNino'] ?? '';
$nombreNino = $_POST['nombreNino'] ?? '';
$apellidoNino = $_POST['apellidoNino'] ?? '';
$fechaNac = $_POST['fechaNacimiento'] ?? '';

// Validaciones mínimas del lado del servidor
if (empty($dniNino) || empty($nombreNino) || empty($apellidoNino) || empty($fechaNac)) {
    echo json_encode(["success" => false, "error" => "Faltan campos"]);
    exit;
}

// Insertar en la BD
$sql = "INSERT INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre)
        VALUES (?, ?, ?, ?, 'activo', ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $dniNino, $nombreNino, $apellidoNino, $fechaNac, $dniPadre);

if ($stmt->execute()) {
    // Éxito
    echo json_encode(["success" => true]);
} else {
    // Error (puede ser duplicado de PK, etc.)
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
