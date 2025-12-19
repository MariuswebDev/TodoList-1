const inputElement = document.getElementById("input");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totaltasks");
const completedTasks = document.getElementById("completedtasks");
const ongoingTasks = document.getElementById("ongoingtasks");

function updateCounts() {
    const allTasks = document.querySelectorAll("li");
    const completed = document.querySelectorAll("input[type='checkbox']:checked");

    totalTasks.textContent = `Total Tasks: ${allTasks.length}`;
    completedTasks.textContent = `Completed: ${completed.length}`;
    ongoingTasks.textContent = `Inprogress: ${allTasks.length - completed.length}`;
}

function formatTime(date) {
    return date.toLocaleString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addTask() {
    const tasks = inputElement.value;

    if (tasks === "") return;

    const createTask = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = tasks;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        createTask.remove();
        updateCounts();
    });

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        const newTask = prompt("Edit task...", tasks);
        if (newTask === null || newTask === "") {

            taskText.textContent = newTask;
        }
    });

    const timeInfo = document.createElement("div");
    const createdTime = new Date();
    timeInfo.textContent = `created: ${formatTime(createdTime)}`;
    timeInfo.className = "time";

    const completionTime = document.createElement("div");
    completionTime.className = "completedTime";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    checkbox.addEventListener("change", () => {
        const completed = new Date();
        if (checkbox.checked) {
            taskText.style.textDecoration = "2px line-through red";
            completionTime.textContent = `✅completed at: ${formatTime(completed)}`
        } else {
            taskText.style.textDecoration = "none"
            completionTime.textContent = "";
        }
        updateCounts();
    })


    createTask.appendChild(checkbox);
    createTask.appendChild(taskText);
    createTask.appendChild(editButton);
    createTask.appendChild(deleteButton);
    createTask.appendChild(timeInfo);
    createTask.appendChild(completionTime);
    taskList.appendChild(createTask);
    inputElement.value = "";
    updateCounts();
}

addBtn.addEventListener("click", () => {
    addTask();
});

inputElement.addEventListener("keypress", (e) => { e.key === "Enter" && addTask() })