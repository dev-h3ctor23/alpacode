INSERT IGNORE INTO TipoUsuario (nombre_tipo) VALUES ('padre');
INSERT IGNORE INTO TipoUsuario (nombre_tipo) VALUES ('monitor');
INSERT IGNORE INTO TipoUsuario (nombre_tipo) VALUES ('admin');


INSERT IGNORE INTO Estado (nombre_estado) VALUES ('pagado');
INSERT IGNORE INTO Estado (nombre_estado) VALUES ('no_pagado');


-- 5 Usuarios de tipo "padre" (id_tipo = 1)
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('juan123','juanpadilla@example.com', '123', 1);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('maria123','mariamartin@example.com', '123', 1);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('carlos123','carlosrojas@example.com', '123', 1);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('beatriz123','beatrizsantos@example.com', '123', 1);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('andres123','andreslopez@example.com', '123', 1);

-- 3 Usuarios de tipo "monitor" (id_tipo = 2)
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('luisa123','monitor.luisa@example.com', '123', 2);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('pablo123','monitor.pablo@example.com', '123', 2);

INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('diana123','monitor.diana@example.com', '123', 2);

-- Unico usuario de tipo "admin" (id_tipo = 3)
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, id_tipo) 
VALUES ('admin','admin.jose@example.com', '123', 3);



-- Monitor 1 (corresponde a Usuario con id_usuario = 6)
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario)
VALUES ('12345678A', 'Luisa', 'Fernandez', '600123456', 6);

-- Monitor 2 (corresponde a Usuario con id_usuario = 7)
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario)
VALUES ('23456789B', 'Pablo', 'Garcia', '611234567', 7);

-- Monitor 3 (corresponde a Usuario con id_usuario = 8)
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario)
VALUES ('34567890C', 'Diana', 'Lopez', '622345678', 8);



-- Padre 1
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
VALUES ('11111111A', 'Juan', 'Padilla', '700111111', 1);

-- Padre 2
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
VALUES ('22222222B', 'Maria', 'Martin', '700222222', 2);

-- Padre 3
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
VALUES ('33333333C', 'Carlos', 'Rojas', '700333333', 3);

-- Padre 4
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
VALUES ('44444444D', 'Beatriz', 'Santos', '700444444', 4);

-- Padre 5
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario)
VALUES ('55555555E', 'Andres', 'Lopez', '700555555', 5);


-- Nino 1 (pertenece al Padre con DNI '11111111A') - estado activo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0001', 'Laura', 'Padilla', '2012-03-15', 1, '11111111A');

-- Nino 2 (pertenece al Padre con DNI '11111111A') - estado inactivo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0002', 'Sergio', 'Padilla', '2010-07-22', 2, '11111111A');

-- Nino 3 (pertenece al Padre con DNI '22222222B') - estado activo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0003', 'Javier', 'Martin', '2014-01-10', 1, '22222222B');

-- Nino 4 (pertenece al Padre con DNI '22222222B') - estado inactivo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0004', 'Marta', 'Martin', '2016-06-05', 2, '22222222B');

-- Nino 5 (pertenece al Padre con DNI '33333333C') - estado activo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0005', 'Miguel', 'Rojas', '2013-09-12', 1, '33333333C');

-- Nino 6 (pertenece al Padre con DNI '33333333C') - estado activo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0006', 'Daniela', 'Rojas', '2017-11-23', 1, '33333333C');

-- Nino 7 (pertenece al Padre con DNI '44444444D') - estado inactivo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0007', 'Clara', 'Santos', '2015-02-09', 2, '44444444D');

-- Nino 8 (pertenece al Padre con DNI '55555555E') - estado activo
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, id_estado, dni_padre)
VALUES ('NINO0008', 'Pablo', 'Lopez', '2011-12-01', 1, '55555555E');


INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono)
VALUES ('G0001', 'Manuel', 'Fernandez', '800111111');

INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono)
VALUES ('G0002', 'Ana', 'Rodriguez', '800222222');

INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono)
VALUES ('G0003', 'Jose', 'Hernandez', '800333333');

INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono)
VALUES ('G0004', 'Luisa', 'Gomez', '800444444');


INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian)
VALUES ('Abuelo', 'NINO0001', 'G0001');

INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian)
VALUES ('Abuela', 'NINO0002', 'G0002');

INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian)
VALUES ('Tia', 'NINO0003', 'G0004');

INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian)
VALUES ('Tio', 'NINO0005', 'G0003');

INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian)
VALUES ('Madrina', 'NINO0008', 'G0004');


