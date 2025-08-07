const menuOpenButton= document.querySelector("#menu-open-button");
const menuCloseButton= document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click",()=>{
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click",()=>menuOpenButton.click() )
const swiper = new Swiper('.slider-wrapper', {
 
  loop: true,
  grabCursor:true,
  spaceBetween:25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
        clickable:true,
        dynamicBullets:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints:{
    0:{
        slidesPerView:1
    },
    768:{
        slidesPerView:2
    },
    1024:{
        slidesPerView:3
    }
  }
});

// Contact form validation and message
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.style.color = '#f3961c';
            return;
        }
        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = '#f3961c';
            return;
        }
        formMessage.textContent = 'Thank you for contacting us!';
        formMessage.style.color = '#3b141c';
        contactForm.reset();
    });
}

// Animation d'apparition des sections au scroll
const revealSections = document.querySelectorAll('section');
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Loader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 600); // délai pour l'effet
});

// Scroll doux pour les liens du menu
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to Top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = darkModeToggle.querySelector('i');
function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkModeIcon.className = enabled ? 'fa fa-sun' : 'fa fa-moon';
    localStorage.setItem('darkMode', enabled ? '1' : '0');
    darkModeToggle.title = enabled ? 'Mode clair' : 'Mode sombre';
}
// Initial state from localStorage
const darkModePref = localStorage.getItem('darkMode') === '1';
setDarkMode(darkModePref);
darkModeToggle.addEventListener('click', function() {
    setDarkMode(!document.body.classList.contains('dark-mode'));
});

// Lightbox pour la galerie
function createLightbox() {
    let overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.innerHTML = '<button class="close-btn" title="Close"><i class="fa fa-times"></i></button><img src="" alt="Gallery preview">';
    document.body.appendChild(overlay);
    return overlay;
}
const lightboxOverlay = createLightbox();
const lightboxImg = lightboxOverlay.querySelector('img');
const closeBtn = lightboxOverlay.querySelector('.close-btn');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxOverlay.classList.add('active');
}
function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
}
// Ouvre la lightbox au clic sur une image
const galleryImgs = document.querySelectorAll('.gallery-img');
galleryImgs.forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.dataset.full, this.alt);
    });
});
closeBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) closeLightbox();
});
document.addEventListener('keydown', function(e) {
    if (lightboxOverlay.classList.contains('active') && e.key === 'Escape') closeLightbox();
});

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
        // Ferme les autres
        faqItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
        // Toggle celle-ci
        item.classList.toggle('open');
    });
});