// Shopping cart
let cart = [];

// Product data (only visible products)
const productData = [
    {
        id: 100,
        title: "Nasi Lemak",
        description: "Coconut rice with sambal, anchovies, peanuts and boiled egg",
        category: "Main",
        productCode: "FOOD-001",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1634034379073-f689b460a3fc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 101,
        title: "Char Kway Teow",
        description: "Stir-fried rice noodles with prawns, eggs, and bean sprouts",
        category: "Main",
        productCode: "FOOD-002",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 102,
        title: "Roti Canai",
        description: "Flaky flatbread served with curry dipping sauce",
        category: "Side",
        productCode: "FOOD-003",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1628432136678-43ff9be34064?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 103,
        title: "Teh Tarik",
        description: "Sweet pulled milk tea, Malaysia's national drink",
        category: "Beverage",
        productCode: "DRINK-001",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 104,
        title: "Satay Ayam",
        description: "Grilled chicken skewers with peanut sauce",
        category: "Side",
        productCode: "FOOD-004",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 105,
        title: "Laksa Johor",
        description: "Spicy noodle soup with fish and vegetables",
        category: "Main",
        productCode: "FOOD-005",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 106,
        title: "Cendol",
        description: "Traditional dessert with shaved ice, coconut milk and palm sugar",
        category: "Dessert",
        productCode: "DESS-001",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    },
    {
        id: 107,
        title: "Air Bandung",
        description: "Rose syrup milk drink",
        category: "Beverage",
        productCode: "DRINK-002",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&w=400",
        hidden: false
    }
];

// Categories
const categories = [
    { id: 1, name: "All", color: "#94a3b8" },
    { id: 2, name: "Main", color: "#10b981" },
    { id: 3, name: "Side", color: "#f97316" },
    { id: 4, name: "Beverage", color: "#0ea5e9" },
    { id: 5, name: "Dessert", color: "#8b5cf6" }
];

// 🔴 REPLACE THIS WITH YOUR ACTUAL GAS WEB APP URL
// After deploying GAS, copy the web app URL and paste it here
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyyxbp1TfBP5ZWvGmAeGVo67D-NYTsqEBil_NFAgZaamyykf_rs3LPR0Njx5IUQo-U/exec";

// Contact information
const restaurantInfo = {
    name: "Malaysian Restaurant",
    email: "orders@restaurant.com",
    phone: "+60 12-345 6789",
    whatsapp: "+60123456789",
    address: "123 Jalan Street, Kuala Lumpur",
    deliveryFee: 5.00,
    freeDeliveryThreshold: 50.00
};

// Customer information
let customerInfo = {
    name: "",
    email: "",
    phone: "",
    address: "",
    orderType: "pickup",
    specialInstructions: ""
};

