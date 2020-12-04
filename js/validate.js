// form validation
const validateTaskForm = document.querySelector("#validateAddNewTaskForm"); 
const addNewTaskNameText = document.getElementById("addNewTaskName"); 
const addDescriptionTextarea = document.getElementById("addTaskDescription"); 
const addAssignToText = document.getElementById("addTaskAssignTo"); 
const addDueDate = document.getElementById("addTaskDueDate");
const addStatusSelectList = document.querySelector("#addStatus");

validateTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
 
  if (addNewTaskNameText.value.length > 8) {
    addNewTaskNameText.classList.add("is-valid");
    addNewTaskNameText.classList.remove("is-invalid");
  } else {
    addNewTaskNameText.classList.remove("is-valid");
    addNewTaskNameText.classList.add("is-invalid");
  }

  if (addDescriptionTextarea.value.length > 10) {
    //covers Not Empty and longer than 15 characters
    addDescriptionTextarea.classList.add("is-valid");
    addDescriptionTextarea.classList.remove("is-invalid");
  } else {
    addDescriptionTextarea.classList.remove("is-valid");
    addDescriptionTextarea.classList.add("is-invalid");
  }

  if (addAssignToText.value.length > 2) {
    addAssignToText.classList.add("is-valid");
    addAssignToText.classList.remove("is-invalid");
  } else {
    addAssignToText.classList.remove("is-valid");
    addAssignToText.classList.add("is-invalid");
  }

  var today = new Date(); 
  if (today <= Date.parse(addDueDate.value)) {
    addDueDate.classList.add("is-valid");
    addDueDate.classList.remove("is-invalid");
  } else {
    addDueDate.classList.remove("is-valid");
    addDueDate.classList.add("is-invalid");
  }

  const name = addNewTaskNameText.value;
  const description = addDescriptionTextarea.value;
  const assignee = addAssignToText.value;
  const dueDate = addDueDate.value;
  const status = addStatusSelectList.value;

  if (
    addNewTaskNameText.classList.contains("is-valid") &&
    addDescriptionTextarea.classList.contains("is-valid") &&
    addAssignToText.classList.contains("is-valid") &&
    addDueDate.classList.contains("is-valid")
  ) {
    taskManager.addTask(name, description, assignee, dueDate, status);
    taskManager.saveTasks(); 
    taskManager.render(); 
    resetFormFields(); 
  }
});

// reset form values 
const resetFormFields = () => {
  validateTaskForm.reset();

  addNewTaskNameText.classList.remove("is-valid");
  addNewTaskNameText.classList.remove("is-invalid");

  addDescriptionTextarea.classList.remove("is-valid");
  addDescriptionTextarea.classList.remove("is-invalid");

  addAssignToText.classList.remove("is-valid");
  addAssignToText.classList.remove("is-invalid");

  addDueDate.classList.remove("is-valid");
  addDueDate.classList.remove("is-invalid");
};

// event listener for task cards - clicking 'done' and 'delete'
const taskCards = document.querySelectorAll("div.task-cards-container");
for (let i = 0; i < taskCards.length; i++) {
  taskCards[i].addEventListener("click", (e) => {
    if (e.target.classList.contains("done-button")) {
      console.log('clicked');
      const parentTask = e.target.parentElement.parentElement;
      const taskId = Number(parentTask.dataset.taskId);
      const task = taskManager.getTaskById(taskId);
      task.status = "Done";
      taskManager.saveTasks();
      taskManager.render();
    }
  
    if (e.target.classList.contains("delete-button")) {
      console.log('clicked');
      const parentTask = e.target.parentElement.parentElement;
      const taskId = Number(parentTask.dataset.taskId);
      taskManager.deleteTask(taskId);
      taskManager.saveTasks();
      taskManager.render();
    }
  }); 
}
