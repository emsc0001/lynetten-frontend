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

// Function to fetch and display categories
function fetchCategories() {
    console.log("Fetching categories...");
    fetch('http://localhost:4444/categories')
        .then(response => {
            console.log("Response received");
            return response.json();
        })
        .then(categories => {
            console.log("Categories:", categories);
            // existing code...
        })
        .catch(error => console.error('Error:', error));
}


function fetchCategories() {
    fetch('http://localhost:4444/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesContainer = document.getElementById('category-list');
            categoriesContainer.innerHTML = categories.map(category =>
                `<div class="category-item">
                    <h3>${category.categoryName}</h3>
                    <button class="edit-category" data-category-id="${category.categoryId}">Edit</button>
                    <button class="delete-category" data-category-id="${category.categoryId}">Delete</button>
                </div>`
            ).join('');

            attachCategoryEventListeners();
        })
        .catch(error => console.error('Error:', error));
}

// Function to attach event listeners to category edit and delete buttons
function attachCategoryEventListeners() {
    document.querySelectorAll('.edit-category').forEach(button => {
        button.addEventListener('click', function() {
            editCategory(this.getAttribute('data-category-id'));
        });
    });

    document.querySelectorAll('.delete-category').forEach(button => {
        button.addEventListener('click', function() {
            deleteCategory(this.getAttribute('data-category-id'));
        });
    });
}

// Function to handle category creation
document.getElementById('newCategoryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const categoryName = document.getElementById('categoryName').value;
    
    fetch('http://localhost:4444/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName })
    })
    .then(response => response.json())
    .then(() => {
        alert('Category created successfully');
        fetchCategories();
    })
    .catch(error => console.error('Error:', error));
});

// Function to handle category deletion
function deleteCategory(categoryId) {
    fetch(`http://localhost:4444/categories/${categoryId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        alert('Category deleted successfully');
        fetchCategories();
    })
    .catch(error => console.error('Error:', error));
}


showCategoriesBtn.addEventListener('click', () => {
    document.getElementById('productsSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'block';
    fetchCategories();
});

