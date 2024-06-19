const projectTasks = {
    // Example structure
    // projectId1: [
    //     { title: "Task 1", date: "06-15-2024", completed: false, borderClass: "task-border-purple", pName: "Project 1" },
    //     { title: "Task 2", date: "06-16-2024", completed: true, borderClass: "task-border-blue", pName: "Project 1" }
    // ],
    // projectId2: [
    //     { title: "Task 3", date: "06-17-2024", completed: false, borderClass: "task-border-green", pName: "Project 2" }
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
                        <option value="task-border-purple">Big Task</option>
                        <option value="task-border-blue">Medium Task</option>
                        <option value="task-border-green">Small Task</option>
                    </select>
                </div>
                <div class="tasks-container">
                    <div class="task-list" id="task-list-${projectId}"></div>
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

    // function moveTask(projectId, index, direction) {
    //     const tasks = projectTasks[projectId];
    //     if (direction === 'up' && index > 0) {
    //         [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
    //     } else if (direction === 'down' && index < tasks.length - 1) {
    //         [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    //     }
    //     storeProjectTasks(projectId);
    //     renderTasks(projectId);
    // }

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
                        <i class="fas fa-edit" data-action="edit"></i>
                        <i class="fas fa-trash-alt" data-action="delete"></i>
                    </span>
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);
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
                <div class="task ${task.borderClass}" data-task-id="${index}">
                    <span class="task-title">${task.title}</span>
                    <span class="task-date">${task.date}</span>
                    <span class="task-actions">
                        <i class="fas fa-edit" data-action="edit"></i>
                        <i class="fas fa-trash-alt" data-action="delete"></i>
                        <h5 class=fas>From: ${task.pName}</h5>
                    </span>
                    <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                </div>
            `;
            taskList.insertAdjacentHTML('beforeend', taskHTML);
            console.log(allTasks)
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

            const newTask = { title, date, completed: false, borderClass, pName };
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
        // else if (target.matches('.button-add-task')) {
        //     const projectId = target.dataset.projectId;
        //     addTask(projectId);
        // } else if (target.matches('.task-actions i')) {
        //     handleTaskActions(event);
        // }
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



// const projectTasks = {
//     // Example structure
//     // projectId1: [
//     //     { title: "Task 1", date: "06-15-2024", completed: false, borderClass: "task-border-purple" },
//     //     { title: "Task 2", date: "06-16-2024", completed: true, borderClass: "task-border-blue" }
//     // ],
//     // projectId2: [
//     //     { title: "Task 3", date: "06-17-2024", completed: false, borderClass: "task-border-green" }
//     // ]
// };

// export const projectPreview = (() => {
//     let projectPreviewElement;
//     let currentProjectId;
//     let currentFilter = 'all'; // Default filter

//     function initialize(projectsList) {
//         projectPreviewElement = document.getElementById('project-preview');
//         projectsList.addEventListener('click', handleUserProjectClick);

//         // Render the inbox project initially
//         // displaySelectedProject("All Tasks Inbox", 'default-inbox', true);
//         // renderDefaultProjectTasks('default-inbox')

//         // Render the inbox project initially
//         loadDefaultProjects();
//         displaySelectedProject("All Tasks Inbox", 'default-inbox', true);
//     }

//     function loadDefaultProjects() {
//         const defaultProjects = ['default-inbox', 'default-today', 'default-this-week', 'default-brag-notes'];
//         defaultProjects.forEach(projectId => {
//             loadProjectTasks(projectId);
//         });
//     }

//     function handleUserProjectClick(event) {
//         const clickedElement = event.target.closest('.button-project');
//         if (clickedElement) {
//             const projectName = clickedElement.querySelector('span').textContent;
//             const projectId = clickedElement.dataset.projectId;
//             currentProjectId = projectId;
//             displaySelectedProject(projectName, projectId);
//             highlightSelectedProjectButton(clickedElement);
//         }
//     }

//     function displaySelectedProject(projectName, projectId, isDefault = false) {
//         // console.log(`Displaying project: ${projectName} with ID: ${projectId}, isDefault: ${isDefault}`);

//         let projectHTML = `<h1 class="selected-project">${projectName}</h1>`;

//         if (isDefault) {
//             projectHTML += `
//                 <div class="filter-dropdown" class = 'filter-dropdown' id="filter-dropdown-${projectId}">
//                     <select class="filter-select" id="filter-select-${projectId}">
//                         <option value="all">All Tasks</option>
//                         <!-- Add options for task types -->
//                         <option value="task-border-purple">Big Task</option>
//                         <option value="task-border-blue">Medium Task</option>
//                         <option value="task-border-green">Small Task</option>
//                     </select>
//                 </div>
//                 <div class="tasks-container">
//                     <div class="task-list" id="task-list-${projectId}"></div>
//                 </div>
//             `;
//             // console.log(`Default ProjectID: ${projectId}`);
//         } else {
//             projectHTML += `
//                 <div class="tasks-container">
//                     <button class="button-add-task" data-project-id="${projectId}"><i class="fas fa-plus"></i> Add Task</button>
//                     <div class="task-list-container">
//                         <div class="task-list" id="task-list-${projectId}"></div>
//                         <div class="color-code-key">
//                             <div class="color-code-item">
//                                 <div class="color-code-box purple">1</div>
//                                 <span>Big Task</span>
//                             </div>
//                             <div class="color-code-item">
//                                 <div class="color-code-box blue">3</div>
//                                 <span>Medium Task</span>
//                             </div>
//                             <div class="color-code-item">
//                                 <div class="color-code-box green">5</div>
//                                 <span>Small Task</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }

