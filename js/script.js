// Funciones para animaciones y efectos interactivos

// Variables globales
let cursorVisible = true;
let cursorScale = 1;
let cursorOpacity = 1;
let cursor;
let cursorTrail = [];
let trailCount = 10;
let audioVisualizer;
let audioVisualizerInterval;

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cursor personalizado
    initCustomCursor();
    
    // Inicializar efecto parallax
    initParallaxEffect();
    
    // Inicializar efecto de máquina de escribir
    initTypingEffect();
    
    // Inicializar animaciones de entrada
    initFadeInAnimations();
    
    // Inicializar visualizador de audio
    initAudioVisualizer();
    
    // Inicializar efecto tilt en la tarjeta
    initTiltEffect();
    
    // Inicializar partículas de fondo
    initParticles();
    
    // Inicializar iconos para skills y redes sociales
    initIcons();
});

// Función para inicializar el cursor personalizado
function initCustomCursor() {
    // Crear elemento del cursor
    cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    // Crear elementos de estela del cursor
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.opacity = 1 - (i / trailCount);
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }
    
    // Eventos del cursor
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursor.style.backgroundColor = 'rgba(104, 211, 145, 0.8)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(104, 211, 145, 0.5)';
    });
    
    // Ocultar cursor nativo
    document.body.style.cursor = 'none';
    
    // Añadir efecto hover a elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .skills-list li, .projects-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'difference';
        });
    });
}

// Función para actualizar la posición del cursor
function updateCursorPosition(e) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Actualizar posición de la estela con retraso
    setTimeout(() => {
        cursorTrail.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = `${e.clientX}px`;
                trail.style.top = `${e.clientY}px`;
            }, index * 40);
        });
    }, 50);
}

