document.addEventListener('DOMContentLoaded', () => {
    // RF3 & RF4: Botón Iniciar entrenamiento
    const startBtn = document.getElementById('startWorkoutBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Te envía a la página de rutinas
            window.location.href = 'rutina.html';
        });
    }

    // Lógica para resaltar el menú según la página (opcional)
    console.log("Dashboard Premium Cargado Correctamente");
});