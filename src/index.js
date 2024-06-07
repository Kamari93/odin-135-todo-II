// // this is the entry point for the app
// alert('Keep Going...🍊🌊');

// // import toggle the toggle module
// import toggleTheme from './theme';

// import { addProjectPopup } from './addProjectPopup.js';

// import { openNav } from './hamburgerNav.js';

// import { projectPreview } from './projectPreview';


// //on start up checked whether its on light mode or dark mode
// const themeSelect = document.getElementById("theme-select");

// const addProjectBtn = document.getElementById("button-add-project");

// // opens hamburger drop down nav
// const openNavButton = document.getElementById('button-dropdown-nav');

// themeSelect.addEventListener('change', toggleTheme);

// addProjectBtn.addEventListener('click', addProjectPopup);

// openNavButton.addEventListener('click', openNav);


// // Initialize the projectPreview module
// const projectsList = document.getElementById('projects-list');
// projectPreview.initialize(projectsList);

// // Event listeners for user-created projects
// projectsList.addEventListener('click', (event) => {
//     const clickedElement = event.target;
//     if (clickedElement.classList.contains('button-project')) {
//         const projectId = clickedElement.dataset.projectId; // Fetch projectId from the dataset
//         selectUserProject(clickedElement, projectId); // Pass the clicked button element
//     }
// });

// // Function to handle selecting a user-created project
// function selectUserProject(projectButton, projectId) { // Change the argument to projectButton
//     // Call the displaySelectedProject function from the projectPreview module
//     const projectName = projectButton.querySelector('span').textContent;
//     projectPreview.displaySelectedProject(projectName, projectId, false);
//     projectPreview.highlightSelectedProjectButton(projectButton); // Pass the button element
// };


// // Event listeners for default projects
// const defaultProjects = document.getElementById('default-projects-list');
// defaultProjects.addEventListener('click', (event) => {
//     const clickedElement = event.target;
//     if (clickedElement.classList.contains('button-default-project')) {
//         const projectName = clickedElement.textContent.trim();
//         projectPreview.displaySelectedProject(projectName, '', true);
//         projectPreview.highlightSelectedProjectButton(clickedElement);
//     }
// });

// // Function to handle clicks on default project buttons
// function handleDefaultProjectClick(event) {
//     // Retrieve the project name and ID from the clicked button
//     const projectName = event.target.textContent.trim();
//     const projectId = event.target.id; // Retrieve project ID from the button's id attribute

//     // Display the selected default project
//     projectPreview.displaySelectedProject(projectName, projectId, true); // Pass true to indicate it's a default project
//     console.log('Default Project Clicked:', projectId);
// }


// index.js
alert('Keep Going...🍊🌊');

import toggleTheme from './theme';
import { addProjectPopup } from './addProjectPopup.js';
import { openNav } from './hamburgerNav.js';
import { projectPreview } from './projectPreview';

const themeSelect = document.getElementById("theme-select");
const addProjectBtn = document.getElementById("button-add-project");
const openNavButton = document.getElementById('button-dropdown-nav');

themeSelect.addEventListener('change', toggleTheme);
addProjectBtn.addEventListener('click', addProjectPopup);
openNavButton.addEventListener('click', openNav);

const projectsList = document.getElementById('projects-list');
projectPreview.initialize(projectsList);

projectsList.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('button-project')) {
        const projectId = clickedElement.dataset.projectId;
        selectUserProject(clickedElement, projectId);
    }
});

function selectUserProject(projectButton, projectId) {
    const projectName = projectButton.querySelector('span').textContent;
    projectPreview.displaySelectedProject(projectName, projectId);
    projectPreview.highlightSelectedProjectButton(projectButton);
    projectPreview.loadProjectTasks(projectId);
}

const defaultProjects = document.getElementById('default-projects-list');
defaultProjects.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('button-default-project')) {
        const projectName = clickedElement.textContent.trim();
        projectPreview.displaySelectedProject(projectName, '', true);
        projectPreview.highlightSelectedProjectButton(clickedElement);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('button-add-task')) {
        const projectId = event.target.dataset.projectId;
        projectPreview.addTask(projectId);
    } else if (event.target.closest('.task')) {
        projectPreview.handleTaskActions(event);
    }
});
