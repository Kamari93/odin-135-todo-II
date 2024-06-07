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
