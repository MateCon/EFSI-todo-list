let todos = [];
let index = todos.length; // para tener un id autoincremental
let shortestTodo = null;

const createTodoElement = (todo, todos, container) => {
    const element = document.createElement("div");
    element.classList.add("todo");
    const textContainer = document.createElement("div");
    textContainer.style.dispay = "flex";
    textContainer.style.placeItems = "center";
    const text = document.createElement("p");
    text.classList.add("transition");
    text.innerHTML = todo.value;
    const checkbox = document.createElement("checkbox");
    checkbox.className = "checkbox";
    const checkmark = document.createElement("span");
    checkmark.innerHTML = "✓";
    checkmark.classList.add("transition");
    checkmark.classList.add("duration-400");
    if (!todo.isCompleted) checkmark.style.opacity = 0;

    checkbox.appendChild(checkmark);
    textContainer.appendChild(checkbox);
    textContainer.appendChild(text);
    element.appendChild(textContainer);
    if (todo.isCompleted) element.classList.add("completed");

    element.addEventListener("click", () => {
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
            if (!shortestTodo || new Date() - todo.creationDate < shortestTodo.completionDate - shortestTodo.creationDate)
                shortestTodo = todo;
            todo.completionDate = new Date();
            checkmark.style.opacity = 100;
        } else {
            checkmark.style.opacity = 0;
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