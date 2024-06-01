// this is the entry point for the app
alert('Keep Going...🍊🌊');

// import toggle the toggle module
import toggleTheme from './theme';

import { addProjectPopup } from './addProjectPopup.js';

import { openNav } from './hamburgerNav.js';


//on start up checked whether its on light mode or dark mode
const themeSelect = document.getElementById("theme-select");

const addProjectBtn = document.getElementById("button-add-project");

// opens hamburger drop down nav
const openNavButton = document.getElementById('button-dropdown-nav');

themeSelect.addEventListener('change', toggleTheme);

addProjectBtn.addEventListener('click', addProjectPopup);

openNavButton.addEventListener('click', openNav);