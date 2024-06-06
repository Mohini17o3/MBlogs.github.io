  // header 
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) { // Adjust the scroll distance as needed
        header.style.opacity = '0.5'; // Set to desired opacity
    } else {
        header.style.opacity = '1';
    }
});