let todos = [];
let index = todos.length; // para tener un id autoincremental
let shortestTodo = null;

const createTodoElement = (todo, todos, container) => {
    const element = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("p");
    text.innerHTML = todo.value;
    const checkmark = document.createElement("span");
    checkmark.innerHTML = "✓";
    textContainer.appendChild(checkmark);
    textContainer.appendChild(text);
    element.appendChild(textContainer);
    element.classList.add("todo");
    if (todo.isCompleted) element.classList.add("completed");
    element.addEventListener("click", () => {
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
            if (!shortestTodo || new Date() - todo.creationDate < shortestTodo.completionDate - shortestTodo.creationDate)
                shortestTodo = todo;
            todo.completionDate = new Date();
        }
        element.classList.toggle("completed");
    });
    const cross = document.createElement("span");
    cross.innerHTML = "X";
    cross.addEventListener("click", () => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todo.id) {
                todos.splice(i, 1)
                loadTodos(todos, container);
            }
        }
    });
    element.appendChild(cross);
    return element;
}

const loadTodos = (todos, container) => {
    container.innerHTML = null;
    const elements = todos.map(todo => createTodoElement(todo, todos, container));
    elements.forEach(element => container.appendChild(element));
    // scroll to bottom
    const dummy = document.createElement("div");
    container.appendChild(dummy);
    dummy.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    todos.push({
        value: e.target[0].value,
        isCompleted: false,
        creationDate: new Date(),
        completionDate: null,
        id: index
    });
    index++;
    e.target[0].value = "";

    const container = document.getElementById("todo-container");
    if (!container) return;
    loadTodos(todos, container);
});