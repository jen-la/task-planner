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

    describe('#render', () => {
        describe('when tasks exist in the task manager', () => {
            it('should render the tasks in the innerHTML of the tasks list', () => {
                const taskManager = new TaskManager();
                
                const task = {
                    id: taskManager.currentId,
                    name: 'test',
                    description: 'test',
                    assignedTo: 'test',
                    // use specific date to make it easier to test html
                    dueDate: 1601451685812,
                    status: 'To Do'
                };
                
                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                const tasksList = { innerHTML: ''};

                // spyOn document.querySelector so we can check taskList innerHTML later 
                spyOn(document, 'querySelector').and.returnValue(tasksList);

                taskManager.render();

                expect(tasksList.innerHTML).toContain('<div class="list-group-item card card_layout" data-task-id=0>');
                expect(tasksList.innerHTML).toContain('<strong>To Do</strong>');
                expect(tasksList.innerHTML).toContain('<h5 class="card-title">test</h5>');
                expect(tasksList.innerHTML).toContain('<li class="list-group-item"><strong>Assigned to</strong>: test</li>');
                expect(tasksList.innerHTML).toContain('<li class="list-group-item"><strong>Due date</strong>: 30/9/2020</li>');
                expect(tasksList.innerHTML).toContain('<li class="list-group-item card_description">test</li>'); 
                expect(tasksList.innerHTML).toContain('<button class="btn btn-outline-success done-button visible far fa-check-square"></button>');
                expect(tasksList.innerHTML).toContain('<button class="btn btn-outline-warning edit-button fas fa-pen"></button>');
                expect(tasksList.innerHTML).toContain('<button class="btn btn-outline-danger delete-button fas fa-trash"></button>');
            });
        });
    });

    describe('#saveTasks', () => {
        describe('when tasks exist in the task manager', () => {
            it('should store the tasks in local storage', () => {
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
                
                // create JSON of the task in an array
                const tasksJson = JSON.stringify([task]);

                // spyOn localStorage.setItem() to see what task gets passed in
                const localStorageSpy = spyOn(localStorage, 'setItem');

                taskManager.saveTasks();

                expect(localStorageSpy.calls.first().args).toEqual(['tasks', tasksJson]);
            });

            it('should store the currentId in local storage', () => {
                const taskManager = new TaskManager();
                
                taskManager.addTask('test', 'test', 'test', Date.now());

                // spyOn localStorage.setItem()
                const localStorageSpy = spyOn(localStorage, 'setItem');

                taskManager.saveTasks();
                
                const currentId = String(taskManager.currentId);

                expect(localStorageSpy.calls.mostRecent().args).toEqual(['currentId', currentId]);
            });
        });
    });

    describe('#loadTasks', () => {
        describe('when tasks are saved in local storage', () => {
            it('should set the tasks array to the saved tasks', () => {
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
                
                // create tasks array
                const tasks = [task];

                // create JSON of tasks array
                const tasksJson = JSON.stringify(tasks);

                // spyOn localStorage.getItem() and return tasksJson
                spyOn(localStorage, 'getItem').and.returnValue(tasksJson);

                taskManager.loadTasks();

                expect(taskManager.tasks).toEqual(tasks);
            });
        });

        describe('when the currentId is saved in local storage', () => {
            it('should set the currentId to the saved currentId', () => {
                const taskManager = new TaskManager();
                
                spyOn(localStorage, 'getItem').and.returnValue(1);

                taskManager.loadTasks();

                expect(taskManager.currentId).toBe(1);
            });
        });
    });
});
