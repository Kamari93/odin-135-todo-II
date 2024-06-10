/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addProjectPopup.js":
/*!********************************!*\
  !*** ./src/addProjectPopup.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProjectPopup: () => (/* binding */ addProjectPopup)\n/* harmony export */ });\n/* harmony import */ var _projectPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectPreview */ \"./src/projectPreview.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n // Import the generateProjectId function\n\nconst addProjectPopup = (() => {\n    const buttonAddProject = document.getElementById('button-add-project');\n    const addProjectPopup = document.getElementById('add-project-popup');\n    const inputAddProjectPopup = document.getElementById('input-add-project-popup');\n    const projectsList = document.getElementById('projects-list');\n\n    // Load projects from local storage on page load\n    document.addEventListener('DOMContentLoaded', loadProjectsFromLocalStorage);\n\n    buttonAddProject.addEventListener('click', () => {\n        addProjectPopup.style.display = 'block';\n    });\n\n    const buttonCancelProjectPopup = document.getElementById('button-cancel-project-popup');\n    buttonCancelProjectPopup.addEventListener('click', () => {\n        addProjectPopup.style.display = 'none';\n    });\n\n    const buttonAddProjectPopup = document.getElementById('button-add-project-popup');\n    buttonAddProjectPopup.addEventListener('click', () => {\n        const newProjectName = inputAddProjectPopup.value;\n        if (newProjectName) {\n            const newProjectId = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.generateProjectId)(); // Generate project ID\n            const newProject = { name: newProjectName, id: newProjectId }; // Create a new project object\n            addNewProject(newProject); // Add the new project\n            addProjectPopup.style.display = 'none'; // Optionally, close the popup\n            inputAddProjectPopup.value = ''; // Optionally, clear the input field\n        }\n    });\n\n    function addNewProject(project) {\n        // Save the project to local storage\n        saveProjectToLocalStorage(project);\n\n        // Create a new project element\n        const projectElement = document.createElement('button');\n        projectElement.classList.add('button-project');\n        projectElement.dataset.projectId = project.id;\n\n        const leftPanel = document.createElement('div');\n        leftPanel.classList.add('left-project-panel');\n        leftPanel.innerHTML = `\n            <i class=\"fas fa-tasks\"></i>\n            <span>${project.name}</span>\n        `;\n\n        const rightPanel = document.createElement('div');\n        rightPanel.classList.add('right-project-panel');\n        rightPanel.innerHTML = `\n            <i class='fas fa-edit' data-action=\"edit\"></i>\n            <i class='fas fa-trash-alt' data-action=\"delete\"></i>\n        `;\n\n        projectElement.appendChild(leftPanel);\n        projectElement.appendChild(rightPanel);\n        projectsList.appendChild(projectElement);\n\n        // Attach event listeners for edit and delete buttons\n        attachEditDeleteEventListeners(projectElement, project);\n    };\n\n    function attachEditDeleteEventListeners(projectElement, project) {\n        const editButton = projectElement.querySelector('.fa-edit');\n        const deleteButton = projectElement.querySelector('.fa-trash-alt');\n\n        editButton.addEventListener('click', () => {\n            editProject(projectElement, project);\n        });\n\n        deleteButton.addEventListener('click', () => {\n            deleteProject(projectElement, project.id);\n        });\n\n        projectElement.addEventListener('click', () => {\n            selectAndDisplayProject(project);\n        });\n    };\n\n    function selectAndDisplayProject(project) {\n        _projectPreview__WEBPACK_IMPORTED_MODULE_0__.projectPreview.displaySelectedProject(project.name);\n    }\n\n    function editProject(projectElement, project) {\n        let newProjectName = prompt('Enter the new project name:', project.name);\n        while (newProjectName !== null && newProjectName.trim() === \"\") {\n            newProjectName = prompt('Please enter a non-empty project name:', project.name);\n        };\n\n        if (newProjectName !== null) {\n            projectElement.querySelector('span').textContent = newProjectName;\n            project.name = newProjectName; // Update the project name\n            saveProjectToLocalStorage(project); // Save the updated project\n        };\n    };\n\n    function deleteProject(projectElement, projectId) {\n        const confirmDelete = confirm('Are you sure you want to delete this project?');\n        if (confirmDelete) {\n            projectElement.remove();\n            removeProjectFromLocalStorage(projectId); // Remove the project from local storage\n        }\n    }\n\n    // When a project is added or edited, it updates the local storage\n    function saveProjectToLocalStorage(project) {\n        let projects = JSON.parse(localStorage.getItem('projects')) || [];\n        const projectIndex = projects.findIndex(p => p.id === project.id);\n        if (projectIndex > -1) {\n            projects[projectIndex] = project; // Update existing project\n        } else {\n            projects.push(project); // Add new project\n        }\n        localStorage.setItem('projects', JSON.stringify(projects));\n    }\n\n    // When a project is deleted, it removes it from local storage\n    function removeProjectFromLocalStorage(projectId) {\n        let projects = JSON.parse(localStorage.getItem('projects')) || [];\n        projects = projects.filter(project => project.id !== projectId);\n        localStorage.setItem('projects', JSON.stringify(projects));\n    }\n\n    // When the page loads, it retrieves the saved projects from local storage and adds them to the UI.\n    function loadProjectsFromLocalStorage() {\n        const projects = JSON.parse(localStorage.getItem('projects')) || [];\n        projects.forEach(project => addNewProject(project));\n    }\n\n    return {\n        // Expose any necessary functions or variables\n    };\n})();\n\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/addProjectPopup.js?");

