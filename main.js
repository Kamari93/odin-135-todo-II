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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProjectPopup: () => (/* binding */ addProjectPopup)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n// import { projectPreview } from './projectPreview';\n // Import the generateProjectId function\n\nconst addProjectPopup = (() => {\n    const buttonAddProject = document.getElementById('button-add-project');\n    const addProjectPopup = document.getElementById('add-project-popup');\n    // use these to add a new project to displayed project list\n    const inputAddProjectPopup = document.getElementById('input-add-project-popup');\n    const projectsList = document.getElementById('projects-list');\n\n    buttonAddProject.addEventListener('click', () => {\n        addProjectPopup.style.display = 'block';\n    });\n\n    const buttonCancelProjectPopup = document.getElementById('button-cancel-project-popup');\n    buttonCancelProjectPopup.addEventListener('click', () => {\n        addProjectPopup.style.display = 'none';\n    });\n\n    const buttonAddProjectPopup = document.getElementById('button-add-project-popup');\n\n    buttonAddProjectPopup.addEventListener('click', () => {\n        const newProjectName = inputAddProjectPopup.value;\n        if (newProjectName) {\n\n            const newProjectId = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateProjectId)(); // Generate project ID\n            // Create a new project object\n            const newProject = { name: newProjectName, id: newProjectId }; // Pass project ID\n            // Call a function or method to add the new project to the list\n            addNewProject(newProject, newProjectId); // Pass projectId to addNewProject\n            // console.log(newProjectId)\n            // Optionally, close the popup\n            addProjectPopup.style.display = 'none';\n\n            // Optionally, clear the input field\n            inputAddProjectPopup.value = '';\n        }\n    });\n\n\n    function addNewProject(project, projectId) {\n        // Call a function or method to add the new project to the list\n\n        // projectPreview.displaySelectedProject(project.name, project.id); // Pass project ID\n        // projectPreview.displaySelectedProject(project.name, projectId); // Pass projectId\n        // Create a new project element\n        const projectElement = document.createElement('button');\n        projectElement.classList.add('button-project');\n\n        // Set the data-project-id attribute to the project element\n        projectElement.dataset.projectId = projectId;\n\n        const leftPanel = document.createElement('div');\n        leftPanel.classList.add('left-project-panel');\n        leftPanel.innerHTML = `\n            <i class=\"fas fa-tasks\"></i>\n            <span>${project.name}</span>\n        `;\n\n        const rightPanel = document.createElement('div');\n        rightPanel.classList.add('right-project-panel');\n        rightPanel.innerHTML = `\n            <i class='fas fa-edit' data-action=\"edit\"></i>\n            <i class='fas fa-trash-alt' data-action=\"delete\"></i>\n        `;\n\n        projectElement.appendChild(leftPanel);\n        projectElement.appendChild(rightPanel);\n\n        // Append the project element to the projectsList\n        projectsList.appendChild(projectElement);\n\n        // Attach event listeners for edit and delete buttons\n        attachEditDeleteEventListeners(projectElement, project.name);\n    };\n\n    function attachEditDeleteEventListeners(projectElement, projectName) {\n        const editButton = projectElement.querySelector('.fa-edit');\n        const deleteButton = projectElement.querySelector('.fa-trash-alt');\n\n        editButton.addEventListener('click', () => {\n            // Call a function to handle editing the project\n            editProject(projectElement, projectName);\n        });\n\n        deleteButton.addEventListener('click', () => {\n            // Call a function to handle deleting the project\n            deleteProject(projectElement);\n        });\n\n        // Add click event listener for the project button\n        projectElement.addEventListener('click', () => {\n            // Call a function to handle selecting and displaying the project\n            selectAndDisplayProject(projectName);\n        });\n    };\n\n    function selectAndDisplayProject(projectName) {\n        // Call a function to display the selected project in the project preview\n        projectPreview.displaySelectedProject(projectName);\n    }\n\n    function editProject(projectElement, projectName) {\n        // Ask the user for a new project name\n        let newProjectName = prompt('Enter the new project name:', projectName);\n\n        // Validate the user input\n        // The trim method is used to remove leading and trailing whitespaces from the input.\n        while (newProjectName !== null && newProjectName.trim() === \"\") {\n            // If the user entered an empty string, prompt again until a valid input is provided\n            newProjectName = prompt('Please enter a non-empty project name:', projectName);\n        };\n\n        // Update the project name in the UI\n        if (newProjectName !== null) {\n            projectElement.querySelector('span').textContent = newProjectName;\n        };\n    };\n\n    function deleteProject(projectElement) {\n        // Ask for confirmation before deleting the project\n        const confirmDelete = confirm('Are you sure you want to delete this project?');\n\n        // If the user confirms, remove the project from the UI\n        if (confirmDelete) {\n            projectElement.remove();\n        }\n    }\n\n    // Other functionality to handle adding a new project (on \"Add\" button click), etc.\n\n    return {\n        // Expose any necessary functions or variables\n        // addNewProject,\n        // projectId // Add this line to expose the projectId\n    };\n})();\n\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/addProjectPopup.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ \"./src/theme.js\");\n/* harmony import */ var _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addProjectPopup.js */ \"./src/addProjectPopup.js\");\n/* harmony import */ var _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hamburgerNav.js */ \"./src/hamburgerNav.js\");\n// this is the entry point for the app\nalert('Keep Going...🍊🌊');\n\n// import toggle the toggle module\n\n\n\n\n\n\n\n//on start up checked whether its on light mode or dark mode\nconst themeSelect = document.getElementById(\"theme-select\");\n\nconst addProjectBtn = document.getElementById(\"button-add-project\");\n\n// opens hamburger drop down nav\nconst openNavButton = document.getElementById('button-dropdown-nav');\n\nthemeSelect.addEventListener('change', _theme__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\naddProjectBtn.addEventListener('click', _addProjectPopup_js__WEBPACK_IMPORTED_MODULE_1__.addProjectPopup);\n\nopenNavButton.addEventListener('click', _hamburgerNav_js__WEBPACK_IMPORTED_MODULE_2__.openNav);\n\n//# sourceURL=webpack://odin-135-todo-ii/./src/index.js?");

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