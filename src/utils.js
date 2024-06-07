// // utils.js// utils.js
// let projectIdCounter = 0;

// // Function to generate a unique project ID for created projects
// export function generateProjectId() {
//     projectIdCounter++;
//     return `project_${projectIdCounter}`;
// }


// utils.js
// Initialize the projectIdCounter from local storage or start from 0
let projectIdCounter = JSON.parse(localStorage.getItem('projectIdCounter')) || 0;

// Function to generate a unique project ID for created projects
export function generateProjectId() {
    projectIdCounter++;
    localStorage.setItem('projectIdCounter', JSON.stringify(projectIdCounter));
    return `project_${projectIdCounter}`;
}
