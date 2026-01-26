// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('mamoshiCart')) || [];
    let currentOrder = [];
    
    // Kenyan Street Food Menu Data
    const menuData = {
        popular: [
            {
                id: 1,
                name: "Classic Smocha",
                description: "Fresh minced meat mixed with onions, tomatoes, and secret spices",
                price: 70,
                image: "https://img-global.cpcdn.com/recipes/ab41384fb980b9e2/640x640sq70/photo.webp",
                category: "smocha",
                rating: 4.8,
                prepTime: "10 min"
            },
            {
                id: 2,
                name: "Nyama Choma Special",
                description: "Grilled goat meat with kachumbari and ugali",
                price: 450,
                image: "https://img-global.cpcdn.com/recipes/39a42b3a6034c4f8/640x640sq70/photo.webp",
                category: "grilled",
                rating: 4.9,
                prepTime: "25 min"
            },
            {
                id: 3,
                name: "Mutura Deluxe",
                description: "Traditional blood sausage with fresh herbs and spices",
                price: 150,
                image: "https://img-global.cpcdn.com/recipes/8d1c42f2a6dd363a/640x640sq70/photo.webp",
                category: "snacks",
                rating: 4.7,
                prepTime: "15 min"
            },
            {
                id: 4,
                name: "Chips Mwitu",
                description: "Crispy fries with beef stew and salad",
                price: 250,
                image: "https://img-global.cpcdn.com/recipes/fa130fd7d8f048a8/640x640sq70/photo.webp",
                category: "snacks",
                rating: 4.6,
                prepTime: "20 min"
            }
        ],
        fullMenu: [
            // Smochas
            {
                id: 101,
                name: "Classic Smocha",
                description: "Fresh minced meat with onions, tomatoes, and secret spices",
                price: 70,
                category: "smocha",
                extras: [
                    { name: "Extra Chilli", price: 10 },
                    { name: "Extra Kachumbari", price: 20 }
                ]
            },
            {
                id: 102,
                name: "Smocha Special",
                description: "Minced meat with boiled eggs and special sauce",
                price: 100,
                category: "smocha",
                extras: [
                    { name: "Extra Chilli", price: 10 },
                    { name: "Extra Kachumbari", price: 20 }
                ]
            },
            {
                id: 103,
                name: "Vegetable Smocha",
                description: "Fresh vegetables with potatoes and spices",
                price: 60,
                category: "smocha",
                extras: [
                    { name: "Extra Chilli", price: 10 }
                ]
            },
            // Grilled
            {
                id: 201,
                name: "Nyama Choma (Goat)",
                description: "Tender grilled goat meat with kachumbari",
                price: 450,
                category: "grilled"
            },
            {
                id: 202,
                name: "Chicken Grilled",
                description: "Whole chicken marinated and grilled to perfection",
                price: 600,
                category: "grilled"
            },
            {
                id: 203,
                name: "Pork Ribs",
                description: "Juicy pork ribs with barbecue sauce",
                price: 550,
                category: "grilled"
            },
            // Snacks
            {
                id: 301,
                name: "Mutura Deluxe",
                description: "Traditional blood sausage with herbs",
                price: 150,
                category: "snacks"
            },
            {
                id: 302,
                name: "Samosas (3pcs)",
                description: "Crispy meat samosas with chutney",
                price: 120,
                category: "snacks"
            },
            {
                id: 303,
                name: "Chips Mwitu",
                description: "Crispy fries with beef stew",
                price: 250,
                category: "snacks"
            },
            {
                id: 304,
                name: "Viazi Karai",
                description: "Deep fried potatoes with spicy coating",
                price: 180,
                category: "snacks"
            },
            // Drinks
            {
                id: 401,
                name: "Fresh Juice",
                description: "Orange, Passion, or Mango",
                price: 80,
                category: "drinks"
            },
            {
                id: 402,
                name: "Soda (500ml)",
                description: "Coke, Fanta, Sprite",
                price: 60,
                category: "drinks"
            },
            {
                id: 403,
                name: "Bottled Water",
                description: "500ml Mineral Water",
                price: 30,
                category: "drinks"
            },
            {
                id: 404,
                name: "African Tea",
                description: "Traditional tea with milk",
                price: 50,
                category: "drinks"
            }
        ]
    };
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Cart Functions
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        document.querySelector('.cart-count').textContent = totalItems;
        document.querySelector('.cart-total').textContent = `Ksh ${totalPrice}`;
        document.querySelector('.subtotal').textContent = `Ksh ${totalPrice}`;
        document.querySelector('.total').textContent = `Ksh ${totalPrice + 150}`;
        
        localStorage.setItem('mamoshiCart', JSON.stringify(cart));
    }
    
    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartEmpty = document.querySelector('.cart-empty');
        
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
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Ksh ${item.price} × ${item.quantity}</p>
                    ${item.extras ? `<small>Extras: ${item.extras}</small>` : ''}
                </div>
                <div class="cart-item-actions">
                    <div class="cart-quantity">
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
        document.querySelectorAll('.cart-quantity .plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                increaseQuantity(id);
            });
        });
        
        document.querySelectorAll('.cart-quantity .minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                decreaseQuantity(id);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                removeFromCart(id);
            });
        });
    }
    
    function addToCart(itemId, extras = '') {
        const menuItem = menuData.fullMenu.find(item => item.id === itemId);
        if (!menuItem) return;
        
        const existingItem = cart.find(item => item.id === itemId && item.extras === extras);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
                extras: extras
            });
        }
        
        updateCartCount();
        renderCartItems();
        showNotification(`${menuItem.name} added to cart!`);
    }
    
    function increaseQuantity(itemId) {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity++;
            updateCartCount();
            renderCartItems();
        }
    }
    
    function decreaseQuantity(itemId) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCartCount();
            renderCartItems();
        }
    }
    
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartCount();
        renderCartItems();
        showNotification('Item removed from cart');
    }
    
    // Cart Sidebar Toggle
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.querySelector('.cart-close');
    
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Checkout Button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'warning');
            return;
        }
        
        const orderSummary = cart.map(item => 
            `${item.name} × ${item.quantity} - Ksh ${item.price * item.quantity}`
        ).join('\n');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 150;
        const grandTotal = total + deliveryFee;
        
        const message = `New Order from Mamoshi Kitchen Website:\n\n` +
                       `Order Details:\n${orderSummary}\n\n` +
                       `Subtotal: Ksh ${total}\n` +
                       `Delivery: Ksh ${deliveryFee}\n` +
                       `Total: Ksh ${grandTotal}\n\n` +
                       `Please call +254746562072 to confirm payment details.`;
        
        // Store order for success modal
        currentOrder = {
            items: [...cart],
            total: grandTotal,
            timestamp: new Date().toLocaleString()
        };
        
        // Show loading
        showLoading();
        
        // Simulate order processing
        setTimeout(() => {
            hideLoading();
            showSuccessModal();
            
            // Clear cart after order
            cart = [];
            updateCartCount();
            renderCartItems();
            
            // Close cart sidebar
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
    
    // Render Popular Dishes
    function renderPopularDishes() {
        const container = document.getElementById('popularDishes');
        container.innerHTML = menuData.popular.map(dish => `
            <div class="dish-card">
                <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                <div class="dish-content">
                    <div class="dish-header">
                        <div>
                            <h3 class="dish-title">${dish.name}</h3>
                            <div class="dish-rating">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(dish.rating))}
                                ${dish.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                <span>(${dish.rating})</span>
                            </div>
                        </div>
                        <div class="dish-price">Ksh ${dish.price}</div>
                    </div>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-actions">
                        <button class="btn-primary add-to-cart" data-id="${dish.id}">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                        <button class="btn-secondary quick-view" data-id="${dish.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                addToCart(id);
            });
        });
    }
    
    // Render Full Menu
    function renderFullMenu() {
        const container = document.getElementById('menuGrid');
        container.innerHTML = menuData.fullMenu.map(item => `
            <div class="menu-item" data-category="${item.category}">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <div class="menu-item-price">Ksh ${item.price}</div>
                </div>
                <span class="menu-item-category">${item.category.toUpperCase()}</span>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="quantity-controls" data-id="${item.id}">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn-primary add-to-cart-btn" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for menu items
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const quantityElement = this.closest('.menu-item-footer').querySelector('.quantity');
                const quantity = parseInt(quantityElement.textContent);
                
                for (let i = 0; i < quantity; i++) {
                    addToCart(id);
                }
                
                // Reset quantity
                quantityElement.textContent = '1';
            });
        });
        
        document.querySelectorAll('.quantity-controls .plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const quantityElement = this.parentElement.querySelector('.quantity');
                quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
            });
        });
        
        document.querySelectorAll('.quantity-controls .minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const quantityElement = this.parentElement.querySelector('.quantity');
                const current = parseInt(quantityElement.textContent);
                if (current > 1) {
                    quantityElement.textContent = current - 1;
                }
            });
        });
    }
    
    // Menu Category Filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Quick Order Form
    const quickOrderForm = document.getElementById('quickOrderForm');
    quickOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            orderDetails: document.getElementById('orderDetails').value,
            time: document.querySelector('input[name="time"]:checked').value
        };
        
        // Prepare WhatsApp message
        const message = `New Quick Order from Mamoshi Kitchen:\n\n` +
                       `Name: ${formData.name}\n` +
                       `Phone: ${formData.phone}\n` +
                       `Location: ${formData.location}\n` +
                       `Order: ${formData.orderDetails}\n` +
                       `Time: ${formData.time === 'asap' ? 'ASAP' : 'Schedule for later'}\n\n` +
                       `Please confirm and send M-Pesa details.`;
        
        // Encode for WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/254746562072?text=${encodedMessage}`;
        
        // Show loading
        showLoading();
        
        // Simulate processing
        setTimeout(() => {
            hideLoading();
            
            // Store order details
            currentOrder = {
                customer: formData,
                timestamp: new Date().toLocaleString()
            };
            
            showSuccessModal();
            
            // Reset form
            quickOrderForm.reset();
            
            // Open WhatsApp after a delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);
            
        }, 2000);
    });
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', () => {
        showTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);
    
    // Newsletter Forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                this.reset();
                showNotification('Thank you for subscribing!', 'success');
            }, 2000);
            
            console.log('Newsletter subscription:', email);
        });
    });
    
    // Success Modal
    const successModal = document.getElementById('successModal');
    
    function showSuccessModal() {
        const summary = document.getElementById('orderSummary');
        
        if (currentOrder.items) {
            // From cart checkout
            summary.innerHTML = currentOrder.items.map(item => 
                `<p>${item.name} × ${item.quantity} - Ksh ${item.price * item.quantity}</p>`
            ).join('') + 
            `<hr><p><strong>Total: Ksh ${currentOrder.total}</strong></p>`;
        } else if (currentOrder.customer) {
            // From quick order form
            summary.innerHTML = `
                <p><strong>Customer:</strong> ${currentOrder.customer.name}</p>
                <p><strong>Order:</strong> ${currentOrder.customer.orderDetails}</p>
                <p><strong>Location:</strong> ${currentOrder.customer.location}</p>
                <p><strong>Time:</strong> ${currentOrder.customer.time === 'asap' ? 'ASAP' : 'Schedule for later'}</p>
            `;
        }
        
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    document.querySelector('.close-success').addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Loading Overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    function showLoading() {
        loadingOverlay.classList.add('active');
    }
    
    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }
    
    // Notification System
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Add close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 1400;
            animation: slideIn 0.3s ease;
            border-left: 4px solid var(--success-color);
            max-width: 350px;
        }
        
        .notification.warning {
            border-left-color: var(--warning-color);
        }
        
        .notification i {
            font-size: 1.25rem;
            color: var(--success-color);
        }
        
        .notification.warning i {
            color: var(--warning-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            color: #999;
            margin-left: auto;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
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
    
    // Footer menu category links
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
            
            if (categoryBtn) {
                categoryBtn.click();
                window.scrollTo({
                    top: document.getElementById('menu').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    updateCartCount();
    renderCartItems();
    renderPopularDishes();
    renderFullMenu();
    showTestimonial(0);
    
    // Add current year to footer
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Add click sound for buttons (optional)
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            // You can add a sound effect here if desired
            // new Audio('click.mp3').play();
        });
    });
});