// utils.js// utils.js
let projectIdCounter = 0;

// Function to generate a unique project ID for created projects
export function generateProjectId() {
    projectIdCounter++;
    return `project_${projectIdCounter}`;
}
