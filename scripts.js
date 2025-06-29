// scripts.js
// This event waits for the full HTML document to load before running the code inside
document.addEventListener("DOMContentLoaded", function () {
  console.log("Welcome to Tapper Kluddin!");

  // Find the "Shop Now" button on the homepage (usually has class .btn)
  const shopBtn = document.querySelector('.btn');

  // If the button exists, attach a click event listener to it
  if (shopBtn) {
    shopBtn.addEventListener('click', () => {
      // Display a simple alert when the button is clicked
      alert("Loading our gorgeous collection...");
    });
  }
});


// Initialize an empty array for storing cart items (this variable is not used, safe to remove)
let cartItems = [];


// Function to add a product to the cart
function addToCart(name, price) {
  // Retrieve the existing cart from localStorage, or start with an empty array
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Add the selected product (name and price) to the cart
  cart.push({ name: name, price: Number(price) });

  // Save the updated cart back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cart));

  // Show confirmation to the user
  alert(`${name} added to cart!`);
}


// When the page loads, display cart items if applicable
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the cart list container, total amount text, and clear cart button
  const cartList = document.getElementById("cart-list");
  const totalAmount = document.getElementById("total-amount");
  const clearBtn = document.getElementById("clear-cart");

  // Only run if these elements exist on the current page (e.g., cart.html)
  if (cartList && totalAmount) {
    let total = 0;

    // Get saved cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Clear the cart list display first
    cartList.innerHTML = "";

    // Loop through each item and display it in the cart
    items.forEach(item => {
      // Check that each item has a valid name and price
      if (item && item.name && !isNaN(item.price)) {
        // Create a list item element
        const li = document.createElement("li");

        // Display the name and price of each item
        li.innerHTML = `
  <span class="item-name">${item.name}</span>
  <span class="item-price">GHS ${item.price.toFixed(2)}</span>`;

        // Add the item to the cart list
        cartList.appendChild(li);

        // Add the item's price to the total
        total += Number(item.price);
      }
    });

    // Display the total cost
    totalAmount.textContent = `Total: GHS ${total.toFixed(2)}`;
  }

  // If the clear cart button exists, attach an event to clear the cart
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
});


// Function to clear the cart
function clearCart() {
  // Remove the cart data from localStorage
  localStorage.removeItem("cartItems");

  // Clear the cart list from the HTML page
  document.getElementById("cart-list").innerHTML = "";

  // Reset the total to zero
  document.getElementById("total-amount").textContent = "Total: GHS 0";

  // Notify the user
  alert("Cart cleared!");
}


// Checkout form submission logic
const checkoutForm = document.getElementById('checkout-form');

// If the checkout form exists on the page (i.e., we’re on checkout.html)
if (checkoutForm) {
  // Add a submit event listener to the form
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from refreshing the page

    // Show a thank-you message
    alert("Thank you for your order! We'll be in touch soon.");

    // Clear all form fields
    checkoutForm.reset();

    // Optionally, clear the cart now that the order is placed
    localStorage.removeItem("cartItems");
  });
}


// Contact form submission logic
const contactForm = document.getElementById('contactForm');

// If the contact form exists (i.e., on contact.html)
if (contactForm) {
  // Add a submit event listener
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from reloading the page

    // Show a thank-you message
    alert("Thank you! Your for contacting Tapper Kluddin.");

    // Reset the form fields
    contactForm.reset();
  });
}




