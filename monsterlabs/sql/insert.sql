INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('admin', 'admin1@monsterlabs.com', 'admin123', 'admin');
INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('padre1', 'padre1@monsterlabs.com', 'password1', 'padre');
INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('padre2', 'padre2@monsterlabs.com', 'password2', 'padre');
INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('monitor1', 'monitor1@monsterlabs.com', 'passmonitor1', 'monitor');

INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('monitor2', 'monitor2@monsterlabs.com', 'passmonitor2', 'monitor');

INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('monitor3', 'monitor3@monsterlabs.com', 'passmonitor3', 'monitor');

INSERT INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('monitor4', 'monitor4@monsterlabs.com', 'passmonitor4', 'monitor');


INSERT INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('12345678A', 'Carlos', 'Gomez', '600111222', 4);

INSERT INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('45612378F', 'Lucas', 'Perez', '789465123', 5);
INSERT INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('13245698G', 'Maria', 'Lopez', '321654789', 6);

INSERT INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('45612398G', 'Martin', 'Rodriguez', '545545789', 7);

INSERT INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario) VALUES ('87654321B', 'Ana', 'Lopez', '600333444', 2);
INSERT INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario) VALUES ('98765432C', 'Luis', 'Martinez', '600555666', 3);


INSERT INTO Pago (nombre_tipo, id_padre) VALUES ('transferencia', 1);
INSERT INTO Pago (nombre_tipo, id_padre) VALUES ('bizum', 2);


INSERT INTO Nino (nombre, apellido, fecha_nacimiento, nombre_estado, id_padre) VALUES ('Sofía', 'Lopez', '2015-03-12', 'inactivo', 1);
INSERT INTO Nino (nombre, apellido, fecha_nacimiento, nombre_estado, id_padre) VALUES ('Diego', 'Lopez', '2012-07-25', 'inactivo', 1);
INSERT INTO Nino (nombre, apellido, fecha_nacimiento, nombre_estado, id_padre) VALUES ('Marta', 'Martinez', '2014-11-05', 'inactivo', 2);
INSERT INTO Nino (nombre, apellido, fecha_nacimiento, nombre_estado, id_padre) VALUES ('Juan', 'Martinez', '2016-06-30', 'inactivo', 2);

INSERT INTO Administrador (id_usuario) VALUES (1);

INSERT INTO Guardian (dni_guardian, nombre, apellido, telefono) VALUES ('11223344D', 'Elena', 'Sanchez', '600777888');
INSERT INTO Guardian (dni_guardian, nombre, apellido, telefono) VALUES ('22334455E', 'Roberto', 'Garcia', '600999000');

INSERT INTO GuardianNino (relacion, id_nino, id_guardian) VALUES ('abuela', 1, 1);
INSERT INTO GuardianNino (relacion, id_nino, id_guardian) VALUES ('tío', 2, 2);
INSERT INTO GuardianNino (relacion, id_nino, id_guardian) VALUES ('tutor', 3, 1);
INSERT INTO GuardianNino (relacion, id_nino, id_guardian) VALUES ('tutor', 4, 2);


INSERT INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) VALUES ('2025-03-15', '10:00:00', '12:00:00', 'Clase de natación', 4);
INSERT INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) VALUES ('2025-03-16', '14:00:00', '16:00:00', 'Taller de arte', 2);
INSERT INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) VALUES ('2025-03-17', '09:00:00', '11:00:00', 'Entrenamiento deportivo', 4);
INSERT INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) VALUES ('2025-03-18', '15:00:00', '17:00:00', 'Sesión de música', 3);


INSERT INTO Actividad (nombre_actividad, id_monitor) VALUES ('Natación', 1);
INSERT INTO Actividad (nombre_actividad, id_monitor) VALUES ('Arte', 1);
INSERT INTO Actividad (nombre_actividad, id_monitor) VALUES ('Fútbol', 1);
INSERT INTO Actividad (nombre_actividad, id_monitor) VALUES ('Música', 1);


INSERT INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) VALUES (1, 1, '10:00:00', 120);
INSERT INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) VALUES (2, 2, '14:00:00', 120);
INSERT INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) VALUES (3, 3, '09:00:00', 120);
INSERT INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) VALUES (4, 4, '15:00:00', 120);

INSERT INTO Conversacion (fecha_creacion) VALUES ('2025-02-15');
INSERT INTO Conversacion (fecha_creacion) VALUES ('2025-02-16');
INSERT INTO Conversacion (fecha_creacion) VALUES ('2025-02-17');
INSERT INTO Conversacion (fecha_creacion) VALUES ('2025-02-18');


INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (1, 1);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (1, 2);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (2, 3);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (2, 4);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (3, 1);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (3, 3);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (4, 2);
INSERT INTO ParticipantesConversacion (id_conversacion, id_usuario) VALUES (4, 4);


INSERT INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, id_nino) VALUES ('Maní', 'Penicilina', 'Ninguno', 'Madre', '600123456', 1);
INSERT INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, id_nino) VALUES ('Gluten', 'Ninguno', 'Ibuprofeno', 'Padre', '600654321', 2);
INSERT INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, id_nino) VALUES ('Lactosa', 'Ninguno', 'Paracetamol', 'Tía', '600112233', 3);
INSERT INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, id_nino) VALUES ('Ninguno', 'Ninguno', 'Ninguno', 'Abuelo', '600445566', 4);