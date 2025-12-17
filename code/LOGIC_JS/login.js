document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES CLAVE
    const backButton = document.querySelector('.back-button'); 
    const registerLink = document.getElementById('linkShowRegister');
    const loginForm = document.getElementById('loginForm'); // Asegúrate que tu HTML tenga id="loginForm"

    // ================= A. BOTÓN DE RETROCESO (←) =================
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Acción: Volver al selector de perfil
            window.location.href = 'select_profile.html'; 
        });
    }
    
    // ================= B. ENLACE A REGISTRO ("REGÍSTRATE") =================
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Acción: Ir a la página de registro
            window.location.href = 'register.html'; 
        });
    }

    // ================= C. LÓGICA DE INICIO DE SESIÓN (PHP/BD) =================
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // RF39: Evita que la página se limpie o recargue automáticamente
            e.preventDefault(); 

            // RF4: Captura de credenciales del formulario
            const formData = new FormData(loginForm);

            // Enviar datos a PHP_LOGIC/login.php mediante fetch
            fetch('PHP_LOGIC/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Verificamos que la respuesta del servidor sea válida
                if (!response.ok) throw new Error('Error en la red');
                return response.json(); 
            })
            .then(data => {
                if (data.status === 'success') {
                    // RF5: Si las credenciales coinciden, redirige al Dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // Manejo de errores (ej: usuario no encontrado o clave incorrecta)
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error en el login:", error);
                alert("Hubo un problema al conectar con el servidor. Verifica que Apache en XAMPP esté activo.");
            });
        });
    } else {
        console.error("Error: No se encontró el elemento con ID 'loginForm' en el HTML.");
    }
});