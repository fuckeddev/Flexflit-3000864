document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES DE NAVEGACIÓN Y FORMULARIO
    // Se utiliza 'registerForm' para coincidir exactamente con el ID de tu HTML
    const backButton = document.getElementById('btnBackRegister'); 
    const loginLink = document.getElementById('linkShowLogin'); 
    const registroForm = document.getElementById('registerForm'); 

    // Función central de redirección a Login (RF5)
    const redirectToLogin = () => {
        window.location.href = 'login.html'; 
    };

    // 2. ASIGNACIÓN DE EVENTOS DE NAVEGACIÓN
    if (backButton) {
        backButton.addEventListener('click', redirectToLogin);
    }

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la navegación por defecto
            redirectToLogin();
        });
    }

    // 3. LÓGICA DE REGISTRO E INTEGRACIÓN CON PHP/BD
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue (RF39)

            // Captura de datos del formulario para enviar a la DB flexfit_demo (RF4)
            const formData = new FormData(registroForm);

            // Validación de contraseñas en el cliente antes del envío (RF4)
            const pass = formData.get('password');
            const confirmPass = formData.get('confirm_password');

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden. Por favor, verifica.");
                return;
            }

            // Enviar datos a PHP_LOGIC/registro.php mediante fetch
            fetch('PHP_LOGIC/registro.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                return response.json(); // Se espera respuesta JSON del backend
            })
            .then(data => {
                if (data.status === 'success') {
                    // Registro exitoso: Mostrar mensaje y redirigir (RF5)
                    alert("¡Registro exitoso! " + data.message);
                    redirectToLogin();
                } else {
                    // Manejo de errores controlados (ej: correo ya registrado)
                    alert("Error al registrar: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error en la petición:", error);
                alert("Hubo un problema con la conexión al servidor. Verifica que XAMPP esté activo.");
            });
        });
    } else {
        console.error("Error: Formulario con ID 'registerForm' no encontrado en el HTML.");
    }
});