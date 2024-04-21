document.addEventListener('DOMContentLoaded', function () {
  // Global Variables
  let clicked = false;
  let selectedRating = 0;
  let selectedColor = null;
  let selectedSize = null;
  
  console.log('DOMContentLoaded event triggered');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const productGrid = document.getElementById('productGrid');
  const cartElement = document.getElementById('cart');
  console.log('Cart element:', cartElement);
  const cart = loadCartFromLocalStorage(); // Load cart data from local storage
  updateCartCount(); // Update cart count on page load
  // ... (Other global variables and event listeners)

  // Functions for Loading Cart Data
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  function closeExtendedMenu() {
    extendedMenu.classList.remove('open');
  }

  function handleScreenWidth() {
    if (window.innerWidth > 770) {
      closeExtendedMenu();
    }
  }

  hamburgerMenu.addEventListener('click', function () {
    console.log('Hamburger menu clicked!');
    // Toggle the 'open' class on the extended menu
    extendedMenu.classList.toggle('open');
  });

  window.addEventListener('resize', handleScreenWidth);

  // Initial check on page load
  handleScreenWidth();
 
  cartElement.addEventListener('mouseover', function () {
    populateCartDropdown();
});

cartElement.addEventListener('mouseout', function () {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.textContent = ''; // Clear cart details on mouse leave
});

  // Sample product data (replace with your actual product data)
  const products = [
    { id: 1, name: "Black and Gray Athletic Cotton Socks", price: 10.90, image: ["items/athletic-cotton-socks-6-pairs.jpg"] },
    { id: 2, name: "Intermediate Composite Basketball", price: 20.95, image: ["items/intermediate-composite-basketball.jpg"] },
    { id: 3, name: "Adults Plain Cotton T-Shirt - 2 Pack", price: 7.99, image: ["items/adults-plain-cotton-tshirt-2-pack-teal.jpg"] },
    { id: 4, name: "2 Slot Toaster - Black", price: 18.99, image: ["items/black-2-slot-toaster.jpg"] },
    { id: 5, name: "6 Piece White Dinner Plate Set", price: 20.67, image: ["items/6-piece-white-dinner-plate-set.jpg"] },
    { id: 6, name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set", price: 34.99, image: ["items/6-piece-non-stick-baking-set.webp"] },
    { id: 7, name: "Plain Hooded Fleece Sweatshirt", price: 24.00,
      colors: [ { variantId: "Yellow", url: "items/plain-hooded-fleece-sweatshirt-yellow.jpg" }, { variantId: "Teal", url: "items/plain-hooded-fleece-sweatshirt-teal.jpg" } ],
      sizes: [ { size: 'S' }, { size: 'M' }, { size: 'L' } ] },
    { id: 8, name: "Luxury Towel Set - Graphite Gray", price: 35.99, image: ["items/luxury-tower-set-6-piece.jpg"] },
    { id: 9, name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz", price: 28.99, image: ["items/liquid-laundry-detergent-plain.jpg"] },
    { id: 10, name: "Waterproof Knit Athletic Sneakers - Gray", price: 33.90, image: ["items/knit-athletic-sneakers-gray.jpg"] },
    { id: 11, name: "Women's Chiffon Beachwear Cover Up - Black", price: 20.70, image: ["items/women-chiffon-beachwear-coverup-black.jpg"] },
    { id: 12, name: "Round Sunglasses", price: 15.60, image: ["items/round-sunglasses-black.jpg"] },
    { id: 13, name: "Women's Two Strap Buckle Sandals - Tan", price: 24.99, image: ["items/women-beach-sandals.jpg"] },
    { id: 14, name: "Blackout Curtains Set 4-Pack - Beige", price: 45.99, image: ["items/blackout-curtain-set-beige.webp"] },
    // Add more product data as needed
  ];

    // Check if the first product has colors
    if (products[0].colors && products[0].colors.length > 0) {
      selectedColor = products[0].colors[0].variantId;
  }
  
  // Check if the first product has sizes
  if (products[0].sizes && products[0].sizes.length > 0) {
      selectedSize = products[0].sizes[0].size;
  }
  
function populateCartDropdown() {
  const cartDropdown = document.getElementById('cart-dropdown');

  // Clear previous cart details
  cartDropdown.innerHTML = '';

  // Filter out items with a quantity of 0
  const validCartItems = cart.filter(item => item.quantity > 0);

  // Loop through valid cart items and create elements
  validCartItems.forEach(item => {
    const cartItem = document.createElement('div');
    const colorInfo = item.color ? ` - Color: ${item.color}` : '';
    const sizeInfo = item.size ? ` - Size: ${item.size}` : '';
  
    cartItem.innerHTML = `${item.productName} x${item.quantity}${colorInfo}${sizeInfo} <span class="euro-price">${item.price.toFixed(2)}€</span>`;
    cartDropdown.appendChild(cartItem);
  });
  
  // Display total price
  const total = validCartItems.reduce((acc, item) => acc + item.price, 0);
  const cartTotal = document.createElement('div');
  cartTotal.innerHTML = `Total: <span class="euro-price">${total.toFixed(2)}€</span>`;
  cartDropdown.appendChild(cartTotal);
}
  
  // Function to get color information based on variantId
  function getColorInfo(productId, colorVariantId) {
    const product = products.find(p => p.id === productId);
  
    if (product && Array.isArray(product.colors)) {
      const colorInfo = product.colors.find(color => color.variantId === colorVariantId);
      return colorInfo;
    }
  
    return null;
  }
  
  
  products.forEach(product => {
    const productBox = createProductBox(product);
    productGrid.appendChild(productBox);
  
    const defaultImage = getDefaultImage(product);
  
    const image = productBox.querySelector('.image-container img');
  
    // Set the default image
    image.src = defaultImage;

    // Check if the product has sizes before adding size buttons
    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      // Create a container for the size buttons
      const sizeContainer = document.createElement('div');
      sizeContainer.classList.add('size-container');

      // Create a paragraph element for "Size" text
      const sizeText = document.createElement('p');
      sizeText.classList.add('size-info');
      sizeText.textContent = 'Size';

      // Append the text element to the size container
      sizeContainer.appendChild(sizeText);

      // Loop through product sizes and create buttons
      product.sizes.forEach((size, index) => {
        const sizeButton = document.createElement('button');
        sizeButton.classList.add('size-button');
        sizeButton.textContent = size.size;

        // Set the first size button as active by default
        if (index === 0) {
          sizeButton.style.border = '1px solid #ff9900'; // Set border for the selected size button
        }

        // Check if the current size is the default selected size
        if (size.size === selectedSize) {
          sizeButton.style.border = '1px solid #ff9900'; // Set border for the selected size button
        }

        sizeButton.addEventListener('click', function () {
          const sizeButtons = document.querySelectorAll('.size-button');
          sizeButtons.forEach(button => button.style.border = '1px solid transparent'); // Reset borders
          sizeButton.style.border = '1px solid #ff9900'; // Set border for the selected size button
          selectedSize = size.size; // Update selectedSize
          console.log('Selected Size:', selectedSize);
        });

        sizeContainer.appendChild(sizeButton);
      });

      // Append the size container to the main product box
      productBox.appendChild(sizeContainer);

      // Call a function to set the default selected size when the page loads
      setDefaultSelectedSize();
    }

    // Function to set the default selected size
    function setDefaultSelectedSize() {
      const defaultSizeButton = document.querySelector('.size-button'); // Assuming the first size button is selected by default
      if (defaultSizeButton) {
        defaultSizeButton.style.border = '1px solid #ff9900'; // Set border for the selected size button
        selectedSize = defaultSizeButton.textContent; // Set the default selected size
        console.log('Default Selected Size:', selectedSize);
      }
    }


  });
    
  function createProductBox(product) {
    const box = document.createElement('div');
    box.classList.add('product-box');
  
    // Store product information in a data attribute
    box.dataset.productInfo = JSON.stringify({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor, // Include color information
      size: selectedSize    // Include size information
      // Add other relevant properties if needed
    });
  
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
  
    const image = document.createElement('img');
    image.src = getDefaultImage(product); // Set the default image
    image.alt = product.name;
  
    imageContainer.appendChild(image);
    box.appendChild(imageContainer);

    // Create a container for the product name
    const productNameContainer = document.createElement('div');
    productNameContainer.classList.add('product-name-container');
  
    // Create a paragraph for the product name
    const productName = document.createElement('p');
    productName.textContent = product.name;
  
    // Append the product name paragraph to the container
    productNameContainer.appendChild(productName);
  
    // Append the product name container to the product box
    box.appendChild(productNameContainer);
  
    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.dataset.rating = "0";
  
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.dataset.value = i;
      star.textContent = '☆';
  
      rating.appendChild(star);
    }
  
    // Event listener on the rating container using event delegation
    rating.addEventListener('mouseover', function (event) {
      const star = event.target;
      if (star.classList.contains('star') && !clicked) {
        const value = star.dataset.value;
        highlightStars(box, value);
      }
    });
  
    rating.addEventListener('mouseout', function () {
      if (!clicked) {
        resetStars(box);
        highlightStars(box, selectedRating);
      }
    });
  
    rating.addEventListener('click', function (event) {
      const star = event.target;
      if (star.classList.contains('star')) {
        clicked = true;
        selectedRating = star.dataset.value;
        setRating(box, selectedRating);
      }
    });
    
    const reviews = document.createElement('span');
    reviews.classList.add('reviews');
    reviews.textContent = ` (0)`; // Update the number of reviews if available
  
    rating.appendChild(reviews);
    box.appendChild(rating);
  
    const price = document.createElement('div');
    price.classList.add('price');
  
    const priceAmount = document.createElement('p');
    priceAmount.classList.add('price-amount');
    priceAmount.textContent = `${product.price.toFixed(2)}€`;
      
    // Create a container for the quantity elements
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');
      
    const quantityDropdown = document.createElement('select');
    quantityDropdown.classList.add('quantity-dropdown');
    
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      quantityDropdown.appendChild(option);
    }
    
    // Function to create a button
    function createButton(label, clickHandler, className, actionType) {
      const button = document.createElement('button');
      button.textContent = label;
    
      // Add a common class for styling
      button.classList.add('common-button');
    
      // Add the specified class name, if provided
      if (className) {
        button.classList.add(className);
      }
    
      // Add the quantity-button class for specific styling
      if (className === 'quantity-button') {
        button.classList.add('quantity-specific-style');
      }
    
      button.addEventListener('click', function () {
        // Pass the action type to the click handler
        clickHandler(actionType);
      });
      return button;
    }
    
    const addButton = createButton('+', function () {
      // Find the index of the last added item with the same product ID, color, and size
      const existingCartItemIndex = cart
        .slice()
        .reverse()
        .findIndex(
          (item) =>
            item.productId === product.id &&
            item.color === selectedColor &&
            item.size === selectedSize
        );
    
      // Calculate the total quantity of items in the cart
      const totalQuantityInCart = cart.reduce((total, item) => total + item.quantity, 0);
    
      // Calculate the new total quantity if a new item is added
      const newTotalQuantity = totalQuantityInCart + 1;
    
      // Check if the new total quantity exceeds the limit (999)
      if (newTotalQuantity <= 999) {
        if (existingCartItemIndex !== -1) {
          // Product is already in the cart, update the quantity and price
          const newQuantity = cart[cart.length - 1 - existingCartItemIndex].quantity + 1;
          cart[cart.length - 1 - existingCartItemIndex].quantity = newQuantity;
          cart[cart.length - 1 - existingCartItemIndex].price = product.price * newQuantity;
          console.log('Cart updated:', cart); // Log the updated cart
        } else {
          // Product is not in the cart, create a new cart item
          const newItem = {
            productId: product.id,
            productName: product.name,
            quantity: 1, // Set the quantity to 1 for a new item
            price: product.price,
            color: selectedColor, // Include color information
            size: selectedSize, // Include size information
          };
          // Push the new item to the cart
          cart.push(newItem);
          console.log('Item added to cart:', cart); // Log the updated cart
        }
    
        window.postMessage({ type: 'cartUpdated', cart: cart }, '*');
        updateCartCount(); // Update the cart count immediately
      } else {
        console.log('Global quantity limit reached');
      }
    }, 'quantity-button');
    
    const removeButton = createButton('-', function () {
      // Find the index of the last added item with the same product ID, color, and size
      const existingCartItemIndex = cart
        .slice()
        .reverse()
        .findIndex(
          (item) =>
            item.productId === product.id &&
            item.color === selectedColor &&
            item.size === selectedSize
        );
    
      if (existingCartItemIndex !== -1) {
        // Update the quantity and price of the existing item
        cart[cart.length - 1 - existingCartItemIndex].quantity = Math.max(
          cart[cart.length - 1 - existingCartItemIndex].quantity - 1,
          0
        );
        cart[cart.length - 1 - existingCartItemIndex].price =
          product.price * cart[cart.length - 1 - existingCartItemIndex].quantity;
        console.log('Cart updated:', cart); // Log the updated cart
      } else {
        // Product is not in the cart, create a new cart item (optional)
        const newItem = {
          productId: product.id,
          productName: product.name,
          quantity: 0, // This could be 0 if you don't want to add a new item
          price: 0,
          color: null, // or choose a default color if applicable
          size: null, // or choose a default size if applicable
        };
        // Push the new item to the cart
        cart.push(newItem);
        console.log('Item added to cart:', cart); // Log the updated cart
      }
    
      window.postMessage({ type: 'cartUpdated', cart: cart }, '*');
      updateCartCount(); // Update the cart count immediately
    }, 'quantity-button', 'remove');
    
    const removeAllButton = createButton('x', function () {
      // Find all items with the same product ID
      const itemsToRemove = cart.filter(
        (item) => item.productId === product.id
      );
    
      // Remove the found items from the cart
      itemsToRemove.forEach((itemToRemove) => {
        const indexToRemove = cart.indexOf(itemToRemove);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
        }
      });
    
      // Reset the selected quantity to 0
      selectedQuantity = 0;
    
      window.postMessage({ type: 'cartUpdated', cart: cart }, '*');
      updateCartCount(); // Update the cart count immediately
    }, 'quantity-button', 'removeAll');
         
    // Append quantity-related elements to the container
    quantityContainer.appendChild(quantityDropdown);
    quantityContainer.appendChild(addButton);
    quantityContainer.appendChild(removeButton);
    quantityContainer.appendChild(removeAllButton);

    // Append the quantity container to the main product box
    box.appendChild(quantityContainer);

    // Create a container for the color buttons
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container');

    // Check if the product has colors before adding "Color" text
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      // Create a paragraph element for "Color" text
      const colorText = document.createElement('p');
      colorText.classList.add('color-info');
      colorText.textContent = 'Color';

      // Append the text element to the color container
      colorContainer.appendChild(colorText);

    // Loop through product colors and create buttons
    product.colors.forEach((color, index) => {
      const colorButton = document.createElement('button');
      colorButton.classList.add('color-button');
      colorButton.dataset.color = color.variantId;
      colorButton.style.backgroundColor = "#394b5e"; // Set background color
      colorButton.textContent = color.variantId; // Set text content to the variantId

      // Set the first color button as active by default
      if (index === 0) {
        colorButton.style.border = '1px solid #ff9900'; // Set border for the selected color button
        updateProductImage(box, color.variantId);
        selectedColor = color.variantId; // Set the default selected color
      }

      colorContainer.appendChild(colorButton);
    });

    // Event listener for color buttons
    colorContainer.addEventListener('click', function (event) {
      const colorButtons = document.querySelectorAll('.color-button');
      colorButtons.forEach(button => button.style.border = '1px solid transparent'); // Reset borders

      const colorButton = event.target;
      if (colorButton.classList.contains('color-button')) {
        colorButton.style.border = '1px solid #ff9900'; // Set border for the selected color button
        selectedColor = colorButton.dataset.color; // Update selectedColor
        updateProductImage(box, selectedColor);
      }
    });

    // Append the color container to the main product box
    box.appendChild(colorContainer);

    // Call a function to set the default selected color when the page loads
    setDefaultSelectedColor();

    // Function to set the default selected color
    function setDefaultSelectedColor() {
      const defaultColorButton = document.querySelector('.color-button'); // Assuming the first color button is selected by default
      if (defaultColorButton) {
        defaultColorButton.style.border = '1px solid #ff9900'; // Set border for the selected color button
        selectedColor = defaultColorButton.dataset.color; // Set the default selected color
        updateProductImage(box, selectedColor);
        console.log('Default Selected Color:', selectedColor);
      }
    }
   }

