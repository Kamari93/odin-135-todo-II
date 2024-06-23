# 1-3-5 Todo List App

The **1-3-5 Todo List App** is a task management application designed to help you prioritize and focus on your daily tasks. Based on the 1-3-5 rule and the Effective Engineer by Edmond Lau, this app encourages you to allocate one large task, three medium tasks, and five small tasks to tackle within a day, ensuring you make consistent progress without feeling overwhelmed.

[Live Preview Here](https://kamari93.github.io/odin-135-todo-II/)

## Features

- **Task Categorization:** Organize tasks into large, medium, and small categories.
- **Project Management:** Create and manage multiple projects, each with its own set of tasks.
- **Default Projects:** Automatically includes default projects like Inbox, Today's Tasks, This Week, and Brag Notes (completed tasks).
- **Task Filters:** Filter tasks by importance.
- **Task Movement:** Easily rearrange tasks within a project.
- **Local Storage:** All tasks and projects are saved in your browser's local storage, ensuring your data persists between sessions.
- **Responsive Design:** User interface adapts to different screen sizes for better usability on mobile devices.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/odin-135-todo-II.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd odin-135-todo-II
   ```

3. **Open `index.html` in your web browser:**
   ```bash
   open index.html
   ```

## Usage

### Adding a Project

1. Click the "Add Project" button.
2. Enter the project name in the prompt.
3. The new project will appear in the project list.

### Adding a Task

1. Select a project from the project list.
2. Click the "Add Task" button.
3. Enter the task title and due date in the prompts.
4. Add a task description and task duration by clicking the description btn.
5. The task will be categorized based on its order in the list:
   - 1st task: Large task (Purple border)
   - 2nd-4th tasks: Medium tasks (Blue border)
   - 5th-9th tasks: Small tasks (Green border)

### Moving Tasks

1. Hover over the task you want to move.
2. Use the up and down arrows to move the task within the project list.

### Filtering Tasks

1. For default projects (e.g., Today, This Week), use the filter dropdown to select the task size you want to view.

### Disabling Checkboxes and Moving Tasks

Checkboxes and moving tasks for default projects are disabled to prevent unintended modifications.

### Local Storage

All tasks and projects are automatically saved to your browser's local storage, so you don't need to worry about losing your data when you close the browser.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.


## Acknowledgements

- The 1-3-5 rule is a simple yet effective productivity technique. Read more about it [here](https://www.calendar.com/blog/conquer-your-to-do-list-with-the-1-3-5-rule-a-simple-path-to-productivity/).
- Edmond Lau's book [The Effective Engineer](https://www.effectiveengineer.com/book).
- Icons made by [FontAwesome](https://fontawesome.com).
- Icon made by [Icon8](https://icons8.com/icon/59757/checkmark)
