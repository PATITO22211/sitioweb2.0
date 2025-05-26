document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const adaItems = document.querySelectorAll('.ada-item');
    let currentlyPlayingButton = null;
    let currentAdaItem = null;
    let currentProgressBar = null;

    // Animación escalonada para las tarjetas
    adaItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;

        const button = item.querySelector('.listen-btn');
        const progressBarContainer = item.querySelector('.progress-bar-container');
        const progressBar = item.querySelector('.progress-bar');
        const icon = button.querySelector('i');

        button.addEventListener('click', () => {
            const audioFile = button.dataset.audio;

            if (currentlyPlayingButton === button) { // Clic en el mismo botón
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    button.classList.add('playing');
                    item.classList.add('is-playing');
                } else {
                    audioPlayer.pause();
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    button.classList.remove('playing');
                    // No quitamos is-playing de la tarjeta al pausar, solo al terminar o cambiar de track
                }
            } else { // Clic en un botón diferente o es la primera vez
                if (currentlyPlayingButton) {
                    const prevIcon = currentlyPlayingButton.querySelector('i');
                    prevIcon.classList.remove('fa-pause');
                    prevIcon.classList.add('fa-play');
                    currentlyPlayingButton.classList.remove('playing');
                    if (currentAdaItem) currentAdaItem.classList.remove('is-playing');
                    if (currentProgressBar) currentProgressBar.style.width = '0%';
                }

                audioPlayer.src = audioFile;
                audioPlayer.play()
                    .then(() => {
                        icon.classList.remove('fa-play');
                        icon.classList.add('fa-pause');
                        button.classList.add('playing');
                        item.classList.add('is-playing');
                        currentlyPlayingButton = button;
                        currentAdaItem = item;
                        currentProgressBar = progressBar;
                    })
                    .catch(error => {
                        console.error("Error al reproducir el audio:", error);
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play'); // Reset icon
                        alert(`No se pudo cargar el audio: ${audioFile}. Verifica que el archivo exista.`);
                    });
            }
        });

        // Funcionalidad de la barra de progreso (clic para buscar)
        progressBarContainer.addEventListener('click', (e) => {
            if (currentAdaItem === item && !audioPlayer.paused) { // Solo si este audio está sonando
                const progressBarRect = progressBarContainer.getBoundingClientRect();
                const clickPositionInBar = e.clientX - progressBarRect.left;
                const percentage = clickPositionInBar / progressBarRect.width;
                audioPlayer.currentTime = audioPlayer.duration * percentage;
            } else if (currentAdaItem !== item || audioPlayer.paused) {
                // Si se hace clic en la barra de progreso de un audio que no está sonando,
                // o está pausado, iniciar la reproducción desde ese punto.
                button.click(); // Simula un clic en el botón de play
                // Espera un poco para que el audio cargue antes de intentar buscar
                setTimeout(() => {
                     if (audioPlayer.readyState >= 1) { // HAVE_METADATA or more
                        const progressBarRect = progressBarContainer.getBoundingClientRect();
                        const clickPositionInBar = e.clientX - progressBarRect.left;
                        const percentage = clickPositionInBar / progressBarRect.width;
                        if (isFinite(audioPlayer.duration)) {
                            audioPlayer.currentTime = audioPlayer.duration * percentage;
                        }
                    }
                }, 200); // Puede necesitar ajuste
            }
        });
    });

    // Actualizar barra de progreso y manejar fin de audio
    audioPlayer.addEventListener('timeupdate', () => {
        if (currentProgressBar && !isNaN(audioPlayer.duration)) {
            const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            currentProgressBar.style.width = `${percentage}%`;
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (currentlyPlayingButton) {
            const icon = currentlyPlayingButton.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            currentlyPlayingButton.classList.remove('playing');
        }
        if (currentAdaItem) {
            currentAdaItem.classList.remove('is-playing');
        }
        if (currentProgressBar) {
            currentProgressBar.style.width = '0%'; // Reset progress bar
        }
        // No resetear currentlyPlayingButton ni currentAdaItem aquí,
        // se resetearán cuando se seleccione un nuevo audio.
        // Opcional: resetearlos si quieres que el estado "último reproducido" se borre
        // currentlyPlayingButton = null;
        // currentAdaItem = null;
        // currentProgressBar = null;
    });

    audioPlayer.addEventListener('pause', () => {
        // Si se pausa externamente (no por el botón) y el botón sigue mostrando "pause"
        if (currentlyPlayingButton && audioPlayer.paused && !audioPlayer.ended) {
            const icon = currentlyPlayingButton.querySelector('i');
            if (icon.classList.contains('fa-pause')) { // Solo si el botón no fue el que causó la pausa
                // icon.classList.remove('fa-pause');
                // icon.classList.add('fa-play');
                // No cambiamos el icono aquí, dejamos que el usuario lo haga si quiere reanudar
                // La clase 'playing' en el botón se maneja por el click
            }
            // La clase 'is-playing' de la tarjeta se mantiene en pausa para saber cuál estaba activa
        }
    });

});