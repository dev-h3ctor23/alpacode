<?php
// Desactivar excepciones de MySQLi para evitar errores si la base de datos no existe
mysqli_report(MYSQLI_REPORT_OFF);

// Cargar configuración de la base de datos
$config = require_once __DIR__ . '/../config/db_config.php';
$servername = $config['servername'];
$username   = $config['username'];
$password   = $config['password'];
$dbname     = $config['dbname'];

// Conectar al servidor MySQL sin seleccionar la base de datos
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Intentar seleccionar la base de datos
if (!$conn->select_db($dbname)) {
    // Si la base de datos no existe, leer el archivo SQL
    $sql = file_get_contents(__DIR__ . '/../sql/database.sql');
    
    // Ejecutar todas las consultas SQL
    if ($conn->multi_query($sql)) {
        // Vaciar resultados para finalizar multi_query
        while ($conn->next_result()) { }
        //// echo "Base de datos '$dbname' creada correctamente.<br>";
    } else {
        echo "Error al crear la base de datos: " . $conn->error;
    }
}

$conn->close();

// Cargar el controlador y continuar con la aplicación
require_once __DIR__ . '/../mvc/controllers/HomeController.php';
$controller = new HomeController();
$controller->index();
?>