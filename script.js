// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('ashenBitesCart')) || [];
    updateCartCount();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cart functionality
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.querySelector('.cart-close');

    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        renderCartItems();
        updateCartTotal();
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartButton.contains(e.target) && !cartSidebar.contains(e.target) && 
            !e.target.closest('.cart-sidebar')) {
            cartSidebar.classList.remove('active');
        }
    });

    // Add to cart functionality
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.closest('.dish-card').querySelector('.dish-title').textContent;
            const price = parseInt(this.closest('.dish-card').querySelector('.price').textContent.replace('Ksh ', '').replace(',', ''));
            
            addToCart({
                id,
                name,
                price,
                quantity: 1
            });
            
            // Show success animation
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
            }, 1500);
        });
    });

    // Cart functions
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }
        
        localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
        updateCartTotal();
        showNotification(`${item.name} added to cart!`);
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        document.querySelector('.cart-count').textContent = totalItems;
        document.querySelector('.cart-total').textContent = `Ksh ${totalPrice}`;
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your cart is empty</p>
                    <a href="#menu" class="btn-primary">Browse Menu</a>
                </div>
            `;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Ksh ${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to cart buttons
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                updateQuantity(id, 1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                updateQuantity(id, -1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                removeFromCart(id);
            });
        });
    }

    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                removeFromCart(id);
            } else {
                localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                updateCartTotal();
            }
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
        updateCartTotal();
        showNotification('Item removed from cart');
    }

    function updateCartTotal() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const delivery = 150;
        const total = subtotal + delivery;
        
        document.querySelector('.subtotal').textContent = `Ksh ${subtotal}`;
        document.querySelector('.total').textContent = `Ksh ${total}`;
        document.getElementById('amount').value = total;
    }

    // M-Pesa Payment Form
    const mpesaForm = document.getElementById('mpesaPaymentForm');
    mpesaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.getElementById('phoneNumber').value;
        const amount = document.getElementById('amount').value;
        
        if (!phone || phone.length !== 10) {
            showNotification('Please enter a valid M-Pesa phone number (10 digits)', 'error');
            return;
        }
        
        if (amount <= 0) {
            showNotification('Please add items to your cart first', 'error');
            return;
        }
        
        // Show loading
        showLoading();
        
        // Simulate M-Pesa payment
        setTimeout(() => {
            hideLoading();
            showNotification('Payment initiated! Check your phone to complete the payment.', 'success');
            
            // Clear cart after successful payment
            cart = [];
            localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
            
            // Show success modal
            setTimeout(() => {
                showNotification('Payment confirmed! Your order is being prepared.', 'success');
            }, 2000);
        }, 3000);
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Scroll to payment section
        document.querySelector('.mpesa-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Loading overlay
    function showLoading() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    function hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active navigation based on scroll
    window.addEventListener('scroll', () => {
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

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you for subscribing!', 'success');
        newsletterForm.reset();
    });

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            padding: 15px 25px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 15px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1100;
            border-left: 4px solid var(--success);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: var(--success);
        }
        
        .notification-error i {
            color: #dc3545;
        }
    `;
    document.head.appendChild(style);
});