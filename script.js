// script.js - Enhanced with all functionality
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // INITIALIZATION
    // ====================
    
    // Enhanced Menu Data
    const menuData = [
        {
            id: 1,
            name: "Classic Smocha Deluxe",
            description: "Traditional minced meat with secret spices, served with fresh chapati and kachumbari",
            price: 150,
            originalPrice: 180,
            category: "smocha",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "15 min",
            spiceLevel: "Medium",
            rating: 4.8,
            popular: true,
            ingredients: ["Minced Meat", "Secret Spices", "Chapati", "Kachumbari", "Lemon"],
            calories: "450 kcal"
        },
        {
            id: 2,
            name: "Premium Mutura Feast",
            description: "Grilled blood sausage with herbs, served with kachumbari and ugali",
            price: 250,
            originalPrice: 300,
            category: "grilled",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "20 min",
            spiceLevel: "Hot",
            rating: 4.9,
            popular: true,
            ingredients: ["Blood Sausage", "Herbs", "Kachumbari", "Ugali"],
            calories: "550 kcal"
        },
        {
            id: 3,
            name: "Chips Mwitu Special",
            description: "Crispy fries with beef stew, vegetables, and secret sauce",
            price: 350,
            originalPrice: 400,
            category: "snacks",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "25 min",
            spiceLevel: "Mild",
            rating: 4.7,
            popular: false,
            ingredients: ["Potatoes", "Beef Stew", "Vegetables", "Secret Sauce"],
            calories: "600 kcal"
        },
        {
            id: 4,
            name: "Grilled Chicken Platter",
            description: "Tender chicken marinated in traditional spices with roasted vegetables",
            price: 400,
            originalPrice: 450,
            category: "grilled",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "30 min",
            spiceLevel: "Medium",
            rating: 4.6,
            popular: false,
            ingredients: ["Chicken", "Traditional Spices", "Roasted Vegetables", "Lemon"],
            calories: "500 kcal"
        },
        {
            id: 5,
            name: "Vegetable Smocha",
            description: "Mixed vegetables with traditional spices served with chapati",
            price: 120,
            originalPrice: 150,
            category: "smocha",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "12 min",
            spiceLevel: "Mild",
            rating: 4.5,
            popular: false,
            ingredients: ["Mixed Vegetables", "Spices", "Chapati", "Tomato Sauce"],
            calories: "350 kcal"
        },
        {
            id: 6,
            name: "Fresh Juice Combo",
            description: "Orange, Passion, or Mango juice - your choice!",
            price: 80,
            originalPrice: 100,
            category: "drinks",
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "5 min",
            spiceLevel: "None",
            rating: 4.8,
            popular: true,
            ingredients: ["Fresh Fruits", "Ice", "Mint"],
            calories: "120 kcal"
        },
        {
            id: 7,
            name: "Nyama Choma Platter",
            description: "Grilled beef with traditional sides",
            price: 500,
            originalPrice: 600,
            category: "grilled",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "35 min",
            spiceLevel: "Medium",
            rating: 4.7,
            popular: true,
            ingredients: ["Beef", "Traditional Spices", "Kachumbari", "Ugali"],
            calories: "700 kcal"
        },
        {
            id: 8,
            name: "Fruit Salad Bowl",
            description: "Fresh seasonal fruits with yogurt dressing",
            price: 200,
            originalPrice: 250,
            category: "snacks",
            image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "10 min",
            spiceLevel: "None",
            rating: 4.6,
            popular: false,
            ingredients: ["Seasonal Fruits", "Yogurt", "Honey", "Mint"],
            calories: "250 kcal"
        }
    ];

    // Cart initialization
    let cart = JSON.parse(localStorage.getItem('ashenBitesCart')) || [];
    let currentPaymentMethod = 'mpesa';
    let appliedPromo = false;
    let discount = 0;

    // ====================
    // DOM ELEMENTS
    // ====================
    const elements = {
        // Navigation
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        navMenu: document.getElementById('navMenu'),
        navLinks: document.querySelectorAll('.nav-link'),
        
        // Cart
        cartBtn: document.getElementById('cartButton'),
        cartPanel: document.getElementById('cartPanel'),
        cartClose: document.getElementById('cartClose'),
        cartBody: document.getElementById('cartBody'),
        cartItems: document.getElementById('cartItems'),
        cartCount: document.querySelector('.cart-count'),
        cartTotal: document.querySelector('.cart-total'),
        checkoutBtn: document.getElementById('checkoutBtn'),
        browseMenuBtn: document.getElementById('browseMenuBtn'),
        
        // Hero Section
        orderNowBtn: document.getElementById('orderNowBtn'),
        viewMenuBtn: document.getElementById('viewMenuBtn'),
        scrollDown: document.getElementById('scrollDown'),
        whatsappFab: document.getElementById('whatsappFab'),
        callBtn: document.getElementById('callBtn'),
        
        // Featured Dishes
        dishesGrid: document.getElementById('dishesGrid'),
        
        // Menu Section
        menuGrid: document.getElementById('menuGrid'),
        categoryFilters: document.querySelectorAll('.category-filter'),
        applyPromoBtn: document.getElementById('applyPromoBtn'),
        
        // How to Order
        step1Btn: document.getElementById('step1Btn'),
        viewCartBtn: document.getElementById('viewCartBtn'),
        checkoutProcessBtn: document.getElementById('checkoutProcessBtn'),
        trackOrderBtn: document.getElementById('trackOrderBtn'),
        
        // Payment Section
        paymentForm: document.getElementById('paymentForm'),
        submitPaymentBtn: document.getElementById('submitPaymentBtn'),
        mpesaFields: document.getElementById('mpesaFields'),
        mpesaMethod: document.getElementById('mpesaMethod'),
        cardMethod: document.getElementById('cardMethod'),
        cashMethod: document.getElementById('cashMethod'),
        customerName: document.getElementById('customerName'),
        customerPhone: document.getElementById('customerPhone'),
        deliveryAddress: document.getElementById('deliveryAddress'),
        mpesaNumber: document.getElementById('mpesaNumber'),
        
        // Order Summary
        orderTotal: document.querySelector('.order-total'),
        deliveryFee: document.querySelector('.delivery-fee'),
        discountAmount: document.querySelector('.discount-amount'),
        amountTotal: document.querySelector('.amount-total'),
        
        // Testimonials
        testimonialsSlider: document.getElementById('testimonialsSlider'),
        sliderPrev: document.getElementById('sliderPrev'),
        sliderNext: document.getElementById('sliderNext'),
        
        // Contact
        openMapBtn: document.getElementById('openMapBtn'),
        contactForm: document.getElementById('contactForm'),
        contactSubmitBtn: document.getElementById('contactSubmitBtn'),
        
        // Footer
        footerLinks: document.querySelectorAll('.footer-link'),
        faqBtn: document.getElementById('faqBtn'),
        deliveryBtn: document.getElementById('deliveryBtn'),
        privacyBtn: document.getElementById('privacyBtn'),
        termsBtn: document.getElementById('termsBtn'),
        careersBtn: document.getElementById('careersBtn'),
        newsletterForm: document.getElementById('newsletterForm'),
        newsletterSubmit: document.getElementById('newsletterSubmit'),
        playStoreBtn: document.getElementById('playStoreBtn'),
        appStoreBtn: document.getElementById('appStoreBtn'),
        
        // Modals
        orderSuccessModal: document.getElementById('orderSuccessModal'),
        continueShoppingBtn: document.getElementById('continueShoppingBtn'),
        quickViewModal: document.getElementById('quickViewModal'),
        quickViewClose: document.getElementById('quickViewClose'),
        loadingModal: document.getElementById('loadingModal'),
        mpesaModal: document.getElementById('mpesaModal'),
        cancelMpesa: document.getElementById('cancelMpesa'),
        confirmMpesa: document.getElementById('confirmMpesa'),
        faqModal: document.getElementById('faqModal'),
        
        // Toast
        toastContainer: document.getElementById('toastContainer')
    };

    // ====================
    // INITIAL SETUP
    // ====================
    updateCartCount();
    renderDishesGrid();
    renderMenuGrid();
    setupEventListeners();
    initTestimonialSlider();

    // ====================
    // EVENT LISTENERS SETUP
    // ====================
    function setupEventListeners() {
        // Mobile Menu
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Navigation Links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                scrollToSection(targetId);
                setActiveNavLink(this);
            });
        });
        
        // Cart
        elements.cartBtn.addEventListener('click', openCart);
        elements.cartClose.addEventListener('click', closeCart);
        
        // Hero Section
        elements.orderNowBtn.addEventListener('click', () => scrollToSection('#featured-dishes'));
        elements.viewMenuBtn.addEventListener('click', () => scrollToSection('#menu'));
        elements.scrollDown?.addEventListener('click', () => scrollToSection('#featured-dishes'));
        elements.callBtn.addEventListener('click', makePhoneCall);
        
        // Featured Dishes - Event delegation
        document.addEventListener('click', function(e) {
            // Add to cart
            if (e.target.closest('.add-to-cart')) {
                const dishId = e.target.closest('.add-to-cart').dataset.id;
                addToCart(dishId);
            }
            
            // Quantity controls
            if (e.target.closest('.qty-btn')) {
                const btn = e.target.closest('.qty-btn');
                const dishId = btn.dataset.id;
                const isPlus = btn.classList.contains('plus');
                updateQuantity(dishId, isPlus);
            }
            
            // Quick view
            if (e.target.closest('.quick-view')) {
                const dishId = e.target.closest('.quick-view').dataset.id;
                showQuickView(dishId);
            }
        });
        
        // Menu Filtering
        elements.categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.category;
                filterMenu(category);
                elements.categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
            });
        });
        
        // Apply Promo
        elements.applyPromoBtn.addEventListener('click', applyPromoCode);
        
        // How to Order
        elements.step1Btn.addEventListener('click', () => scrollToSection('#menu'));
        elements.viewCartBtn.addEventListener('click', openCart);
        elements.checkoutProcessBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                scrollToSection('#payment');
            } else {
                showToast('Your cart is empty! Add items first.', 'warning');
            }
        });
        elements.trackOrderBtn.addEventListener('click', () => {
            showToast('Track order feature coming soon!', 'info');
        });
        
        // Payment Methods
        elements.mpesaMethod.addEventListener('click', () => selectPaymentMethod('mpesa'));
        elements.cardMethod.addEventListener('click', () => selectPaymentMethod('card'));
        elements.cashMethod.addEventListener('click', () => selectPaymentMethod('cash'));
        
        // Payment Form
        elements.paymentForm.addEventListener('submit', processPayment);
        
        // M-Pesa Modal
        elements.cancelMpesa.addEventListener('click', () => closeModal(elements.mpesaModal));
        elements.confirmMpesa.addEventListener('click', confirmMpesaPayment);
        
        // Contact
        elements.openMapBtn.addEventListener('click', openGoogleMaps);
        elements.contactForm.addEventListener('submit', submitContactForm);
        
        // Footer Links
        elements.footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.dataset.category) {
                    filterMenu(this.dataset.category);
                    scrollToSection('#menu');
                }
            });
        });
        
        // Footer Buttons
        elements.faqBtn.addEventListener('click', () => openModal(elements.faqModal));
        elements.deliveryBtn.addEventListener('click', () => showToast('Delivery information loaded', 'info'));
        elements.privacyBtn.addEventListener('click', () => showToast('Privacy policy page coming soon', 'info'));
        elements.termsBtn.addEventListener('click', () => showToast('Terms of service page coming soon', 'info'));
        elements.careersBtn.addEventListener('click', () => showToast('Careers page coming soon', 'info'));
        
        // Newsletter
        elements.newsletterForm.addEventListener('submit', subscribeNewsletter);
        
        // App Store Buttons
        elements.playStoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('App coming soon to Google Play!', 'info');
        });
        
        elements.appStoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('App coming soon to App Store!', 'info');
        });
        
        // Modals
        elements.continueShoppingBtn.addEventListener('click', () => {
            closeModal(elements.orderSuccessModal);
            scrollToSection('#home');
        });
        
        elements.quickViewClose.addEventListener('click', () => closeModal(elements.quickViewModal));
        
        // Close modals on outside click
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // Escape key to close modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
                closeCart();
            }
        });
        
        // Cart updated event
        document.addEventListener('cartUpdated', updateCartUI);
        document.addEventListener('cartUpdated', updatePaymentSummary);
    }

    // ====================
    // CART FUNCTIONS
    // ====================
    function addToCart(dishId) {
        const dish = menuData.find(item => item.id == dishId);
        if (!dish) return;
        
        const existingItem = cart.find(item => item.id == dishId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                quantity: 1,
                image: dish.image
            });
        }
        
        saveCart();
        showToast(`${dish.name} added to cart!`, 'success');
        updateCartUI();
    }

    function updateQuantity(dishId, isPlus) {
        const item = cart.find(item => item.id == dishId);
        if (!item) return;
        
        if (isPlus) {
            item.quantity += 1;
        } else {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeFromCart(dishId);
                return;
            }
        }
        
        saveCart();
        updateCartUI();
    }

    function removeFromCart(dishId) {
        cart = cart.filter(item => item.id != dishId);
        saveCart();
        showToast('Item removed from cart', 'warning');
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
    }

    function calculateCartTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 150;
        const total = subtotal + delivery - discount;
        
        return { subtotal, delivery, total, discount };
    }

    function updateCartCount() {
        const totals = calculateCartTotals();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (elements.cartCount) {
            elements.cartCount.textContent = totalItems;
        }
        
        if (elements.cartTotal) {
            elements.cartTotal.textContent = `Ksh ${totals.subtotal}`;
        }
        
        if (elements.checkoutBtn) {
            elements.checkoutBtn.disabled = totalItems === 0;
        }
    }

    function updateCartUI() {
        updateCartCount();
        renderCartItems();
    }

    function renderCartItems() {
        if (!elements.cartItems) return;
        
        const totals = calculateCartTotals();
        
        if (cart.length === 0) {
            elements.cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-basket"></i>
                    <h4>Your cart is empty</h4>
                    <p>Add some delicious items from our menu</p>
                    <button class="btn-primary" id="browseMenuBtn">
                        <i class="fas fa-utensils"></i> Browse Menu
                    </button>
                </div>
            `;
            
            // Update summary
            if (elements.cartSummary) {
                elements.cartSummary.innerHTML = `
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span class="subtotal">Ksh 0</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery Fee</span>
                        <span class="delivery-fee">Ksh 150</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span class="total-amount">Ksh 150</span>
                    </div>
                `;
            }
            
            return;
        }
        
        // Render cart items
        const cartHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">Ksh ${item.price} × ${item.quantity}</p>
                        <div class="cart-item-actions">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        Ksh ${itemTotal}
                    </div>
                </div>
            `;
        }).join('');
        
        elements.cartItems.innerHTML = cartHTML;
        
        // Update summary
        if (elements.cartSummary) {
            elements.cartSummary.innerHTML = `
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span class="subtotal">Ksh ${totals.subtotal}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery Fee</span>
                    <span class="delivery-fee">Ksh ${totals.delivery}</span>
                </div>
                ${discount > 0 ? `
                <div class="summary-row">
                    <span>Discount</span>
                    <span class="discount">-Ksh ${discount}</span>
                </div>
                ` : ''}
                <div class="summary-row total">
                    <span>Total</span>
                    <span class="total-amount">Ksh ${totals.total}</span>
                </div>
            `;
        }
        
        // Add event listeners to cart items
        elements.cartItems.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                const isPlus = this.classList.contains('plus');
                updateQuantity(dishId, isPlus);
            });
        });
        
        elements.cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                removeFromCart(dishId);
            });
        });
    }

    // ====================
    // MENU FUNCTIONS
    // ====================
    function renderDishesGrid() {
        if (!elements.dishesGrid) return;
        
        // Get featured dishes (popular ones)
        const featuredDishes = menuData.filter(item => item.popular).slice(0, 3);
        
        elements.dishesGrid.innerHTML = featuredDishes.map(dish => `
            <div class="dish-card ${dish.popular ? 'featured' : ''}" data-id="${dish.id}">
                <div class="dish-image">
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-tag ${dish.popular ? 'popular' : dish.category}">
                        ${dish.popular ? 'Most Popular' : dish.category.charAt(0).toUpperCase() + dish.category.slice(1)}
                    </div>
                    <button class="quick-view" data-id="${dish.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="dish-content">
                    <h3 class="dish-title">${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-meta">
                        <span class="cooking-time">
                            <i class="fas fa-clock"></i> ${dish.prepTime}
                        </span>
                        <span class="spice-level">
                            <i class="fas fa-pepper-hot"></i> ${dish.spiceLevel}
                        </span>
                        <span class="rating">
                            <i class="fas fa-star"></i> ${dish.rating}
                        </span>
                    </div>
                    <div class="dish-footer">
                        <div class="price">
                            <span class="current">Ksh ${dish.price}</span>
                            ${dish.originalPrice ? `<span class="old">Ksh ${dish.originalPrice}</span>` : ''}
                        </div>
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${dish.id}">-</button>
                            <span class="qty-display" data-id="${dish.id}">1</span>
                            <button class="qty-btn plus" data-id="${dish.id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${dish.id}">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderMenuGrid(filter = 'all') {
        if (!elements.menuGrid) return;
        
        const filteredMenu = filter === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === filter);
        
        elements.menuGrid.innerHTML = filteredMenu.map(dish => `
            <div class="menu-item" data-category="${dish.category}" data-id="${dish.id}">
                <div class="menu-item-image">
                    <img src="${dish.image}" alt="${dish.name}">
                    ${dish.popular ? '<span class="popular-badge">Popular</span>' : ''}
                    <button class="quick-view-btn" data-id="${dish.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="menu-item-content">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <div class="menu-item-meta">
                        <span><i class="fas fa-clock"></i> ${dish.prepTime}</span>
                        <span><i class="fas fa-pepper-hot"></i> ${dish.spiceLevel}</span>
                        <span><i class="fas fa-star"></i> ${dish.rating}</span>
                        <span><i class="fas fa-fire"></i> ${dish.calories}</span>
                    </div>
                    <div class="menu-item-footer">
                        <div class="price">Ksh ${dish.price}</div>
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${dish.id}">-</button>
                            <span class="qty-display" data-id="${dish.id}">1</span>
                            <button class="qty-btn plus" data-id="${dish.id}">+</button>
                        </div>
                        <button class="add-to-cart-btn" data-id="${dish.id}">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function filterMenu(category) {
        renderMenuGrid(category);
        scrollToSection('#menu');
    }

    function showQuickView(dishId) {
        const dish = menuData.find(item => item.id == dishId);
        if (!dish) return;
        
        const quickViewContent = document.getElementById('quickViewContent');
        quickViewContent.innerHTML = `
            <div class="quickview-image">
                <img src="${dish.image}" alt="${dish.name}">
                ${dish.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
            </div>
            <div class="quickview-details">
                <h3>${dish.name}</h3>
                <div class="quickview-rating">
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(dish.rating))}
                        ${dish.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </div>
                    <span>${dish.rating}/5 (${Math.floor(Math.random() * 100) + 50} reviews)</span>
                </div>
                <p class="description">${dish.description}</p>
                
                <div class="quickview-info">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>Prep Time</strong>
                            <span>${dish.prepTime}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-pepper-hot"></i>
                        <div>
                            <strong>Spice Level</strong>
                            <span>${dish.spiceLevel}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-fire"></i>
                        <div>
                            <strong>Calories</strong>
                            <span>${dish.calories}</span>
                        </div>
                    </div>
                </div>
                
                <div class="quickview-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${dish.ingredients.map(ing => `<li><i class="fas fa-check"></i> ${ing}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="quickview-price">
                    <div class="price-display">
                        <span class="price">Ksh ${dish.price}</span>
                        ${dish.originalPrice ? `<span class="original-price">Ksh ${dish.originalPrice}</span>` : ''}
                        <span class="save">Save ${dish.originalPrice ? Math.round((1 - dish.price/dish.originalPrice) * 100) : 0}%</span>
                    </div>
                    <div class="quantity-control">
                        <button class="qty-btn minus" data-id="${dish.id}">-</button>
                        <span class="qty-display">1</span>
                        <button class="qty-btn plus" data-id="${dish.id}">+</button>
                    </div>
                </div>
                
                <button class="btn-hero-primary add-to-cart-quickview" data-id="${dish.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart - Ksh ${dish.price}
                </button>
            </div>
        `;
        
        // Add event listeners
        const addToCartBtn = quickViewContent.querySelector('.add-to-cart-quickview');
        addToCartBtn.addEventListener('click', function() {
            addToCart(dishId);
            closeModal(elements.quickViewModal);
        });
        
        const qtyBtns = quickViewContent.querySelectorAll('.qty-btn');
        qtyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const isPlus = this.classList.contains('plus');
                const qtyDisplay = this.parentElement.querySelector('.qty-display');
                let currentQty = parseInt(qtyDisplay.textContent);
                
                if (isPlus) {
                    currentQty += 1;
                } else if (currentQty > 1) {
                    currentQty -= 1;
                }
                
                qtyDisplay.textContent = currentQty;
                const totalPrice = dish.price * currentQty;
                addToCartBtn.innerHTML = `<i class="fas fa-cart-plus"></i> Add to Cart - Ksh ${totalPrice}`;
            });
        });
        
        openModal(elements.quickViewModal);
    }

    // ====================
    // PAYMENT FUNCTIONS
    // ====================
    function selectPaymentMethod(method) {
        currentPaymentMethod = method;
        
        // Update UI
        [elements.mpesaMethod, elements.cardMethod, elements.cashMethod].forEach(el => {
            el.classList.remove('active');
        });
        
        if (method === 'mpesa') {
            elements.mpesaMethod.classList.add('active');
            elements.mpesaFields.style.display = 'block';
            elements.submitPaymentBtn.innerHTML = `<i class="fab fa-cc-mpesa"></i> Pay with M-Pesa`;
        } else if (method === 'card') {
            elements.cardMethod.classList.add('active');
            elements.mpesaFields.style.display = 'none';
            elements.submitPaymentBtn.innerHTML = `<i class="fas fa-credit-card"></i> Pay with Card`;
        } else {
            elements.cashMethod.classList.add('active');
            elements.mpesaFields.style.display = 'none';
            elements.submitPaymentBtn.innerHTML = `<i class="fas fa-money-bill-wave"></i> Cash on Delivery`;
        }
    }

    function updatePaymentSummary() {
        const totals = calculateCartTotals();
        
        if (elements.orderTotal) elements.orderTotal.textContent = `Ksh ${totals.subtotal}`;
        if (elements.deliveryFee) elements.deliveryFee.textContent = `Ksh ${totals.delivery}`;
        if (elements.discountAmount) elements.discountAmount.textContent = `Ksh ${totals.discount}`;
        if (elements.amountTotal) elements.amountTotal.textContent = `Ksh ${totals.total}`;
    }

    function processPayment(e) {
        e.preventDefault();
        
        if (!validatePaymentForm()) {
            showToast('Please fill all required fields correctly', 'error');
            return;
        }
        
        if (currentPaymentMethod === 'mpesa') {
            processMpesaPayment();
        } else if (currentPaymentMethod === 'card') {
            processCardPayment();
        } else {
            processCashPayment();
        }
    }

    function validatePaymentForm() {
        const name = elements.customerName.value.trim();
        const phone = elements.customerPhone.value.trim();
        const address = elements.deliveryAddress.value.trim();
        
        if (!name || !phone || !address) {
            return false;
        }
        
        // Validate Kenyan phone number
        const phoneRegex = /^(07|01)\d{8}$/;
        if (!phoneRegex.test(phone)) {
            showToast('Please enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)', 'error');
            return false;
        }
        
        if (currentPaymentMethod === 'mpesa') {
            const mpesaPhone = elements.mpesaNumber.value.trim();
            if (!mpesaPhone) {
                showToast('Please enter your M-Pesa phone number', 'error');
                return false;
            }
            if (!phoneRegex.test(mpesaPhone.replace('254', '0'))) {
                showToast('Please enter a valid M-Pesa phone number', 'error');
                return false;
            }
        }
        
        return true;
    }

    function processMpesaPayment() {
        const totals = calculateCartTotals();
        const phone = elements.mpesaNumber.value.replace('0', '254');
        
        // Show M-Pesa modal
        openModal(elements.mpesaModal);
        
        // In a real implementation, you would call your backend API here
        // For demo purposes, we'll simulate the payment
        
        showToast('Sending M-Pesa prompt to your phone...', 'info');
        
        // Simulate M-Pesa payment process
        setTimeout(() => {
            showToast('Please check your phone and enter your M-Pesa PIN', 'info');
        }, 2000);
    }

    function confirmMpesaPayment() {
        const mpesaCode = document.getElementById('mpesaCode').value.trim();
        
        if (!mpesaCode) {
            showToast('Please enter the M-Pesa confirmation code', 'error');
            return;
        }
        
        // Show loading
        openModal(elements.loadingModal);
        
        // Simulate payment confirmation
        setTimeout(() => {
            closeModal(elements.loadingModal);
            closeModal(elements.mpesaModal);
            completeOrder();
        }, 3000);
    }

    function processCardPayment() {
        openModal(elements.loadingModal);
        
        // Simulate card payment processing
        setTimeout(() => {
            closeModal(elements.loadingModal);
            completeOrder();
        }, 3000);
    }

    function processCashPayment() {
        openModal(elements.loadingModal);
        
        // Simulate order processing for cash
        setTimeout(() => {
            closeModal(elements.loadingModal);
            completeOrder();
        }, 2000);
    }

    function completeOrder() {
        const totals = calculateCartTotals();
        const orderId = 'ASH' + Date.now().toString().slice(-6);
        const customerName = elements.customerName.value;
        const customerPhone = elements.customerPhone.value;
        const deliveryAddress = elements.deliveryAddress.value;
        
        // Generate order details
        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = `
            <div class="order-summary">
                <div class="summary-item">
                    <strong>Order ID:</strong> ${orderId}
                </div>
                <div class="summary-item">
                    <strong>Customer:</strong> ${customerName}
                </div>
                <div class="summary-item">
                    <strong>Phone:</strong> ${customerPhone}
                </div>
                <div class="summary-item">
                    <strong>Address:</strong> ${deliveryAddress}
                </div>
                <div class="summary-item">
                    <strong>Items:</strong> ${cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div class="summary-item">
                    <strong>Payment Method:</strong> ${currentPaymentMethod.toUpperCase()}
                </div>
                <div class="summary-item total">
                    <strong>Total Amount:</strong> Ksh ${totals.total}
                </div>
                <div class="summary-item">
                    <strong>Estimated Delivery:</strong> 30-45 minutes
                </div>
            </div>
        `;
        
        // Send WhatsApp notification
        sendWhatsAppOrder(orderId, totals.total);
        
        // Show success modal
        openModal(elements.orderSuccessModal);
        
        // Clear cart
        cart = [];
        appliedPromo = false;
        discount = 0;
        saveCart();
        updateCartUI();
        
        // Reset form
        elements.paymentForm.reset();
    }

    function applyPromoCode() {
        if (appliedPromo) {
            showToast('Promo code already applied!', 'info');
            return;
        }
        
        const totals = calculateCartTotals();
        if (totals.subtotal >= 1000) {
            discount = Math.round(totals.subtotal * 0.2); // 20% discount
            appliedPromo = true;
            showToast('Promo code applied! 20% discount added.', 'success');
            updateCartUI();
            updatePaymentSummary();
        } else {
            showToast('Minimum order of Ksh 1000 required for this promo', 'warning');
        }
    }

    // ====================
    // TESTIMONIAL SLIDER
    // ====================
    function initTestimonialSlider() {
        let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        
        function showSlide(n) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + testimonials.length) % testimonials.length;
            
            testimonials[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        elements.sliderPrev.addEventListener('click', () => showSlide(currentSlide - 1));
        elements.sliderNext.addEventListener('click', () => showSlide(currentSlide + 1));
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // ====================
    // CONTACT FUNCTIONS
    // ====================
    function submitContactForm(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        if (!name || !email || !subject || !message) {
            showToast('Please fill all fields', 'error');
            return;
        }
        
        openModal(elements.loadingModal);
        
        // Simulate form submission
        setTimeout(() => {
            closeModal(elements.loadingModal);
            elements.contactForm.reset();
            showToast('Message sent successfully! We\'ll respond soon.', 'success');
        }, 2000);
    }

    function subscribeNewsletter(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        
        if (!email || !validateEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        openModal(elements.loadingModal);
        
        // Simulate subscription
        setTimeout(() => {
            closeModal(elements.loadingModal);
            elements.newsletterForm.reset();
            showToast('Subscribed successfully! Welcome to Ashen Bites family.', 'success');
        }, 1500);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ====================
    // UTILITY FUNCTIONS
    // ====================
    function toggleMobileMenu() {
        elements.mobileMenuBtn.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function setActiveNavLink(activeLink) {
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
        
        if (elements.navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    function openCart() {
        elements.cartPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        elements.cartPanel.classList.remove('active');
        document.body.style.overflow = '';
    }

    function scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            closeCart();
            if (elements.navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }

    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' :
                    type === 'error' ? 'exclamation-circle' :
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function openGoogleMaps() {
        const address = encodeURIComponent("Githurai 44, Kamiti Road, Opposite Naivas Supermarket, Nairobi, Kenya");
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }

    function makePhoneCall() {
        window.location.href = 'tel:+254746562072';
    }

    function sendWhatsAppOrder(orderId, total) {
        const name = elements.customerName.value;
        const phone = elements.customerPhone.value;
        const address = elements.deliveryAddress.value;
        
        const orderItems = cart.map(item => 
            `${item.name} × ${item.quantity} - Ksh ${item.price * item.quantity}`
        ).join('%0A');
        
        const message = `*NEW ORDER - Ashen Bites*%0A%0A` +
                       `*Order ID:* ${orderId}%0A` +
                       `*Customer:* ${name}%0A` +
                       `*Phone:* ${phone}%0A` +
                       `*Address:* ${address}%0A%0A` +
                       `*Order Details:*%0A${orderItems}%0A%0A` +
                       `*Total:* Ksh ${total}%0A` +
                       `*Payment Method:* ${currentPaymentMethod.toUpperCase()}%0A` +
                       `*Delivery Time:* ASAP (30-45 min)`;
        
        window.open(`https://wa.me/254746562072?text=${message}`, '_blank');
    }

    // ====================
    // INITIALIZATION COMPLETE
    // ====================
    console.log('Ashen Bites website fully loaded and functional!');
});