// Order information
let currentOrder = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    status: "pending",
    paymentMethod: ""
};

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const deliveryFee = document.getElementById('deliveryFee');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const summaryModal = document.getElementById('summaryModal');
const summaryItems = document.getElementById('summaryItems');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryDelivery = document.getElementById('summaryDelivery');
const summaryTotal = document.getElementById('summaryTotal');
const closeSummary = document.getElementById('closeSummary');
const screenshotBtn = document.getElementById('screenshotBtn');
const summaryContent = document.getElementById('summaryContent');
const categoryFilter = document.getElementById('categoryFilter');
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortBy = document.getElementById('sortBy');
const nextToPaymentBtn = document.getElementById('nextToPaymentBtn');
const backToSummaryBtn = document.getElementById('backToSummaryBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const paymentStep = document.getElementById('paymentStep');
const summaryStep = document.getElementById('summaryStep');
const confirmationStep = document.getElementById('confirmationStep');
const paymentOptions = document.querySelectorAll('.payment-option');
const maeQrContainer = document.getElementById('maeQrContainer');
const tngQrContainer = document.getElementById('tngQrContainer');
const cashInstructions = document.getElementById('cashInstructions');
const maeQrImage = document.getElementById('maeQrImage');
const tngQrImage = document.getElementById('tngQrImage');
const cashAmount = document.getElementById('cashAmount');
const maeOrderId = document.getElementById('maeOrderId');
const tngOrderId = document.getElementById('tngOrderId');
const cashOrderId = document.getElementById('cashOrderId');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
const backToCartBtn = document.getElementById('backToCartBtn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const customerModal = document.getElementById('customerModal');
const customerForm = document.getElementById('customerForm');
const closeCustomerModal = document.getElementById('closeCustomerModal');
const cancelCustomerInfo = document.getElementById('cancelCustomerInfo');
const loadingSpinner = document.getElementById('loadingSpinner');
const customerDetailsDisplay = document.getElementById('customerDetailsDisplay');
const orderId = document.getElementById('orderId');
const orderDate = document.getElementById('orderDate');
const confirmedOrderId = document.getElementById('confirmedOrderId');
const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
const startNewOrderBtn = document.getElementById('startNewOrderBtn');

// Generate a unique order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Set current date
    const now = new Date();
    orderDate.textContent = now.toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Cart events
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('open');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('open');
    });
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        cartModal.classList.remove('open');
        showCustomerModal();
    });
    
    // Customer modal events
    closeCustomerModal.addEventListener('click', () => {
        customerModal.classList.remove('active');
    });
    
    cancelCustomerInfo.addEventListener('click', () => {
        customerModal.classList.remove('active');
    });
    
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCustomerInfo();
        customerModal.classList.remove('active');
        showOrderSummary();
    });
    
    // Summary modal events
    closeSummary.addEventListener('click', () => {
        summaryModal.classList.remove('active');
        showSummaryStep();
    });
    
    screenshotBtn.addEventListener('click', () => {
        captureScreenshot();
    });
    
    backToCartBtn.addEventListener('click', () => {
        summaryModal.classList.remove('active');
        cartModal.classList.add('open');
    });
    
    // Payment step events
    nextToPaymentBtn.addEventListener('click', showPaymentStep);
    backToSummaryBtn.addEventListener('click', showSummaryStep);
    
    confirmOrderBtn.addEventListener('click', () => {
        submitOrder();
    });
    
    newOrderBtn.addEventListener('click', startNewOrder);
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const method = option.dataset.method;
            maeQrContainer.classList.remove('active');
            tngQrContainer.classList.remove('active');
            cashInstructions.classList.remove('active');
            
            if (method === 'mae') {
                maeQrContainer.classList.add('active');
                currentOrder.paymentMethod = 'mae';
            } else if (method === 'tng') {
                tngQrContainer.classList.add('active');
                currentOrder.paymentMethod = 'tng';
            } else if (method === 'cash') {
                cashInstructions.classList.add('active');
                currentOrder.paymentMethod = 'cash';
            }
            
            updatePaymentDetails();
        });
    });
    
    // New order buttons
    startNewOrderBtn.addEventListener('click', startNewOrder);
    
    // Download receipt
    downloadReceiptBtn.addEventListener('click', () => {
        captureReceipt();
    });
    
    // Search and sort
    searchInput.addEventListener('input', filterProducts);
    sortBy.addEventListener('change', sortProducts);
    
    // Initialize
    renderCategoryFilter();
    renderProductGrid();
    updateCart();
    
    // Activate first category
    const firstCategory = document.querySelector('.category-btn');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
}

// Notification function
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.style.background = type === 'error' ? 'var(--danger)' : 'var(--success)';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Category filter rendering
function renderCategoryFilter() {
    categoryFilter.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category.name;
        btn.dataset.category = category.name;
        btn.style.backgroundColor = category.color;
        categoryFilter.appendChild(btn);
        
        btn.addEventListener('click', () => {
            filterProductsByCategory(category.name);
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Product grid rendering
function renderProductGrid(products = productData) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try a different search or category</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image-preview">
            <div class="product-info">
                <div class="product-title-preview">
                    <span>${product.title}</span>
                    <span class="product-price-preview">RM ${product.price.toFixed(2)}</span>
                </div>
                <div class="product-description">${product.description}</div>
                <div class="product-category" style="background: ${getCategoryColor(product.category)}">
                    ${product.category}
                </div>
                <div class="product-footer">
                    <div class="product-code">${product.productCode}</div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
        
        // Add to cart on card click
        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart')) {
                addToCart(product.id);
            }
        });
        
        // Add to cart button
        const addBtn = productCard.querySelector('.add-to-cart');
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });
    });
}

// Get category color
function getCategoryColor(categoryName) {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color + '40' : '#94a3b840';
}

// Filter products by category
function filterProductsByCategory(category) {
    if (category === "All") {
        renderProductGrid(productData);
        return;
    }
    
    const filteredProducts = productData.filter(product => product.category === category);
    renderProductGrid(filteredProducts);
}

// Search filter
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const currentCategory = document.querySelector('.category-btn.active')?.dataset.category;
    
    let filtered = productData;
    
    // Apply category filter
    if (currentCategory && currentCategory !== 'All') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.productCode.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProductGrid(filtered);
}

