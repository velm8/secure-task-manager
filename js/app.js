let taskIdCounter = 1;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const loadSamplesBtn = document.getElementById("loadSamplesBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

function createTaskElement(taskText, taskId) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.taskId = taskId;
  li.dataset.state = "pending";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

function addTask(taskText) {
  const trimmedText = taskText.trim();

  if (!trimmedText) {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  taskMessage.textContent = "";

  const taskId = `task-${taskIdCounter++}`;
  const taskElement = createTaskElement(trimmedText, taskId);

  taskList.appendChild(taskElement);
  taskInput.value = "";
  updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
  const isCompleted = taskItem.classList.toggle("completed");
  taskItem.dataset.state = isCompleted ? "completed" : "pending";
  updateTaskCounts();
}

function beginTaskEdit(taskItem) {
  const span = taskItem.querySelector(".task-text");
  if (!span) return;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = span.textContent;

  const editBtn = taskItem.querySelector(".edit-btn");
  if (editBtn) {
    editBtn.textContent = "Save";
  }

  taskItem.replaceChild(input, span);
  taskMessage.textContent = "";
}

function saveTaskEdit(taskItem) {
  const input = taskItem.querySelector(".edit-input");
  if (!input) return;

  const trimmedText = input.value.trim();

  if (!trimmedText) {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  taskMessage.textContent = "";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = trimmedText;

  const editBtn = taskItem.querySelector(".edit-btn");
  if (editBtn) {
    editBtn.textContent = "Edit";
  }

  taskItem.replaceChild(span, input);
}

function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

function updateTaskCounts() {
  const total = taskList.querySelectorAll(".task-item").length;
  const pending = taskList.querySelectorAll('.task-item[data-state="pending"]').length;
  const completed = taskList.querySelectorAll('.task-item[data-state="completed"]').length;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

function handleTaskListClick(event) {
  const target = event.target;
  const taskItem = target.closest(".task-item");

  if (!taskItem) return;

  if (target.matches(".complete-btn")) {
    toggleTaskComplete(taskItem);
  } else if (target.matches(".edit-btn")) {
    if (target.textContent === "Edit") {
      beginTaskEdit(taskItem);
    } else if (target.textContent === "Save") {
      saveTaskEdit(taskItem);
    }
  } else if (target.matches(".remove-btn")) {
    removeTask(taskItem);
  }
}

function loadSampleTasks() {
  const samples = [
    "Review DOM selectors",
    "Practice createElement",
    "Study event delegation"
  ];

  const fragment = document.createDocumentFragment();

  samples.forEach((sampleText) => {
    const taskId = `task-${taskIdCounter++}`;
    const taskElement = createTaskElement(sampleText, taskId);
    fragment.appendChild(taskElement);
  });

  taskList.appendChild(fragment);
  taskMessage.textContent = "";
  updateTaskCounts();
}

addTaskBtn.addEventListener("click", () => addTask(taskInput.value));

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value);
  }
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);

taskList.addEventListener("click", handleTaskListClick);