//         projectPreviewElement.innerHTML = projectHTML;

//         if (isDefault) {
//             const filterSelectElement = document.getElementById(`filter-select-${projectId}`);
//             if (filterSelectElement) {
//                 filterSelectElement.addEventListener('change', (event) => handleFilterChange(event, projectId));
//             } else {
//                 console.error('Filter select element not found in the DOM.');
//             }
//             renderDefaultProjectTasks(projectId); // Render tasks for default projects
//         } else {
//             renderTasks(projectId); // Render tasks for user-created project
//         }
//     }

//     function handleFilterChange(event, projectId) {
//         currentFilter = event.target.value;
//         renderDefaultProjectTasks(projectId); // Re-render tasks with the selected filter
//     }

//     function moveTask(projectId, index, direction) {
//         const tasks = projectTasks[projectId];
//         if (direction === 'up' && index > 0) {
//             [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
//         } else if (direction === 'down' && index < tasks.length - 1) {
//             [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
//         }
//         storeProjectTasks(projectId);
//         renderTasks(projectId);
//     }

//     function renderTasks(projectId) {
//         const taskList = document.getElementById(`task-list-${projectId}`);
//         taskList.innerHTML = '';

//         const tasks = projectTasks[projectId] || [];
//         tasks.forEach((task, index) => {
//             let borderClass = '';

//             if (index === 0) {
//                 // borderClass = 'task-border-purple';
//                 task.borderClass = 'task-border-purple';
//             } else if (index >= 1 && index <= 3) {
//                 // borderClass = 'task-border-blue';
//                 task.borderClass = 'task-border-blue';
//             } else if (index >= 4) {
//                 // borderClass = 'task-border-green';
//                 task.borderClass = 'task-border-green';
//             }

//             const taskHTML = `
//                 <div class="task ${task.borderClass}" data-task-id="${index}">
//                     <span class="task-move">
//                         <i class="fas fa-arrow-up" data-action="move-up"></i>
//                         <i class="fas fa-arrow-down" data-action="move-down"></i>
//                     </span>
//                     <span class="task-title">${task.title}</span>
//                     <span class="task-date">${task.date}</span>
//                     <span class="task-actions">
//                         <i class="fas fa-edit" data-action="edit"></i>
//                         <i class="fas fa-trash-alt" data-action="delete"></i>
//                     </span>
//                     <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
//                 </div>
//             `;
//             taskList.insertAdjacentHTML('beforeend', taskHTML);
//         });
//         // console.log(projectTasks)
//     }

