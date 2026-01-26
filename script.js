// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // INITIALIZATION
    // ====================
    
    // Menu Data
    const menuData = [
        {
            id: 1,
            name: "Classic Smocha Deluxe",
            description: "Traditional minced meat with secret spices, served with fresh chapati",
            price: 150,
            category: "smocha",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "15 min",
            spiceLevel: "Medium",
            rating: 4.8,
            popular: true
        },
        {
            id: 2,
            name: "Premium Mutura Feast",
            description: "Grilled blood sausage with herbs, served with kachumbari",
            price: 250,
            category: "grilled",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "20 min",
            spiceLevel: "Hot",
            rating: 4.9,
            popular: true
        },
        {
            id: 3,
            name: "Chips Mwitu Special",
            description: "Crispy fries with beef stew, vegetables, and secret sauce",
            price: 350,
            category: "snacks",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "25 min",
            spiceLevel: "Mild",
            rating: 4.7,
            popular: false
        },
        {
            id: 4,
            name: "Grilled Chicken",
            description: "Tender chicken marinated in traditional spices",
            price: 400,
            category: "grilled",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "30 min",
            spiceLevel: "Medium",
            rating: 4.6,
            popular: false
        },
        {
            id: 5,
            name: "Vegetable Smocha",
            description: "Mixed vegetables with traditional spices",
            price: 120,
            category: "smocha",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "12 min",
            spiceLevel: "Mild",
            rating: 4.5,
            popular: false
        },
        {
            id: 6,
            name: "Fresh Juice",
            description: "Orange, Passion, or Mango juice",
            price: 80,
            category: "drinks",
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            prepTime: "5 min",
            spiceLevel: "None",
            rating: 4.8,
            popular: false
        }
    ];

    // Cart initialization
    let cart = JSON.parse(localStorage.getItem('ashenBitesCart')) || [];
    let currentPaymentMethod = 'mpesa';

    // ====================
    // DOM ELEMENTS
    // ====================
    const elements = {
        mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
        navMenu: document.querySelector('.nav-menu'),
        cartBtn: document.getElementById('cartButton'),
        cartPanel: document.getElementById('cartPanel'),
        cartClose: document.getElementById('cartClose'),
        cartItems: document.getElementById('cartItems'),
        cartCount: document.querySelector('.cart-count'),
        cartTotal: document.querySelector('.cart-total'),
        subtotal: document.querySelector('.subtotal'),
        deliveryFee: document.querySelector('.delivery-fee'),
        totalAmount: document.querySelector('.total-amount'),
        checkoutBtn: document.getElementById('checkoutBtn'),
        browseMenuBtn: document.getElementById('browseMenuBtn'),
        orderNowBtn: document.getElementById('orderNowBtn'),
        viewMenuBtn: document.getElementById('viewMenuBtn'),
        applyPromoBtn: document.getElementById('applyPromoBtn'),
        viewCartBtn: document.getElementById('viewCartBtn'),
        checkoutProcessBtn: document.getElementById('checkoutProcessBtn'),
        trackOrderBtn: document.getElementById('trackOrderBtn'),
        openMapBtn: document.getElementById('openMapBtn'),
        callBtn: document.getElementById('callBtn'),
        paymentForm: document.getElementById('paymentForm'),
        submitPaymentBtn: document.getElementById('submitPaymentBtn'),
        orderSuccessModal: document.getElementById('orderSuccessModal'),
        continueShoppingBtn: document.getElementById('continueShoppingBtn'),
        loadingModal: document.getElementById('loadingModal'),
        quickViewModal: document.getElementById('quickViewModal'),
        toastContainer: document.getElementById('toastContainer'),
        menuGrid: document.getElementById('menuGrid'),
        categoryFilters: document.querySelectorAll('.category-filter'),
        paymentMethods: document.querySelectorAll('.method-card'),
        orderTotal: document.querySelector('.order-total'),
        amountTotal: document.querySelector('.amount-total'),
        customerName: document.getElementById('customerName'),
        customerPhone: document.getElementById('customerPhone'),
        deliveryAddress: document.getElementById('deliveryAddress')
    };

    // ====================
    // INITIAL SETUP
    // ====================
    updateCartCount();
    renderMenuGrid();
    setupEventListeners();

    // ====================
    // EVENT LISTENERS SETUP
    // ====================
    function setupEventListeners() {
        // Mobile Menu
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Cart
        elements.cartBtn.addEventListener('click', openCart);
        elements.cartClose.addEventListener('click', closeCart);
        elements.browseMenuBtn?.addEventListener('click', () => {
            closeCart();
            scrollToSection('#menu');
        });
        
        // Navigation
        elements.orderNowBtn?.addEventListener('click', () => scrollToSection('#order'));
        elements.viewMenuBtn?.addEventListener('click', () => scrollToSection('#menu'));
        elements.viewCartBtn?.addEventListener('click', openCart);
        elements.checkoutProcessBtn?.addEventListener('click', () => scrollToSection('.payment-section'));
        elements.trackOrderBtn?.addEventListener('click', showToast);
        elements.openMapBtn?.addEventListener('click', openGoogleMaps);
        elements.callBtn?.addEventListener('click', makePhoneCall);
        elements.applyPromoBtn?.addEventListener('click', applyPromoCode);
        elements.continueShoppingBtn?.addEventListener('click', closeSuccessModal);
        
        // Menu Filtering
        elements.categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => filterMenu(filter.dataset.category));
        });
        
        // Payment Methods
        elements.paymentMethods.forEach(method => {
            method.addEventListener('click', () => selectPaymentMethod(method.dataset.method));
        });
        
        // Payment Form
        elements.paymentForm?.addEventListener('submit', processPayment);
        
        // Add to Cart buttons
        document.addEventListener('click', function(e) {
            // Add to cart from featured dishes
            if (e.target.classList.contains('add-to-cart')) {
                const dishId = e.target.dataset.id;
                addToCart(dishId);
            }
            
            // Quantity controls
            if (e.target.classList.contains('qty-btn')) {
                const dishId = e.target.dataset.id;
                const isPlus = e.target.classList.contains('plus');
                updateQuantity(dishId, isPlus);
            }
            
            // Quick view
            if (e.target.classList.contains('quick-view')) {
                const dishId = e.target.dataset.id;
                showQuickView(dishId);
            }
        });
        
        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
        
        // Update cart when items change
        document.addEventListener('cartUpdated', updateCartUI);
        
        // Update payment summary when cart changes
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
        
        // Trigger cart updated event
        document.dispatchEvent(new Event('cartUpdated'));
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
        document.dispatchEvent(new Event('cartUpdated'));
    }

    function removeFromCart(dishId) {
        cart = cart.filter(item => item.id != dishId);
        saveCart();
        showToast('Item removed from cart', 'warning');
        document.dispatchEvent(new Event('cartUpdated'));
    }

    function saveCart() {
        localStorage.setItem('ashenBitesCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (elements.cartCount) {
            elements.cartCount.textContent = totalItems;
            elements.cartTotal.textContent = `Ksh ${totalPrice}`;
        }
        
        // Update checkout button state
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
            
            // Reattach event listener
            document.getElementById('browseMenuBtn')?.addEventListener('click', () => {
                closeCart();
                scrollToSection('#menu');
            });
            
            return;
        }
        
        elements.cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Ksh ${item.price} × ${item.quantity}</p>
                    <div class="cart-item-actions">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">
                    Ksh ${item.price * item.quantity}
                </div>
            </div>
        `).join('');
        
        // Add event listeners to cart item buttons
        elements.cartItems.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                const isPlus = this.classList.contains('plus');
                updateQuantity(dishId, isPlus);
            });
        });
        
        elements.cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                removeFromCart(dishId);
            });
        });
        
        // Update cart totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 150;
        const total = subtotal + delivery;
        
        if (elements.subtotal) elements.subtotal.textContent = `Ksh ${subtotal}`;
        if (elements.totalAmount) elements.totalAmount.textContent = `Ksh ${total}`;
    }

    // ====================
    // MENU FUNCTIONS
    // ====================
    function renderMenuGrid(filter = 'all') {
        if (!elements.menuGrid) return;
        
        const filteredMenu = filter === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === filter);
        
        elements.menuGrid.innerHTML = filteredMenu.map(item => `
            <div class="menu-item" data-category="${item.category}">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
                    <button class="quick-view-btn" data-id="${item.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-meta">
                        <span><i class="fas fa-clock"></i> ${item.prepTime}</span>
                        <span><i class="fas fa-pepper-hot"></i> ${item.spiceLevel}</span>
                        <span><i class="fas fa-star"></i> ${item.rating}</span>
                    </div>
                    <div class="menu-item-footer">
                        <div class="price">Ksh ${item.price}</div>
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="qty-display">1</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="add-to-cart-btn" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to menu items
        elements.menuGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                addToCart(dishId);
            });
        });
        
        elements.menuGrid.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                const isPlus = this.classList.contains('plus');
                // Update quantity display
                const qtyDisplay = this.parentElement.querySelector('.qty-display');
                let currentQty = parseInt(qtyDisplay.textContent);
                
                if (isPlus) {
                    currentQty += 1;
                } else if (currentQty > 1) {
                    currentQty -= 1;
                }
                
                qtyDisplay.textContent = currentQty;
            });
        });
        
        elements.menuGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = this.dataset.id;
                showQuickView(dishId);
            });
        });
    }

    function filterMenu(category) {
        // Update active filter
        elements.categoryFilters.forEach(filter => {
            filter.classList.remove('active');
            if (filter.dataset.category === category) {
                filter.classList.add('active');
            }
        });
        
        renderMenuGrid(category);
        scrollToSection('#menu');
    }

    function showQuickView(dishId) {
        const dish = menuData.find(item => item.id == dishId);
        if (!dish) return;
        
        const quickViewContent = document.getElementById('quickViewContent');
        if (quickViewContent) {
            quickViewContent.innerHTML = `
                <div class="quickview-image">
                    <img src="${dish.image}" alt="${dish.name}">
                </div>
                <div class="quickview-details">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <div class="quickview-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>Preparation: ${dish.prepTime}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-pepper-hot"></i>
                            <span>Spice Level: ${dish.spiceLevel}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-star"></i>
                            <span>Rating: ${dish.rating}/5</span>
                        </div>
                    </div>
                    <div class="quickview-price">
                        <span class="price">Ksh ${dish.price}</span>
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${dish.id}">-</button>
                            <span class="qty-display">1</span>
                            <button class="qty-btn plus" data-id="${dish.id}">+</button>
                        </div>
                    </div>
                    <button class="btn-primary add-to-cart-quickview" data-id="${dish.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            
            // Add event listeners
            quickViewContent.querySelector('.add-to-cart-quickview')?.addEventListener('click', function() {
                addToCart(dishId);
                closeModal(elements.quickViewModal);
            });
            
            quickViewContent.querySelectorAll('.qty-btn').forEach(btn => {
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
                });
            });
        }
        
        openModal(elements.quickViewModal);
    }

    // ====================
    // PAYMENT FUNCTIONS
    // ====================
    function selectPaymentMethod(method) {
        currentPaymentMethod = method;
        
        // Update UI
        elements.paymentMethods.forEach(m => {
            m.classList.remove('active');
            if (m.dataset.method === method) {
                m.classList.add('active');
            }
        });
        
        // Update payment button text
        if (elements.submitPaymentBtn) {
            let methodText = '';
            switch(method) {
                case 'mpesa': methodText = 'M-Pesa'; break;
                case 'card': methodText = 'Card'; break;
                case 'cash': methodText = 'Cash on Delivery'; break;
            }
            elements.submitPaymentBtn.innerHTML = `<i class="fas fa-lock"></i> Pay with ${methodText}`;
        }
    }

    function updatePaymentSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 150;
        const total = subtotal + delivery;
        
        if (elements.orderTotal) elements.orderTotal.textContent = `Ksh ${total}`;
        if (elements.amountTotal) elements.amountTotal.textContent = `Ksh ${total}`;
    }

    function processPayment(e) {
        e.preventDefault();
        
        // Validate form
        if (!validatePaymentForm()) {
            showToast('Please fill all required fields correctly', 'error');
            return;
        }
        
        // Show loading
        openModal(elements.loadingModal);
        
        // Simulate payment processing
        setTimeout(() => {
            closeModal(elements.loadingModal);
            
            // Generate order summary
            const orderDetails = generateOrderSummary();
            const orderDetailsElement = document.getElementById('orderDetails');
            if (orderDetailsElement) {
                orderDetailsElement.innerHTML = orderDetails;
            }
            
            // Show success modal
            openModal(elements.orderSuccessModal);
            
            // Clear cart
            cart = [];
            saveCart();
            document.dispatchEvent(new Event('cartUpdated'));
            
            // Clear form
            elements.paymentForm.reset();
            
            // Send WhatsApp message
            sendWhatsAppOrder();
            
        }, 3000);
    }

    function validatePaymentForm() {
        if (!elements.customerName || !elements.customerPhone || !elements.deliveryAddress) {
            return false;
        }
        
        const name = elements.customerName.value.trim();
        const phone = elements.customerPhone.value.trim();
        const address = elements.deliveryAddress.value.trim();
        
        if (!name || !phone || !address) {
            return false;
        }
        
        // Validate phone number (Kenyan format)
        const phoneRegex = /^0[17]\d{8}$/;
        if (!phoneRegex.test(phone)) {
            return false;
        }
        
        return true;
    }

    function generateOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 150;
        const total = subtotal + delivery;
        
        return `
            <div class="summary-item">
                <strong>Order ID:</strong> ASH${Date.now().toString().slice(-6)}
            </div>
            <div class="summary-item">
                <strong>Items:</strong> ${cart.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div class="summary-item">
                <strong>Subtotal:</strong> Ksh ${subtotal}
            </div>
            <div class="summary-item">
                <strong>Delivery:</strong> Ksh ${delivery}
            </div>
            <div class="summary-item total">
                <strong>Total:</strong> Ksh ${total}
            </div>
            <div class="summary-item">
                <strong>Payment Method:</strong> ${currentPaymentMethod.toUpperCase()}
            </div>
            <div class="summary-item">
                <strong>Estimated Delivery:</strong> 30-45 minutes
            </div>
        `;
    }

    // ====================
    // UI FUNCTIONS
    // ====================
    function toggleMobileMenu() {
        elements.mobileMenuBtn.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : '';
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
            
            // Close mobile menu if open
            if (elements.navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Close cart if open
            if (elements.cartPanel.classList.contains('active')) {
                closeCart();
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

    function closeSuccessModal() {
        closeModal(elements.orderSuccessModal);
        scrollToSection('#home');
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'exclamation-circle' : 
                              'exclamation-triangle'}"></i>
            <span>${message}</span>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ====================
    // UTILITY FUNCTIONS
    // ====================
    function openGoogleMaps() {
        const address = encodeURIComponent("Githurai 44, Kamiti Road, Opposite Naivas Supermarket, Nairobi, Kenya");
        window.open(`https://maps.google.com/?q=${address}`, '_blank');
    }

    function makePhoneCall() {
        window.location.href = 'tel:+254746562072';
    }

    function applyPromoCode() {
        showToast('Promo code applied! 15% discount added to your order.', 'success');
    }

    function sendWhatsAppOrder() {
        const name = elements.customerName?.value || 'Customer';
        const phone = elements.customerPhone?.value || '';
        const address = elements.deliveryAddress?.value || '';
        
        const orderItems = cart.map(item => 
            `${item.name} × ${item.quantity} - Ksh ${item.price * item.quantity}`
        ).join('%0A');
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + 150;
        
        const message = `New Order from Ashen Bites Website%0A%0A` +
                       `Customer: ${name}%0A` +
                       `Phone: ${phone}%0A` +
                       `Address: ${address}%0A%0A` +
                       `Order Details:%0A${orderItems}%0A%0A` +
                       `Subtotal: Ksh ${subtotal}%0A` +
                       `Delivery: Ksh 150%0A` +
                       `Total: Ksh ${total}%0A` +
                       `Payment Method: ${currentPaymentMethod.toUpperCase()}`;
        
        // Open WhatsApp in new tab
        window.open(`https://wa.me/254746562072?text=${message}`, '_blank');
    }

    // ====================
    // INITIALIZATION COMPLETE
    // ====================
    console.log('Ashen Bites website initialized successfully!');
});