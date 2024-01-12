import todoStore, { Filters } from '../store/todo.store'
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases'

const elementIDs = {
    ClearCompleted: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count',
    TodoFilters: '.filtro',
    TodoList: '.todo-list'
}

/**
 * 
 * @param { string } elementId Elemento en el cual se renderiza la aplicación
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(elementIDs.TodoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel)
    }

    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos()
    })()

    // Referencias HTML
    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput)
    const todoListUL = document.querySelector(elementIDs.TodoList)
    const clearCompletedBtn = document.querySelector(elementIDs.ClearCompleted)
    const filtersLis = document.querySelectorAll(elementIDs.TodoFilters)

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return // El 13 hace referencia al Enter
        if(event.target.value.trim().length === 0) return

        todoStore.addTodo(event.target.value)
        displayTodos()
        event.target.value = ''
    })

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos()
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy'
        const element = event.target.closest('[data-id]')

        if(!element || !isDestroyElement) return

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos()
    })

    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos()
    })

    filtersLis.forEach(element => {
        element.addEventListener('click', element => {
            filtersLis.forEach(e => e.classList.remove('selected'))
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }

            displayTodos()
        })
    })
}