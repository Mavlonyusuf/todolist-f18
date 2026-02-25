function getTasks() {
  const data = localStorage.getItem("todoTasks");
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function render() {
  const tasks = getTasks();
  const todos = tasks.filter((t) => !t.done);
  const dones = tasks.filter((t) => t.done);

  document.getElementById("todoCount").textContent = todos.length;
  document.getElementById("doneCount").textContent = dones.length;

  const todoSection = document.getElementById("todoSection");
  const doneSection = document.getElementById("doneSection");
  todoSection.classList.toggle("hidden", todos.length === 0);
  doneSection.classList.toggle("hidden", dones.length === 0);

  document.getElementById("todoList").innerHTML = todos
    .map(
      (t) => `
                <div data-id="${t.id}" class="bg-gray-800 rounded-xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-purple-500/20 transition-colors duration-200">
                    <span class="text-white/80 text-sm flex-1 mr-3">${escapeHtml(t.text)}</span>
                    <div class="flex items-center gap-3">
                        <button onclick="completeTask('${t.id}')" class="text-white/40 hover:text-emerald-400 hover:scale-110 transition-all duration-150" title="Bajarildi">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button onclick="editTask('${t.id}')" class="text-white/40 hover:text-yellow-400 hover:scale-110 transition-all duration-150" title="Tahrirlash">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button onclick="deleteTask('${t.id}')" class="text-white/40 hover:text-red-400 hover:scale-110 transition-all duration-150" title="O'chirish">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            `,
    )
    .join("");

  document.getElementById("doneList").innerHTML = dones
    .map(
      (t) => `
                <div class="bg-gray-800/60 rounded-xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-purple-500/20 transition-colors duration-200">
                    <span class="text-emerald-400 text-sm flex-1 mr-3 line-through opacity-70">${escapeHtml(t.text)}</span>
                    <div class="flex items-center gap-3">
                        <button onclick="undoTask('${t.id}')" class="text-emerald-400/50 hover:text-emerald-400 hover:scale-110 transition-all duration-150" title="Qaytarish">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                        <button onclick="deleteTask('${t.id}')" class="text-white/30 hover:text-red-400 hover:scale-110 transition-all duration-150" title="O'chirish">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            `,
    )
    .join("");
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  const tasks = getTasks();
  tasks.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    text: text,
    done: false,
    createdAt: Date.now(),
  });
  saveTasks(tasks);
  input.value = "";
  render();
  input.focus();
}

function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const container = document.querySelector(`[data-id="${id}"]`);
  if (!container) return;

  const span = container.querySelector("span");
  const btns = container.querySelector(".flex.items-center");

  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className =
    "flex-1 mr-3 bg-gray-700 border border-purple-500/40 rounded-lg px-3 py-1.5 text-white text-sm outline-none focus:border-purple-500/70 transition-colors duration-200";

  span.replaceWith(input);
  input.focus();
  input.select();

  btns.innerHTML = `
                <button id="saveBtn-${id}" class="text-white/40 hover:text-emerald-400 hover:scale-110 transition-all duration-150" title="Saqlash">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
                <button id="cancelBtn-${id}" class="text-white/40 hover:text-red-400 hover:scale-110 transition-all duration-150" title="Bekor qilish">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            `;

  function saveEdit() {
    const newText = input.value.trim();
    if (newText) {
      const tasks = getTasks();
      const t = tasks.find((t) => t.id === id);
      if (t) t.text = newText;
      saveTasks(tasks);
    }
    render();
  }

  document.getElementById(`saveBtn-${id}`).addEventListener("click", saveEdit);
  document
    .getElementById(`cancelBtn-${id}`)
    .addEventListener("click", () => render());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") render();
  });
}

function completeTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = true;
    task.completedAt = Date.now();
  }
  saveTasks(tasks);
  render();
}

function undoTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = false;
    delete task.completedAt;
  }
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  saveTasks(getTasks().filter((t) => t.id !== id));
  render();
}

render();
document.getElementById("taskInput").focus();
// document.addEventListener("keydown", (e) => console.log(e));
