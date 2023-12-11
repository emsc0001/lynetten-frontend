// admin-dashboard.js
"use strict";

const endpoint = 'http://localhost:4444';

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(endpoint + url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetching error:', error);
    }
  }

  function hideAllSections() {
    document.getElementById('productSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'none';
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('orderSection').style.display = 'none';
}

function showSection(sectionId) {
    hideAllSections();
    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('showProducts').addEventListener('click', () => showSection('productSection'));
document.getElementById('showCategories').addEventListener('click', () => showSection('categoriesSection'));
document.getElementById('showUsers').addEventListener('click', () => showSection('userSection'));
document.getElementById('showOrders').addEventListener('click', () => showSection('orderSection'));


  function fetchAndDisplayProducts() {
    fetchData('/products')
      .then(products => {
        const productsContainer = document.getElementById('product-list');
        productsContainer.innerHTML = products.map(product => `
          <div class="product-item">
            <h3>${product.productName}</h3>
            <p>Price: ${product.listPrice}</p>
            <button class="edit-button" data-product-id="${product.productId}">Edit</button>
            <button class="delete-button" data-product-id="${product.productId}">Delete</button>
          </div>`
        ).join('');
        attachEventListenersToProducts();
      });
  }

  function fetchAndDisplayCategories() {
    fetchData('/categories')
      .then(categories => {
        const categoriesContainer = document.getElementById('category-list');
        categoriesContainer.innerHTML = categories.map(category => `
          <div class="category-item">
            <h3>${category.categoryName}</h3>
            <button class="edit-category-button" data-category-id="${category.categoryId}">Edit</button>
            <button class="delete-category-button" data-category-id="${category.categoryId}">Delete</button>
          </div>`
        ).join('');
        attachEventListenersToCategories();
      });
  }

  async function fetchAndDisplayUsers() {
    const users = await fetchData('/users');
    const usersContainer = document.getElementById('user-list');
    usersContainer.innerHTML = users.map(user => `
        <div class="user-item">
            ${user.name} - ${user.email}
        </div>`
    ).join('');
}


async function fetchAndDisplayOrders() {
  const orders = await fetchData('/GuestOrders');
  const ordersContainer = document.getElementById('order-list');
  ordersContainer.innerHTML = orders.map(order => `
  <div class="order-item">
  Order #${order.id} - Date: ${order.date} - Total: ${order.total}
  </div>`
  ).join('');
}

document.getElementById('showUsers').addEventListener('click', fetchAndDisplayUsers);
document.getElementById('showOrders').addEventListener('click', fetchAndDisplayOrders);

document.addEventListener('DOMContentLoaded', () => {
  // Set up initial view
  showSection('productSection'); // Default to showing products
  fetchAndDisplayProducts();
  // Add other initializations here if needed
});

  function attachEventListenersToProducts() {
    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        showEditProductModal(productId);
      });
    });
  
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        deleteProduct(productId);
      });
    });
  }

  function attachEventListenersToCategories() {
    document.querySelectorAll('.edit-category-button').forEach(button => {
      button.addEventListener('click', event => {
        const categoryId = event.target.dataset.categoryId;
        showEditCategoryModal(categoryId);
      });
    });
  
    document.querySelectorAll('.delete-category-button').forEach(button => {
      button.addEventListener('click', event => {
        const categoryId = event.target.dataset.categoryId;
        deleteCategory(categoryId);
      });
    });
  }

function showEditProductModal(productId) {
  fetchData(`/products/${productId}`)
    .then(product => {
      document.getElementById('editProductId').value = product.productId;
      document.getElementById('editProductName').value = product.productName;
      document.getElementById('editProductPrice').value = product.listPrice;
      document.getElementById('editProductModal').style.display = 'block';
    });
}

function showEditCategoryModal(categoryId) {
  fetchData(`/categories/${categoryId}`)
    .then(category => {
      document.getElementById('editCategoryId').value = category.categoryId;
      document.getElementById('editCategoryName').value = category.categoryName;
      document.getElementById('editCategoryModal').style.display = 'block';
    });
}

function deleteProduct(productId) {
  fetchData(`/products/${productId}`, { method: 'DELETE' })
    .then(() => {
      alert('Product deleted successfully');
      fetchAndDisplayProducts();
    });
}

function deleteCategory(categoryId) {
  fetchData(`/categories/${categoryId}`, { method: 'DELETE' })
    .then(() => {
      alert('Category deleted successfully');
      fetchAndDisplayCategories();
    });
}

function setupModalCloseEvents() {
  document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}

