const projectTasks = {
    // Example structure
    // projectId1: [
    //     { title: "Task 1", date: "2024-06-15", completed: false },
    //     { title: "Task 2", date: "2024-06-16", completed: true }
    // ],
    // projectId2: [
    //     { title: "Task 3", date: "2024-06-17", completed: false }
    // ]
};

export const projectPreview = (() => {
    let projectPreviewElement;
    let currentProjectId;

    function initialize(projectsList) {
        projectPreviewElement = document.getElementById('project-preview');
        projectsList.addEventListener('click', handleUserProjectClick);

        // Render the inbox project initially
        displaySelectedProject("Inbox", 'default-inbox', true);
        // projectPreview.highlightSelectedProjectButton("Inbox");
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
                <div class="filter-dropdown" id="filter-dropdown">
                    <select id="filter-select">
                        <option value="all">All Tasks</option>
                        <!-- Add options for task types -->
                        <option value="purple">Big Task</option>
                        <option value="blue">Medium Task</option>
                        <option value="green">Small Task</option>
                    </select>
                </div>
                <div class="tasks-container">
                    <div class="task-list" id="task-list-${projectId}"></div>
                </div>
            `;
            console.log(`Default ProjectID: ${projectId}`);
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
            // renderTasks('default-inbox'); // Render tasks for default inbox
            // renderTasks(projectId); // Render tasks for default inbox
            renderDefaultProjectTasks(projectId);
            // console.log(projectTasks['default-inbox'])
            // renderDefaultProjectTasks(projectId);
        } else {
            renderTasks(projectId); // Render tasks for user-created project
        }
    }

    function updateDefaultInbox() {
        const inboxTasks = gatherTasksForInbox();
        projectTasks['default-inbox'] = inboxTasks;
        storeProjectTasks('default-inbox'); // Store default inbox tasks in local storage
        renderTasks('default-inbox'); // Render updated tasks in the default inbox
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
        console.log(projectTasks)
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
                const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                const todayTasks = tasks.filter(task => task.date === today);
                allTasks.push(...todayTasks); // Collect tasks due today
            } else if (projectId === 'default-this-week') {
                const today = new Date();
                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the week (Monday)
                const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the week (Sunday)

                const weekTasks = tasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate >= startOfWeek && taskDate <= endOfWeek;
                });
                allTasks.push(...weekTasks); // Collect tasks for this week
            } else if (projectId === 'default-brag-notes') {
                const completedTasks = tasks.filter(task => task.completed);
                allTasks.push(...completedTasks); // Collect completed tasks
            }
        }

        allTasks.forEach((task, index) => {
            let borderClass = '';

            // if (index === 0) {
            //     borderClass = 'task-border-purple';
            // } else if (index >= 1 && index <= 3) {
            //     borderClass = 'task-border-blue';
            // } else if (index >= 4) {
            //     borderClass = 'task-border-green';
            // }

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
            console.log(allTasks)
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


    // Function to gather tasks from all projects and organize them for the inbox
    function gatherTasksForInbox() {
        const inboxTasks = [];
        for (const projectId in projectTasks) {
            if (projectId !== 'default-inbox') { // Exclude default inbox itself
                const tasks = projectTasks[projectId];
                inboxTasks.push(...tasks);
            }
        }
        return inboxTasks;
    }

    function gatherTasksFromAllProjects() {
        const allTasks = [];
        for (const projectId in projectTasks) {
            allTasks.push(...projectTasks[projectId]);
        }
        return allTasks;
    }

    function gatherTasksForInbox() {
        return gatherTasksFromAllProjects();
    }

    function gatherTasksForToday() {
        const today = new Date().toISOString().split('T')[0];
        return gatherTasksFromAllProjects().filter(task => task.date === today);
    }

    function gatherTasksForThisWeek() {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
        const endOfWeek = new Date(today.setDate(today.getDate() + 6)); // Sunday

        return gatherTasksFromAllProjects().filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
    }

    function gatherTasksForBragNotes() {
        return gatherTasksFromAllProjects().filter(task => task.completed);
    }

    // function renderDefaultProjectTasks(projectId) {
    //     let tasks = [];
    //     switch (projectId) {
    //         case 'default-inbox':
    //             tasks = gatherTasksForInbox();
    //             break;
    //         case 'default-today':
    //             tasks = gatherTasksForToday();
    //             break;
    //         case 'default-this-week':
    //             tasks = gatherTasksForThisWeek();
    //             break;
    //         case 'default-brag-notes':
    //             tasks = gatherTasksForBragNotes();
    //             break;
    //     }
    //     renderTasksForProject(tasks, projectId);
    // }

    console.log(projectTasks)
    // console.log(projectTasks[0])
    // console.log(inboxTasks)

    return {
        initialize,
        displaySelectedProject,
        handleTaskActions,
        addTask,
        highlightSelectedProjectButton,
        updateDefaultInbox,
        loadProjectTasks
    };
})();
