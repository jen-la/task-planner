// TASK 7: Step 1 Create the task html
// Create a new function, createTaskHtml which accepts the following parameters: name description assignedTo dueDate status
// Within the createTaskHtml function, create a string using template literals, copying the HTML of a single task from the index.html
// Using the template literal placeholders (${}), replace each section of the task HTML with the correct parameter
// Return the HTML from the function

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  //added data-task-id & the final div for task 8

  const html = `
        <div class="list-group-item card card_layout" data-task-id=${id}>  
            
            <div class="header pt-2 mb-0 ${ status === "To Do" ? "bg-danger" : status === "In Progress" ? "bg-warning" : status === "For Review" ? "bg-info" : "bg-success" }"><strong>${status}</strong></div>
                <div class="card-body card_title ${ status === "To Do" ? "bg-danger" : status === "In Progress" ? "bg-warning" : status === "For Review" ? "bg-info" : "bg-success" }">
                    <h5 class="card-title">${name}</h5>
                </div>
            
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Assigned to</strong>: ${assignedTo}</li>
                    <li class="list-group-item"><strong>Due date</strong>: ${dueDate}</li>
                    <li class="list-group-item card_description">${description}</li>
                </ul>
                <div class="card-body d-flex justify-content-around">
                    <a href="#" class="card-link"><span class="far fa-check-square"></span></a>
                    <a href="#" class="card-link"><span class="fas fa-pen"></span></a>
                    <a href="#" class="card-link"><span class="fas fa-trash"></span></a>
                </div>
                <div class="d-flex w-100 mb-2 justify-content-around">
                    <button class="btn btn-outline-success done-button ${status === "Done" ? "invisible" : "visible"}">Mark As Done</button>
                    
                </div>
            
          
        </div>
    `;
  return html;
};

// TASK 6:
// Step 2: create TaskManager class that will be responsible for managing the tasks in the application.
// Step 3: add a method to the TaskManager class that will allow us to add tasks to its tasks property.

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status = "To Do") {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status
    };

    this.tasks.push(task); // push new task as a new nested array in TaskManager.tasks array
  }

  getTaskById(taskId) {
    // a variable to store the task by Id
    let foundTask;

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  // TASK 7 Step 2: To display the tasks, create new method called render()

  render() {
    // Create a variable storing an empty array to hold the HTML of all the tasks' html, tasksHtmlList.
    const tasksHtmlList = [];

    // Loop over TaskManager's tasks, and:
    // Store the current task in a variable
    // Create a date variable, storing a new Date(), passing in the current task's dueDate to the Date constructor
    // Create a formattedDate variable, storing a readable string representing the date
    // Create a taskHtml variable to store the HTML of the current task, by calling the createTaskHtml function
    // push the taskHtml into the tasksHtmlList array
    for (let i = 0; i < this.tasks.length; i++) {
      const currentTask = this.tasks[i];
      const date = new Date(currentTask.dueDate);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const taskHtml = createTaskHtml(
        currentTask.id,
        currentTask.name,
        currentTask.description,
        currentTask.assignedTo,
        formattedDate,
        currentTask.status
      );
      tasksHtmlList.push(taskHtml);
    }

    // create a tasksHtml variable, set the variable to a string of HTML of all the tasks by joining the tasksHtmlList array together, seperating each task's html with a newline.
    const tasksHtml = tasksHtmlList.join("\n");

    // Select the tasks list element in index.html and set its innerHTML to the tasksHtml.
    const taskCards = document.querySelector("#taskCards");
    taskCards.innerHTML = tasksHtml;
  }
}

// new instance
const taskManager = new TaskManager(0);

//<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseDetails" aria-expanded="false" aria-controls="collapseDetails">
//<span class="navbar-toggler-icon"></span>
//</button>