function setupTabToggle() {
  document.getElementById('showProducts').addEventListener('click', () => {
    document.getElementById('productSection').style.display = 'block';
    document.getElementById('categoriesSection').style.display = 'none';
  });

  document.getElementById('showCategories').addEventListener('click', () => {
    document.getElementById('productSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'block';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupModalCloseEvents();
  setupTabToggle();
  fetchAndDisplayProducts();
  fetchAndDisplayCategories();
});

// Event listeners for form submissions
document.getElementById('editProductForm').addEventListener('submit', event => {
  event.preventDefault();
  const productId = document.getElementById('editProductId').value;
  const updatedProduct = {
    productName: document.getElementById('editProductName').value,
    listPrice: parseFloat(document.getElementById('editProductPrice').value)
  };

  fetchData(`/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  })
  .then(() => {
    alert('Product updated successfully');
    document.getElementById('editProductModal').style.display = 'none';
    fetchAndDisplayProducts();
  });
});

document.getElementById('editCategoryForm').addEventListener('submit', event => {
  event.preventDefault();
  const categoryId = document.getElementById('editCategoryId').value;
  const updatedCategory = {
    categoryName: document.getElementById('editCategoryName').value
  };

  fetchData(`/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCategory)
  })
  .then(() => {
    alert('Category updated successfully');
    document.getElementById('editCategoryModal').style.display = 'none';
    fetchAndDisplayCategories();
  });
});


// Edit a product
function editProduct(productId) {
  fetchData(`/products/${productId}`)
    .then(product => {
      // Assume you have form fields with these IDs in your HTML
      document.getElementById('editProductId').value = product.productId;
      document.getElementById('editProductName').value = product.productName;
      document.getElementById('editProductPrice').value = product.listPrice;
      
      // Show the modal (or form) where the admin can edit the product details
      document.getElementById('editProductModal').style.display = 'block';
    });
}

// Edit a category
function editCategory(categoryId) {
  fetchData(`/categories/${categoryId}`)
    .then(category => {
      // Assume you have form fields with these IDs in your HTML
      document.getElementById('editCategoryId').value = category.categoryId;
      document.getElementById('editCategoryName').value = category.categoryName;
      
      // Show the modal (or form) where the admin can edit the category details
      document.getElementById('editCategoryModal').style.display = 'block';
    });
}

// Listen for the submit event on the product edit form
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productId = document.getElementById('editProductId').value;
    const updatedProduct = {
        productName: document.getElementById('editProductName').value,
        listPrice: parseFloat(document.getElementById('editProductPrice').value)
    };

    // Send the PUT request to the server to update the product
    fetchData(`/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(() => {
        alert('Product updated successfully.');
        document.getElementById('editProductModal').style.display = 'none';
        fetchAndDisplayProducts(); // Refresh the product list
    });
});

// Listen for the submit event on the category edit form
document.getElementById('editCategoryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const categoryId = document.getElementById('editCategoryId').value;
    const updatedCategory = {
        categoryName: document.getElementById('editCategoryName').value
    };

    // Send the PUT request to the server to update the category
    fetchData(`/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCategory)
    })
    .then(() => {
        alert('Category updated successfully.');
        document.getElementById('editCategoryModal').style.display = 'none';
        fetchAndDisplayCategories(); // Refresh the category list
    });
});





// Function to handle form submission for creating a new product
function setupNewProductForm() {
    const newProductForm = document.getElementById('newProductForm');
    newProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;

        fetchData('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productName,
                listPrice: parseFloat(productPrice)
            })
        })
        .then(() => {
            alert('Product created successfully');
            fetchAndDisplayProducts(); // Refresh the product list
            newProductForm.reset(); // Clear the form fields
        })
        .catch(error => {
            console.error('Error creating product:', error);
            alert('Error creating product. Check console for details.');
        });
    });
}


// Function to handle form submission for creating a new category
function setupNewCategoryForm() {
    const newCategoryForm = document.getElementById('newCategoryForm');
    newCategoryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const categoryName = document.getElementById('categoryName').value;

        fetchData('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryName: categoryName })
        })
        .then(() => {
            alert('Category created successfully');
            fetchAndDisplayCategories(); // Refresh the category list
            newCategoryForm.reset(); // Clear the form fields
        })
        .catch(error => {
            console.error('Error creating category:', error);
            alert('Error creating category. Check console for details.');
        });
    });
}



// Initial setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseEvents();
    setupTabToggle();
    setupNewProductForm();
    setupNewCategoryForm();
    fetchAndDisplayProducts();
    fetchAndDisplayCategories();
});


document.getElementById('showUsers').addEventListener('click', async () => {
  const users = await getAllUsers();
  renderUsersToDOM(users);
});

document.getElementById('showOrders').addEventListener('click', async () => {
  const orders = await getAllOrders(); // You need to define this function
  renderOrdersToDOM(orders); // You need to define this function
});

function renderUsersToDOM(users) {
  const usersContainer = document.getElementById('usersContainer');
  usersContainer.innerHTML = users.map(user => `
      <div class="user-item">
          ${user.name} - ${user.email}
      </div>
  `).join('');
}

function renderOrdersToDOM(orders) {
  const ordersContainer = document.getElementById('ordersContainer');
  // Assume each order has an id, date, and total
  ordersContainer.innerHTML = orders.map(order => `
      <div class="order-item">
          Order #${order.id} - Date: ${order.date} - Total: ${order.total}
      </div>
  `).join('');
}



