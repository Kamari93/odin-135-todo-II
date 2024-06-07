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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ \"./src/theme.js\");\n/* harmony import */ var _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProjectPopup.js */ \"./src/addProjectPopup.js\");\n/* harmony import */ var _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hamburgerNav.js */ \"./src/hamburgerNav.js\");\n/* harmony import */ var _projectPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectPreview */ \"./src/projectPreview.js\");\n// this is the entry point for the app\nalert('Keep Going...🍊🌊');\n\n// import toggle the toggle module\n\n\n\n\n\n\n\n\n\n//on start up checked whether its on light mode or dark mode\nconst themeSelect = document.getElementById(\"theme-select\");\n\nconst addProjectBtn = document.getElementById(\"button-add-project\");\n\n// opens hamburger drop down nav\nconst openNavButton = document.getElementById('button-dropdown-nav');\n\nthemeSelect.addEventListener('change', _theme__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\naddProjectBtn.addEventListener('click', _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__.addProjectPopup);\n\nopenNavButton.addEventListener('click', _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__.openNav);\n\n\n// Initialize the projectPreview module\nconst projectsList = document.getElementById('projects-list');\n_projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.initialize(projectsList);\n\n// Event listeners for user-created projects\nprojectsList.addEventListener('click', (event) => {\n    const clickedElement = event.target;\n    if (clickedElement.classList.contains('button-project')) {\n        const projectId = clickedElement.dataset.projectId; // Fetch projectId from the dataset\n        selectUserProject(clickedElement, projectId); // Pass the clicked button element\n    }\n});\n\n// Function to handle selecting a user-created project\nfunction selectUserProject(projectButton, projectId) { // Change the argument to projectButton\n    // Call the displaySelectedProject function from the projectPreview module\n    const projectName = projectButton.querySelector('span').textContent;\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.displaySelectedProject(projectName, projectId, false);\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.highlightSelectedProjectButton(projectButton); // Pass the button element\n};\n\n\n// Event listeners for default projects\nconst defaultProjects = document.getElementById('default-projects-list');\ndefaultProjects.addEventListener('click', (event) => {\n    const clickedElement = event.target;\n    if (clickedElement.classList.contains('button-default-project')) {\n        const projectName = clickedElement.textContent.trim();\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.displaySelectedProject(projectName, '', true);\n        _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.highlightSelectedProjectButton(clickedElement);\n    }\n});\n\n// Function to handle clicks on default project buttons\nfunction handleDefaultProjectClick(event) {\n    // Retrieve the project name and ID from the clicked button\n    const projectName = event.target.textContent.trim();\n    const projectId = event.target.id; // Retrieve project ID from the button's id attribute\n\n    // Display the selected default project\n    _projectPreview__WEBPACK_IMPORTED_MODULE_3__.projectPreview.displaySelectedProject(projectName, projectId, true); // Pass true to indicate it's a default project\n    console.log('Default Project Clicked:', projectId);\n}\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/index.js?");

/***/ }),

