// admin-dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupModalClose();
});


function fetchProducts() {
    fetch('http://localhost:4444/products')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('product-list');
            productsContainer.innerHTML = products.map(product =>
                `<div class="product-item">
                    <h3>${product.productName}</h3>
                    <p>Price: ${product.listPrice}</p>
                    <button class="edit-button" data-product-id="${product.productId}">Edit</button>
                    <button class="delete-button" data-product-id="${product.productId}">Delete</button>
                </div>`
            ).join('');

            attachEventListeners();
        })
        .catch(error => console.error('Error:', error));
}

function attachEventListeners() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            editProduct(this.getAttribute('data-product-id'));
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            deleteProduct(this.getAttribute('data-product-id'));
        });
    });
}

function editProduct(productId) {
    // Fetch the product details and populate the edit form
    fetch(`http://localhost:4444/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Assuming your product object has these properties
            document.getElementById('editProductId').value = product.productId;
            document.getElementById('editProductName').value = product.productName;
            document.getElementById('editProductPrice').value = product.listPrice;

            // Display the edit modal
            document.getElementById('editProductModal').style.display = "block";
        })
        .catch(error => console.error('Error:', error));
}

function setupModalClose() {
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', function() {
        document.getElementById('editProductModal').style.display = "none";
    });
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('editProductModal')) {
            document.getElementById('editProductModal').style.display = "none";
        }
    });
}

document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productId = document.getElementById('editProductId').value;
    const productName = document.getElementById('editProductName').value;
    const productPrice = document.getElementById('editProductPrice').value;

    fetch(`http://localhost:4444/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productName: productName,
            listPrice: parseFloat(productPrice) // Ensure this is a number
        })
    })
    .then(response => response.json())
    .then(() => {
        alert('Product updated successfully');
        fetchProducts(); // Refresh the product list
        document.getElementById('editProductModal').style.display = "none";
    })
    .catch(error => console.error('Error:', error));
});





document.getElementById('newProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    // Collect other field values as needed
    
    fetch('http://localhost:4444/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productName,
            listPrice: productPrice,
            // Include other fields
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Product created successfully');
        fetchProducts(); // Refresh the product list
    })
    .catch(error => console.error('Error:', error));
});



function deleteProduct(productId) {
    fetch(`http://localhost:4444/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the product list
    })
    .catch(error => console.error('Error:', error));
}



// CATEGORY
document.getElementById('showCategories').addEventListener('click', function () {
    // Hide the product section
    document.getElementById('product-list').style.display = 'none';
    
    // Show the categories section
    document.getElementById('categoriesSection').style.display = 'block';

    // Fetch and display categories
    fetchCategories();
});

function fetchCategories() {
    fetch('http://localhost:4444/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesContainer = document.getElementById('category-list');
            categoriesContainer.innerHTML = categories.map(category =>
                `<div class="category-item">
                    <h3>${category.categoryName}</h3>
                    <button class="edit-category-button" data-category-id="${category.categoryId}">Edit</button>
                    <button class="delete-category-button" data-category-id="${category.categoryId}">Delete</button>
                </div>`
            ).join('');

            attachCategoryEventListeners();
        })
        .catch(error => console.error('Error:', error));
}

function attachCategoryEventListeners() {
    document.querySelectorAll('.edit-category-button').forEach(button => {
        button.addEventListener('click', function () {
            editCategory(this.getAttribute('data-category-id'));
        });
    });

    document.querySelectorAll('.delete-category-button').forEach(button => {
        button.addEventListener('click', function () {
            deleteCategory(this.getAttribute('data-category-id'));
        });
    });
}

document.getElementById('backToProducts').addEventListener('click', function () {
    // Hide the categories section
    document.getElementById('categoriesSection').style.display = 'none';
    
    // Show the product section
    document.getElementById('product-list').style.display = 'block';

    // Fetch and display products (if needed)
    fetchProducts();
});


document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
});

function setupTabs() {
    document.getElementById('showProducts').addEventListener('click', function () {
        showProductsTab();
    });

    document.getElementById('showCategories').addEventListener('click', function () {
        showCategoriesTab();
    });

    document.getElementById('backToProducts').addEventListener('click', function () {
        showProductsTab();
    });
}

function showProductsTab() {
    // Hide the categories section
    document.getElementById('categoriesSection').style.display = 'none';

    // Show the products section
    document.getElementById('product-list').style.display = 'block';

    // Fetch and display products (if needed)
    fetchProducts();
}

function showCategoriesTab() {
    // Hide the products section
    document.getElementById('product-list').style.display = 'none';

    // Show the categories section
    document.getElementById('categoriesSection').style.display = 'block';

    // Fetch and display categories (if needed)
    fetchCategories();
}
