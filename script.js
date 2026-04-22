// 1. Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => { loadingScreen.classList.add('hide'); }, 2000); 
    }
});

// 2. EmailJS Integration
emailjs.init("JX43wxcTpoAl8eX0a"); 

const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        emailjs.sendForm('service_voffo5j', 'template_a3xb8x8', this)
            .then(() => {
                submitBtn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#25D366';
                submitBtn.style.color = '#fff';
                this.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            }, (error) => {
                submitBtn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
                submitBtn.style.backgroundColor = '#ff5f56';
                submitBtn.style.color = '#fff';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            });
    });
}

// 3. Mobile Sidebar Toggle & Close on Click
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-links a');

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mobileToggle.classList.toggle('active'); // بنضيف دي عشان الأنيميشن يشتغل
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768 && sidebar) {
            sidebar.classList.remove('active');
            mobileToggle.classList.remove('active'); // بنضيف دي عشان يرجع 3 خطوط لما تدوس على أي لينك
        }
    });
});

// 4. Scroll Spy (Active Links highlighting)
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

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

// 5. Typing Animation (Fixed Layout Shift)
if (document.getElementById('typed-text')) {
    var typed = new Typed('#typed-text', {
        strings: ["Full Stack Developer.", "Web Designer.", "Problem Solver."],
        typeSpeed: 50, 
        backSpeed: 30, 
        backDelay: 1500, 
        loop: true
    });
}

// 6. Scroll Reveal Animation (Fade In)
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); 

fadeElements.forEach(el => observer.observe(el));