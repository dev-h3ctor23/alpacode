<?php
require_once '../PHP/conexion.php';

// Función para comprobar si una tabla existe
function tablaExiste($conn, $tableName) {
    $dbName = $conn->real_escape_string($conn->query("SELECT DATABASE()")->fetch_row()[0]);
    $tableName = $conn->real_escape_string($tableName);
    $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$dbName' AND table_name = '$tableName'";
    $result = $conn->query($sql);
    if ($result) {
        $count = $result->fetch_row()[0];
        return $count > 0;
    }
    return false;
}

// Crear tabla TipoUsuario
$tableName = 'TipoUsuario';
if (!tablaExiste($conn, $tableName)) {
    $sql1 = "CREATE TABLE TipoUsuario (
        id_tipo INT AUTO_INCREMENT PRIMARY KEY,
        nombre_tipo VARCHAR(50) NOT NULL
    );";
    if ($conn->query($sql1) === TRUE) {
        echo "Tabla TipoUsuario creada con éxito.\n";
    } else {
        echo "Error al crear la tabla TipoUsuario: " . $conn->error . "\n";
    }
}

// Crear tabla Estado
$tableName = 'Estado';
if (!tablaExiste($conn, $tableName)) {
    $sql2 = "CREATE TABLE Estado (
        id_estado INT AUTO_INCREMENT PRIMARY KEY,
        nombre_estado VARCHAR(50) NOT NULL
    );";
    if ($conn->query($sql2) === TRUE) {
        echo "Tabla Estado creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Estado: " . $conn->error . "\n";
    }
}

// Crear tabla Usuario
$tableName = 'Usuario';
if (!tablaExiste($conn, $tableName)) {
    $sql3 = "CREATE TABLE Usuario (
        dni VARCHAR(20) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        correo_electronico VARCHAR(100) UNIQUE NOT NULL,
        contraseña VARCHAR(255) NOT NULL,
        numero_telefono VARCHAR(20),
        id_tipo INT,
        FOREIGN KEY (id_tipo) REFERENCES TipoUsuario(id_tipo)
    );";
    if ($conn->query($sql3) === TRUE) {
        echo "Tabla Usuario creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Usuario: " . $conn->error . "\n";
    }
}

// Crear tabla Niño
$tableName = 'Niño';
if (!tablaExiste($conn, $tableName)) {
    $sql4 = "CREATE TABLE Niño (
        dni_niño VARCHAR(20) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        id_estado INT,
        FOREIGN KEY (id_estado) REFERENCES Estado(id_estado)
    );";
    if ($conn->query($sql4) === TRUE) {
        echo "Tabla Niño creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Niño: " . $conn->error . "\n";
    }
}

// Crear tabla Guardián
$tableName = 'Guardián';
if (!tablaExiste($conn, $tableName)) {
    $sql5 = "CREATE TABLE Guardián (
        dni_guardian VARCHAR(20) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        id_niño VARCHAR(20),
        FOREIGN KEY (id_niño) REFERENCES Niño(dni_niño)
    );";
    if ($conn->query($sql5) === TRUE) {
        echo "Tabla Guardián creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Guardián: " . $conn->error . "\n";
    }
}

// Crear tabla GuardianNiño
$tableName = 'GuardianNiño';
if (!tablaExiste($conn, $tableName)) {
    $sql6 = "CREATE TABLE GuardianNiño (
        id_relacion INT AUTO_INCREMENT PRIMARY KEY,
        relacion VARCHAR(50) NOT NULL,
        dni_niño VARCHAR(20),
        dni_guardian VARCHAR(20),
        FOREIGN KEY (dni_niño) REFERENCES Niño(dni_niño),
        FOREIGN KEY (dni_guardian) REFERENCES Guardián(dni_guardian)
    );";
    if ($conn->query($sql6) === TRUE) {
        echo "Tabla GuardianNiño creada con éxito.\n";
    } else {
        echo "Error al crear la tabla GuardianNiño: " . $conn->error . "\n";
    }
}

