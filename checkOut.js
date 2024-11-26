const totalQuantityElement = document.querySelector('.totalQuantity');
const totalPriceElement = document.querySelector('.totalPrice');
const listElement = document.querySelector('.list');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const addressInput = document.querySelector('#address');
const checkoutButton = document.querySelector('.buttonCheckout');

let carts = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// Fetch products from product.json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        updateCartSummary();
    })
    .catch(error => console.error('Error loading products:', error));

function updateCartSummary() {
    let totalQuantity = 0;
    let totalPrice = 0;

    listElement.innerHTML = '';

    carts.forEach(cartItem => {
        const product = products.find(p => p.id == cartItem.product_id);

        if (product) {
            totalQuantity += cartItem.quantity;
            totalPrice += product.price * cartItem.quantity;

            const itemHTML = `
                <div class="item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${cartItem.quantity}</div>
                    <div class="returnPrice">$${(product.price * cartItem.quantity).toFixed(2)}</div>
                </div>`;
            listElement.insertAdjacentHTML('beforeend', itemHTML);
        } else {
            console.warn(`Unknown product_id: ${cartItem.product_id}`);
        }
    });

    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function handleCheckout() {
    const customerName = nameInput.value;
    const customerPhone = phoneInput.value;
    const customerEmail = emailInput.value;
    const customerAddress = addressInput.value;

    if (!customerEmail) {
        alert('Please enter your email.');
        return;
    }

    const orderDetails = {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        cartItems: carts.map(cartItem => {
            const product = products.find(p => p.id == cartItem.product_id);
            return {
                name: product ? product.name : 'Unknown Product',
                quantity: cartItem.quantity
            };
        }),
        totalPrice: totalPriceElement.textContent.replace('$', ''),
        totalQuantity: totalQuantityElement.textContent
    };

    fetch('http://localhost:3000/send-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Your order has been placed successfully!');
        } else {
            alert('There was an issue with your order.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your order.');
    });
}

function initCheckout() {
    checkoutButton.addEventListener('click', handleCheckout);
}

initCheckout();
