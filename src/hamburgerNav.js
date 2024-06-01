// opens hamburger drop down nav
const openNavButton = document.getElementById('button-dropdown-nav');

// Static method that opens nav menu
export function openNav() {
    const nav = document.getElementById('nav')

    // UI.closeAllPopups()
    nav.classList.toggle('active')
}