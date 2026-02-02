// Gestion du thème clair/sombre
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const THEME_KEY = 'but-rt-theme';

// Appliquer le thème sauvegardé
function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// Basculer le thème
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
});

// Gestion du scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// Mise à jour de l'année dans le footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Animation légère sur les cartes au scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card, .skill-card, .path-card, .project-card, .job-card, .tech-column').forEach(el => {
    observer.observe(el);
});

// Gestion simple du formulaire de contact (simulation)
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.textContent = 'Envoi en cours...';

        setTimeout(() => {
            formStatus.textContent = 'Merci pour votre message ! Je vous répondrai dès que possible.';
            contactForm.reset();
        }, 1000);
    });
}