//     function formatDate(dateString) {
//         const date = new Date(dateString);
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         const year = date.getFullYear();
//         return `${month}-${day}-${year}`;
//     }

//     function getTodayFormatted() {
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, '0');
//         const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//         const year = today.getFullYear();
//         return `${month}-${day}-${year}`;
//     }

//     // function formatDate(date) {
//     //     const [year, month, day] = date.split('-');
//     //     return `${month}-${day}-${year}`;
//     // }

//     // function getTodayFormatted() {
//     //     const today = new Date();
//     //     const day = String(today.getDate()).padStart(2, '0');
//     //     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     //     const year = today.getFullYear();
//     //     return `${month}-${day}-${year}`;
//     // }


//     function renderDefaultProjectTasks(projectId) {
//         const taskList = document.getElementById(`task-list-${projectId}`);
//         taskList.innerHTML = '';

//         let allTasks = [];
//         console.log(projectTasks)

//         for (const pid in projectTasks) {
//             if (pid.startsWith('default-')) continue; // Skip default projects

//             const tasks = projectTasks[pid];
//             if (projectId === 'default-inbox') {
//                 allTasks.push(...tasks); // Collect all tasks for Inbox
//             } else if (projectId === 'default-today') {
//                 const today = getTodayFormatted(); // Get today's date in MM-DD-YYYY format
//                 const todayTasks = tasks.filter(task => task.date === today);
//                 allTasks.push(...todayTasks); // Collect tasks due today
//                 // console.log(allTasks)
//             } else if (projectId === 'default-this-week') {
//                 const today = new Date();
//                 const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the week (Monday)
//                 const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the week (Sunday)

//                 // console.log(`startOfWeek: ${startOfWeek}`);
//                 // console.log(`endOfWeek: ${endOfWeek}`);

//                 const formattedStartOfWeek = formatDate(startOfWeek.toISOString().split('T')[0]);
//                 const formattedEndOfWeek = formatDate(endOfWeek.toISOString().split('T')[0]);

//                 // console.log(`formattedStartOfWeek: ${formattedStartOfWeek}`);
//                 // console.log(`formattedEndOfWeek: ${formattedEndOfWeek}`);

//                 const weekTasks = tasks.filter(task => {
//                     const formattedTaskDate = formatDate(task.date);
//                     // console.log(`formattedTaskDate: ${formattedTaskDate}`);
//                     return formattedTaskDate >= formattedStartOfWeek && formattedTaskDate <= formattedEndOfWeek;
//                 });
//                 allTasks.push(...weekTasks); // Collect tasks for this week
//                 // console.log(allTasks)
//             } else if (projectId === 'default-brag-notes') {
//                 const completedTasks = tasks.filter(task => task.completed);
//                 allTasks.push(...completedTasks); // Collect completed tasks
//             }
//             // console.log(allTasks)
//             // console.log(projectTasks)
//         }

//         // Apply filter
//         if (currentFilter !== 'all') {
//             allTasks = allTasks.filter(task => task.borderClass === currentFilter);
//         }

//         allTasks.forEach((task, index) => {
//             console.log('Task:', task); // Debug: Log each task being rendered
//             const taskHTML = `
//                 <div class="task ${task.borderClass}" data-task-id="${index}">
//                     <span class="task-title">${task.title}</span>
//                     <span class="task-date">${task.date}</span>
//                     <span class="task-actions">
//                         <i class="fas fa-edit" data-action="edit"></i>
//                         <i class="fas fa-trash-alt" data-action="delete"></i>
//                     </span>
//                     <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
//                 </div>
//             `;
//             taskList.insertAdjacentHTML('beforeend', taskHTML);
//         });
//         // console.log(allTasks)
//     }

