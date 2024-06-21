import { projectPreview } from './projectPreview';
import { generateProjectId } from './utils'; // Import the generateProjectId function

export const addProjectPopup = (() => {
    const buttonAddProject = document.getElementById('button-add-project');
    const addProjectPopup = document.getElementById('add-project-popup');
    const inputAddProjectPopup = document.getElementById('input-add-project-popup');
    const projectsList = document.getElementById('projects-list');

    // Load projects from local storage on page load
    document.addEventListener('DOMContentLoaded', loadProjectsFromLocalStorage);

    buttonAddProject.addEventListener('click', () => {
        addProjectPopup.style.display = 'block';
    });

    const buttonCancelProjectPopup = document.getElementById('button-cancel-project-popup');
    buttonCancelProjectPopup.addEventListener('click', () => {
        addProjectPopup.style.display = 'none';
    });

    const buttonAddProjectPopup = document.getElementById('button-add-project-popup');
    buttonAddProjectPopup.addEventListener('click', () => {
        const newProjectName = inputAddProjectPopup.value.trim();
        if (newProjectName) {
            const newProjectId = generateProjectId(); // Generate project ID
            const newProject = { name: newProjectName, id: newProjectId }; // Create a new project object
            addNewProject(newProject); // Add the new project
            addProjectPopup.style.display = 'none'; // Optionally, close the popup
            inputAddProjectPopup.value = ''; // Optionally, clear the input field
            // reload page after Project creation for local storage
            location.reload();
        }
    });

    function addNewProject(project) {
        // Save the project to local storage
        saveProjectToLocalStorage(project);

        // Create a new project element
        const projectElement = document.createElement('button');
        projectElement.classList.add('button-project');
        projectElement.dataset.projectId = project.id;

        const leftPanel = document.createElement('div');
        leftPanel.classList.add('left-project-panel');
        leftPanel.innerHTML = `
            <i class="fas fa-tasks"></i>
            <span>${project.name}</span>
        `;

        const rightPanel = document.createElement('div');
        rightPanel.classList.add('right-project-panel');
        rightPanel.innerHTML = `
            <i class='fas fa-edit' data-action="edit"></i>
            <i class='fas fa-trash-alt' data-action="delete"></i>
        `;

        projectElement.appendChild(leftPanel);
        projectElement.appendChild(rightPanel);
        projectsList.appendChild(projectElement);

        // Attach event listeners for edit and delete buttons
        attachEditDeleteEventListeners(projectElement, project);
    }

    function attachEditDeleteEventListeners(projectElement, project) {
        const editButton = projectElement.querySelector('.fa-edit');
        const deleteButton = projectElement.querySelector('.fa-trash-alt');

        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            editProject(projectElement, project);
        });

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteProject(projectElement, project.id);
        });

        projectElement.addEventListener('click', () => {
            selectAndDisplayProject(project);
        });
    }

    function selectAndDisplayProject(project) {
        projectPreview.displaySelectedProject(project.name);
    }

    function editProject(projectElement, project) {
        let newProjectName = prompt('Enter the new project name:', project.name);
        while (newProjectName !== null && newProjectName.trim() === "") {
            newProjectName = prompt('Please enter a non-empty project name:', project.name);
        }

        if (newProjectName !== null) {
            newProjectName = newProjectName.trim();
            projectElement.querySelector('span').textContent = newProjectName;
            project.name = newProjectName; // Update the project name
            saveProjectToLocalStorage(project); // Save the updated project
        }
    }

    function deleteProject(projectElement, projectId) {
        const confirmDelete = confirm('Are you sure you want to delete this project?');
        if (confirmDelete) {
            projectElement.remove();
            removeProjectFromLocalStorage(projectId); // Remove the project from local storage
        }
    }

    // When a project is added or edited, it updates the local storage
    function saveProjectToLocalStorage(project) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectIndex = projects.findIndex(p => p.id === project.id);
        if (projectIndex > -1) {
            projects[projectIndex] = project; // Update existing project
        } else {
            projects.push(project); // Add new project
        }
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // When a project is deleted, it removes it from local storage
    function removeProjectFromLocalStorage(projectId) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects = projects.filter(project => project.id !== projectId);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // When the page loads, it retrieves the saved projects from local storage and adds them to the UI.
    function loadProjectsFromLocalStorage() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.forEach(project => addNewProject(project));
    }

    console.log(`Local Storage projects: ${localStorage.getItem('projects')}`);

    return {
        // Expose any necessary functions or variables
    };
})();

