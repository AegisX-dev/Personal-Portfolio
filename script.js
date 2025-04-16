// Smooth scrolling and active link
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 80) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Accordion for About section
const accordionTitles = document.querySelectorAll('.accordion-title');
accordionTitles.forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
            content.classList.remove('active');
        } else {
            content.style.display = 'block';
            setTimeout(() => content.classList.add('active'), 10); // Slight delay for fade-in
        }
    });
});

// Section fade-in and skill progress animation
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 50) {
            section.classList.add('visible');
            if (section.id === 'skills') {
                const progresses = section.querySelectorAll('.progress');
                progresses.forEach(progress => {
                    const width = progress.getAttribute('data-width');
                    progress.style.width = `${width}%`;
                });
            }
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// EmailJS integration (replace with your credentials)
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams) // Replace with your service and template IDs
        .then(() => {
            alert("Message sent successfully!");
            this.reset();
        }, (error) => alert("Failed to send message: " + error.text));
});