// Crear tabla Cronograma
$tableName = 'Cronograma';
if (!tablaExiste($conn, $tableName)) {
    $sql7 = "CREATE TABLE Cronograma (
        id_cronograma INT AUTO_INCREMENT PRIMARY KEY,
        fecha DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        descripcion TEXT NOT NULL,
        id_usuario VARCHAR(20),
        FOREIGN KEY (id_usuario) REFERENCES Usuario(dni)
    );";
    if ($conn->query($sql7) === TRUE) {
        echo "Tabla Cronograma creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Cronograma: " . $conn->error . "\n";
    }
}

// Crear tabla Actividad
$tableName = 'Actividad';
if (!tablaExiste($conn, $tableName)) {
    $sql8 = "CREATE TABLE Actividad (
        id_actividad INT AUTO_INCREMENT PRIMARY KEY,
        nombre_actividad VARCHAR(100) NOT NULL,
        dni_monitor VARCHAR(20),
        dni_niño VARCHAR(20),
        duración INT NOT NULL,
        FOREIGN KEY (dni_monitor) REFERENCES Usuario(dni),
        FOREIGN KEY (dni_niño) REFERENCES Niño(dni_niño)
    );";
    if ($conn->query($sql8) === TRUE) {
        echo "Tabla Actividad creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Actividad: " . $conn->error . "\n";
    }
}

// Crear tabla CronogramaActividad
$tableName = 'CronogramaActividad';
if (!tablaExiste($conn, $tableName)) {
    $sql9 = "CREATE TABLE CronogramaActividad (
        id_cronograma INT,
        id_actividad INT,
        hora_asignada TIME NOT NULL,
        duración INT NOT NULL,
        PRIMARY KEY (id_cronograma, id_actividad),
        FOREIGN KEY (id_cronograma) REFERENCES Cronograma(id_cronograma),
        FOREIGN KEY (id_actividad) REFERENCES Actividad(id_actividad)
    );";
    if ($conn->query($sql9) === TRUE) {
        echo "Tabla CronogramaActividad creada con éxito.\n";
    } else {
        echo "Error al crear la tabla CronogramaActividad: " . $conn->error . "\n";
    }
}

// Crear tabla Matricula
$tableName = 'Matricula';
if (!tablaExiste($conn, $tableName)) {
    $sql10 = "CREATE TABLE Matricula (
        id_matricula INT AUTO_INCREMENT PRIMARY KEY,
        estado VARCHAR(50) NOT NULL,
        id_parental VARCHAR(20),
        id_niño VARCHAR(20),
        FOREIGN KEY (id_parental) REFERENCES Usuario(dni),
        FOREIGN KEY (id_niño) REFERENCES Niño(dni_niño)
    );";
    if ($conn->query($sql10) === TRUE) {
        echo "Tabla Matricula creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Matricula: " . $conn->error . "\n";
    }
}

// Crear tabla Conversacion
$tableName = 'Conversacion';
if (!tablaExiste($conn, $tableName)) {
    $sql11 = "CREATE TABLE Conversacion (
        id_conversacion INT AUTO_INCREMENT PRIMARY KEY,
        fecha_creacion DATE NOT NULL
    );";
    if ($conn->query($sql11) === TRUE) {
        echo "Tabla Conversacion creada con éxito.\n";
    } else {
        echo "Error al crear la tabla Conversacion: " . $conn->error . "\n";
    }
}

// Crear tabla ParticipantesConversacion
$tableName = 'ParticipantesConversacion';
if (!tablaExiste($conn, $tableName)) {
    $sql12 = "CREATE TABLE ParticipantesConversacion (
        id_conversacion INT,
        dni_usuario VARCHAR(20),
        PRIMARY KEY (id_conversacion, dni_usuario),
        FOREIGN KEY (id_conversacion) REFERENCES Conversacion(id_conversacion),
        FOREIGN KEY (dni_usuario) REFERENCES Usuario(dni)
    );";
    if ($conn->query($sql12) === TRUE) {
        echo "Tabla ParticipantesConversacion creada con éxito.\n";
    } else {
        echo "Error al crear la tabla ParticipantesConversacion: " . $conn->error . "\n";
    }
}

$conn->close();
?>
