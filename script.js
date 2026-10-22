const STORAGE_KEY = "task-management-system.tasks.v1";

const taskForm = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");
const titleInput = document.getElementById("title");
const assigneeInput = document.getElementById("assignee");
const dueDateInput = document.getElementById("dueDate");
const statusInput = document.getElementById("status");
const descriptionInput = document.getElementById("description");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const saveButton = document.getElementById("saveButton");
const cancelEditButton = document.getElementById("cancelEdit");

let tasks = loadTasks();

function loadTasks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    alert("Tasks could not be saved in this browser. Check browser storage settings.");
  }
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function getStatusClass(status) {
  if (status === "Completed") return "completed";
  if (status === "In Progress") return "progress";
  return "todo";
}

function updateSummary() {
  document.getElementById("totalCount").textContent = tasks.length;
  document.getElementById("todoCount").textContent = tasks.filter(t => t.status === "To Do").length;
  document.getElementById("progressCount").textContent = tasks.filter(t => t.status === "In Progress").length;
  document.getElementById("doneCount").textContent = tasks.filter(t => t.status === "Completed").length;
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedStatus = filterStatus.value;
  const visibleTasks = tasks.filter(task => {
    const searchable = `${task.title} ${task.assignee} ${task.description}`.toLowerCase();
    const matchesSearch = searchable.includes(query);
    const matchesStatus = selectedStatus === "All" || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  taskList.innerHTML = visibleTasks.map(task => `
    <article class="task-card">
      <div class="task-main">
        <h3 class="task-title">${escapeHTML(task.title)}</h3>
        ${task.description ? `<p class="task-description">${escapeHTML(task.description)}</p>` : ""}
        <div class="task-meta">
          <span>Assigned to: ${escapeHTML(task.assignee || "Unassigned")}</span>
          <span>Due: ${escapeHTML(task.dueDate || "No date")}</span>
          <span class="status ${getStatusClass(task.status)}">${escapeHTML(task.status)}</span>
        </div>
      </div>
      <div class="task-actions">
        <button type="button" data-action="edit" data-id="${task.id}" class="secondary">Edit</button>
        <button type="button" data-action="next" data-id="${task.id}" class="secondary">Next status</button>
        <button type="button" data-action="delete" data-id="${task.id}" class="delete">Delete</button>
      </div>
    </article>
  `).join("");

  emptyMessage.classList.toggle("hidden", visibleTasks.length > 0);
  emptyMessage.textContent = tasks.length === 0
    ? "No tasks yet. Add your first task above."
    : "No tasks match your search or filter.";
  updateSummary();
}

function resetForm() {
  taskForm.reset();
  taskIdInput.value = "";
  saveButton.textContent = "Add Task";
  document.getElementById("formTitle").textContent = "Add a Task";
  cancelEditButton.classList.add("hidden");
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }

  const existingId = taskIdInput.value;
  const taskData = {
    id: existingId || (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    title,
    assignee: assigneeInput.value.trim(),
    dueDate: dueDateInput.value,
    status: statusInput.value,
    description: descriptionInput.value.trim()
  };

  if (existingId) {
    tasks = tasks.map(task => task.id === existingId ? taskData : task);
  } else {
    tasks.unshift(taskData);
  }

  saveTasks();
  resetForm();
  renderTasks();
});

taskList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const task = tasks.find(item => item.id === button.dataset.id);
  if (!task) return;

  if (button.dataset.action === "edit") {
    taskIdInput.value = task.id;
    titleInput.value = task.title;
    assigneeInput.value = task.assignee;
    dueDateInput.value = task.dueDate;
    statusInput.value = task.status;
    descriptionInput.value = task.description;
    saveButton.textContent = "Save Changes";
    document.getElementById("formTitle").textContent = "Edit Task";
    cancelEditButton.classList.remove("hidden");
    titleInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (button.dataset.action === "delete") {
    if (confirm(`Delete "${task.title}"?`)) {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
      if (taskIdInput.value === task.id) resetForm();
    }
  }

  if (button.dataset.action === "next") {
    const statuses = ["To Do", "In Progress", "Completed"];
    task.status = statuses[(statuses.indexOf(task.status) + 1) % statuses.length];
    saveTasks();
    renderTasks();
  }
});

cancelEditButton.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);

renderTasks();
