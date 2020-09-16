//form validation 
const validateTaskForm = document.querySelector("#validateAddNewTaskForm"); // task form
const addNewTaskNameText = document.getElementById("addNewTaskName"); //task name
const addDescriptionTextarea = document.getElementById("addTaskDescription"); // description
const addAssignToText = document.getElementById("addTaskAssignTo"); //assign To
const addDueDate = document.getElementById("addTaskDueDate");
const addStatusSelectList = document.querySelector("#addStatus");


validateTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //validate task name
    
    if (addNewTaskNameText.value.length > 8 ) //covers Not Empty and longer than 8 characters
    {
        addNewTaskNameText.classList.add("is-valid");
        addNewTaskNameText.classList.remove("is-invalid");
    } 
    else {
        addNewTaskNameText.classList.remove("is-valid");
        addNewTaskNameText.classList.add("is-invalid");
    }

    //validate description

    if(addDescriptionTextarea.value.length > 15) { //covers Not Empty and longer than 15 characters
        addDescriptionTextarea.classList.add("is-valid");
        addDescriptionTextarea.classList.remove("is-invalid");
    } else {
        addDescriptionTextarea.classList.remove("is-valid");
        addDescriptionTextarea.classList.add("is-invalid");
    }

    //validate AssignedTo 

    if(addAssignToText.value.length > 2) { //Not Empty and longer than 8 characters // JEN: Updated to allow minimum of 3 characters
        addAssignToText.classList.add("is-valid");
        addAssignToText.classList.remove("is-invalid");
    } else {
        addAssignToText.classList.remove("is-valid");
        addAssignToText.classList.add("is-invalid");  
    }
   
    //validate set due date Not Empty and not in the past
    var today = new Date(); //create a new object from date method
    if(today <=  Date.parse(addDueDate.value)) {
        addDueDate.classList.add("is-valid");
        addDueDate.classList.remove("is-invalid");
    }
    
    else {
        addDueDate.classList.remove("is-valid");
        addDueDate.classList.add("is-invalid");
        
    }

    // //validate status
    // /* status selectlist default selected to do. so the value not null always. 
    // we dont need to do a validation there */

    // alert(isNaN(addNewTaskNameText));

    // TASK 6, Step 4: use TaskManager class to keep track of tasks we add with the New Task form.
    const name = addNewTaskNameText.value;
    const description = addDescriptionTextarea.value;
    const assignee = addAssignToText.value;
    const dueDate = addDueDate.value;
    const status = addStatusSelectList.value;
    
    if (addNewTaskNameText.classList.contains("is-valid") && addDescriptionTextarea.classList.contains("is-valid") && addAssignToText.classList.contains("is-valid") && addDueDate.classList.contains("is-valid")) {
        
        taskManager.addTask(name, description, assignee, dueDate, status); // add new task to taskManager.tasks array if form validation successful
        
        validateTaskForm.reset(); // clear/reset form values, ready for next submission
    }

});

    //var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //alert(todayDate);
    //alert(Date.parse(todayDate) + " vs "+ Date.parse(addDueDate.value));


