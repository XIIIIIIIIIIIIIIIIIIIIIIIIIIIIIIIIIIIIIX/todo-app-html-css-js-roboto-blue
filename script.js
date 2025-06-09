document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((taskObj, index) => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      taskElement.setAttribute('data-id', index);
      
      taskElement.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${taskObj.completed ? 'checked' : ''}>
        <span class="task-text ${taskObj.completed ? 'completed' : ''}">${taskObj.text}</span>
      `;
      
      const checkbox = taskElement.querySelector('.task-checkbox');
      const taskText = taskElement.querySelector('.task-text');
      
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        taskText.classList.toggle('completed', checkbox.checked);
        saveTasks();
      });

      // Supprimer l'élément après l'animation
      taskElement.addEventListener('dblclick', () => {
        taskElement.classList.add('exiting');
        setTimeout(() => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        }, 400);
      });

      taskList.appendChild(taskElement);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    }
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Initial render
  renderTasks();
});