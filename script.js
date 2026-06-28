document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen Removal
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            
            // If it's a counter, trigger the counter animation
            const counters = entry.target.querySelectorAll('.counter');
            if(counters.length > 0) {
                runCounters(counters);
            }
            
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 4. Animated Counters Function logic
    function runCounters(counters) {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;
                const increment = target / 50; // Adjust speed here

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    }

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Send Form Data to WhatsApp
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            // Prevent the default form submission (page reload)
            e.preventDefault();
            
            // Get the values from the form
            const name = document.getElementById('waName').value;
            const email = document.getElementById('waEmail').value;
            const message = document.getElementById('waMessage').value;
            
            // YOUR WHATSAPP NUMBER HERE (Include country code, no '+' or spaces)
            // Example for India: '919876543210'
            const phoneNumber = '918707566676'; 
            
            // Format the message with line breaks (%0A)
            const whatsappText = `Hello LUMIÈRE! I would like to book a consultation.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
            
            // Create the API URL
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappText}`;
            
            // Open WhatsApp in a new tab/window
            window.open(whatsappURL, '_blank');
            
            // Optional: Clear the form after sending
            consultationForm.reset();
        });
    }

});
