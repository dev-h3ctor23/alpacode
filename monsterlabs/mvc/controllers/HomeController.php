<?php
// ? ===== HomeController.php: Controlador de la página principal ===== ? //

// ! require_once: HomeModel.php -> Requerir el modelo de la página principal. ! //
require_once __DIR__ . '/../models/HomeModel.php';

class HomeController { // * Clase HomeController: Aqui se define el controlador de la página principal. * //

    // * Método index: Mostrar la página principal. * //
    public function index() {
        // * Crear una instancia del modelo de la página principal.
        $model = new HomeModel();
        // * Obtener los datos del modelo de la página principal.
        $data = $model->getData();

        // Cargar la vista completa, que ya contiene header, footer, etc.
        $viewTemplate = file_get_contents(__DIR__ . '/../views/home.html');
        // $viewTemplate = str_replace('{{title}}', $data['title'], $viewTemplate);
        // $viewTemplate = str_replace('{{content}}', $data['content'], $viewTemplate);
        
        echo $viewTemplate;
    }
}
?>