-- Cronograma para un monitor (id_usuario = 6)
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario)
VALUES ('2025-02-10', '09:00:00', '12:00:00', 'Actividades deportivas manana', 6);

-- Cronograma para un monitor (id_usuario = 7)
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario)
VALUES ('2025-02-10', '16:00:00', '19:00:00', 'Taller de manualidades tarde', 7);

-- Cronograma para un monitor (id_usuario = 8)
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario)
VALUES ('2025-02-11', '10:00:00', '14:00:00', 'Salida al parque', 8);

-- Cronograma para un admin (id_usuario = 9)
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario)
VALUES ('2025-02-12', '08:00:00', '17:00:00', 'Revision general de actividades', 9);

-- Cronograma para otro admin (id_usuario = 10)
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario)
VALUES ('2025-02-15', '09:00:00', '11:00:00', 'Preparacion de informes', 10);


-- Para Luisa (dni_monitor = '12345678A')
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor)
VALUES ('Futbol', '12345678A');

INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor)
VALUES ('Pintura', '12345678A');

-- Para Pablo (dni_monitor = '23456789B')
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor)
VALUES ('Natacion', '23456789B');

-- Para Diana (dni_monitor = '34567890C')
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor)
VALUES ('Danza', '34567890C');


-- Nino 1 (NINO0001) y Nino 2 (NINO0002) en Futbol (id_actividad = 1, asumiendo es la primera en la tabla)
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (1, 'NINO0001');

INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (1, 'NINO0002');

-- Nino 3 (NINO0003) en Pintura (id_actividad = 2)
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (2, 'NINO0003');

-- Nino 4 (NINO0004) y Nino 5 (NINO0005) en Natacion (id_actividad = 3)
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (3, 'NINO0004');

INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (3, 'NINO0005');

-- Nino 6 (NINO0006), Nino 7 (NINO0007) y Nino 8 (NINO0008) en Danza (id_actividad = 4)
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (4, 'NINO0006');

INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (4, 'NINO0007');

INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino)
VALUES (4, 'NINO0008');


-- Cronograma 1 (id_cronograma = 1) con Futbol (id_actividad = 1)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (1, 1, '09:30:00', 90);

-- Cronograma 1 (id_cronograma = 1) con Pintura (id_actividad = 2)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (1, 2, '11:00:00', 60);

-- Cronograma 2 (id_cronograma = 2) con Natacion (id_actividad = 3)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (2, 3, '16:30:00', 90);

-- Cronograma 3 (id_cronograma = 3) con Danza (id_actividad = 4)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (3, 4, '10:30:00', 120);

-- Cronograma 4 (id_cronograma = 4) con Natacion (id_actividad = 3)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (4, 3, '09:00:00', 180);

-- Cronograma 5 (id_cronograma = 5) con Danza (id_actividad = 4)
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion)
VALUES (5, 4, '10:00:00', 90);


INSERT IGNORE INTO Conversacion (fecha_creacion)
VALUES ('2025-01-20');

INSERT IGNORE INTO Conversacion (fecha_creacion)
VALUES ('2025-01-21');

INSERT IGNORE INTO Conversacion (fecha_creacion)
VALUES ('2025-01-22');


-- Conversacion 1 con usuario 1 (Padre) y usuario 6 (Monitor)
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (1, 1);

INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (1, 6);

-- Conversacion 2 con usuario 2 (Padre), 7 (Monitor) y 9 (Admin)
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (2, 2);

INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (2, 7);

INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (2, 9);

-- Conversacion 3 con usuario 3 (Padre) y 8 (Monitor)
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (3, 3);

INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario)
VALUES (3, 8);


INSERT IGNORE INTO FichaMedica 
(alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino)
VALUES ('Frutos secos', 'Penicilina', 'Ibuprofeno', 'Carlos Perez', '900111111', 'NINO0001');

INSERT IGNORE INTO FichaMedica 
(alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino)
VALUES ('Huevo', 'Ninguno', 'Ninguno', 'Ana Ruiz', '900222222', 'NINO0002');

INSERT IGNORE INTO FichaMedica 
(alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino)
VALUES ('Leche', 'Ibuprofeno', 'Paracetamol', 'Mario Diaz', '900333333', 'NINO0003');

INSERT IGNORE INTO FichaMedica 
(alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino)
VALUES ('Ninguno', 'Ninguno', 'Ventolin', 'Luis Martin', '900444444', 'NINO0005');

INSERT IGNORE INTO FichaMedica 
(alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino)
VALUES ('Marisco', 'Ninguno', 'Insulina', 'Eva Lopez', '900555555', 'NINO0008');
