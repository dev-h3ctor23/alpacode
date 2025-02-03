<?php
session_start();
header('Content-Type: application/json');

// Verificar sesión de padre
if (!isset($_SESSION['dni_padre'])) {
    echo json_encode(["success" => false, "error" => "No hay sesión de padre"]);
    exit;
}
$dniPadre = $_SESSION['dni_padre'];

// Conexión a BD
include 'conexion.php';

// Leer el JSON desde fetch
$jsonData = file_get_contents('php://input');
if (!$jsonData) {
    echo json_encode(["success" => false, "error" => "No se recibieron datos"]);
    exit;
}

$data = json_decode($jsonData, true);
if (!$data) {
    echo json_encode(["success" => false, "error" => "Formato JSON inválido"]);
    exit;
}

// Extraer campos
$dniNino        = $data['dni']               ?? '';
$nombreNino     = $data['nombre']            ?? '';
$apellidoNino   = $data['apellido']          ?? '';
$fechaNac       = $data['fechaNacimiento']   ?? '';

$alergiaAlimentos    = $data['alergiaAlimentos']    ?? '';
$alergiaMedicamentos = $data['alergiaMedicamentos'] ?? '';
$medicamentoActual   = $data['medicamentoActual']   ?? '';
$contactoEmergencia  = $data['contactoEmergencia']  ?? '';
$telefonoEmergencia  = $data['telefonoEmergencia']  ?? '';

$formaPago     = $data['formaPago']     ?? '';
$nombreResp    = $data['nombreResp']    ?? '';
$apellidosResp = $data['apellidosResp'] ?? '';
$dniResp       = $data['dniResp']       ?? '';
$telefonoResp  = $data['telefonoResp']  ?? '';
$relacion = $data['relacionResp']  ?? '';

// Validaciones mínimas
if (empty($dniNino) || empty($nombreNino) || empty($apellidoNino) || empty($fechaNac)) {
    echo json_encode(["success" => false, "error" => "Faltan campos del niño"]);
    exit;
}
if (empty($formaPago)) {
    echo json_encode(["success" => false, "error" => "Seleccione forma de pago"]);
    exit;
}
if (empty($dniResp)) {
    echo json_encode(["success" => false, "error" => "Faltan datos del responsable"]);
    exit;
}

$conn->begin_transaction();

try {
    // 1. Insertar Nino
    $sqlNino = "INSERT INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre)
                VALUES (?, ?, ?, ?, 'inactivo', ?)";
    $stmtNino = $conn->prepare($sqlNino);
    $stmtNino->bind_param("sssss", $dniNino, $nombreNino, $apellidoNino, $fechaNac, $dniPadre);
    $stmtNino->execute();

    // 2. Insertar FichaMedica
    $sqlFicha = "INSERT INTO FichaMedica (dni_nino, alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia)
                 VALUES (?, ?, ?, ?, ?, ?)";
    $stmtFicha = $conn->prepare($sqlFicha);
    $stmtFicha->bind_param("ssssss", $dniNino, $alergiaAlimentos, $alergiaMedicamentos, $medicamentoActual, $contactoEmergencia, $telefonoEmergencia);
    $stmtFicha->execute();

    // 3. Insertar Pago
    $sqlPago = "INSERT INTO Pago (nombre_tipo, dni_padre) VALUES (?, ?)";
    $stmtPago = $conn->prepare($sqlPago);
    $stmtPago->bind_param("ss", $formaPago, $dniPadre);
    $stmtPago->execute();

    // 4. Insertar/Verificar Guardian
    //    Para simplificar, haremos un INSERT IGNORE (si ya existe ese dni_guardian, no hace nada).
    $sqlGuardian = "INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono)
                    VALUES (?, ?, ?, ?)";
    $stmtGuardian = $conn->prepare($sqlGuardian);
    $stmtGuardian->bind_param("ssss", $dniResp, $nombreResp, $apellidosResp, $telefonoResp);
    $stmtGuardian->execute();

    // 5. Insertar GuardianNino
    //    Asumimos "relacion" = "responsable" por defecto

    $sqlGNino = "INSERT INTO GuardianNino (relacion, dni_nino, dni_guardian)
                 VALUES (?, ?, ?)";
    $stmtGNino = $conn->prepare($sqlGNino);
    $stmtGNino->bind_param("sss", $relacion, $dniNino, $dniResp);
    $stmtGNino->execute();

    // Finalizar
    $conn->commit();

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

$stmtNino->close();
$stmtFicha->close();
$stmtPago->close();
$stmtGuardian->close();
$stmtGNino->close();

$conn->close();
