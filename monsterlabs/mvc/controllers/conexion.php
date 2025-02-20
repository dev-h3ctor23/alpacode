<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monsterlabs";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión sin imprimir nada
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]));
}
?>
