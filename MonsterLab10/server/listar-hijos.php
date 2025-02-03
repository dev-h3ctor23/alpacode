<?php
session_start();
header('Content-Type: application/json');

// Verificar si hay un usuario logueado
if (!isset($_SESSION['nombre_usuario'])) {
    echo json_encode(["error" => "No hay sesión iniciada"]);
    exit;
}

// Tomar dni_padre de la sesión
if (!isset($_SESSION['dni_padre'])) {
    echo json_encode(["error" => "No se encontró dni_padre"]);
    exit;
}
$dniPadre = $_SESSION['dni_padre'];

include 'conexion.php';

// Obtener hijos de este padre
$sql = "SELECT dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado
        FROM Nino
        WHERE dni_padre = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $dniPadre);
$stmt->execute();
$result = $stmt->get_result();

$hijos = [];
while ($row = $result->fetch_assoc()) {
    $hijos[] = $row;
}

echo json_encode($hijos);

$stmt->close();
$conn->close();
?>