// Function to remove a cart item based on product ID
function removeCartItem(productId) {
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex !== -1) {
    // Remove the item from the cart array
    cart.splice(itemIndex, 1);
    console.log('Item removed from cart:', cart); // Log the updated cart
    window.postMessage({ type: 'cartUpdated', cart: cart }, '*');
    setTimeout(updateCartCount, 100);
  }
}

// Check if the product is already in the cart
const existingCartItem = cart.find(item => item.productId === product.id);

const addToCartButtonLogic = function () {
  console.log('Add to Cart button clicked');

  // Update selectedQuantity with the quantity selected in the dropdown
  selectedQuantity = parseInt(quantityDropdown.value);

  console.log('Cart before check:', cart);

  // Calculate the total quantity in the cart
  const totalQuantityInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate how many more items can be added without exceeding the limit
  const remainingQuantity = Math.min(999 - totalQuantityInCart, selectedQuantity);

  if (remainingQuantity <= 0) {
    console.log('Quantity limit reached');
    return; // Exit the function without updating the cart
  }

  // Check if the product is already in the cart
  const existingCartItem = cart.find(item => (
    item.productId === product.id &&
    item.color === selectedColor &&
    item.size === selectedSize
  ));

  console.log('Existing cart item:', existingCartItem);

  if (existingCartItem) {
    // Product is already in the cart, update the quantity and price
    console.log('Updating existing cart item');
    existingCartItem.quantity += remainingQuantity;
    existingCartItem.price = product.price * existingCartItem.quantity;
  } else {
    // Product is not in the cart, create a new cart item
    console.log('Creating new cart item');
    const newItem = {
      productId: product.id,
      productName: product.name,
      quantity: remainingQuantity,
      price: product.price * remainingQuantity,
      color: selectedColor, // Include color information
      size: selectedSize    // Include size information
    };

    // Push the new item to the cart
    cart.push(newItem);
  }

  console.log('Updated cart:', cart);
  window.postMessage({ type: 'cartUpdated', cart: cart }, '*');
  saveCartToLocalStorage(); // Save the cart to local storage
  setTimeout(updateCartCount, 100);
  };