// Función para inicializar el efecto parallax
function initParallaxEffect() {
    const card = document.querySelector('.portfolio-card');
    const elements = document.querySelectorAll('.card-column, .profile-pic-container, .name-area, .card-projects');
    
    document.addEventListener('mousemove', (e) => {
        // Reducir la intensidad del efecto dividiendo por un número mayor
        const xAxis = (window.innerWidth / 2 - e.pageX) / 75; // Reducido de 25 a 75
        const yAxis = (window.innerHeight / 2 - e.pageY) / 75; // Reducido de 25 a 75
        
        // Aplicar transición suave para movimientos más fluidos
        card.style.transition = 'transform 0.3s ease-out';
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        
        elements.forEach(element => {
            // Reducir la profundidad y el factor de multiplicación
            const depth = element.getAttribute('data-depth') || Math.random() * 0.1 + 0.02; // Reducido
            const translateX = xAxis * depth * 5; // Reducido de 10 a 5
            const translateY = yAxis * depth * 5; // Reducido de 10 a 5
            
            // Aplicar transición suave
            element.style.transition = 'transform 0.3s ease-out';
            element.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(10px)`; // Z reducido de 20 a 10
        });
    });
    
    // Restablecer la posición cuando el mouse sale del documento
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        elements.forEach(element => {
            element.style.transform = 'translateX(0) translateY(0) translateZ(0)';
        });
    });
}

// Función para inicializar el efecto de máquina de escribir
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.display = 'inline-block';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 100 + 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Función para inicializar animaciones de entrada
function initFadeInAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Función para inicializar el visualizador de audio
function initAudioVisualizer() {
    audioVisualizer = document.querySelector('.audio-visualizer');
    
    if (audioVisualizer) {
        // Crear barras de audio
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.classList.add('audio-bar');
            audioVisualizer.appendChild(bar);
        }
        
        // Animar barras de audio
        const bars = audioVisualizer.querySelectorAll('.audio-bar');
        
        audioVisualizerInterval = setInterval(() => {
            bars.forEach(bar => {
                const height = Math.floor(Math.random() * 25) + 5;
                bar.style.height = `${height}px`;
                bar.style.setProperty('--random-height', `${height}px`);
            });
        }, 200);
    }
}

// Función para inicializar el efecto tilt en la tarjeta
function initTiltEffect() {
    const card = document.querySelector('.portfolio-card');
    const profilePic = document.querySelector('.profile-pic-container');
    
    if (card && profilePic) {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const profilePicRect = profilePic.getBoundingClientRect();
            
            // Calcular la posición relativa del mouse dentro de la tarjeta
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            // Calcular la posición relativa del mouse respecto a la foto de perfil
            const profileX = e.clientX - profilePicRect.left;
            const profileY = e.clientY - profilePicRect.top;
            
            // Aplicar efecto tilt a la foto de perfil si el mouse está cerca
            if (
                profileX >= -50 && profileX <= profilePicRect.width + 50 &&
                profileY >= -50 && profileY <= profilePicRect.height + 50
            ) {
                // Reducir la intensidad del tilt
                const tiltX = (profilePicRect.width / 2 - profileX) / 25; // Reducido de 10 a 25
                const tiltY = (profilePicRect.height / 2 - profileY) / 25; // Reducido de 10 a 25
                
                // Añadir transición suave
                profilePic.style.transition = 'transform 0.3s ease-out';
                profilePic.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
                
                // Mostrar el brillo con menor intensidad
                const glow = document.querySelector('.profile-pic-glow');
                if (glow) {
                    glow.style.transition = 'opacity 0.3s ease';
                    glow.style.opacity = '0.7'; // Reducido de 1 a 0.7
                    glow.style.background = `radial-gradient(circle at ${profileX}px ${profileY}px, rgba(104, 211, 145, 0.3), transparent 70%)`; // Reducido de 0.4 a 0.3
                }
            } else {
                profilePic.style.transform = 'rotateX(0) rotateY(0)';
                
                // Ocultar el brillo
                const glow = document.querySelector('.profile-pic-glow');
                if (glow) {
                    glow.style.opacity = '0';
                }
            }
        });
        
        // Restablecer cuando el mouse sale de la tarjeta
        card.addEventListener('mouseleave', () => {
            profilePic.style.transform = 'rotateX(0) rotateY(0)';
            
            // Ocultar el brillo
            const glow = document.querySelector('.profile-pic-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    }
}

// Función para inicializar partículas de fondo
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        // Crear partículas
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Estilos aleatorios para cada partícula
            const size = Math.random() * 5 + 1;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Variables CSS personalizadas para animación
            particle.style.setProperty('--random-x1', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--random-y1', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--random-x2', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--random-y2', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--random-x3', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--random-y3', `${Math.random() * 100 - 50}px`);
            
            // Animación
            particle.style.animation = `particleMove ${Math.random() * 20 + 10}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Función para inicializar iconos para skills y redes sociales
function initIcons() {
    // Iconos para skills
    const skillsList = document.querySelectorAll('.skills-list li');
    const skillIcons = {
        'Designer': '<i class="bi bi-palette-fill"></i>',
        'Desktop App': '<i class="bi bi-window-desktop"></i>',
        'Dev. FullStack': '<i class="bi bi-code-slash"></i>',
        'Python dev': '<i class="bi bi-filetype-py"></i>',
        'AI passionate': '<i class="bi bi-robot"></i>',
        'Student': '<i class="bi bi-mortarboard-fill"></i>'
    };
    
    skillsList.forEach(skill => {
        const skillText = skill.textContent.trim();
        if (skillIcons[skillText]) {
            skill.innerHTML = `${skillIcons[skillText]} ${skillText}`;
        }
    });
    
    // Iconos para redes sociales
    const socialLinks = document.querySelectorAll('.social-links li a');
    const socialIcons = {
        'GitHub': '<i class="bi bi-github"></i>',
        'LinkedIn': '<i class="bi bi-linkedin"></i>',
        'Instagram': '<i class="bi bi-instagram"></i>',
        'Email': '<i class="bi bi-envelope-fill"></i>'
    };
    
    socialLinks.forEach(link => {
        const linkText = link.textContent.trim();
        if (socialIcons[linkText]) {
            link.innerHTML = `${socialIcons[linkText]} ${linkText}`;
        }
    });
}

// Función para aplicar efecto glitch al nombre
function applyGlitchEffect() {
    const mainName = document.querySelector('.main-name');
    if (mainName) {
        mainName.classList.add('animate-glitch');
        setTimeout(() => {
            mainName.classList.remove('animate-glitch');
        }, 2000);
    }
}

// Aplicar efecto glitch periódicamente
setInterval(applyGlitchEffect, 10000);