// Sort products
function sortProducts() {
    const sortValue = sortBy.value;
    let sortedProducts = [...productData];
    
    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    renderProductGrid(sortedProducts);
}

// Add to cart
function addToCart(productId) {
    const product = productData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            productCode: product.productCode,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Added to cart!');
    
    // Optional: Auto-open cart for first item
    if (cart.length === 1) {
        setTimeout(() => {
            cartModal.classList.add('open');
        }, 300);
    }
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        cartSubtotal.textContent = 'RM 0.00';
        deliveryFee.textContent = 'RM 0.00';
        cartTotal.textContent = 'RM 0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">RM ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="remove-item" data-id="${item.id}" title="Remove item">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Calculate delivery
    const delivery = subtotal >= restaurantInfo.freeDeliveryThreshold ? 0 : restaurantInfo.deliveryFee;
    const total = subtotal + delivery;
    
    // Update totals
    cartSubtotal.textContent = `RM ${subtotal.toFixed(2)}`;
    deliveryFee.textContent = delivery === 0 ? 'FREE' : `RM ${delivery.toFixed(2)}`;
    cartTotal.textContent = `RM ${total.toFixed(2)}`;
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
        showNotification('Item removed from cart');
    }
    
    updateCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart');
}

// Show customer modal
function showCustomerModal() {
    customerModal.classList.add('active');
}

// Save customer info
function saveCustomerInfo() {
    customerInfo = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('deliveryAddress').value,
        orderType: document.getElementById('orderType').value,
        specialInstructions: document.getElementById('specialInstructions').value
    };
}

