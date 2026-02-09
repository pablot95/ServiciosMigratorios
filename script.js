document.addEventListener('DOMContentLoaded', () => {
    // Menú Hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Cambiar icono de hamburguesa a X
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Desplazamiento suave (para navegadores antiguos que no soportan scroll-behavior: smooth en CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste por el header fijo (80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                observer.unobserve(entry.target); // Animación ocurre una sola vez
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- NUEVO: Efecto 3D Tilt en Tarjetas (Mouse Move) ---
    const cards = document.querySelectorAll('.service-card, .reason-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X dentro del elemento
            const y = e.clientY - rect.top;  // Posición Y dentro del elemento
            
            // Calculamos rotación (-15deg a 15deg)
            const xRotation = -1 * ((y - rect.height / 2) / rect.height * 10);
            const yRotation = (x - rect.width / 2) / rect.width * 10;

            // Variables para efecto Spotlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Aplicamos transformación
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
            card.style.transition = 'transform 0.1s ease'; // Rápida respuesta al mover
        });

        card.addEventListener('mouseleave', () => {
            // Volver a estado original
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease'; // Suave retorno
        });
    });

    const hero = document.querySelector('.hero');
    // PARALLAX EN CSS AHORA manejado por background-attachment: fixed para mejor performance y estabilidad
});