const projectTasks = {};

export const projectPreview = (() => {
    let projectPreviewElement;
    let currentProjectId;

    // Function to gather tasks from all projects and organize them for the inbox
    function gatherTasksForInbox() {
        const inboxTasks = [];
        for (const projectId in projectTasks) {
            const tasks = projectTasks[projectId];
            inboxTasks.push(...tasks);
        }
        return inboxTasks;
    }

    function initialize(projectsList) {
        projectPreviewElement = document.getElementById('project-preview');
        projectsList.addEventListener('click', handleUserProjectClick);

        // Render the inbox project initially
        displaySelectedProject("Inbox", null);
    }

    function handleUserProjectClick(event) {
        const clickedElement = event.target.closest('.button-project');
        if (clickedElement) {
            const projectName = clickedElement.querySelector('span').textContent;
            const projectId = clickedElement.dataset.projectId;
            currentProjectId = projectId;
            displaySelectedProject(projectName, projectId);
            highlightSelectedProjectButton(clickedElement);
        }
    }

    function displaySelectedProject(projectName, projectId) {
        let projectHTML = `<h1 class="selected-project">${projectName}</h1>`;

        if (projectId) { // Only add task management buttons if it's a user-created project
            projectHTML += `
                <div class="tasks-container">
                    <button class="button-add-task" data-project-id="${projectId}"><i class="fas fa-plus"></i> Add Task</button>
                    <div class="task-list-container">
                        <div class="task-list" id="task-list-${projectId}"></div>
                        <div class="color-code-key">
                            <div class="color-code-item">
                                <div class="color-code-box purple">1</div>
                                <span>Big Task</span>
                            </div>
                            <div class="color-code-item">
                                <div class="color-code-box blue">3</div>
                                <span>Medium Task</span>
                            </div>
                            <div class="color-code-item">
                                <div class="color-code-box green">5</div>
                                <span>Small Task</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        else {
            projectHTML += `
            <div class="filter-dropdown" id="filter-dropdown">
                <select id="filter-select">
                    <option value="all">All Tasks</option>
                    <!-- Add options for task types -->
                    <option value="purple">Big Task</option>
                    <option value="blue">Medium Task</option>
                    <option value="green">Small Task</option>
                </select>
            </div>
        `;
        }

        projectPreviewElement.innerHTML = projectHTML;

        if (projectId) {
            renderTasks(projectId);
        }
    }

    function moveTask(projectId, index, direction) {
        const tasks = projectTasks[projectId];
        if (direction === 'up' && index > 0) {
            [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
        } else if (direction === 'down' && index < tasks.length - 1) {
            [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
        }
        storeProjectTasks(projectId);
        renderTasks(projectId);
    }

    function renderTasks(projectId) {
        const taskList = document.getElementById(`task-list-${projectId}`);
        taskList.innerHTML = '';

        const tasks = projectTasks[projectId] || [];
        tasks.forEach((task, index) => {
            let borderClass = '';

            if (index === 0) {
                borderClass = 'task-border-purple';
            } else if (index >= 1 && index <= 3) {
                borderClass = 'task-border-blue';
            } else if (index >= 4) {
                borderClass = 'task-border-green';
            }

            const taskHTML = `
                <div class="task ${borderClass}" data-task-id="${index}">
                    <span class="task-move">
                        <i class="fas fa-arrow-up" data-action="move-up"></i>
                        <i class="fas fa-arrow-down" data-action="move-down"></i>
                    </span>
                    <span class="task-title">${task.title}</span>
                    <span class="task-date">${task.date}</span>
                    <span class="task-actions">
                        <i class="fas fa-edit" data-action="edit"></i>
                        <i class="fas fa-trash-alt" data-action="delete"></i>
                    </span>
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);
        });
    }

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.fa-arrow-up') || target.matches('.fa-arrow-down')) {
            const taskElement = target.closest('.task');
            const taskId = taskElement.getAttribute('data-task-id');
            const taskIndex = parseInt(taskId);
            const direction = target.matches('.fa-arrow-up') ? 'up' : 'down';
            moveTask(currentProjectId, taskIndex, direction);
        }
    });

    function handleTaskActions(event) {
        const taskElement = event.target.closest('.task');
        const projectId = currentProjectId;
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
        const newDate = prompt('Edit Date (YYYY-MM-DD)', task.date);

        if (newTitle) {
            task.title = newTitle;
        }
        if (newDate) {
            task.date = newDate;
        }
        storeProjectTasks(projectId);
        renderTasks(projectId);
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
        const date = prompt('Task Date (MM-DD-YYYY)');
        if (title && date) {
            const newTask = { title, date, completed: false };
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
    }

    console.log(projectTasks)
    // console.log(inboxTasks)

    return {
        initialize,
        displaySelectedProject,
        handleTaskActions,
        addTask,
        highlightSelectedProjectButton,
        loadProjectTasks
    };
})();


