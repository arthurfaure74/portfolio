// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(100, 255, 218, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
        particlesContainer.appendChild(particle);
    }
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(10px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(-10px, -40px) rotate(180deg);
        }
        75% {
            transform: translate(-20px, -20px) rotate(270deg);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// Tabs for Parcours
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Smooth reveal on scroll (AOS alternative)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Typing effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '3px solid var(--accent)';

    let i = 0;
    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Blink cursor
            setInterval(() => {
                typingText.style.borderRight = typingText.style.borderRight === 'none' 
                    ? '3px solid var(--accent)' 
                    : 'none';
            }, 500);
        }
    }

    setTimeout(type, 500);
}

// Progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');

    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Trigger progress bar animation when competences section is visible
const competencesSection = document.querySelector('.competences');
if (competencesSection) {
    const competencesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                competencesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    competencesObserver.observe(competencesSection);
}

// Number counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    aboutObserver.observe(aboutSection);
}

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);

        // Show success message
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');

        // Reset form
        contactForm.reset();
    });
}

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Tech items hover effect
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Competence cards 3D effect
const competenceCards = document.querySelectorAll('.competence-card');
competenceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent);
    color: var(--dark-bg);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 10px 25px rgba(100, 255, 218, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
});

// Cursor trail effect (optional)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: trailFade 0.5s ease-out forwards;
        z-index: 9999;
    `;

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(trailStyle);

// Console message
console.log('%c🎓 Portfolio BUT R&T', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%c📚 Basé sur le Programme National BUT Réseaux & Télécommunications', 'color: #8892b0; font-size: 14px;');
console.log('%c💻 Développé avec HTML, CSS & JavaScript', 'color: #8892b0; font-size: 14px;');

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent context menu on images (optional)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== Projets : fenêtre des preuves =====
const PROJETS = {
  web: {
    titre: "Se Présenter sur Internet",
    desc: "Création d'un site web personnel avec HTML, CSS et JavaScript.",
    preuves: [
      { type: "img", titre: "Page d'accueil", src: "./projets/web/accueil.png", alt: "Page d'accueil du site" },
      { type: "code", titre: "Extrait de configuration", code: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Arthur Faure</title>
    <link rel="stylesheet" href="./css/default.css">
    <link rel="stylesheet" href="./css/layout.css">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="left-header">
                <h1>Arthur Faure</h1>
                <p class="subtitle">CV Étudiant - BUT R&amp;T</p>
            </div>
            <div class="right-header">
                <address>
                    26 rue du bienheureux pierre favre<br>
                    74230, Thônes<br>
                    <a target="_blank" href="tel:+330784939635">(+33) 07 84 93 96 35</a><br>
                    <a target="_blank" href="mailto:arthur.faure74@gmail.com">arthur.faure74@gmail.com</a>
                </address>
            </div>
        </header>
        <hr class="divider">

        <section class="section">
            <h2>Compétences</h2>
            <div class="content">
                <p>Cisco CCNAv7 - ITN (en cours)</p>
                <p>Python - Fondamentaux de la programmation</p>
                <p>Commandes CLI de base</p>
                <p>Outils de virtualisation - VirtualBox</p>
                <p>Simulateurs réseaux - Packet Tracer</p>
            </div>
        </section>
` }
    ]
  },
  integratif: {
    titre: "Projet Intégratif",
    desc: "Projet mobilisant les compétences de première année.",
    preuves: [
      { type: "img", titre: "Schéma du projet", src: "./projets/integratif/schema.png", alt: "Schéma du projet" }
    ]
  },
  secu: {
    titre: "Sécurisation et supervision avancées d'un SI",
    desc: "Mise en place de mesures de sécurité et de supervision sur un système d'information.",
    preuves: [
      { type: "img", titre: "Schéma réseau", src: "./projets/secu/schema-reseau.png", alt: "Schéma réseau sécurisé" },
      { type: "img", titre: "Règles de pare-feu", src: "./projets/secu/regles-pare-feu.png", alt: "Règles de pare-feu" }
    ]
  },
  pwa: {
    titre: "Développer des applications communicantes (PWA)",
    desc: "Application web installable, utilisable avec une connexion limitée.",
    preuves: [
      { type: "img", titre: "Application sur smartphone", src: "./projets/pwa/mobile.png", alt: "PWA sur smartphone" },
      { type: "code", titre: "manifest.json", code: `{
  "name": "SafeWalker",
  "short_name": "SafeWalker",
  "theme_color": "#ffffff",
  "background_color": "#4f4f4f",
  "display": "standalone",
  "start_url": "https://srv-peda2.iut-acy.univ-smb.fr/faarthur/PWAPP/PWA_SAE302/",
  "scope": "https://srv-peda2.iut-acy.univ-smb.fr/faarthur/PWAPP/PWA_SAE302/",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/faarthur/PWAPP/PWA_SAE302/favicon/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/faarthur/PWAPP/PWA_SAE302/favicon/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "screenshots": [
    {
      "src": "/faarthur/PWAPP/PWA_SAE302/favicon/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/faarthur/PWAPP/PWA_SAE302/favicon/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}
` }
    ]
  }
};

const projetModal = document.getElementById('projet-modal');
if (projetModal) {
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mContent = document.getElementById('modal-content');
  let lastFocus = null;

  function ouvrirProjet(id) {
    const p = PROJETS[id];
    if (!p) return;
    mTitle.textContent = p.titre;
    mDesc.textContent = p.desc;
    mContent.innerHTML = '';
    p.preuves.forEach(pr => {
      const bloc = document.createElement('div');
      bloc.className = 'proof';
      const h = document.createElement('h4');
      h.textContent = pr.titre;
      bloc.appendChild(h);
      if (pr.type === 'img') {
        const img = document.createElement('img');
        img.src = pr.src;
        img.alt = pr.alt || pr.titre;
        img.loading = 'lazy';
        img.addEventListener('click', () => window.open(pr.src, '_blank', 'noopener'));
        bloc.appendChild(img);
      } else {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = pr.code;
        pre.appendChild(code);
        bloc.appendChild(pre);
      }
      mContent.appendChild(bloc);
    });
    lastFocus = document.activeElement;
    projetModal.hidden = false;
    document.body.style.overflow = 'hidden';
    projetModal.querySelector('.modal-close').focus();
  }

  function fermerProjet() {
    projetModal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.projet-card').forEach(card => {
    card.addEventListener('click', () => ouvrirProjet(card.dataset.projet));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ouvrirProjet(card.dataset.projet);
      }
    });
  });

  projetModal.addEventListener('click', e => { if (e.target === projetModal) fermerProjet(); });
  projetModal.querySelector('.modal-close').addEventListener('click', fermerProjet);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !projetModal.hidden) fermerProjet();
  });
}
