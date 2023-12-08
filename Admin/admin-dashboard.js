

// Fetch and display products when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupProductForm();
    setupCategoryForm();
    fetchProducts();
    setupModalClose();
    setupTabs();
});


// Fetch products from the server and display them
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


// Fetch and display categories
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





// Attach event listeners to edit and delete buttons for products
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

// Function to show the edit category modal
function editCategory(categoryId) {
    fetch(`http://localhost:4444/categories/${categoryId}`)
        .then(response => response.json())
        .then(category => {
            document.getElementById('editCategoryId').value = category.categoryId;
            document.getElementById('editCategoryName').value = category.categoryName;
            document.getElementById('editCategoryModal').style.display = "block";
        })
        .catch(error => console.error('Error:', error));
}

// Handle form submission for editing a category
document.getElementById('editCategoryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const categoryId = document.getElementById('editCategoryId').value;
    const categoryName = document.getElementById('editCategoryName').value;

    fetch(`http://localhost:4444/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName })
    })
    .then(response => response.json())
    .then(() => {
        alert('Category updated successfully');
        fetchCategories();
        document.getElementById('editCategoryModal').style.display = "none";
    })
    .catch(error => console.error('Error:', error));
});



// Edit a product
function editProduct(productId) {
    fetch(`http://localhost:4444/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('editProductId').value = product.productId;
            document.getElementById('editProductName').value = product.productName;
            document.getElementById('editProductPrice').value = product.listPrice;
            document.getElementById('editProductModal').style.display = "block";
        })
        .catch(error => console.error('Error:', error));
}



// Set up event listeners for closing the modal
function setupModalClose() {
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = "none";
        });
    });

    // Close the modal if clicked outside of it
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('editProductModal')) {
            document.getElementById('editProductModal').style.display = "none";
        } else if (event.target == document.getElementById('editCategoryModal')) {
            document.getElementById('editCategoryModal').style.display = "none";
        }
    });
}



// Handle form submission for editing a product
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


// Handle form submission for creating a new product
// Function to handle form submission for creating a new product
function setupProductForm() {
    document.getElementById('newProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;

        const newProduct = {
            productName,
            listPrice: productPrice
        };

        fetch('http://localhost:4444/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(() => {
            alert('Product created successfully');
            fetchProducts();
        })
        .catch(error => console.error('Error:', error));
    });
}





function setupCategoryForm() {
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
}



// Delete a product
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

// Delete a category
function deleteCategory(categoryId) {
    fetch(`http://localhost:4444/categories/${categoryId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        alert('Category deleted successfully');
        fetchCategories(); // Refresh the category list
    })
    .catch(error => console.error('Error:', error));
}




// Attach event listeners to edit and delete buttons for categories
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


function setupTabs() {
    document.getElementById('showProducts').addEventListener('click', showProductsTab);
    document.getElementById('showCategories').addEventListener('click', showCategoriesTab);
}

function setupForms() {
    setupProductForm();
    setupCategoryForm();
}




// Show the products section
function showProductsTab() {
    document.getElementById('productSection').style.display = 'block'; // Show product section
    document.getElementById('categoriesSection').style.display = 'none'; // Hide category section
    fetchProducts();
}


// Show the categories section
function showCategoriesTab() {
    document.getElementById('productSection').style.display = 'none'; // Hide product section
    document.getElementById('categoriesSection').style.display = 'block'; // Show category section
    fetchCategories();
}

