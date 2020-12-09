// define task card html to be rendered
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `
    <div class="card" data-task-id=${id}>  
      <div class="header ${ status === "To Do" ? "bg-danger" : status === "In Progress" ? "bg-warning" : status === "For Review" ? "bg-info" : "bg-success" }"><strong>${status}</strong></div>  
      <div class="card-body bg-light">
        <h5 class="card-title">${name}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Assigned to</strong>: ${assignedTo}</li>
        <li class="list-group-item"><strong>Due date</strong>: ${dueDate}</li>
        <li class="list-group-item card_description">${description}</li>
      </ul>
      <div class="d-flex mb-2 justify-content-around">
        <button class="btn btn-outline-success done-button ${status === "Done" ? "invisible" : "visible"} far fa-check-square"></button>
        <button class="btn btn-outline-warning edit-button fas fa-pen"></button>
        <button class="btn btn-outline-danger delete-button fas fa-trash"></button>
      </div>    
    </div>
    `;
  return html;
};

// define TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  };

  addTask(name, description, assignedTo, dueDate, status = "To Do") {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status
    };
    this.tasks.push(task); 
  };

  deleteTask(taskId) {
    const newTasks = [];  
    for (let i = 0; i < this.tasks.length; i++) {   
      const task = this.tasks[i];  
        if (task.id !== taskId) {  
          newTasks.push(task); 
        }
    }
    this.tasks = newTasks;
  };

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  };

  createHtmlListByStatus(status) {
    const tasksHtmlList = [];
    const filteredTasksList = this.tasks.filter((task) => task.status === status);
    for (let i = 0; i < filteredTasksList.length; i++) {
      const currentTask = filteredTasksList[i];
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
    return tasksHtmlList.join("\n");
  }

  render() {
    document.querySelector("#tasks-to-do .task-cards-container").innerHTML = this.createHtmlListByStatus("To Do");
    document.querySelector("#tasks-in-progress .task-cards-container").innerHTML = this.createHtmlListByStatus("In Progress");
    document.querySelector("#tasks-for-review .task-cards-container").innerHTML = this.createHtmlListByStatus("For Review");
    document.querySelector("#tasks-done .task-cards-container").innerHTML = this.createHtmlListByStatus("Done");
  };

  saveTasks() {
    const tasksJson = JSON.stringify(this.tasks);  
    localStorage.setItem('tasks', tasksJson);

    const currentId = String(this.currentId);  
    localStorage.setItem('currentId', currentId); 
  };

  loadTasks() {
    if (localStorage.getItem('tasks')) {  
      const tasksJson = localStorage.getItem('tasks'); 
      this.tasks = JSON.parse(tasksJson); 
    }

    if (localStorage.getItem('currentId')) { 
      const currentId = localStorage.getItem('currentId'); 
      this.currentId = Number(currentId); 
    }
  };
}

// new instance
const taskManager = new TaskManager(0);

// load tasks saved in local storage and render
taskManager.loadTasks();
taskManager.render();

