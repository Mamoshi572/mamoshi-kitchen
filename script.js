// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Order Modal
    const orderTrigger = document.getElementById('orderTrigger');
    const orderModal = document.getElementById('orderModal');
    const modalClose = document.querySelector('.modal-close');
    
    orderTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    modalClose.addEventListener('click', function() {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        const originalButton = this.querySelector('button');
        const originalText = originalButton.textContent;
        
        originalButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        originalButton.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            originalButton.textContent = originalText;
            originalButton.style.background = '';
            this.reset();
        }, 2000);
        
        console.log('Newsletter subscription:', email);
    });
    
    // Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.innerHTML = '<i class="fas fa-check"></i> Reservation Sent!';
        button.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 2000);
        
        console.log('Reservation data:', data);
    });
    
    // Animated Follower Counter
    const followersElement = document.getElementById('followers');
    let followers = 2800;
    
    function updateFollowers() {
        followers += Math.floor(Math.random() * 10) - 3;
        if (followers < 2700) followers = 2700;
        if (followers > 3000) followers = 3000;
        
        followersElement.textContent = followers.toLocaleString();
        
        // Animate the counter
        followersElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            followersElement.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Update followers every 5 seconds
    setInterval(updateFollowers, 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add scroll animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.card, .testimonial-card, .contact-form').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * 0.5;
        
        hero.style.backgroundPosition = `center ${rate}px`;
    });
    
    // Add animation to hero stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 30);
    });
    
    // Initialize current year in footer
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });
});