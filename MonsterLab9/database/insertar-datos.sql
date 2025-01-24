-- Insertar en la tabla Usuario
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('rgomez', 'rgomez@gmail.com', 'Pass123', 'padre');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('hchango', 'hchango@hotmail.com', 'Hc1234', 'padre');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('mhuamani', 'mhuamani@gmail.com', 'Mir123', 'padre');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('nchile', 'natalia.chile@gmail.com', 'Nat123', 'monitor');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('mperu', 'melissa.peru@hotmail.com', 'Mel456', 'monitor');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('svillanueva', 'sara.villanueva@gmail.com', 'Sara789', 'monitor');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('irinconbello', 'irene.rincon@hotmail.com', 'Irene123', 'monitor');
INSERT IGNORE INTO Usuario (nombre_usuario, correo, contrasena, nombre_tipo) VALUES ('admin', 'admin@gmail.com', 'Admin1', 'admin');

-- Insertar en la tabla Padre
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario) VALUES ('12345678A', 'Ricardo', 'Gomez', '999888777', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'rgomez'));
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario) VALUES ('87654321B', 'Hector', 'Chango', '999888776', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'hchango'));
INSERT IGNORE INTO Padre (dni_padre, nombre, apellido, numero_telefono, id_usuario) VALUES ('56781234C', 'Miryam', 'Huamani', '999888775', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'mhuamani'));

-- Insertar en la tabla Monitor
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('11111111A', 'Natalia', 'Chile', '987654321', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'nchile'));
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('11111112B', 'Melissa', 'Peru', '987654322', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'mperu'));
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('11111113C', 'Sara', 'Villanueva', '987654323', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'svillanueva'));
INSERT IGNORE INTO Monitor (dni_monitor, nombre, apellido, numero_telefono, id_usuario) VALUES ('11111114D', 'IRENE DEL RINCON', 'BELLO', '987654324', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'irinconbello'));

-- Insertar en la tabla Administrador
INSERT IGNORE INTO Administrador (dni_admin, id_usuario) VALUES ('99999999Z', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'admin'));

-- Insertar en la tabla Niño
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555555A', 'Lucas', 'Gomez', '2015-05-10', 'activo', '12345678A');
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555555B', 'Mia', 'Gomez', '2017-03-22', 'activo', '12345678A');
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555556A', 'Juan', 'Chango', '2014-08-15', 'activo', '87654321B');
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555556B', 'Sofia', 'Chango', '2016-09-30', 'activo', '87654321B');
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555557A', 'Pedro', 'Huamani', '2013-12-01', 'activo', '56781234C');
INSERT IGNORE INTO Nino (dni_nino, nombre, apellido, fecha_nacimiento, nombre_estado, dni_padre) VALUES ('55555557B', 'Valeria', 'Huamani', '2018-02-11', 'activo', '56781234C');

-- Insertar en la tabla Guardian
INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono) VALUES ('77777777A', 'Carlos', 'Fernandez', '666555444');
INSERT IGNORE INTO Guardian (dni_guardian, nombre, apellido, telefono) VALUES ('77777777B', 'Ana', 'Martinez', '666555445');

-- Insertar en la tabla GuardianNino
INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian) VALUES ('tio', '55555555A', '77777777A');
INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian) VALUES ('abuela', '55555555A', '77777777B');
INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian) VALUES ('tio', '55555556A', '77777777A');
INSERT IGNORE INTO GuardianNino (relacion, dni_nino, dni_guardian) VALUES ('tia', '55555557A', '77777777B');


-- Insertar en la tabla Cronograma
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) 
VALUES ('2025-01-10', '09:00:00', '12:00:00', 'Actividades matutinas para niños', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'rgomez'));
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) 
VALUES ('2025-01-11', '15:00:00', '17:00:00', 'Clase de danza', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'nchile'));
INSERT IGNORE INTO Cronograma (fecha, hora_inicio, hora_fin, descripcion, id_usuario) 
VALUES ('2025-01-12', '10:00:00', '13:00:00', 'Manualidades y arte', (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'mperu'));

-- Insertar en la tabla Actividad
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor) VALUES ('Danza Moderna', '11111111A');
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor) VALUES ('Pintura Infantil', '11111112B');
INSERT IGNORE INTO Actividad (nombre_actividad, dni_monitor) VALUES ('Teatro Infantil', '11111113C');

-- Insertar en la tabla ActividadNino
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino) VALUES (1, '55555555A'); 
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino) VALUES (1, '55555556A'); 
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino) VALUES (2, '55555557A'); 
INSERT IGNORE INTO ActividadNino (id_actividad, dni_nino) VALUES (3, '55555555B'); 

-- Insertar en la tabla CronogramaActividad
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) 
VALUES (1, 1, '09:30:00', 60);  
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) 
VALUES (1, 2, '10:30:00', 90); 
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) 
VALUES (2, 1, '15:30:00', 90);  
INSERT IGNORE INTO CronogramaActividad (id_cronograma, id_actividad, hora_asignada, duracion) 
VALUES (3, 3, '11:00:00', 120); 

-- Insertar en la tabla Conversacion
INSERT IGNORE INTO Conversacion (fecha_creacion) VALUES ('2025-01-10');
INSERT IGNORE INTO Conversacion (fecha_creacion) VALUES ('2025-01-11');

-- Insertar en la tabla ParticipantesConversacion
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario) 
VALUES (1, (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'rgomez'));
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario) 
VALUES (1, (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'nchile'));
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario) 
VALUES (2, (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'mperu'));
INSERT IGNORE INTO ParticipantesConversacion (id_conversacion, id_usuario) 
VALUES (2, (SELECT id_usuario FROM Usuario WHERE nombre_usuario = 'svillanueva'));

-- Insertar en la tabla FichaMedica
INSERT IGNORE INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino) 
VALUES ('Ninguna', 'Penicilina', 'Ibuprofeno', 'Maria Gomez', '555123456', '55555555A');
INSERT IGNORE INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino) 
VALUES ('Huevo, Leche', 'Ninguna', 'Antihistamínico', 'Juan Gomez', '555123457', '55555556A');
INSERT IGNORE INTO FichaMedica (alimentos_alergico, medicamentos_alergico, medicamentos_actuales, nombre_emergencia, telefono_emergencia, dni_nino) 
VALUES ('Fresas', 'Penicilina', 'Amoxicilina', 'Luisa Huamani', '555123458', '55555557A');
