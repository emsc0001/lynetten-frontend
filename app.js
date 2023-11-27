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