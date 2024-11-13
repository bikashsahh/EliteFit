import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addTodoListTask: false,
  taskValue: "",
  taskDescription: "",
  taskDueDate: "",
  taskPriority: "low",
  updateValue: "",
  isEdit: null,
  timeAlert: "",
  todoHigh: [],
  todoMedium: [],
  todoLow: [],
  todoDone: [],
};

const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, actions) {
      const id = actions.payload.id;
      const date = actions.payload.date;
      const todo = {
        id,
        date,
        title: state.taskValue,
        description: state.taskDescription,
        dueDate: state.taskDueDate,
        priority: state.taskPriority,
        done: false,
      };
      switch (state.taskPriority) {
        case "high":
          state.todoHigh.push(todo);
          break;
        case "medium":
          state.todoMedium.push(todo);
          break;
        case "low":
          state.todoLow.push(todo);
          break;
        default:
          break;
      }
      state.taskValue = "";
      state.taskDescription = "";
      state.taskDueDate = "";
      state.taskPriority = "low";
      state.addTodoListTask = false;
    },
    setDescription(state, actions) {
      state.taskDescription = actions.payload;
    },
    setDueDate(state, actions) {
      state.taskDueDate = actions.payload;
    },
    readTask(state, actions) {
      state.taskValue = actions.payload;
    },
    openTodoListTaskBox(state) {
      state.addTodoListTask = true;
    },
    closeTodoListTaskBox(state) {
      state.addTodoListTask = false;
      state.taskValue = "";
      state.taskDescription = "";
      state.taskDueDate = "";
      state.taskPriority = "low";
    },
    updateTaskPriority(state, actions) {
      state.taskPriority = actions.payload;
    },
    addTaskToDone(state, actions) {
      const { id, priority } = actions.payload;
      let task;

      // Find and remove the task from its priority list
      switch (priority) {
        case "high":
          task = state.todoHigh.find((item) => item.id === id);
          state.todoHigh = state.todoHigh.filter((item) => item.id !== id);
          break;
        case "medium":
          task = state.todoMedium.find((item) => item.id === id);
          state.todoMedium = state.todoMedium.filter((item) => item.id !== id);
          break;
        case "low":
          task = state.todoLow.find((item) => item.id === id);
          state.todoLow = state.todoLow.filter((item) => item.id !== id);
          break;
      }

      // Move task to done if found
      if (task) {
        task.done = true;
        state.todoDone.push(task);
      }

      // Ensure todoDone array is created if it's empty
      if (!state.todoDone) {
        state.todoDone = [];
      }

      // Update localStorage after moving the task to done
      localStorage.setItem("todoHigh", JSON.stringify(state.todoHigh));
      localStorage.setItem("todoMedium", JSON.stringify(state.todoMedium));
      localStorage.setItem("todoLow", JSON.stringify(state.todoLow));
      localStorage.setItem("todoDone", JSON.stringify(state.todoDone));
    },
    deleteTask(state, actions) {
      const { id, priority } = actions.payload;

      let updatedTodoList = [];
      let flag = true;
      
      updatedTodoList = state.todoDone.filter((item) =>{
        if(item.id === id){
            flag = false;
        }
       return item.id !== id;
      });
      state.todoDone = updatedTodoList;
      if( flag ){
      switch (priority) {
        case "high":
          updatedTodoList = state.todoHigh.filter((item) => item.id !== id);
          state.todoHigh = updatedTodoList;
          break;
        case "medium":
          updatedTodoList = state.todoMedium.filter((item) => item.id !== id);
          state.todoMedium = updatedTodoList;
          break;
        case "low":
          updatedTodoList = state.todoLow.filter((item) => item.id !== id);
          state.todoLow = updatedTodoList;
          break;
        
        default:
          break;
      }
    }

      // Update localStorage after deletion
      localStorage.setItem("todoHigh", JSON.stringify(state.todoHigh));
      localStorage.setItem("todoMedium", JSON.stringify(state.todoMedium));
      localStorage.setItem("todoLow", JSON.stringify(state.todoLow));
      localStorage.setItem("todoDone", JSON.stringify(state.todoDone));
    },
    editTask(state, actions) {
      const { id, priority } = actions.payload;
      state.isEdit = id;
      let editTodoTask;

      // Find the task in the correct priority array
      switch (priority) {
        case "high":
          editTodoTask = state.todoHigh.find((item) => item.id === id);
          break;
        case "medium":
          editTodoTask = state.todoMedium.find((item) => item.id === id);
          break;
        case "low":
          editTodoTask = state.todoLow.find((item) => item.id === id);
          break;
      }

      // Store all task properties for editing
      if (editTodoTask) {
        state.updateValue = editTodoTask.value;
        state.taskDescription = editTodoTask.description;
        state.taskDueDate = editTodoTask.dueDate;
        state.taskPriority = editTodoTask.priority;
      }
    },
    cancelEdit(state) {
      state.taskValue = "";
      state.isEdit = null;
      state.updateValue = "";
    },

    updateEditedTask(state, actions) {
      const { id, title, description, dueDate, priority } = actions.payload;

      // Locate and remove the task from its previous priority list
      let task;
      ["todoHigh", "todoMedium", "todoLow"].forEach((priorityList) => {
        if (task) return;
        const index = state[priorityList].findIndex((item) => item.id === id);
        if (index !== -1) {
          task = state[priorityList].splice(index, 1)[0];
        }
      });

      // Update task properties with edited values
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;

        // Place the task into the correct array based on updated priority
        switch (priority) {
          case "high":
            state.todoHigh.push(task);
            break;
          case "medium":
            state.todoMedium.push(task);
            break;
          case "low":
            state.todoLow.push(task);
            break;
        }
      }

      // Clear editing state
      state.isEdit = null;
      state.updateValue = "";
      state.taskDescription = "";
      state.taskDueDate = "";
      state.taskPriority = "low";
    },
    readUpdateTask(state, actions) {
      state.updateValue = actions.payload;
    },

    // New action to load tasks from local storage
    updateAllTodosFromLocalStorage(state, actions) {
      const todoHigh = JSON.parse(localStorage.getItem("todoHigh")) || [];
      const todoMedium = JSON.parse(localStorage.getItem("todoMedium")) || [];
      const todoLow = JSON.parse(localStorage.getItem("todoLow")) || [];
      const todoDone = JSON.parse(localStorage.getItem("todoDone")) || [];

      // Update state with loaded tasks
      state.todoHigh = todoHigh;
      state.todoMedium = todoMedium;
      state.todoLow = todoLow;
      state.todoDone = todoDone;
    },
  },
});

export const taskAction = task.actions;
export default task.reducer;
