const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

let pastTodos
let todos = JSON.parse(localStorage.getItem('todos')).todos
setInterval(() => {
    const initTodos = JSON.parse(localStorage.getItem('todos')) || []
    const todos = initTodos.todos || []
    pastTodos = todos.filter(todo => todo.time < new Date().getMinutes())
    console.log(pastTodos)
    updatelocalStorage()

}, 5000)



if (todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})




function addTodo(todo) {

    let todoText = input.value

    if (todo) {
        todoText = todo.text

    }

    if (todoText) {

        const todoEl = document.createElement('li')
        todoEl.dataset.time = new Date().getMinutes()

        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')

            updatelocalStorage()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()

            updatelocalStorage()
        })




        todosUL.appendChild(todoEl)

        input.value = ''

        updatelocalStorage()
    }
}

function updatelocalStorage() {
    const todosEl = document.querySelectorAll('li')
    const todos = []

    todosEl.forEach((todoEl) => {
        todoEl.dataset.time >= new Date().getMinutes() &&
            todos.push({
                text: todoEl.innerText,
                completed: todoEl.classList.contains('completed'),
                time: todoEl.dataset.time
            }) 
    })

    localStorage.setItem('todos', JSON.stringify({ todos, pastTodos }))
}
