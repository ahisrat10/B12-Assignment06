// Loading spinner functions
const showLoadingSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
  }
};

const hideLoadingSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.add("hidden");
    spinner.classList.remove("flex");
  }
};

// Show plant details modal
const showPlantModal = async (plantId) => {
  try {
    showLoadingSpinner();
    const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    const res = await fetch(url);
    const data = await res.json();
    const plant = data.plants;

    const modal = document.getElementById("plant-modal");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
      <div class="modal-box max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="lg:w-1/2">
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-96 object-cover rounded-lg shadow-lg">
          </div>
          <div class="lg:w-1/2 space-y-4">
            <div>
              <h3 class="font-bold text-3xl text-[#15803D] mb-2">${plant.name}</h3>
              <div class="badge bg-[#DCFCE7] text-[#15803D] py-3 px-4 text-sm font-semibold rounded-full">${plant.category}</div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-lg text-gray-800 mb-2">🌿 Description</h4>
              <p class="text-gray-600 leading-relaxed">${plant.description}</p>
            </div>
            
            <div class="bg-[#CFF0DC] p-4 rounded-lg">
              <h4 class="font-semibold text-lg text-[#15803D] mb-2">💰 Pricing Information</h4>
              <p class="font-bold text-3xl text-[#15803D]">৳${plant.price}</p>
              <p class="text-sm text-gray-600 mt-1">Per tree (including planting support)</p>
            </div>
            
            <div class="bg-[#15803D] text-white p-4 rounded-lg">
              <h4 class="font-semibold text-lg mb-2">🌱 Why Plant This Tree?</h4>
              <ul class="text-sm space-y-1">
                <li>• Contributes to environmental conservation</li>
                <li>• Helps combat climate change</li>
                <li>• Supports local ecosystems</li>
                <li>• Creates a greener future for generations</li>
              </ul>
            </div>
            
            <button onclick="addToCartUI('plant-id-${plant.id}')" class="btn bg-[#15803D] text-white w-full rounded-full text-lg py-3 hover:bg-[#3C8A5A] transition-all duration-300">
              🛒 Add to Cart - Make a Difference!
            </button>
          </div>
        </div>
      </div>
    `;

    modal.showModal();
  } catch (error) {
    console.error("Error loading plant details:", error);
  } finally {
    hideLoadingSpinner();
  }
};

// Loading category list
const loadCategoriesList = async () => {
  try {
    showLoadingSpinner();
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    showCategoriesList(data.categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  } finally {
    hideLoadingSpinner();
  }
};

// Showing category list in UI
const showCategoriesList = (data) => {
  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = `<p id="category-0" class="text-white bg-[#15803D] rounded-sm p-2 cursor-pointer transition-all duration-300 hover:bg-[#3C8A5A] hover:scale-105">All Trees</p>`;
  data.forEach((element) => {
    categoriesList.innerHTML += `
      <p id="category-${element.id}" 
      class="d-sm p-2 rounded-sm cursor-pointer transition-all duration-300 hover:bg-[#15803D] hover:text-white hover:scale-105">
      ${element.category_name}
      </p>
    `;
  });
};

// Loading all plants
const loadAllPlants = async () => {
  try {
    showLoadingSpinner();
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    showPlants(data.plants);
  } catch (error) {
    console.error("Error loading plants:", error);
  } finally {
    hideLoadingSpinner();
  }
};
// Showing plants in UI
const showPlants = (data) => {
  const singlePlantCard = document.getElementById("single-plant-card");
  singlePlantCard.innerHTML = "";

  data.forEach((element) => {
    singlePlantCard.innerHTML += `
      <div class="card bg-base-100 shadow-sm">
                            <figure>
                                <img src="${element.image}" alt=""
                                    class="w-[316px] h-[180px] object-cover rounded-sm" loading="lazy"/>
                            </figure>
                            <div class="card-body gap-2">
                                <h2 class="card-title cursor-pointer hover:text-[#15803D]" onclick="showPlantModal(${element.id})">${element.name}</h2>
                                <p class="text-[#00000080] overflow-hidden h-10">${element.description}</p>
                                <div class="flex items-center justify-between">
                                    <div class="badge bg-[#DCFCE7] text-[#15803D] py-2 px-3 ">${element.category}</div>
                                    <div>
                                        <p class="font-bold">৳${element.price}</p>
                                    </div>
                                </div>
                                <div class="card-actions justify-end">
                                    <button id="plant-id-${element.id}"
                                        class="btn bg-[#15803D] text-white w-full rounded-full mt-4 hover:bg-[#3C8A5A] add-to-cart">Add to
                                        Cart</button>
                                </div>
                            </div>
                        </div>
    `;
  });

  // Add event listeners to Add to Cart buttons
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let button of addToCartButtons) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      addToCartUI(button.id);
    });
  }
};

// Load plants by category
const loadPlantsByCategory = async (categoryId) => {
  try {
    showLoadingSpinner();
    if (categoryId === "0") {
      // Load all plants for "All Trees" category
      loadAllPlants();
    } else {
      const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
      const res = await fetch(url);
      const data = await res.json();
      showPlants(data.plants);
    }
  } catch (error) {
    console.error("Error loading plants by category:", error);
  } finally {
    hideLoadingSpinner();
  }
};

// Handle category click
const categoriesList = document.getElementById("categories-list");
categoriesList.addEventListener("click", function (e) {
  if (e.target.tagName === "P") {
    try {
      showLoadingSpinner();

      // Remove active class from all categories
      const allCategories = categoriesList.querySelectorAll("p");
      allCategories.forEach((category) => {
        category.classList.remove("text-white", "bg-[#15803D]", "rounded-sm");
        category.classList.add("d-sm");
      });

      // Add active class to clicked category
      e.target.classList.add("text-white", "bg-[#15803D]", "rounded-sm");
      e.target.classList.remove("d-sm");

      const categoryId = e.target.id.split("-")[1];
      loadPlantsByCategory(categoryId);
    } catch (error) {
      console.error("Error handling category click:", error);
      hideLoadingSpinner();
    }
  }
});

const addToCartUI = async (id) => {
  try {
    showLoadingSpinner();
    plantId = id.split("-")[2];
    const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.plants.id);
    const cartContainer = document.getElementById("cart-container");

    // Check if the item already exists in cart
    const existingCartItem = document.getElementById(
      `cart-item-${data.plants.id}`
    );

    if (existingCartItem) {
      // If item exists, update quantity
      const cartItemDiv = existingCartItem.closest(
        ".flex.items-center.justify-between"
      );
      const quantitySpan = cartItemDiv.querySelector("p span:nth-child(2)");
      const currentQuantity = parseInt(quantitySpan.textContent);
      const newQuantity = currentQuantity + 1;
      quantitySpan.textContent = newQuantity;

      // Update total price
      const cartTotalPrice = document.getElementById("cart-total-price");
      const currentTotal = parseFloat(cartTotalPrice.innerText) || 0;
      const newTotal = currentTotal + data.plants.price;
      cartTotalPrice.innerText = newTotal;

      // Show alert for updated quantity
      alert(
        `🌱 "${
          data.plants.name
        }" quantity updated!\n\n📊 Details:\n• New Quantity: ${newQuantity}\n• Price: ৳${
          data.plants.price
        } each\n• Subtotal: ৳${
          data.plants.price * newQuantity
        }\n• Total Cart Value: ৳${newTotal}\n\n✅ Successfully updated in your cart!`
      );
    } else {
      // If item doesn't exist, add new cart item
      cartContainer.innerHTML += `
      <div class="flex items-center justify-between bg-[#DCFCE790] p-4 rounded-sm">
        <div class="gap-y-1 flex flex-col">
          <h4 class="font-semibold">${data.plants.name}</h4>
          <p class="text-[#00000080]">
            ৳<span>${data.plants.price}</span>x<span>1</span>
          </p>
        </div>
        <div> 
          <span id="cart-item-${data.plants.id}"><i class="fa-solid fa-xmark"></i></span>
        </div>
      </div>
    `;

      // Update total price
      const cartTotalPrice = document.getElementById("cart-total-price");
      const currentTotal = parseFloat(cartTotalPrice.innerText) || 0;
      const newTotal = currentTotal + data.plants.price;
      cartTotalPrice.innerText = newTotal;

      // Show alert for new item added
      alert(
        `🌿 "${data.plants.name}" added to cart!\n\n📊 Details:\n• Category: ${data.plants.category}\n• Price: ৳${data.plants.price}\n• Quantity: 1\n• Total Cart Value: ৳${newTotal}\n\n🌱 Thank you for supporting our green mission!`
      );
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert(
      "❌ Sorry, there was an error adding the item to your cart. Please try again."
    );
  } finally {
    hideLoadingSpinner();
  }
};

// handling cart item removal
const cartContainer = document.getElementById("cart-container");
cartContainer.addEventListener("click", function (e) {
  const span = e.target.closest('span[id^="cart-item-"]');
  if (span) {
    try {
      showLoadingSpinner();

      // Remove cart item div
      const cartItemDiv = span.closest(".flex.items-center.justify-between");
      if (cartItemDiv) {
        // Calculate total price to subtract (price * quantity)
        const priceSpan = cartItemDiv.querySelector("span");
        const quantitySpan = cartItemDiv.querySelector("p span:nth-child(2)");
        const price = priceSpan ? parseFloat(priceSpan.textContent) : 0;
        const quantity = quantitySpan ? parseInt(quantitySpan.textContent) : 1;
        const totalItemPrice = price * quantity;

        // Update total price
        const cartTotalPrice = document.getElementById("cart-total-price");
        if (cartTotalPrice) {
          let currentTotal = parseFloat(cartTotalPrice.textContent) || 0;
          cartTotalPrice.textContent = (currentTotal - totalItemPrice).toFixed(
            2
          );
        }
        cartItemDiv.remove();

        // Show success message
        setTimeout(() => {
          alert(
            `🗑️ Item removed from cart!\n\n💰 Refunded: ৳${totalItemPrice.toFixed(
              2
            )}\n✅ Your cart has been updated.`
          );
        }, 300);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      alert(
        "❌ Sorry, there was an error removing the item. Please try again."
      );
    } finally {
      setTimeout(() => {
        hideLoadingSpinner();
      }, 500);
    }
  }
});

loadCategoriesList();
loadAllPlants();