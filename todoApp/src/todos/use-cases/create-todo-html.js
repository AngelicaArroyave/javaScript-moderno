export const createTodoHTML = (todo) => {
    if(!todo) throw new Error('A TODO object is required')

    const { id, description, done } = todo

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
            <label> ${ description } </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `

    const liElement = document.createElement('li')
    liElement.innerHTML = html
    liElement.setAttribute('data-id', id)
    if(todo.done) liElement.classList.add('completed')

    return liElement
}