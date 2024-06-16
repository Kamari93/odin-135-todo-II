// this is the entry point for the app
alert('Keep Going...🍊🌊');

import toggleTheme from './theme';
import { addProjectPopup } from './addProjectPopup.js';
import { openNav } from './hamburgerNav.js';
import { projectPreview } from './projectPreview';

// Wrapped all the initialization code inside a DOMContentLoaded event listener to ensure the DOM is fully loaded before accessing elements.
document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const themeSelect = document.getElementById("theme-select");
    const addProjectBtn = document.getElementById("button-add-project");
    const openNavButton = document.getElementById('button-dropdown-nav');
    const projectsList = document.getElementById('projects-list');
    const defaultProjects = document.getElementById('default-projects-list');

    // Event listeners
    themeSelect.addEventListener('change', toggleTheme);
    addProjectBtn.addEventListener('click', addProjectPopup);
    openNavButton.addEventListener('click', openNav);

    projectsList.addEventListener('click', handleProjectClick);
    defaultProjects.addEventListener('click', handleDefaultProjectClick);

    document.addEventListener('click', handleTaskOrAddTaskClick);

    // Initialize project preview
    projectPreview.initialize(projectsList);

    function handleProjectClick(event) {
        const clickedElement = event.target.closest('.button-project');
        if (clickedElement) {
            const projectId = clickedElement.dataset.projectId;
            selectUserProject(clickedElement, projectId);
        }
    }

    function selectUserProject(projectButton, projectId) {
        const projectName = projectButton.querySelector('span').textContent;
        projectPreview.displaySelectedProject(projectName, projectId);
        projectPreview.highlightSelectedProjectButton(projectButton);
        projectPreview.loadProjectTasks(projectId);
    }

    function handleDefaultProjectClick(event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('button-default-project')) {
            const projectId = clickedElement.dataset.projectId; // Fetches the project ID
            const projectName = clickedElement.textContent.trim(); // Fetches the project name
            projectPreview.displaySelectedProject(projectName, projectId, true); // Displays the selected default project
            projectPreview.highlightSelectedProjectButton(clickedElement); // Highlights the selected project button
        }
    }

    function handleTaskOrAddTaskClick(event) {
        if (event.target.classList.contains('button-add-task')) {
            const projectId = event.target.dataset.projectId;
            projectPreview.addTask(projectId);
        } else if (event.target.closest('.task')) {
            projectPreview.handleTaskActions(event);
        }
    }
});

