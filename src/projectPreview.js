const projectTasks = {
    // Example structure
    // projectId1: [
    //     { title: "Task 1", date: "06-15-2024", completed: false, borderClass: "task-border-purple", pName: "Project 1", description, duration: 30 },
    //     { title: "Task 2", date: "06-16-2024", completed: true, borderClass: "task-border-blue", pName: "Project 1", description, duration: 30 }
    // ],
    // projectId2: [
    //     { title: "Task 3", date: "06-17-2024", completed: false, borderClass: "task-border-green", pName: "Project 2", description, duration: 30 }
    // ]
};

export const projectPreview = (() => {
    let projectPreviewElement;
    let currentProjectId;
    let currentFilter = 'all'; // Default filter
    const projectLookup = {};

    function initialize(projectsList) {
        projectPreviewElement = document.getElementById('project-preview');
        projectsList.addEventListener('click', handleUserProjectClick);

        // Render the inbox project initially
        loadDefaultProjects();
        displaySelectedProject("All Tasks Inbox", 'default-inbox', true);
    }

    function loadDefaultProjects() {
        const defaultProjects = ['default-inbox', 'default-today', 'default-this-week', 'default-brag-notes'];
        defaultProjects.forEach(projectId => {
            loadProjectTasks(projectId);
        });
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

    function displaySelectedProject(projectName, projectId, isDefault = false) {
        let projectHTML = `<h1 class="selected-project">${projectName}</h1>`;

        if (isDefault) {
            projectHTML += `
                <div class="filter-dropdown" id="filter-dropdown-${projectId}">
                    <select class="filter-select" id="filter-select-${projectId}">
                        <option value="all">All Tasks</option>
                        <option value="task-border-purple">Big Tasks</option>
                        <option value="task-border-blue">Medium Tasks</option>
                        <option value="task-border-green">Small Tasks</option>
                    </select>
                </div>
                <div class="tasks-container">
                    <div class="task-list" id="task-list-${projectId}"></div>
                     <div class="color-code-key default-color-code-key">
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
            `;
        } else {
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

        projectPreviewElement.innerHTML = projectHTML;

        if (isDefault) {
            const filterSelectElement = document.getElementById(`filter-select-${projectId}`);
            if (filterSelectElement) {
                filterSelectElement.addEventListener('change', (event) => handleFilterChange(event, projectId));
            } else {
                console.error('Filter select element not found in the DOM.');
            }
            renderDefaultProjectTasks(projectId); // Render tasks for default projects
        } else {
            renderTasks(projectId); // Render tasks for user-created project
        }
    }

    function handleFilterChange(event, projectId) {
        currentFilter = event.target.value;
        renderDefaultProjectTasks(projectId); // Re-render tasks with the selected filter
    }

    function moveTask(projectId, index, direction) {
        const tasks = projectTasks[projectId];
        if (direction === 'up' && index > 0) {
            swapTasks(tasks, index, index - 1);
        } else if (direction === 'down' && index < tasks.length - 1) {
            swapTasks(tasks, index, index + 1);
        }
        updateBorderClasses(tasks);
        storeProjectTasks(projectId);
        renderTasks(projectId);
    }

    function swapTasks(tasks, indexA, indexB) {
        [tasks[indexA], tasks[indexB]] = [tasks[indexB], tasks[indexA]];
    }

    function updateBorderClasses(tasks) {
        tasks.forEach((task, index) => {
            if (index === 0) {
                task.borderClass = 'task-border-purple';
            } else if (index >= 1 && index <= 3) {
                task.borderClass = 'task-border-blue';
            } else if (index >= 4) {
                task.borderClass = 'task-border-green';
            }
        });
    }


    function renderTasks(projectId) {
        const taskList = document.getElementById(`task-list-${projectId}`);
        taskList.innerHTML = '';

        const tasks = projectTasks[projectId] || [];
        tasks.forEach((task, index) => {
            const taskHTML = `
                <div class="task ${task.borderClass}" data-task-id="${index}">
                <span class="task-move">
                    <i class="fas fa-arrow-up" data-action="move-up"></i>
                   <i class="fas fa-arrow-down" data-action="move-down"></i>
                </span>
                    <span class="task-title">${task.title}</span>
                    <span class="task-date">${task.date}</span>
                    <span class="task-actions">
                        <button class="task-description-button" data-task-id="${index}">Description</button>
                        <i class="fas fa-edit" data-action="edit"></i>
                        <i class="fas fa-trash-alt" data-action="delete"></i>
                    </span>
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);

            // Attach event listeners to the description buttons
            const descriptionButtons = taskList.querySelectorAll('.task-description-button');
            descriptionButtons.forEach(button => {
                button.addEventListener('click', handleDescriptionButtonClick);
            });
        });
    }

    function renderDefaultProjectTasks(projectId) {
        const taskList = document.getElementById(`task-list-${projectId}`);
        taskList.innerHTML = '';

        let allTasks = [];

        for (const pid in projectTasks) {
            if (pid.startsWith('default-')) continue; // Skip default projects

            const tasks = projectTasks[pid];
            if (projectId === 'default-inbox') {
                allTasks.push(...tasks); // Collect all tasks for Inbox
            } else if (projectId === 'default-today') {
                const today = getTodayFormatted(); // Get today's date in MM-DD-YYYY format
                const todayTasks = tasks.filter(task => task.date === today);
                allTasks.push(...todayTasks); // Collect tasks due today
            } else if (projectId === 'default-this-week') {
                const weekTasks = tasks.filter(task => {
                    const taskDate = formatDate(task.date);
                    const startOfWeek = getStartOfWeek();
                    const endOfWeek = getEndOfWeek();
                    return taskDate >= startOfWeek && taskDate <= endOfWeek;
                });
                allTasks.push(...weekTasks); // Collect tasks for this week
            } else if (projectId === 'default-brag-notes') {
                const completedTasks = tasks.filter(task => task.completed);
                allTasks.push(...completedTasks); // Collect completed tasks
            }
        }

        // Apply filter
        if (currentFilter !== 'all') {
            allTasks = allTasks.filter(task => task.borderClass === currentFilter);
        }

        allTasks.forEach((task, index) => {
            const taskHTML = `
                <div class="task ${task.borderClass} default-task" data-task-id="${index}">
                    <span class="task-title default-title">${task.title}</span>
                    <span class="task-date default-date">${task.date}</span>
                    <span class="task-actions">
                        <h5 class=project-name>From:<br>${task.pName}</h5>
                    </span>
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''} disabled>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);
            // console.log(allTasks)
        });
    }

    function getTodayFormatted() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        return `${month}-${day}-${year}`;
    }

    function getStartOfWeek() {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the week (Monday)
        // console.log(formatDate(startOfWeek));
        return formatDate(startOfWeek);
    }

    function getEndOfWeek() {
        const today = new Date();
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the week (Sunday)
        // console.log(formatDate(endOfWeek));
        return formatDate(endOfWeek);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    function loadProjectsFromLocalStorage() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.forEach(project => {
            projectLookup[project.id] = project.name;
        });
    }

    function storeProjectTasks(projectId) {
        localStorage.setItem(`projectTasks_${projectId}`, JSON.stringify(projectTasks[projectId]));
    }

    function loadProjectTasks(projectId) {
        const storedTasks = JSON.parse(localStorage.getItem(`projectTasks_${projectId}`)) || [];

        // Initialize borderClass if not already set
        storedTasks.forEach(task => {
            if (!task.borderClass) {
                if (storedTasks.indexOf(task) === 0) {
                    task.borderClass = 'task-border-purple';
                } else if (storedTasks.indexOf(task) >= 1 && storedTasks.indexOf(task) <= 3) {
                    task.borderClass = 'task-border-blue';
                } else if (storedTasks.indexOf(task) >= 4) {
                    task.borderClass = 'task-border-green';
                }
            }
        });

        projectTasks[projectId] = storedTasks;

        // Ensure all tasks have pName set based on projectLookup
        addProjectName();
    }

    // function handleDescriptionButtonClick(event) {
    //     const taskId = event.target.dataset.taskId;
    //     const task = projectTasks[currentProjectId][taskId];

    //     const description = prompt('Task Description', task.description || '');
    //     if (description !== null) {
    //         task.description = description;
    //         storeProjectTasks(currentProjectId);
    //     }
    // }

    function handleDescriptionButtonClick(event) {
        const taskId = event.target.dataset.taskId;
        const taskElement = event.target.closest('.task');
        const projectId = taskElement.closest('.tasks-container').querySelector('.task-list').id.replace('task-list-', '');
        const task = projectTasks[projectId][taskId];

        const descriptionModal = document.getElementById('descriptionModal');
        const descriptionInput = document.getElementById('descriptionInput');
        const taskTitleElement = document.getElementById('taskTitle'); // Task title element
        const taskDateElement = document.getElementById('taskDate');
        descriptionInput.value = task.description || '';
        taskTitleElement.textContent = `Task: ${task.title}`; // Set task title
        taskDateElement.textContent = `Date: ${task.date}`; // Set task due date

        // Populate duration select options
        durationSelect.innerHTML = '';
        for (let i = 30; i <= 240; i += 30) { // Example: 30 minutes to 240 minutes (4 hours)
            const option = document.createElement('option');
            option.value = i;
            if (i === 60) {
                option.text = `${i / 60} hour`;
            } else if (i > 60) {
                option.text = `${i / 60} hours`;
            } else {
                option.text = `${i} minutes`;
            }
            durationSelect.appendChild(option);
        }

        // Set the current duration value
        durationSelect.value = task.duration || 30;

        const isDefaultProject = ['default-inbox', 'default-today', 'default-this-week', 'default-brag-notes'].includes(projectId);
        descriptionInput.readOnly = isDefaultProject;

        descriptionModal.style.display = 'block';

        const saveButton = document.getElementById('saveDescriptionButton');
        if (isDefaultProject) {
            saveButton.style.display = 'none'; // Hide save button for default projects
        } else {
            saveButton.style.display = 'block'; // Show save button for user-created projects
            saveButton.onclick = () => {
                task.description = descriptionInput.value;
                task.duration = durationSelect.value;
                storeProjectTasks(projectId);
                descriptionModal.style.display = 'none';
            };
        }

        const closeButton = descriptionModal.querySelector('.close-button');
        closeButton.onclick = () => {
            descriptionModal.style.display = 'none';
        };
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
            let borderClass = '';
            const newIndex = projectTasks[projectId].length;

            if (newIndex === 0) {
                borderClass = 'task-border-purple';
            } else if (newIndex >= 1 && newIndex <= 3) {
                borderClass = 'task-border-blue';
            } else if (newIndex >= 4) {
                borderClass = 'task-border-green';
            }
            let pName = projectLookup[projectId];

            const newTask = { title, date, completed: false, borderClass, pName, description: '', duration: '' };
            projectTasks[projectId].push(newTask);
            storeProjectTasks(projectId);
            renderTasks(projectId);
        }
    }

    function highlightSelectedProjectButton(projectButton) {
        const prevSelectedButton = document.querySelector('.selected-project-button');
        if (prevSelectedButton) {
            prevSelectedButton.classList.remove('selected-project-button');
        }
        projectButton.classList.add('selected-project-button');
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

    function addProjectName() {
        for (const pid in projectTasks) {
            if (pid.startsWith('default-')) continue; // Skip default projects
            if (projectLookup[pid]) {
                projectTasks[pid].forEach(task => task.pName = projectLookup[pid]);
            }
        }
    }

    console.log(`Local Storage projects: ${localStorage.getItem('projects')}`);
    loadProjectsFromLocalStorage();
    // console.log(projectLookup);
    // console.log(projectTasks);
    return {
        initialize,
        displaySelectedProject,
        handleTaskActions,
        addTask,
        highlightSelectedProjectButton,
        loadProjectTasks
    };
})();
