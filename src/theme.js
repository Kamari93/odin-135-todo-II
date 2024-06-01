// theme.js
export default function toggleTheme() {
    const themeSelect = document.getElementById("theme-select");
    const selectedTheme = themeSelect.value;

    // change body styling based on the selected theme
    document.body.className = selectedTheme;

    // remove the previous icon before adding the new selected theme icon
    const existingIcon = document.querySelector('.theme i');
    if (existingIcon) {
        existingIcon.remove();
    }

    // Create a new icon based on the selected theme
    const icon = document.createElement('i');

    // Add icons based on the selected theme
    if (selectedTheme === 'dark') {
        icon.className = 'fa fa-moon-o';
    } else {
        icon.className = 'fa fa-sun-o';
    }

    // Append the new icon to the label
    document.querySelector('.theme label').appendChild(icon);

    console.log(selectedTheme);
}