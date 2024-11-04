// Mostrar el loader al cargar la página
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hidden"); // Ocultar el loader después de 2 segundos
    }, 1000);
});

// // Ocultar el loader una vez que la página está completamente cargada
// window.addEventListener("load", () => {
//     const loader = document.getElementById("loader");
//     loader.classList.add("hidden");
// });

particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Partículas cargadas correctamente');
  });
  

// Mostrar el modal al hacer clic en "Contacto"
const contactLink = document.querySelector('a[href="#contacto"]');
const modal = document.getElementById("contact-modal");
const closeModal = document.querySelector(".close");

contactLink.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar que el enlace realice la acción por defecto
    modal.classList.remove("hidden"); // Mostrar el modal
});

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden"); // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden"); // Ocultar el modal
    }
});
