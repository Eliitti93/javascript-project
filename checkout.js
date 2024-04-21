document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Get the cart details container and cart counter element
  const cartDetailsContainer = document.getElementById('cart-details');
  const cartCounter = document.getElementById('cart-counter');

  // Function to update the checkout page based on the cart
  function updateCheckoutPage(updatedCart) {
    // Clear the existing content
    cartDetailsContainer.innerHTML = '';

    // Iterate through items in the cart and generate HTML
    updatedCart.forEach(item => {
      const itemDetails = document.createElement('div');
      itemDetails.innerHTML = `
          <p>${item.productName} - Quantity: ${item.quantity} - Price: €${item.price.toFixed(2)} - Color: ${item.color} - Size: ${item.size}</p>
      `;
      cartDetailsContainer.appendChild(itemDetails);
    });

    // Calculate and display the total amount
    const totalAmountContainer = document.getElementById('total-amount');
    const totalAmount = updatedCart.reduce((total, item) => total + item.price, 0);
    totalAmountContainer.innerHTML = `<p>Total Amount: €${totalAmount.toFixed(2)}</p>`;

    // Update the cart counter
    const totalItems = updatedCart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = `(${totalItems})`;
  }

  // Initial update based on the cart retrieved from localStorage
  updateCheckoutPage(cart);

  // Listen for messages from other windows (e.g., amazon.html)
  window.addEventListener('message', function (event) {
    console.log('Message received:', event.data);
    if (event.data && event.data.type === 'cartUpdated') {
      // Update the local cart data
      cart = event.data.cart;

      // Update the checkout page based on the updated cart
      updateCheckoutPage(cart);
    }
  });
});
