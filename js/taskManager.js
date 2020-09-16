// TASK 6: 
// Step 2: create TaskManager class that will be responsible for managing the tasks in the application.
// Step 3: add a method to the TaskManager class that will allow us to add tasks to its tasks property.

class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate, status = 'To Do') {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status 
        }
        
        this.tasks.push(task); // push new task as a new nested array in TaskManager.tasks array
    }
}

// new instance 
const taskManager = new TaskManager(0);
