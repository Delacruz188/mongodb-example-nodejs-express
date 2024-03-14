-- Creación de la tabla alumnos
CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    edad INT,
    genero VARCHAR(10),
    grado VARCHAR(10)
);

-- Inserción de datos en la tabla alumnos
INSERT INTO alumnos (nombre, edad, genero, grado) VALUES
('Juan Perez', 18, 'Masculino', '10mo'),
('Maria Lopez', 17, 'Femenino', '11vo'),
('Pedro Ramirez', 16, 'Masculino', '10mo'),
('Ana Rodriguez', 18, 'Femenino', '12vo'),
('Luis Martinez', 17, 'Masculino', '11vo');

-- Creación de la tabla maestros
CREATE TABLE maestros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    edad INT,
    materia VARCHAR(50),
    experiencia INT
);

-- Inserción de datos en la tabla maestros
INSERT INTO maestros (nombre, edad, materia, experiencia) VALUES
('Carlos Fernandez', 35, 'Matemáticas', 10),
('Laura Gomez', 40, 'Historia', 15),
('Pedro Sanchez', 38, 'Ciencias', 12),
('Ana Torres', 33, 'Literatura', 8),
('Juan Diaz', 42, 'Física', 20);

-- Creación de la tabla materias
CREATE TABLE materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Inserción de datos en la tabla materias
INSERT INTO materias (nombre, descripcion) VALUES
('Matemáticas', 'Matemáticas básicas y avanzadas'),
('Historia', 'Historia mundial y local'),
('Ciencias', 'Biología, Química y Física'),
('Literatura', 'Literatura universal y local'),
('Física', 'Conceptos básicos y avanzados de física');

-- Creación de la tabla reprobados
CREATE TABLE reprobados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT,
    materia_id INT,
    maestro_id INT,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (materia_id) REFERENCES materias(id),
    FOREIGN KEY (maestro_id) REFERENCES maestros(id)
);

-- Inserción de datos en la tabla reprobados
INSERT INTO reprobados (alumno_id, materia_id, maestro_id) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 4, 4),
(4, 2, 3),
(5, 5, 5);
