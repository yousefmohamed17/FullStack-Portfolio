// 1. Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => { loadingScreen.classList.add('hide'); }, 2500); 
    }
});

// 2. Mobile Sidebar Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// 3. Close sidebar on link click (Mobile)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768 && sidebar) {
            sidebar.classList.remove('active');
        }
    });
});

// 4. Scroll Spy (Active Links) - Fixed Contact Issue
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    // Fix: Highlight "contact" when scrolled to the very bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 5. Scroll Reveal Animation (Fade In)
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); 

fadeElements.forEach(el => observer.observe(el));

// 6. WhatsApp Message Form
function sendToWhatsApp(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const message = document.getElementById('sender-message').value;
    
    // WhatsApp Number
    const phone = "201557893990"; 
    
    // Formatting the message
    const text = `Hello Yousef, I found your portfolio and want to work with you.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

// 7. Typing Animation
if (document.getElementById('typed-text')) {
    var typed = new Typed('#typed-text', {
        strings: ["Full Stack Developer.", "Web Designer.", "Problem Solver."],
        typeSpeed: 50, 
        backSpeed: 30, 
        backDelay: 1500, 
        loop: true
    });
}