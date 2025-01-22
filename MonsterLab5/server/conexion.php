<?php

// ? base-datos.php: Este archivo se encarga de crear la base de datos y las tablas necesarias para el funcionamiento del sistema.

// echo "Iniciando script para crear la base de datos y tablas necesarias...<br>";

// * servervname: Nombre del servidor.
// * username: Nombre de usuario.
// * password: Contraseña.

$servername = "localhost";
$username = "root";
$password = "";

// * sqlFile: Ruta del archivo SQL.
// * __DIR__: Devuelve el directorio del archivo actual.

$sqlFile = __DIR__ . '/../database/conexion.sql'; // ! NO TOCAR: Funciona para obtener la ruta del archivo SQL.

// echo "Archivo SQL ubicado en: $sqlFile<br>";

// * conn: Conexión a la base de datos utilizando los datos de conexión declarados anteriormente.

//echo "Intentando conectar al servidor MySQL...<br>";
$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) { // ! Si la conexión falla, se muestra un mensaje de error.
    die("Conexión fallida: " . $conn->connect_error . "<br>");
} else {
   // echo "Conexión exitosa al servidor MySQL.<br>";
}

// * sql: Lee el contenido del archivo SQL y lo almacena en la variable $sql.
// * file_get_contents: Lee el contenido de un archivo y lo devuelve como una cadena.

// echo "Leyendo el archivo SQL...<br>";
$sql = file_get_contents($sqlFile);

if ($sql === false) { // ! Si no se puede leer el archivo SQL, se muestra un mensaje de error.
    die("Error al leer el archivo SQL: Verifique que el archivo exista y tenga permisos.<br>");
} else {
    //echo "Archivo SQL leído correctamente.<br>";
}

// * multi_query: Ejecuta una o múltiples consultas SQL en la base de datos.

// echo "Ejecutando las consultas del archivo SQL...<br>";
if ($conn->multi_query($sql) === TRUE) { // * Si la consulta SQL se ejecuta correctamente, se muestra un mensaje de éxito.

   // echo "Consultas ejecutadas correctamente. Procesando resultados...<br>";

    // ? Procesar todos los resultados de las consultas anteriores.

    while ($conn->more_results() && $conn->next_result()) { // * Mientras haya más resultados, se procesan.
        
        if ($res = $conn->store_result()) { // * Si hay un resultado, se libera la memoria.
            // echo "Resultado procesado y memoria liberada.<br>";
            $res->free(); // * Libera la memoria del resultado.
        }
    }
    // echo "Base de datos y tablas creadas exitosamente.<br>";
} else {
    die("Error al crear la base de datos y las tablas: " . $conn->error . "<br>");
}


// ? Logica para insertar datos en la base de datos a partir de un archivo SQL.

    // * insertarDatosPath: Ruta del archivo insertar-datos.sql.

    $insertarDatosPath = realpath(__DIR__ . '/../database/insertar-datos.sql'); // ! NO TOCAR: Funciona para obtener la ruta del archivo insertar-datos.sql.
    if ($insertarDatosPath === false) {
        die("Error: No se pudo encontrar el archivo insertar-datos.sql"); // ! Si no se puede encontrar el archivo insertar-datos.sql, se muestra un mensaje de error.
    } else {
        $sqlInsertarDatos = file_get_contents($insertarDatosPath); // * Lee el contenido del archivo insertar-datos.sql y lo almacena en la variable $sqlInsertarDatos.
        if ($sqlInsertarDatos === false) { // ! Si no se puede leer el archivo insertar-datos.sql, se muestra un mensaje de error.
            die("Error al leer el archivo insertar-datos.sql"); // ! Si no se puede leer el archivo insertar-datos.sql, se muestra un mensaje de error.
        }
    
        if ($conn->multi_query($sqlInsertarDatos) === TRUE) { // * Si la consulta SQL se ejecuta correctamente, se muestra un mensaje de éxito.
            
            while ($conn->more_results() && $conn->next_result()) { // * Mientras haya más resultados, se procesan.
                
                if ($res = $conn->store_result()) { // * Si hay un resultado, se libera la memoria.
                    $res->free(); // * Libera la memoria del resultado.
                }
            }
            //// Mensaje de test para comprobar que se insertan los datos en las tablas: echo "Datos insertados exitosamente";
        } else {
            die("Error al insertar los datos: " . $conn->error); // ! Si hay un error al insertar los datos, se muestra un mensaje de error.
        }
    }


// Cerrar la conexión
$conn->close();
// echo "Conexión cerrada.<br>";

?>
