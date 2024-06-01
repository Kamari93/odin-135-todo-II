// import { projectPreview } from './projectPreview';
import { generateProjectId } from './utils'; // Import the generateProjectId function

export const addProjectPopup = (() => {
    const buttonAddProject = document.getElementById('button-add-project');
    const addProjectPopup = document.getElementById('add-project-popup');
    // use these to add a new project to displayed project list
    const inputAddProjectPopup = document.getElementById('input-add-project-popup');
    const projectsList = document.getElementById('projects-list');

    buttonAddProject.addEventListener('click', () => {
        addProjectPopup.style.display = 'block';
    });

    const buttonCancelProjectPopup = document.getElementById('button-cancel-project-popup');
    buttonCancelProjectPopup.addEventListener('click', () => {
        addProjectPopup.style.display = 'none';
    });

    const buttonAddProjectPopup = document.getElementById('button-add-project-popup');

    buttonAddProjectPopup.addEventListener('click', () => {
        const newProjectName = inputAddProjectPopup.value;
        if (newProjectName) {

            const newProjectId = generateProjectId(); // Generate project ID
            // Create a new project object
            const newProject = { name: newProjectName, id: newProjectId }; // Pass project ID
            // Call a function or method to add the new project to the list
            addNewProject(newProject, newProjectId); // Pass projectId to addNewProject
            // console.log(newProjectId)
            // Optionally, close the popup
            addProjectPopup.style.display = 'none';

            // Optionally, clear the input field
            inputAddProjectPopup.value = '';
        }
    });


    function addNewProject(project, projectId) {
        // Call a function or method to add the new project to the list

        // projectPreview.displaySelectedProject(project.name, project.id); // Pass project ID
        // projectPreview.displaySelectedProject(project.name, projectId); // Pass projectId
        // Create a new project element
        const projectElement = document.createElement('button');
        projectElement.classList.add('button-project');

        // Set the data-project-id attribute to the project element
        projectElement.dataset.projectId = projectId;

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

        // Append the project element to the projectsList
        projectsList.appendChild(projectElement);

        // Attach event listeners for edit and delete buttons
        attachEditDeleteEventListeners(projectElement, project.name);
    };

    function attachEditDeleteEventListeners(projectElement, projectName) {
        const editButton = projectElement.querySelector('.fa-edit');
        const deleteButton = projectElement.querySelector('.fa-trash-alt');

        editButton.addEventListener('click', () => {
            // Call a function to handle editing the project
            editProject(projectElement, projectName);
        });

        deleteButton.addEventListener('click', () => {
            // Call a function to handle deleting the project
            deleteProject(projectElement);
        });

        // Add click event listener for the project button
        projectElement.addEventListener('click', () => {
            // Call a function to handle selecting and displaying the project
            selectAndDisplayProject(projectName);
        });
    };

    function selectAndDisplayProject(projectName) {
        // Call a function to display the selected project in the project preview
        projectPreview.displaySelectedProject(projectName);
    }

    function editProject(projectElement, projectName) {
        // Ask the user for a new project name
        let newProjectName = prompt('Enter the new project name:', projectName);

        // Validate the user input
        // The trim method is used to remove leading and trailing whitespaces from the input.
        while (newProjectName !== null && newProjectName.trim() === "") {
            // If the user entered an empty string, prompt again until a valid input is provided
            newProjectName = prompt('Please enter a non-empty project name:', projectName);
        };

        // Update the project name in the UI
        if (newProjectName !== null) {
            projectElement.querySelector('span').textContent = newProjectName;
        };
    };

    function deleteProject(projectElement) {
        // Ask for confirmation before deleting the project
        const confirmDelete = confirm('Are you sure you want to delete this project?');

        // If the user confirms, remove the project from the UI
        if (confirmDelete) {
            projectElement.remove();
        }
    }

    // Other functionality to handle adding a new project (on "Add" button click), etc.

    return {
        // Expose any necessary functions or variables
        // addNewProject,
        // projectId // Add this line to expose the projectId
    };
})();