//     document.addEventListener('click', (event) => {
//         const target = event.target;
//         if (target.matches('.fa-arrow-up') || target.matches('.fa-arrow-down')) {
//             const taskElement = target.closest('.task');
//             const taskId = taskElement.getAttribute('data-task-id');
//             const taskIndex = parseInt(taskId);
//             const direction = target.matches('.fa-arrow-up') ? 'up' : 'down';
//             moveTask(currentProjectId, taskIndex, direction);
//         }
//     });

//     function handleTaskActions(event) {
//         const taskElement = event.target.closest('.task');
//         const projectId = currentProjectId;
//         const taskId = taskElement.dataset.taskId;

//         if (event.target.classList.contains('fa-edit')) {
//             editTask(projectId, taskId);
//         } else if (event.target.classList.contains('fa-trash-alt')) {
//             deleteTask(projectId, taskId);
//         } else if (event.target.classList.contains('task-complete')) {
//             toggleTaskCompletion(projectId, taskId);
//         }
//     }

//     function editTask(projectId, taskId) {
//         const task = projectTasks[projectId][taskId];
//         const newTitle = prompt('Edit Task', task.title);
//         const newDate = prompt('Edit Date (YYYY-MM-DD)', task.date);

//         if (newTitle) {
//             task.title = newTitle;
//         }
//         if (newDate) {
//             task.date = newDate;
//         }
//         storeProjectTasks(projectId);
//         renderTasks(projectId);
//     }

//     function deleteTask(projectId, taskId) {
//         projectTasks[projectId].splice(taskId, 1);
//         storeProjectTasks(projectId);
//         renderTasks(projectId);
//     }

//     function toggleTaskCompletion(projectId, taskId) {
//         const task = projectTasks[projectId][taskId];
//         task.completed = !task.completed;
//         storeProjectTasks(projectId);
//         renderTasks(projectId);
//     }

//     function storeProjectTasks(projectId) {
//         localStorage.setItem(`projectTasks_${projectId}`, JSON.stringify(projectTasks[projectId]));

//         // Add logic to handle storing default projects' tasks
//         if (projectId.startsWith('default-')) {
//             localStorage.setItem(`projectTasks_${projectId}`, JSON.stringify(projectTasks[projectId]));
//         }
//     }

//     function loadProjectTasks(projectId) {
//         const storedTasks = JSON.parse(localStorage.getItem(`projectTasks_${projectId}`));
//         if (storedTasks) {
//             projectTasks[projectId] = storedTasks;
//         }
//     }

//     function addTask(projectId) {
//         if (!projectTasks[projectId]) {
//             projectTasks[projectId] = [];
//         }

//         if (projectTasks[projectId].length >= 9) {
//             alert('Task limit reached (9 tasks per project).');
//             return;
//         }

//         const title = prompt('New Task');
//         const date = prompt('Task Date (MM-DD-YYYY)');
//         if (title && date) {
//             const newTask = { title, date, completed: false, borderClass: null };
//             projectTasks[projectId].push(newTask);
//             storeProjectTasks(projectId);
//             renderTasks(projectId);
//         }
//     }

//     // Function to highlight the selected Project
//     function highlightSelectedProjectButton(projectButton) {
//         // Remove the highlight from previously selected project button, if any
//         const prevSelectedButton = document.querySelector('.selected-project-button');
//         if (prevSelectedButton) {
//             prevSelectedButton.classList.remove('selected-project-button');
//         }

//         // Highlight the selected project button
//         projectButton.classList.add('selected-project-button');
//         // console.log(projectButton)
//     }

//     // console.log(projectTasks)
//     // console.log(projectTasks[0])
//     // console.log(inboxTasks)

//     return {
//         initialize,
//         displaySelectedProject,
//         handleTaskActions,
//         addTask,
//         highlightSelectedProjectButton,
//         loadProjectTasks
//     };
// })();





