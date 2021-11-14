let popup = document.querySelectorAll("div.popup")[0]
//Функция открытия pop-up
function openPopup() {
    popup.style.width = "100vw"
    popup.style.height = "100vh"
    popup.style.transition = "all ease-out 0.3s"
    popup.style.right = "0"
    popup.style.top = "0"
}

//Функция закрытия pop-up
function closePopup() {
    popup.style.width = "0%"
    popup.style.height = "0%"
    popup.style.transition = "all ease-in 0.3s"
    popup.style.right = "50%"
    popup.style.top = "50%"
}

let tasks = []
let taskElements = []

//Загрузка задач из localStorage при загрузке страницы
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

//Создание задач
class Task {
    constructor(what, when, desc, completed) {
        this.what = what
        this.when = when
        this.desc = desc
        this.completed = false
    }
}

//Обновление localStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

let addTask = document.querySelectorAll("button.add-item")[0]
let inputs = document.querySelectorAll("input")
//Слушатель событий для кнопки "Добавить"
addTask.addEventListener('click', () => {
    tasks.push(new Task(inputs[0].value, inputs[1].value, inputs[2].value))
    updateLocalStorage()
    addListItem()
    inputs.forEach((item) => item.value = '')
    closePopup()
})

//Слушатель событий, чтобы добавлять задачу нажатием Enter
popup.addEventListener('keyup', (e) => e.keyCode === 13 ? addTask.click() : '');

//Создание html шаблона
function createTemplate(task, index) {
    return `<li class="list-item ${task.completed ? 'checked' : ''}">
    <input type="checkbox" class="checkbox" onclick = "completeTask(${index})" ${task.completed ? 'checked' : ''}> 
    <div class="item-content">
    <div class="task">Задача: ${task.what}</div>
    <div class="date">Срок выполнения: ${task.when}</div>
    <div class="description">Примечание: ${task.desc}</div>
    <div class="status-in-process">Статус: ${task.completed ? 'Выполнено' : 'Не выполнено'}</div>
    </div>
    <span onclick="closeItem(${index})" class="close-item">&times;</span>
  </li>`
}

let list = document.querySelectorAll('ul')[0]
//Добавление задачи в html 
function addListItem() {
    list.innerHTML = ''
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            list.innerHTML += createTemplate(item, index)
        })
        taskElements = document.querySelectorAll(".list-item")
    }
}

//Загрузка задач в html при загрузке страницы
addListItem()

//Слушатель событий для check-box
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed
    tasks[index].completed ? taskElements[index].classList.toggle('checked') : ''
    updateLocalStorage()
    addListItem()
}

//Удаление задачи
function closeItem(index) {
    taskElements[index].classList.add('delete')
    setTimeout(() => {
        tasks.splice(index, 1)
        updateLocalStorage()
        addListItem()
    }, 500)
}