<?php

use Illuminate\Support\Facades\Route;

// ? Define una ruta GET que acepta cualquier valor en el segmento {pagina}

    // resource_path(): Devuelve la ruta completa al directorio de recursos de Laravel
    // file_exists(): Verifica si un archivo o directorio existe
    // response()->file(): Devuelve un archivo como respuesta HTTP
    // where(): Restringe el valor de un parámetro de ruta a una expresión regular
    
Route::get('/{pagina}', function ($pagina) {
    //  * Construye la ruta del archivo basado en el valor de {pagina}
    $archivo = resource_path("views/{$pagina}.html");

    // * Verifica si el archivo existe
    if (file_exists($archivo)) {
        //  * Si el archivo existe, devuelve el archivo como respuesta
        return response()->file($archivo);
    } else {
        // ! Si el archivo no existe, devuelve un error 404
        return response()->file(resource_path('views/404.html'));
    }
// * Restringe el valor de {pagina} a solo contener letras, números, guiones y guiones bajos
})->where('pagina', '[a-zA-Z0-9-_]+');

