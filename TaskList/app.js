// UI Vars
// font awesome not working

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners

loadEventListeners();

function loadEventListeners() {
   // DOM Load Event
   document.addEventListener('DOMContentLoaded', getTasks);
   //Add task
   form.addEventListener("submit", addTask);
   // Remove task event
   taskList.addEventListener("click", removeTask);
   // Clear Tasks event
   clearBtn.addEventListener("click", clearTasks);
   // Filter Tasks Event
   filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from localStorage
function getTasks() {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"))
   }

   tasks.forEach(function(task){
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Create textnode and appent to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement("a");
      // Add classList
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<i class="fas fa-times"></i>';
      // Append link to li
      li.appendChild(link);
      // Append li to ul
      taskList.appendChild(li);
   });

}

//Add task
function addTask(e) {
   if (taskInput.value === "") {
      alert("Add a task!");
   } else {
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Create textnode and appent to li
      li.appendChild(document.createTextNode(taskInput.value));
      // Create new link element
      const link = document.createElement("a");
      // Add classList
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<i class="fas fa-times"></i>';
      // Append link to li
      li.appendChild(link);
      // Append li to ul
      taskList.appendChild(li);

      // Store in LS
      storeTaskInLocalStorage(taskInput.value);
      // Clear Input
      taskInput.value = "";


      e.preventDefault();
   }
}

//Store Tasks in LS
function storeTaskInLocalStorage(task) {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"))
   }

   tasks.push(task);

   localStorage.setItem("tasks", JSON.stringify(tasks))

}


// Remove task
function removeTask(e) {
   if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are You Sure?")) {
         e.target.parentElement.parentElement.remove();

         // Remove from LS
         removeTaskFromLocalStorage(e.target.parentElement.parentElement)
      }
   }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"))
   }

   tasks.forEach(function (task, index){
      if (taskItem.textContent === task) {
         tasks.splice(index, 1) // delete 1 from the starting index
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
   })
}

// Clear Tasks
function clearTasks() {
   // taskList.innerHTML = "";

   // Faster way
   while (taskList.firstChild) { // while there is still a first child
      taskList.removeChild(taskList.firstChild);
   }

   // Clear from LS 
   clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
   localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(function(task) {
      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = "block"
      } else {
         task.style.display = "none"
      }
   });
}

// 