// Opens hamburger drop-down nav
const openNavButton = document.getElementById('button-dropdown-nav');

// Static method that opens nav menu
export function openNav() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');

    // Toggle the icon between hamburger and "X"
    const icon = openNavButton.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// // opens hamburger drop down nav
// const openNavButton = document.getElementById('button-dropdown-nav');

// // Static method that opens nav menu
// export function openNav() {
//     const nav = document.getElementById('nav')

//     // UI.closeAllPopups()
//     nav.classList.toggle('active')
// }