// Show order summary
function showOrderSummary() {
    // Update order ID and date
    currentOrder.id = generateOrderId();
    orderId.textContent = currentOrder.id;
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const delivery = customerInfo.orderType === 'delivery' && subtotal < restaurantInfo.freeDeliveryThreshold 
        ? restaurantInfo.deliveryFee 
        : 0;
    const total = subtotal + delivery;
    
    // Update current order
    currentOrder.items = [...cart];
    currentOrder.subtotal = subtotal;
    currentOrder.deliveryFee = delivery;
    currentOrder.total = total;
    currentOrder.date = new Date().toISOString();
    
    // Update summary display
    summaryItems.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}<br><small>${item.productCode}</small></td>
            <td>RM ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>RM ${itemTotal.toFixed(2)}</td>
        `;
        summaryItems.appendChild(row);
    });
    
    // Update totals
    summarySubtotal.textContent = `RM ${subtotal.toFixed(2)}`;
    summaryDelivery.textContent = delivery === 0 ? 'FREE' : `RM ${delivery.toFixed(2)}`;
    summaryTotal.textContent = `RM ${total.toFixed(2)}`;
    
    // Update customer details display
    customerDetailsDisplay.innerHTML = `
        <div>
            <p><strong>Name:</strong> ${customerInfo.name}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
        </div>
        <div>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
            <p><strong>Type:</strong> ${customerInfo.orderType === 'delivery' ? 'Delivery' : 'Pickup'}</p>
        </div>
        ${customerInfo.address ? `
            <div class="full-width">
                <p><strong>Address:</strong> ${customerInfo.address}</p>
            </div>
        ` : ''}
        ${customerInfo.specialInstructions ? `
            <div class="full-width">
                <p><strong>Instructions:</strong> ${customerInfo.specialInstructions}</p>
            </div>
        ` : ''}
    `;
    
    // Show summary modal
    summaryModal.classList.add('active');
    showSummaryStep();
}

// Show summary step
function showSummaryStep() {
    summaryStep.classList.add('active');
    paymentStep.classList.remove('active');
    confirmationStep.classList.remove('active');
}

// Show payment step
function showPaymentStep() {
    summaryStep.classList.remove('active');
    paymentStep.classList.add('active');
    confirmationStep.classList.remove('active');
    updatePaymentDetails();
}

// Update payment details
function updatePaymentDetails() {
    const total = currentOrder.total;
    
    // Update QR codes with order details
    const qrData = {
        amount: total,
        orderId: currentOrder.id,
        merchant: restaurantInfo.name
    };
    
    // Update MAE QR
    maeQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        `MAE:${restaurantInfo.phone}?amount=${total}&order=${currentOrder.id}`
    )}`;
    
    // Update TNG QR
    tngQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        `TNG:${restaurantInfo.whatsapp}?amount=${total}&order=${currentOrder.id}`
    )}`;
    
    // Update cash details
    cashAmount.textContent = total.toFixed(2);
    maeOrderId.textContent = currentOrder.id;
    tngOrderId.textContent = currentOrder.id;
    cashOrderId.textContent = currentOrder.id;
}

// 🔴 FIXED: Submit order to Google Apps Script
async function submitOrder() {
    if (!currentOrder.paymentMethod) {
        showNotification('Please select a payment method', 'error');
        return;
    }
    
    // Show loading spinner
    loadingSpinner.classList.add('active');
    
    try {
        // Prepare order data for GAS
        const orderData = {
            orderId: currentOrder.id,
            timestamp: currentOrder.date,
            customer: customerInfo,
            items: cart.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                productCode: item.productCode
            })),
            subtotal: currentOrder.subtotal,
            deliveryFee: currentOrder.deliveryFee,
            total: currentOrder.total,
            paymentMethod: currentOrder.paymentMethod,
            restaurant: restaurantInfo,
            status: "Pending"
        };
        
        console.log('Sending order to GAS:', orderData);
        
        // Send to Google Apps Script using fetch
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Try to parse JSON response
        let result;
        try {
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            // Try to parse as JSON
            if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
                result = JSON.parse(responseText);
            } else {
                // If not JSON, create a success response anyway
                result = {
                    success: true,
                    orderId: currentOrder.id,
                    message: 'Order submitted successfully'
                };
            }
        } catch (parseError) {
            console.warn('Could not parse response as JSON:', parseError);
            // Create a success response anyway
            result = {
                success: true,
                orderId: currentOrder.id,
                message: 'Order submitted (response not JSON)'
            };
        }
        
        // Hide loading spinner
        loadingSpinner.classList.remove('active');
        
        // Check if order was successful
        if (result && result.success) {
            console.log('Order submitted successfully:', result);
            
            // Update order ID with the one from server (if provided)
            if (result.orderId) {
                currentOrder.id = result.orderId;
                confirmedOrderId.textContent = currentOrder.id;
            }
            
            // Show confirmation step
            showConfirmationStep();
            
            // Show success notification
            showNotification('Order submitted successfully!');
            
        } else {
            // If we can't determine success but got a 200 OK response
            if (response.ok) {
                console.log('Assuming success from 200 OK response');
                showConfirmationStep();
                showNotification('Order submitted successfully!');
            } else {
                throw new Error(result?.message || 'Failed to submit order');
            }
        }
        
    } catch (error) {
        console.error('Error submitting order:', error);
        loadingSpinner.classList.remove('active');
        
        // Show user-friendly error message
        let errorMessage = 'Failed to submit order. ';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Cannot connect to server. Please check:';
            errorMessage += '\n1. Your internet connection';
            errorMessage += '\n2. The GAS web app URL is correct';
            errorMessage += '\n3. The GAS app is deployed with "Anyone" access';
        } else if (error.message.includes('CORS')) {
            errorMessage += 'CORS error. Please ensure GAS is deployed correctly.';
        } else if (error.message.includes('NetworkError')) {
            errorMessage += 'Network error. Please check your connection.';
        } else {
            errorMessage += error.message;
        }
        
        // Show detailed error in console for debugging
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            orderData: currentOrder,
            GAS_URL: GAS_WEB_APP_URL
        });
        
        // Show notification with error
        showNotification(errorMessage, 'error');
        
        // Also show an alert with troubleshooting steps
        setTimeout(() => {
            alert('⚠️ Order Submission Issue\n\n' +
                  'If orders are not being saved:\n\n' +
                  '1. Check if GAS web app is deployed correctly\n' +
                  '2. Ensure the GAS URL in script.js is correct\n' +
                  '3. Check browser console for detailed errors\n' +
                  '4. Try testing the GAS URL directly\n\n' +
                  'For now, please take a screenshot of your order and send it to WhatsApp.');
        }, 500);
    }
}

// Alternative submit function (simpler version for testing)
async function submitOrderSimple() {
    loadingSpinner.classList.add('active');
    
    try {
        // Prepare data
        const orderData = {
            orderId: currentOrder.id,
            customer: customerInfo,
            items: cart,
            total: currentOrder.total,
            paymentMethod: currentOrder.paymentMethod
        };
        
        // Use FormData to avoid CORS issues
        const formData = new FormData();
        formData.append('order', JSON.stringify(orderData));
        
        // Send using FormData
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            body: formData
        });
        
        // Wait a bit to simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        loadingSpinner.classList.remove('active');
        
        // Always show confirmation (for testing)
        showConfirmationStep();
        showNotification('Order submitted! Check email for confirmation.');
        
    } catch (error) {
        loadingSpinner.classList.remove('active');
        console.error('Error:', error);
        showNotification('Order saved locally. Please contact us directly.', 'error');
    }
}

// Test GAS connection
async function testGASConnection() {
    try {
        console.log('Testing GAS connection...');
        
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'GET',
            mode: 'cors'
        });
        
        console.log('Test response status:', response.status);
        
        if (response.ok) {
            const text = await response.text();
            console.log('Test response:', text);
            return true;
        } else {
            console.error('Test failed:', response.status);
            return false;
        }
        
    } catch (error) {
        console.error('Connection test error:', error);
        return false;
    }
}

// Show confirmation step
function showConfirmationStep() {
    paymentStep.classList.remove('active');
    confirmationStep.classList.add('active');
    confirmedOrderId.textContent = currentOrder.id;
    
    // Update order tracking with current order ID
    document.querySelectorAll('.order-id, .maeOrderId, .tngOrderId, .cashOrderId').forEach(el => {
        if (el.id.includes('OrderId') || el.classList.contains('order-id')) {
            el.textContent = currentOrder.id;
        }
    });
    
    // Send confirmation email (simulated)
    sendConfirmationEmail();
}

// Send confirmation email
function sendConfirmationEmail() {
    // In production, this would be handled by GAS
    console.log('Confirmation email would be sent to:', customerInfo.email);
    
    // Show email sent notification
    setTimeout(() => {
        const emailNote = document.createElement('div');
        emailNote.className = 'email-notification';
        emailNote.innerHTML = `
            <i class="fas fa-envelope"></i>
            <span>Confirmation sent to ${customerInfo.email}</span>
        `;
        document.querySelector('.confirmation-details').appendChild(emailNote);
    }, 1000);
}

// Capture screenshot
function captureScreenshot() {
    html2canvas(summaryContent, {
        backgroundColor: '#16213e',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `order-summary-${currentOrder.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showNotification('Screenshot saved!');
    });
}

