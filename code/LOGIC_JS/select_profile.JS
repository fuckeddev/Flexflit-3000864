document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones con la clase 'profile-option'
    const profileOptions = document.querySelectorAll('.profile-option');

    profileOptions.forEach(button => {
        button.addEventListener('click', () => {
            
            // Obtener el perfil del data-target (ej: 'admin')
            const profile = button.getAttribute('data-target'); 
            
            // Redirección al archivo de login, pasando el perfil por URL
            window.location.href = `login.html?profile=${profile}`; 
        });
    });
});