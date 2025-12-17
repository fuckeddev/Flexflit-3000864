<?php
// Configuración de la base de datos
$host = "localhost";
$user = "root"; // Usuario por defecto de XAMPP
$pass = "";     // Por defecto XAMPP no tiene contraseña
$db   = "flexfit_demo"; // Tu nombre aclarado

// Crear la conexión usando MySQLi
$conexion = mysqli_connect($host, $user, $pass, $db);

// Verificar si la conexión fue exitosa
if (!$conexion) {
    die("❌ Error de conexión: " . mysqli_connect_error());
}

// Configurar para que acepte tildes y eñes (UTF-8)
mysqli_set_charset($conexion, "utf8");

// Si llegamos aquí, la conexión es exitosa (opcional para pruebas)
// echo "✅ Conexión establecida con flexfit_demo";
?>