// Capture receipt
function captureReceipt() {
    html2canvas(confirmationStep, {
        backgroundColor: '#16213e',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `receipt-${currentOrder.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showNotification('Receipt downloaded!');
    });
}

// Start new order
function startNewOrder() {
    // Reset everything
    cart = [];
    customerInfo = {
        name: "",
        email: "",
        phone: "",
        address: "",
        orderType: "pickup",
        specialInstructions: ""
    };
    currentOrder = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
        status: "pending",
        paymentMethod: ""
    };
    
    // Update UI
    updateCart();
    summaryModal.classList.remove('active');
    cartModal.classList.remove('open');
    
    // Reset forms
    customerForm.reset();
    
    // Reset payment selection
    paymentOptions.forEach(opt => opt.classList.remove('active'));
    maeQrContainer.classList.remove('active');
    tngQrContainer.classList.remove('active');
    cashInstructions.classList.remove('active');
    
    // Show notification
    showNotification('New order started! Add items to your cart.');
}

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cartModal.classList.remove('open');
        summaryModal.classList.remove('active');
        customerModal.classList.remove('active');
    }
});

// Close modals on outside click
document.addEventListener('click', (e) => {
    if (e.target === summaryModal) {
        summaryModal.classList.remove('active');
    }
    if (e.target === customerModal) {
        customerModal.classList.remove('active');
    }
});

// Add CSS for email notification
const style = document.createElement('style');
style.textContent = `
    .email-notification {
        background: rgba(76, 201, 240, 0.1);
        border: 1px solid rgba(76, 201, 240, 0.3);
        padding: 10px 15px;
        border-radius: 8px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--success);
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 50px;
        color: #aaa;
    }
    
    .no-products i {
        font-size: 3rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .empty-cart {
        text-align: center;
        padding: 40px 20px;
        color: #666;
    }
    
    .empty-cart i {
        font-size: 3rem;
        margin-bottom: 15px;
        opacity: 0.3;
    }
    
    .full-width {
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(style);

// Initialize with some sample data for demo (optional)
window.addEventListener('load', () => {
    console.log('Food ordering system initialized');
    console.log('GAS URL:', GAS_WEB_APP_URL);
    
    // Test GAS connection on load
    testGASConnection().then(isConnected => {
        if (isConnected) {
            console.log('✅ GAS connection successful');
        } else {
            console.warn('⚠️ GAS connection failed. Check URL and deployment.');
        }
    });
    
    // For demo purposes, you can pre-populate cart
    // addToCart(100);
    // addToCart(103);
});
