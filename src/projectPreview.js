// /**
// This module defines a function displaySelectedProject that takes a project 
// name as an argument and updates the content of the project-preview div with 
// an <h1> element containing the selected project name.
//  */

// // Data structure to store tasks associated with each project
// const projectTasks = {};

// export const projectPreview = (() => {
//     let projectPreviewElement; // Variable to store a reference to the project preview element
//     let projectTasks = {}; // Data structure to store tasks associated with each project

//     // Initialize function to set up the module
//     function initialize(projectsList) {
//         // Assign the project preview element by selecting the element with the id 'project-preview'
//         projectPreviewElement = document.getElementById('project-preview');
//         projectsList.addEventListener('click', handleUserProjectClick);
//     }

//     // Function to handle clicks on user-created projects
//     function handleUserProjectClick(event) {
//         const clickedElement = event.target;
//         if (clickedElement.classList.contains('button-project')) {
//             const projectName = clickedElement.querySelector('span').textContent;
//             const projectId = clickedElement.dataset.projectId; // Fetch projectId from the dataset
//             displaySelectedProject(projectName, projectId); // Pass projectId to displaySelectedProject
//             highlightSelectedProjectButton(clickedElement); // Call to highlight the selected project button
//         }
//         // displaySelectedProject(projectName, projectId);
//     }

//     // // Function to handle clicks on "Add Task" buttons
//     // function handleAddTaskButtonClick(event) {
//     //     const clickedButton = event.target;
//     //     if (clickedButton.classList.contains('button-add-task')) {
//     //         const projectId = clickedButton.closest('.project-tasks').dataset.projectId;
//     //         // Here, you can perform the necessary actions for adding a task
//     //         // For example, you can open a form or directly add a task to the selected project
//     //         console.log('Add task clicked for project:', projectId);
//     //     }
//     // }

//     // Function to store tasks associated with a project
//     // function storeProjectTasks(projectId, taskDiv) {
//     //     // Initialize an array to store task containers if not already present
//     //     if (!projectTasks[projectId]) {
//     //         projectTasks[projectId] = [];
//     //     }
//     //     // Add the task container to the array
//     //     projectTasks[projectId].push(taskDiv);
//     // }

//     // Function to display the selected project in the project preview
//     function displaySelectedProject(projectName, projectId, isDefaultProject) {

//         // Store projectId for internal use
//         // Example: You can store it in an array or object for future reference
//         // const storedProject = { name: projectName, id: projectId };
//         // You can perform any additional logic with storedProject if needed

//         let projectHTML = `<h1 class="selected-project">${projectName}</h1>`;
//         // Check if there are tasks associated with the current project
//         const tasks = projectTasks[projectId];
//         if (tasks && tasks.length > 0) {
//             // Render each task in the appropriate task div
//             tasks.forEach(taskElement => {
//                 const taskDivId = taskElement.dataset.taskDivId;
//                 const taskDiv = document.getElementById(taskDivId);
//                 if (taskDiv) {
//                     taskDiv.appendChild(taskElement);
//                 }
//             });
//         }

//         // console.log('Stored Project ID:', projectId);

//         // Retrieve stored tasks associated with the selected project
//         // const storedTasks = projectTasks[projectId];
//         // if (storedTasks && storedTasks.length > 0) {
//         //     // Render each stored task in the appropriate task div
//         //     storedTasks.forEach(taskDiv => {
//         //         taskDiv.appendChild(taskElement);
//         //     });
//         // }

//         // if (!isDefaultProject) {
//         //     projectHTML += `
//         //     <div id="${projectId}-big-things-container" class="big-things">
//         //         <h2>1 Big Thing</h2>
//         //         <button class="button-add-task button-add-project big-things-btn" id="${projectId}-big-things-btn">
//         //           <i class="fas fa-plus"></i>
//         //           Add Task
//         //         </button>
//         //     </div>
//         //     <div id="${projectId}-medium-things-container" class="medium-things">
//         //         <h2>3 Medium Things</h2>
//         //         <button class="button-add-task button-add-project medium-things-btn" id="${projectId}-medium-things-btn">
//         //           <i class="fas fa-plus"></i>
//         //           Add Task
//         //         </button>
//         //     </div>
//         //     <div id="${projectId}-little-things-container" class="little-things">
//         //         <h2>5 Little Things</h2>
//         //         <button class="button-add-task button-add-project little-things-btn" id="${projectId}-little-things-btn">
//         //           <i class="fas fa-plus"></i>
//         //           Add Task
//         //         </button>
//         //     </div>
//         // `;
//         // }

//         projectPreviewElement.innerHTML = projectHTML;
//     }


// // Function to highlight the selected Project
// function highlightSelectedProjectButton(projectButton) {
//     // Remove the highlight from previously selected project button, if any
//     const prevSelectedButton = document.querySelector('.selected-project-button');
//     if (prevSelectedButton) {
//         prevSelectedButton.classList.remove('selected-project-button');
//     }

