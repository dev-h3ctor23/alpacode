-- Crear base de datos con configuración de caracteres en español
CREATE DATABASE IF NOT EXISTS monsterLab
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE monsterLab;

-- Tabla TipoUsuario
CREATE TABLE IF NOT EXISTS TipoUsuario (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo ENUM('padre', 'monitor', 'admin') NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Estado
CREATE TABLE IF NOT EXISTS Estado (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado ENUM('activo', 'inactivo') NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_tipo INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES TipoUsuario(id_tipo)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Monitor
CREATE TABLE IF NOT EXISTS Monitor (
    dni_monitor VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(20),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Padre
CREATE TABLE IF NOT EXISTS Padre (
    dni_padre VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(20),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Niño
CREATE TABLE IF NOT EXISTS Nino (
    dni_nino VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    id_estado INT NOT NULL,
    dni_padre VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES Estado(id_estado),
    FOREIGN KEY (dni_padre) REFERENCES Padre(dni_padre)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Guardian
CREATE TABLE IF NOT EXISTS Guardian (
    dni_guardian VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla GuardianNiño
CREATE TABLE IF NOT EXISTS GuardianNino (
    id_relacion INT AUTO_INCREMENT PRIMARY KEY,
    relacion VARCHAR(50) NOT NULL,
    dni_nino VARCHAR(20) NOT NULL,
    dni_guardian VARCHAR(20) NOT NULL,
    FOREIGN KEY (dni_nino) REFERENCES Nino(dni_nino),
    FOREIGN KEY (dni_guardian) REFERENCES Guardian(dni_guardian)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Cronograma
CREATE TABLE IF NOT EXISTS Cronograma (
    id_cronograma INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    descripcion TEXT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Actividad
CREATE TABLE IF NOT EXISTS Actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actividad VARCHAR(100) NOT NULL,
    dni_monitor VARCHAR(20),
    FOREIGN KEY (dni_monitor) REFERENCES Monitor(dni_monitor)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla muchos a muchos ActividadNiño
CREATE TABLE IF NOT EXISTS ActividadNino (
    id_actividad INT NOT NULL,
    dni_nino VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_actividad, dni_nino),
    FOREIGN KEY (id_actividad) REFERENCES Actividad(id_actividad),
    FOREIGN KEY (dni_nino) REFERENCES Nino(dni_nino)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla CronogramaActividad (muchos a muchos)
CREATE TABLE IF NOT EXISTS CronogramaActividad (
    id_cronograma INT NOT NULL,
    id_actividad INT NOT NULL,
    hora_asignada TIME NOT NULL,
    duracion INT NOT NULL,
    PRIMARY KEY (id_cronograma, id_actividad),
    FOREIGN KEY (id_cronograma) REFERENCES Cronograma(id_cronograma),
    FOREIGN KEY (id_actividad) REFERENCES Actividad(id_actividad)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla Conversacion
CREATE TABLE IF NOT EXISTS Conversacion (
    id_conversacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_creacion DATE NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla ParticipantesConversacion
CREATE TABLE IF NOT EXISTS ParticipantesConversacion (
    id_conversacion INT NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_conversacion, id_usuario),
    FOREIGN KEY (id_conversacion) REFERENCES Conversacion(id_conversacion),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Tabla FichaMedica
CREATE TABLE IF NOT EXISTS FichaMedica (
    id_ficha INT AUTO_INCREMENT PRIMARY KEY,
    alimentos_alergico TEXT,
    medicamentos_alergico TEXT,
    medicamentos_actuales TEXT,
    nombre_emergencia VARCHAR(50),
    telefono_emergencia VARCHAR(20),
    dni_nino VARCHAR(20) NOT NULL,
    FOREIGN KEY (dni_nino) REFERENCES Nino(dni_nino)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