/***/ }),

/***/ "./src/hamburgerNav.js":
/*!*****************************!*\
  !*** ./src/hamburgerNav.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   openNav: () => (/* binding */ openNav)\n/* harmony export */ });\n// opens hamburger drop down nav\nconst openNavButton = document.getElementById('button-dropdown-nav');\n\n// Static method that opens nav menu\nfunction openNav() {\n    const nav = document.getElementById('nav')\n\n    // UI.closeAllPopups()\n    nav.classList.toggle('active')\n}\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/hamburgerNav.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ \"./src/theme.js\");\n/* harmony import */ var _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProjectPopup.js */ \"./src/addProjectPopup.js\");\n/* harmony import */ var _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hamburgerNav.js */ \"./src/hamburgerNav.js\");\n/* harmony import */ var _projectPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectPreview */ \"./src/projectPreview.js\");\n\n\n\n\n\nconst themeSelect = document.getElementById(\"theme-select\");\nconst addProjectBtn = document.getElementById(\"button-add-project\");\nconst openNavButton = document.getElementById('button-dropdown-nav');\n\nthemeSelect.addEventListener('change', _theme__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\naddProjectBtn.addEventListener('click', _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__.addProjectPopup);\nopenNavButton.addEventListener('click', _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__.openNav);\n\nconst projectsList = document.getElementById('projects-list');\n_projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.initialize(projectsList);\n\nprojectsList.addEventListener('click', (event) => {\n    const clickedElement = event.target;\n    if (clickedElement.classList.contains('button-project')) {\n        const projectId = clickedElement.dataset.projectId;\n        selectUserProject(clickedElement, projectId);\n    }\n});\n\nfunction selectUserProject(projectButton, projectId) {\n    const projectName = projectButton.querySelector('span').textContent;\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.displaySelectedProject(projectName, projectId);\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.highlightSelectedProjectButton(projectButton);\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.loadProjectTasks(projectId);\n}\n\nconst defaultProjects = document.getElementById('default-projects-list');\ndefaultProjects.addEventListener('click', (event) => {\n    const clickedElement = event.target;\n    if (clickedElement.classList.contains('button-default-project')) {\n        const projectName = clickedElement.textContent.trim();\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.displaySelectedProject(projectName, '', true);\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.highlightSelectedProjectButton(clickedElement);\n    }\n});\n\ndocument.addEventListener('click', (event) => {\n    if (event.target.classList.contains('button-add-task')) {\n        const projectId = event.target.dataset.projectId;\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.addTask(projectId);\n    } else if (event.target.closest('.task')) {\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.handleTaskActions(event);\n    }\n});\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/index.js?");

/***/ }),