/***/ "./src/projectPreview.js":
/*!*******************************!*\
  !*** ./src/projectPreview.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   projectPreview: () => (/* binding */ projectPreview)\n/* harmony export */ });\n/**\nThis module defines a function displaySelectedProject that takes a project \nname as an argument and updates the content of the project-preview div with \nan <h1> element containing the selected project name.\n */\n\n// Data structure to store tasks associated with each project\nconst projectTasks = {};\n\nconst projectPreview = (() => {\n    let projectPreviewElement; // Variable to store a reference to the project preview element\n    let projectTasks = {}; // Data structure to store tasks associated with each project\n\n    // Initialize function to set up the module\n    function initialize(projectsList) {\n        // Assign the project preview element by selecting the element with the id 'project-preview'\n        projectPreviewElement = document.getElementById('project-preview');\n        projectsList.addEventListener('click', handleUserProjectClick);\n    }\n\n    // Function to handle clicks on user-created projects\n    function handleUserProjectClick(event) {\n        const clickedElement = event.target;\n        if (clickedElement.classList.contains('button-project')) {\n            const projectName = clickedElement.querySelector('span').textContent;\n            const projectId = clickedElement.dataset.projectId; // Fetch projectId from the dataset\n            displaySelectedProject(projectName, projectId); // Pass projectId to displaySelectedProject\n            highlightSelectedProjectButton(clickedElement); // Call to highlight the selected project button\n        }\n        // displaySelectedProject(projectName, projectId);\n    }\n\n    // // Function to handle clicks on \"Add Task\" buttons\n    // function handleAddTaskButtonClick(event) {\n    //     const clickedButton = event.target;\n    //     if (clickedButton.classList.contains('button-add-task')) {\n    //         const projectId = clickedButton.closest('.project-tasks').dataset.projectId;\n    //         // Here, you can perform the necessary actions for adding a task\n    //         // For example, you can open a form or directly add a task to the selected project\n    //         console.log('Add task clicked for project:', projectId);\n    //     }\n    // }\n\n    // Function to store tasks associated with a project\n    // function storeProjectTasks(projectId, taskDiv) {\n    //     // Initialize an array to store task containers if not already present\n    //     if (!projectTasks[projectId]) {\n    //         projectTasks[projectId] = [];\n    //     }\n    //     // Add the task container to the array\n    //     projectTasks[projectId].push(taskDiv);\n    // }\n\n    // Function to display the selected project in the project preview\n    function displaySelectedProject(projectName, projectId, isDefaultProject) {\n\n        // Store projectId for internal use\n        // Example: You can store it in an array or object for future reference\n        // const storedProject = { name: projectName, id: projectId };\n        // You can perform any additional logic with storedProject if needed\n\n        let projectHTML = `<h1 class=\"selected-project\">${projectName}</h1>`;\n        // Check if there are tasks associated with the current project\n        const tasks = projectTasks[projectId];\n        if (tasks && tasks.length > 0) {\n            // Render each task in the appropriate task div\n            tasks.forEach(taskElement => {\n                const taskDivId = taskElement.dataset.taskDivId;\n                const taskDiv = document.getElementById(taskDivId);\n                if (taskDiv) {\n                    taskDiv.appendChild(taskElement);\n                }\n            });\n        }\n\n        // console.log('Stored Project ID:', projectId);\n\n        // Retrieve stored tasks associated with the selected project\n        // const storedTasks = projectTasks[projectId];\n        // if (storedTasks && storedTasks.length > 0) {\n        //     // Render each stored task in the appropriate task div\n        //     storedTasks.forEach(taskDiv => {\n        //         taskDiv.appendChild(taskElement);\n        //     });\n        // }\n\n        // if (!isDefaultProject) {\n        //     projectHTML += `\n        //     <div id=\"${projectId}-big-things-container\" class=\"big-things\">\n        //         <h2>1 Big Thing</h2>\n        //         <button class=\"button-add-task button-add-project big-things-btn\" id=\"${projectId}-big-things-btn\">\n        //           <i class=\"fas fa-plus\"></i>\n        //           Add Task\n        //         </button>\n        //     </div>\n        //     <div id=\"${projectId}-medium-things-container\" class=\"medium-things\">\n        //         <h2>3 Medium Things</h2>\n        //         <button class=\"button-add-task button-add-project medium-things-btn\" id=\"${projectId}-medium-things-btn\">\n        //           <i class=\"fas fa-plus\"></i>\n        //           Add Task\n        //         </button>\n        //     </div>\n        //     <div id=\"${projectId}-little-things-container\" class=\"little-things\">\n        //         <h2>5 Little Things</h2>\n        //         <button class=\"button-add-task button-add-project little-things-btn\" id=\"${projectId}-little-things-btn\">\n        //           <i class=\"fas fa-plus\"></i>\n        //           Add Task\n        //         </button>\n        //     </div>\n        // `;\n        // }\n\n        projectPreviewElement.innerHTML = projectHTML;\n    }\n\n\n    // Function to highlight the selected Project\n    function highlightSelectedProjectButton(projectButton) {\n        // Remove the highlight from previously selected project button, if any\n        const prevSelectedButton = document.querySelector('.selected-project-button');\n        if (prevSelectedButton) {\n            prevSelectedButton.classList.remove('selected-project-button');\n        }\n\n        // Highlight the selected project button\n        projectButton.classList.add('selected-project-button');\n\n        // projectPreview.displaySelectedProject(projectName);\n    }\n\n    // Function to store tasks associated with a project\n    function storeProjectTasks(projectId, tasks) {\n        projectTasks[projectId] = tasks;\n    }\n\n    // Expose public functions or variables\n    return {\n        initialize,\n        displaySelectedProject,\n        highlightSelectedProjectButton,\n        // handleUserProjectClick,\n        storeProjectTasks,\n    };\n})();\n\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/projectPreview.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateProjectId: () => (/* binding */ generateProjectId)\n/* harmony export */ });\n// utils.js// utils.js\nlet projectIdCounter = 0;\n\n// Function to generate a unique project ID for created projects\nfunction generateProjectId() {\n    projectIdCounter++;\n    return `project_${projectIdCounter}`;\n}\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/utils.js?");

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