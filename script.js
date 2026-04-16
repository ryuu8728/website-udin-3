// Typing Effect
const texts = [
    "Web Developer",
    "Front-End Developer",
    "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentText = texts[textIndex];
    const typedTextElement = document.getElementById('typedText');
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Music Player
// Music Player dengan File Audio
let isPlaying = false;
let audio = null;

const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

// GANTI INI dengan path file musik Anda
// Letakkan file musik di folder yang sama dengan index.html
const musicFile = 'music.mp3'; // atau 'music.wav', 'song.mp3', dll

function initAudio() {
    if (!audio) {
        audio = new Audio(musicFile);
        audio.loop = true; // Musik akan repeat terus
        audio.volume = 0.3; // Volume 30% (0.0 - 1.0)
    }
}

musicBtn.addEventListener('click', () => {
    initAudio();
    
    if (!isPlaying) {
        audio.play()
            .then(() => {
                musicIcon.textContent = '🔇';
                isPlaying = true;
                musicBtn.style.background = 'linear-gradient(135deg, #ec4899, #8b5cf6)';
            })
            .catch(error => {
                console.log('Error playing audio:', error);
                alert('⚠️ Tidak bisa memutar musik. Pastikan file musik ada!');
            });
    } else {
        audio.pause();
        musicIcon.textContent = '🔊';
        isPlaying = false;
        musicBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
});

// Form Submission ke WhatsApp
// Form Submission ke WhatsApp (VERSI SIMPLE)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ambil data dari form
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // GANTI NOMOR INI! (tanpa +, tanpa 0 di depan, tanpa spasi)
    const phoneNumber = '6287839615066';
    
    // Format pesan
    const text = 'Halo! Saya ' + name + '%0A' +
                 'Email: ' + email + '%0A%0A' +
                 'Pesan: ' + message;
    
    // Buka WhatsApp
    window.open('https://wa.me/6287839615066' + phoneNumber + '?text=' + text, '_blank');
    
    // Reset form
    contactForm.reset();
});
// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Profile Image Upload (Optional)
const profileImg = document.getElementById('profileImg');
profileImg.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});