/***/ "./src/projectPreview.js":
/*!*******************************!*\
  !*** ./src/projectPreview.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   projectPreview: () => (/* binding */ projectPreview)\n/* harmony export */ });\nconst projectTasks = {};\n\nconst projectPreview = (() => {\n    let projectPreviewElement;\n    let currentProjectId;\n\n    function initialize(projectsList) {\n        projectPreviewElement = document.getElementById('project-preview');\n        projectsList.addEventListener('click', handleUserProjectClick);\n    }\n\n    function handleUserProjectClick(event) {\n        const clickedElement = event.target.closest('.button-project');\n        if (clickedElement) {\n            const projectName = clickedElement.querySelector('span').textContent;\n            const projectId = clickedElement.dataset.projectId;\n            currentProjectId = projectId;\n            displaySelectedProject(projectName, projectId);\n            highlightSelectedProjectButton(clickedElement);\n        }\n    }\n\n    function displaySelectedProject(projectName, projectId) {\n        let projectHTML = `<h1 class=\"selected-project\">${projectName}</h1>`;\n\n        if (projectId) { // Only add task management buttons if it's a user-created project\n            projectHTML += `\n                <div class=\"tasks-container\">\n                    <button class=\"button-add-task\" data-project-id=\"${projectId}\"><i class=\"fas fa-plus\"></i> Add Task</button>\n                    <div class=\"task-list-container\">\n                        <div class=\"task-list\" id=\"task-list-${projectId}\"></div>\n                        <div class=\"color-code-key\">\n                            <div class=\"color-code-item\">\n                                <div class=\"color-code-box purple\">1</div>\n                                <span>Big Task</span>\n                            </div>\n                            <div class=\"color-code-item\">\n                                <div class=\"color-code-box blue\">3</div>\n                                <span>Medium Task</span>\n                            </div>\n                            <div class=\"color-code-item\">\n                                <div class=\"color-code-box green\">5</div>\n                                <span>Small Task</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            `;\n        }\n\n        projectPreviewElement.innerHTML = projectHTML;\n\n        if (projectId) {\n            renderTasks(projectId);\n        }\n    }\n\n    function moveTask(projectId, index, direction) {\n        const tasks = projectTasks[projectId];\n        if (direction === 'up' && index > 0) {\n            [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];\n        } else if (direction === 'down' && index < tasks.length - 1) {\n            [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];\n        }\n        storeProjectTasks(projectId);\n        renderTasks(projectId);\n    }\n\n    function renderTasks(projectId) {\n        const taskList = document.getElementById(`task-list-${projectId}`);\n        taskList.innerHTML = '';\n\n        const tasks = projectTasks[projectId] || [];\n        tasks.forEach((task, index) => {\n            let borderClass = '';\n\n            if (index === 0) {\n                borderClass = 'task-border-purple';\n            } else if (index >= 1 && index <= 3) {\n                borderClass = 'task-border-blue';\n            } else if (index >= 4) {\n                borderClass = 'task-border-green';\n            }\n\n            const taskHTML = `\n                <div class=\"task ${borderClass}\" data-task-id=\"${index}\">\n                    <span class=\"task-move\">\n                        <i class=\"fas fa-arrow-up\" data-action=\"move-up\"></i>\n                        <i class=\"fas fa-arrow-down\" data-action=\"move-down\"></i>\n                    </span>\n                    <span class=\"task-title\">${task.title}</span>\n                    <span class=\"task-date\">${task.date}</span>\n                    <span class=\"task-actions\">\n                        <i class=\"fas fa-edit\" data-action=\"edit\"></i>\n                        <i class=\"fas fa-trash-alt\" data-action=\"delete\"></i>\n                    </span>\n                    <input type=\"checkbox\" class=\"task-complete\" ${task.completed ? 'checked' : ''}>\n                </div>\n            `;\n            taskList.insertAdjacentHTML('beforeend', taskHTML);\n        });\n    }\n\n    document.addEventListener('click', (event) => {\n        const target = event.target;\n        if (target.matches('.fa-arrow-up') || target.matches('.fa-arrow-down')) {\n            const taskElement = target.closest('.task');\n            const taskId = taskElement.getAttribute('data-task-id');\n            const taskIndex = parseInt(taskId);\n            const direction = target.matches('.fa-arrow-up') ? 'up' : 'down';\n            moveTask(currentProjectId, taskIndex, direction);\n        }\n    });\n\n    function handleTaskActions(event) {\n        const taskElement = event.target.closest('.task');\n        const projectId = currentProjectId;\n        const taskId = taskElement.dataset.taskId;\n\n        if (event.target.classList.contains('fa-edit')) {\n            editTask(projectId, taskId);\n        } else if (event.target.classList.contains('fa-trash-alt')) {\n            deleteTask(projectId, taskId);\n        } else if (event.target.classList.contains('task-complete')) {\n            toggleTaskCompletion(projectId, taskId);\n        }\n    }\n\n    function editTask(projectId, taskId) {\n        const task = projectTasks[projectId][taskId];\n        const newTitle = prompt('Edit Task', task.title);\n        const newDate = prompt('Edit Date (YYYY-MM-DD)', task.date);\n\n        if (newTitle) {\n            task.title = newTitle;\n        }\n        if (newDate) {\n            task.date = newDate;\n        }\n        storeProjectTasks(projectId);\n        renderTasks(projectId);\n    }\n\n    function deleteTask(projectId, taskId) {\n        projectTasks[projectId].splice(taskId, 1);\n        storeProjectTasks(projectId);\n        renderTasks(projectId);\n    }\n\n    function toggleTaskCompletion(projectId, taskId) {\n        const task = projectTasks[projectId][taskId];\n        task.completed = !task.completed;\n        storeProjectTasks(projectId);\n        renderTasks(projectId);\n    }\n\n    function storeProjectTasks(projectId) {\n        localStorage.setItem(`projectTasks_${projectId}`, JSON.stringify(projectTasks[projectId]));\n    }\n\n    function loadProjectTasks(projectId) {\n        const storedTasks = JSON.parse(localStorage.getItem(`projectTasks_${projectId}`));\n        if (storedTasks) {\n            projectTasks[projectId] = storedTasks;\n        }\n    }\n\n    function addTask(projectId) {\n        if (!projectTasks[projectId]) {\n            projectTasks[projectId] = [];\n        }\n\n        if (projectTasks[projectId].length >= 9) {\n            alert('Task limit reached (9 tasks per project).');\n            return;\n        }\n\n        const title = prompt('New Task');\n        const date = prompt('Task Date (MM-DD-YYYY)');\n        if (title && date) {\n            const newTask = { title, date, completed: false };\n            projectTasks[projectId].push(newTask);\n            storeProjectTasks(projectId);\n            renderTasks(projectId);\n        }\n    }\n\n    // Function to highlight the selected Project\n    function highlightSelectedProjectButton(projectButton) {\n        // Remove the highlight from previously selected project button, if any\n        const prevSelectedButton = document.querySelector('.selected-project-button');\n        if (prevSelectedButton) {\n            prevSelectedButton.classList.remove('selected-project-button');\n        }\n\n        // Highlight the selected project button\n        projectButton.classList.add('selected-project-button');\n    }\n\n    return {\n        initialize,\n        displaySelectedProject,\n        handleTaskActions,\n        addTask,\n        highlightSelectedProjectButton,\n        loadProjectTasks\n    };\n})();\n\n\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/projectPreview.js?");

/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toggleTheme)\n/* harmony export */ });\n// theme.js\nfunction toggleTheme() {\n    const themeSelect = document.getElementById(\"theme-select\");\n    const selectedTheme = themeSelect.value;\n\n    // change body styling based on the selected theme\n    document.body.className = selectedTheme;\n\n    // remove the previous icon before adding the new selected theme icon\n    const existingIcon = document.querySelector('.theme i');\n    if (existingIcon) {\n        existingIcon.remove();\n    }\n\n    // Create a new icon based on the selected theme\n    const icon = document.createElement('i');\n\n    // Add icons based on the selected theme\n    if (selectedTheme === 'dark') {\n        icon.className = 'fa fa-moon-o';\n    } else {\n        icon.className = 'fa fa-sun-o';\n    }\n\n    // Append the new icon to the label\n    document.querySelector('.theme label').appendChild(icon);\n\n    console.log(selectedTheme);\n}\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/theme.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateProjectId: () => (/* binding */ generateProjectId)\n/* harmony export */ });\n// // utils.js// utils.js\n// let projectIdCounter = 0;\n\n// // Function to generate a unique project ID for created projects\n// export function generateProjectId() {\n//     projectIdCounter++;\n//     return `project_${projectIdCounter}`;\n// }\n\n\n// utils.js\n// Initialize the projectIdCounter from local storage or start from 0\nlet projectIdCounter = JSON.parse(localStorage.getItem('projectIdCounter')) || 0;\n\n// Function to generate a unique project ID for created projects\nfunction generateProjectId() {\n    projectIdCounter++;\n    localStorage.setItem('projectIdCounter', JSON.stringify(projectIdCounter));\n    return `project_${projectIdCounter}`;\n}\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;