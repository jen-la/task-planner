//form validation 
const validateTaskForm = document.querySelector("#validateAddNewTaskForm"); // task form
const addNewTaskNameText = document.getElementById("addNewTaskName"); //task name
const addDescriptionTextarea = document.getElementById("addTaskDescription"); // description
const addAssignToText = document.getElementById("addTaskAssignTo"); //assign To
const addDueDate = document.getElementById("addTaskDueDate");
// const addStatusSelectList = document.querySelector("#addStatus");


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

    if(addAssignToText.value.length > 8) { //Not Empty and longer than 8 characters
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


});

    //var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //alert(todayDate);
    //alert(Date.parse(todayDate) + " vs "+ Date.parse(addDueDate.value));


