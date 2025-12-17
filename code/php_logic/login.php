<?php
include 'conexion.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = $_POST['correo'];
    $pass = $_POST['password'];

    // Buscamos al usuario por su correo
    $sql = "SELECT * FROM usuarios WHERE correo_electronico = '$correo'";
    $result = mysqli_query($conexion, $sql);
    $user = mysqli_fetch_assoc($result);

    // Verificamos si existe el usuario y si la contraseña es correcta
    if ($user && password_verify($pass, $user['contrasena'])) {
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['nombre'] = $user['nombre_completo'];
        
        echo json_encode(["status" => "success", "message" => "Bienvenido"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
    }
}
?>