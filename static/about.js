// A simple script to handle navigation active states 
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent default jump for demo purposes
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));
            
            // Add active class to clicked link
            this.classList.add("active");
        });
    });
});