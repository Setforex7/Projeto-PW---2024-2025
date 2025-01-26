document.addEventListener("DOMContentLoaded", () => {
    const closeMenuButton = document.getElementById('close-menu');
    const navbar = document.querySelector('.nav-header');

    if (!closeMenuButton.style.display === "none" && hamburgerMenu.classList.contains('active')) {
        closeMenuButton.style.display = "block";
    }

    document.getElementById('hamburger-menu').addEventListener('click', function() {
        const menu = document.querySelector('.navbar .right-section ul');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const body = document.body;

        if (hamburgerMenu.classList.contains('active')) {
            menu.classList.remove('show');
            hamburgerMenu.classList.remove('active');
            body.classList.remove('menu-open');
            return;
        }
        menu.classList.toggle('show');
        this.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    document.getElementById('close-menu').addEventListener('click', function() {
        const menu = document.querySelector('.navbar .right-section ul');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const body = document.body;
        menu.classList.remove('show');
        hamburgerMenu.classList.remove('active');
        body.classList.remove('menu-open');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.25) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
