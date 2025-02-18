<?php
// ? ===== HomeModel.php: Modelo de la página principal ===== ? //
class HomeModel { // * Clase HomeModel: Aqui se define el modelo de la página principal. * //
    public function getData() {
        return [
            'title'   => 'Bienvenido a Mi Proyecto Web',
            'content' => 'Este es el contenido de la página principal.'
        ];
    }
}
?>