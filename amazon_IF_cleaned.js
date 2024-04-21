document.addEventListener('DOMContentLoaded', function () {
  // Global Variables
  let clicked = false;
  let selectedRating = 0;
  let selectedColor; // Define a variable to store the selected color
  let selectedSize; // Define a variable to store the selected size

  // Event Listeners and Initializations
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const productGrid = document.getElementById('productGrid');
  const cartElement = document.getElementById('cart');
  const cart = loadCartFromLocalStorage();
  updateCartCount();
  // ... (Other global variables and event listeners)

  // Functions for Loading Cart Data
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // ... (Other utility functions)

  // Functions Related to Cart Dropdown
  function populateCartDropdown() {
    // Code to populate the cart dropdown
    // ...
  }

  // ... (Other functions related to the cart)

  // Functions Related to Product Grid
  function createProductBox(product) {
    // Code for creating product boxes
    // ...
  }

  function updateProductImage(box, selectedColor) {
    // Code for updating product image based on selected color
    // ...
  }

  function getDefaultImage(product) {
    // Code for getting the default image
    // ...
  }

  // ... (Other functions related to the product grid)

  // Functions Related to Size and Color Buttons
  function createSizeButtons(product) {
    // Code for creating and handling size buttons
    // ...
  }

  function createColorButtons(product) {
    // Code for creating and handling color buttons
    // ...
  }

  // ... (Other functions related to buttons)

  // Functions for Cart Interaction
  function addToCartButtonLogic() {
    // Code for handling add to cart button click
    // ...
  }

  function updateCartItem(productId, quantity) {
    // Code for updating a cart item based on product ID and quantity
    // ...
  }

  function removeCartItem(productId) {
    // Code for removing a cart item based on product ID
    // ...
  }

  function saveCartToLocalStorage() {
    // Code for saving cart data to local storage
    // ...
  }

  // ... (Other functions related to cart interaction)

  // Functions for Ratings
  function initializeStars(box, value) {
    // Code for initializing star ratings
    // ...
  }

  function resetStars(box) {
    // Code for resetting star ratings
    // ...
  }

  function highlightStars(box, value) {
    // Code for highlighting star ratings
    // ...
  }

  function setRating(box, value) {
    // Code for setting star ratings
    // ...
  }

  // ... (Other functions related to ratings)

  // Functions for Updating Cart Count
  function updateCartCount() {
    // Code for updating the cart count
    // ...
  }

  // ... (Other functions)

  // Call the initialization functions
  initializeStore();
});

// Will look something like this if I ever feel like writing a version that
// doesn't look like it's been  taped together with duct tape. :)