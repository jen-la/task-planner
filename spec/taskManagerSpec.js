// specs for TaskManager class
describe('TaskManager', () => {
    describe('#constructor', () => {
        describe('when initialising a new TaskManager', () => {
            it('should create an empty tasks array', () => {
                const taskManager = new TaskManager(1);
                expect(taskManager.tasks).toEqual([]);
            });

            it('should set the currentId to the passed in number', () => {
                const taskManager = new TaskManager(1);
                expect(taskManager.currentId).toBe(1);
            });
        });  
    });

    describe('#addTask', () => {
        describe('when passed a valid name, description, assignedTo and dueDate', () => { 
            it('should push the new task object to the tasks array', () => {   
                const taskManager = new TaskManager(1);
                const task = {
                    id: taskManager.currentId,
                    name: 'test',
                    description: 'test',
                    assignedTo: 'test',
                    dueDate: Date.now(),
                    status: 'To Do'
                }; 
                
                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                expect(taskManager.tasks[0]).toEqual(task);
            });

            it('should increment the currentId property', () => {
                const taskManager = new TaskManager(1);
                const task = {
                    id: taskManager.currentId,
                    name: 'test',
                    description: 'test',
                    assignedTo: 'test',
                    dueDate: Date.now(),
                    status: 'To Do'
                }; 
                
                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);
                
                expect(taskManager.currentId).toBe(2);
            });
        });
    });

    describe('#deleteTask', () => {
        describe('when passed an existing taskId', () => {
            it('should remove the corresponding task from the tasks array', () => {
                const taskManager = new TaskManager();
                // define task to be deleted
                const task = {
                    id: taskManager.currentId,
                    name: 'test',
                    description: 'test',
                    assignedTo: 'test',
                    dueDate: Date.now(),
                    status: 'To Do'
                }; 

                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);
                
                // add another task to the tasks array
                taskManager.addTask('Buy coffee', 'Go to Toby\'s Estate', 'Jen', Date.now());

                taskManager.deleteTask(task.id);

                expect(taskManager.tasks).not.toContain(task);
            });
        });  
    });

    describe('#getTaskById', () => {
        describe('when passed an existing taskId', ()=> {
            it('should return the corresponding task', () => {
                const taskManager = new TaskManager();
                
                const task = {
                    id: taskManager.currentId,
                    name: 'test',
                    description: 'test',
                    assignedTo: 'test',
                    dueDate: Date.now(),
                    status: 'To Do'
                }; 

                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);
                
                expect(taskManager.getTaskById(task.id)).toEqual(task);
            });
        });
    });
});