// Function to save cart data to local storage
function saveCartToLocalStorage() {
  console.log('Saving cart to local storage:', cart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Always create the "Add to Cart" button
const addToCartButton = createButton('Add to Cart', addToCartButtonLogic);
addToCartButton.classList.add('add-to-cart-button'); // Add the class for styling

// Append buttons and other elements to the box
price.appendChild(priceAmount);
price.appendChild(quantityDropdown);
price.appendChild(addButton);
price.appendChild(removeButton);
price.appendChild(removeAllButton);
box.appendChild(price);
box.appendChild(addToCartButton);

return box;
}

// Function to update the product image based on the selected color
function updateProductImage(box, selectedColor) {
  const productInfo = JSON.parse(box.dataset.productInfo);
  const product = products.find(p => p.id === productInfo.id);

  if (product && Array.isArray(product.colors)) {
    const selectedColorData = product.colors.find(color => color.variantId === selectedColor);

    if (selectedColorData) {
      const image = box.querySelector('.image-container img');

      // Add more console logs for debugging
      console.log('Product:', product);
      console.log('Selected Color Data:', selectedColorData);
      console.log('Image Element:', image);

      // Add a check to ensure the image element exists
      if (image) {
        image.src = selectedColorData.url;
      } else {
        console.error('Image element not found:', box);
      }
    }
  }
}


function getDefaultImage(product) {
  // Check if 'product' and 'image' property are defined
  if (product && Array.isArray(product.image) && product.image.length > 0) {
    // Return the URL of the first image in the array
    return product.image[0];
  } else if (product && Array.isArray(product.colors) && product.colors.length > 0) {
    // Check if the first color has the 'url' property
    if (product.colors[0].url) {
      // Return the URL of the first color in the array
      return product.colors[0].url;
    }
  }

  // Provide a default image or handle the case as appropriate for your application
  console.error('Invalid product or missing images:', product);
  // You can return a placeholder image or an empty string based on your requirements
  return ''; // No placeholder image is needed here
}

  function initializeStars(box, value) {
    const stars = box.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < value);
    });
  }

  function resetStars(box) {
    const stars = box.querySelectorAll('.star');
    stars.forEach(star => {
      star.classList.remove('active');
    });
  }
  
  function highlightStars(box, value) {
    const stars = box.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < value);
    });
  }
  
  function setRating(box, value) {
    resetStars(box);
    highlightStars(box, value);
  }

  function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-number');
    const extendedMenuCartNumber = document.querySelector('.extended-menu-cart-number');
  
    extendedMenuCartNumber.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      // Add your logic for handling the click event
      // For example, you may want to toggle the visibility of the cart dropdown
      const cartDropdown = document.querySelector('.cart-dropdown');
      cartDropdown.classList.toggle('open');
    });
  
    // Filter out items with a quantity of 0
    const validCartItems = cart.filter(item => item.quantity > 0);
  
    const totalQuantity = validCartItems.reduce((total, item) => total + item.quantity, 0);
    const cappedQuantity = totalQuantity > 999 ? 999 : totalQuantity;
  
    cartCountElement.textContent = cappedQuantity;
    extendedMenuCartNumber.textContent = `(${cappedQuantity})`;
  
    if (cappedQuantity >= 100) {
      cartCountElement.style.fontSize = '14px';
      cartCountElement.style.right = '35px';
    } else if (cappedQuantity >= 10) {
      cartCountElement.style.fontSize = '16px';
      cartCountElement.style.right = '38px';
    } else {
      cartCountElement.style.fontSize = '';
      cartCountElement.style.right = '';
    }
    localStorage.setItem('cart', JSON.stringify(validCartItems)); // Save valid items to local storage
  }    
});