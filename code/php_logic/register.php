<?php
// 1. Desactivar la visualización de errores HTML para que no rompan el JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

include 'conexion.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // 2. Capturar datos con validación básica
    $nombre   = isset($_POST['nombre']) ? mysqli_real_escape_string($conexion, $_POST['nombre']) : '';
    $correo   = isset($_POST['correo']) ? mysqli_real_escape_string($conexion, $_POST['correo']) : '';
    $telefono = isset($_POST['telefono']) ? mysqli_real_escape_string($conexion, $_POST['telefono']) : '';
    $genero   = isset($_POST['genero']) ? mysqli_real_escape_string($conexion, $_POST['genero']) : '';
    $rol_id   = isset($_POST['rol_id']) ? intval($_POST['rol_id']) : 1;
    $pass     = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_BCRYPT) : '';

    // 3. Verificar si el correo ya existe para evitar errores de duplicado
    $checkEmail = mysqli_query($conexion, "SELECT id FROM usuarios WHERE correo_electronico = '$correo'");
    
    if (mysqli_num_rows($checkEmail) > 0) {
        $response = ["status" => "error", "message" => "El correo ya está registrado."];
    } else {
        // 4. Insertar usando los nombres EXACTOS de tus columnas en phpMyAdmin
        $sql = "INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena, genero, telefono, rol_id) 
                VALUES ('$nombre', '$correo', '$pass', '$genero', '$telefono', '$rol_id')";

        if (mysqli_query($conexion, $sql)) {
            $response = ["status" => "success", "message" => "¡Usuario creado exitosamente!"];
        } else {
            $response = ["status" => "error", "message" => "Error en BD: " . mysqli_error($conexion)];
        }
    }
} else {
    $response = ["status" => "error", "message" => "Método no permitido"];
}

// 5. Enviar la respuesta final como JSON puro
echo json_encode($response);
exit;