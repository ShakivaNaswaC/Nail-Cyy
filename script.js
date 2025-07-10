// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar active state management
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Function to remove active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Function to add active class to clicked link
function addActiveClass(clickedLink) {
    removeActiveClasses();
    clickedLink.classList.add('active');
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        addActiveClass(e.target);
    });
});

// Scroll spy functionality
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Smooth scrolling for navigation links
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

// Intersection Observer for section animations
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

// Observe all sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Header scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add scroll effect to navbar
navbar.style.transition = 'transform 0.3s ease';

// Gallery image lazy loading
const galleryImages = document.querySelectorAll('.gallery-item img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            imageObserver.unobserve(img);
        }
    });
});

galleryImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    imageObserver.observe(img);
});

// Price table hover effects
const priceTables = document.querySelectorAll('.price-table');

priceTables.forEach(table => {
    table.addEventListener('mouseenter', () => {
        table.style.transform = 'translateY(-5px)';
        table.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    });
    
    table.addEventListener('mouseleave', () => {
        table.style.transform = 'translateY(0)';
        table.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Price item hover effects
const priceItems = document.querySelectorAll('.price-item');

priceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#f9f9f9';
        item.style.padding = '12px 15px';
        item.style.borderRadius = '8px';
        item.style.margin = '0 -15px';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'transparent';
        item.style.padding = '10px 0';
        item.style.borderRadius = '0';
        item.style.margin = '0';
    });
});

// Form validation (if you add forms later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section (disabled to prevent text overlay)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const heroImage = document.querySelector('.hero-image img');
//     
//     if (heroImage) {
//         heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

// Style back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d4a574;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: #c49764;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(backToTopStyle);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('Nail.cyy website loaded successfully! 💅✨');

document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const learnBtn = card.querySelector('.learn-btn');
        const closeBtn = card.querySelector('.close-btn');
        
        // Learn button click handler
        learnBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other cards first
            courseCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.close-btn').style.display = 'none';
                }
            });
            
            // Toggle current card
            card.classList.toggle('expanded');
            closeBtn.style.display = card.classList.contains('expanded') ? 'block' : 'none';
            
            // Smooth scroll to expanded card
            if (card.classList.contains('expanded')) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
        
        // Close button click handler
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.remove('expanded');
            closeBtn.style.display = 'none';
        });
        
        // Card click handler (for mobile)
        card.addEventListener('click', function(e) {
            if (e.target === card && !card.classList.contains('expanded')) {
                learnBtn.click();
            }
        });
    });
    
    // Close expanded cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.course-card')) {
            courseCards.forEach(card => {
                card.classList.remove('expanded');
                card.querySelector('.close-btn').style.display = 'none';
            });
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            courseCards.forEach(card => {
                card.classList.remove('expanded');
                card.querySelector('.close-btn').style.display = 'none';
            });
        }
    });
});

// Time slot selection
        const timeSlots = document.querySelectorAll('.time-slot');
        let selectedTime = '';
        
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                timeSlots.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                selectedTime = this.getAttribute('data-time');
            });
        });

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        function bookAppointment() {
            // Validation - only check if time slot is selected
            if (!selectedTime) {
                alert('Please select a time slot first.');
                return;
            }

            // Format time
            const timeSlot = document.querySelector(`.time-slot[data-time="${selectedTime}"]`);
            const timeDisplay = timeSlot.querySelector('div').textContent;

            // Create WhatsApp message
            const message = `Hello! I would like to book an appointment for *${timeDisplay}*.

Please let me know:
- Available dates
- Service options
- Your location
- Any requirements

Thank you!`;

            // WhatsApp number (replace with your actual WhatsApp number)
            const whatsappNumber = '6281235252585'; // Replace with your WhatsApp number
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Open WhatsApp after brief delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                document.getElementById('successMessage').style.display = 'none';
                resetForm();
            }, 1000);
        }

        function resetForm() {
            timeSlots.forEach(slot => slot.classList.remove('selected'));
            selectedTime = '';
        }

        // Add some floating animation to the image section
        const floatingElements = document.querySelector('.floating-elements');
        let floatDirection = 1;
        
        setInterval(() => {
            floatingElements.style.transform = `translate(-50%, calc(-50% + ${Math.sin(Date.now() * 0.001) * 10}px))`;
        }, 50);