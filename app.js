const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')



let todos = JSON.parse(localStorage.getItem('todos')).todos
let pastTodos = []

setInterval(() => {
    const initTodos = JSON.parse(localStorage.getItem('todos')) || []
    const todos = initTodos.todos || []
    
    if (todos.length > 0) {
        pastTodos = pastTodos.concat(todos.filter(todo => parseInt(todo.time) + 5000 < parseInt(new Date().getTime())))
        console.log(pastTodos)
    }
    updatelocalStorage()
}, 20000)


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
        todoEl.dataset.time = new Date().getTime()

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
        parseInt(todoEl.dataset.time) + 1000 >= parseInt(new Date().getTime()) &&
            todos.push({
                text: todoEl.innerText,
                completed: todoEl.classList.contains('completed'),
                time: todoEl.dataset.time
            })

    })

    localStorage.setItem('todos', JSON.stringify({ todos, pastTodos }))
}


