//     // Highlight the selected project button
//     projectButton.classList.add('selected-project-button');

//     // projectPreview.displaySelectedProject(projectName);
// }

//     // Function to store tasks associated with a project
//     function storeProjectTasks(projectId, tasks) {
//         projectTasks[projectId] = tasks;
//     }

//     // Expose public functions or variables
//     return {
//         initialize,
//         displaySelectedProject,
//         highlightSelectedProjectButton,
//         // handleUserProjectClick,
//         storeProjectTasks,
//     };
// })();


// projectPreview.js
const projectTasks = {};

export const projectPreview = (() => {
    let projectPreviewElement;

    function initialize(projectsList) {
        projectPreviewElement = document.getElementById('project-preview');
        projectsList.addEventListener('click', handleUserProjectClick);
    }

    function handleUserProjectClick(event) {
        const clickedElement = event.target.closest('.button-project');
        if (clickedElement) {
            const projectName = clickedElement.querySelector('span').textContent;
            const projectId = clickedElement.dataset.projectId;
            displaySelectedProject(projectName, projectId);
            highlightSelectedProjectButton(clickedElement);
        }
    }

    function displaySelectedProject(projectName, projectId) {
        let projectHTML = `<h1 class="selected-project">${projectName}</h1>`;
        projectHTML += `
            <div class="tasks-container">
                <button class="button-add-task" data-project-id="${projectId}"><i class="fas fa-plus"></i> Add Task</button>
                <div class="task-list" id="task-list-${projectId}"></div>
            </div>
        `;

        projectPreviewElement.innerHTML = projectHTML;
        renderTasks(projectId);
    }

    function renderTasks(projectId) {
        const taskList = document.getElementById(`task-list-${projectId}`);
        taskList.innerHTML = '';

        const tasks = projectTasks[projectId] || [];
        tasks.forEach((task, index) => {
            const taskHTML = `
                <div class="task" data-task-id="${index}">
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                    <span class="task-title">${task.title}</span>
                    <span class="task-actions">
                        <i class="fas fa-edit" data-action="edit"></i>
                        <i class="fas fa-trash-alt" data-action="delete"></i>
                    </span>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);
        });
    }

    function handleTaskActions(event) {
        const taskElement = event.target.closest('.task');
        const projectId = event.target.closest('.tasks-container').querySelector('.button-add-task').dataset.projectId;
        const taskId = taskElement.dataset.taskId;

        if (event.target.classList.contains('fa-edit')) {
            editTask(projectId, taskId);
        } else if (event.target.classList.contains('fa-trash-alt')) {
            deleteTask(projectId, taskId);
        } else if (event.target.classList.contains('task-complete')) {
            toggleTaskCompletion(projectId, taskId);
        }
    }

    function editTask(projectId, taskId) {
        const task = projectTasks[projectId][taskId];
        const newTitle = prompt('Edit Task', task.title);
        if (newTitle) {
            task.title = newTitle;
            storeProjectTasks(projectId);
            renderTasks(projectId);
        }
    }

    function deleteTask(projectId, taskId) {
        projectTasks[projectId].splice(taskId, 1);
        storeProjectTasks(projectId);
        renderTasks(projectId);
    }

    function toggleTaskCompletion(projectId, taskId) {
        const task = projectTasks[projectId][taskId];
        task.completed = !task.completed;
        storeProjectTasks(projectId);
        renderTasks(projectId);
    }

    function storeProjectTasks(projectId) {
        localStorage.setItem(`projectTasks_${projectId}`, JSON.stringify(projectTasks[projectId]));
    }

    function loadProjectTasks(projectId) {
        const storedTasks = JSON.parse(localStorage.getItem(`projectTasks_${projectId}`));
        if (storedTasks) {
            projectTasks[projectId] = storedTasks;
        }
    }

    function addTask(projectId) {
        if (!projectTasks[projectId]) {
            projectTasks[projectId] = [];
        }

        if (projectTasks[projectId].length >= 9) {
            alert('Task limit reached (9 tasks per project).');
            return;
        }

        const title = prompt('New Task');
        if (title) {
            const newTask = { title, completed: false };
            projectTasks[projectId].push(newTask);
            storeProjectTasks(projectId);
            renderTasks(projectId);
        }
    }

    // Function to highlight the selected Project
    function highlightSelectedProjectButton(projectButton) {
        // Remove the highlight from previously selected project button, if any
        const prevSelectedButton = document.querySelector('.selected-project-button');
        if (prevSelectedButton) {
            prevSelectedButton.classList.remove('selected-project-button');
        }

        // Highlight the selected project button
        projectButton.classList.add('selected-project-button');

        // projectPreview.displaySelectedProject(projectName);
    }

    return {
        initialize,
        displaySelectedProject,
        handleTaskActions,
        addTask,
        highlightSelectedProjectButton,
        loadProjectTasks
    };
})();
