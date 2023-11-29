document.addEventListener('click', function(e) {
    if (e.target.classList.contains('dropbtn')) {
        var dropdown = e.target.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    } else {
        var openDropdowns = document.querySelectorAll('.dropdown-content');
        openDropdowns.forEach(function(dropdown) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }
});


function openCategory(categoryId) {
    // Hide all category content
    var contents = document.getElementsByClassName('category-content');
    for (var i = 0; i < contents.length; i++) {
      contents[i].style.display = 'none';
    }
  
    // Show the specific category content
    var selectedContent = document.getElementById(categoryId);
    if (selectedContent) {
      selectedContent.style.display = 'block';
    }
  }
  