(function () {

    const conf = {
        todoAdder: document.getElementById('todoAdder'),
        nothingTodo: document.getElementById('nothingTodo')
    };

    document.getElementById("todoForm").onsubmit = function () {
        return false;
    };

    // Validate input on change
    conf.todoAdder.addEventListener('input', function f(e) {
        e.preventDefault();
        if (e.target.value.length > 4 && this.classList.contains('invalid'))
                this.classList.remove('invalid');
    });

    const completeTodo = async (id) =>{
        await fetch(`/todo/${id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                const todoItem = [].filter.call(document.querySelectorAll('.todoItem'), currTodo => currTodo.dataDbid === res)[0];
                todoItem.classList.add('remove');
                setTimeout(() => {
                    todoItem.remove();
                }, 600)
            });
    }

    // Complete Todo
    _.each(document.getElementsByClassName('todoCompleteBtn'), (btn) => {
        btn.addEventListener('click', function f() {
            completeTodo(this.dataDbid);
        });
    });

    const createTodoElement = (elData) => {
        const newTodo =  (
            <div dataDbid={elData['_id']} className="todoItem d-flex align-items-center pb-6">
                <input className="todoCompleteBtn mr-12 btn" type="button" value="&#10004;" />
                <p>{elData.body}</p>
            </div>
            );
            newTodo.addEventListener('click', function f(e) {
                if (e.target.matches('.todoCompleteBtn'))
                    completeTodo(this.dataDbid);
            });
            document.getElementById('todoList').append(newTodo);
    }

    const getTodos = async () => {
        fetch('/todo/')
        .then(response => response.json())
        .then(data=> {
            document.getElementById('todoList').innerHTML = '';
            if (data.length === 0){
                document.getElementById('todoList').innerHTML = 'Nothing To Do';
                conf.nothingTodo.classList.add('on');
                return;
            }

            _.each(data, todo =>{
                createTodoElement(todo);
            })
        });
    }

    const addTodo = async () => {
        const todo = {
            body: conf.todoAdder.value,
        }

        await fetch('/todo/add-todo', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(res => {
                if (document.getElementsByClassName('todoItem').length === 0){
                    document.getElementById('todoList').innerHTML = '';
                }
                // document.getElementById('todoList').innerHTML = '';
                conf.nothingTodo.classList.remove('on');
                conf.todoAdder.value = '';
                createTodoElement(res);
            });
    }

    conf.todoAdder.addEventListener('keydown', (e) => {
        if (e.keyCode == 13){ addTodo(); }
    })

    // Add Todo on Button Click
    document.getElementById('todoAdderBtn').addEventListener('click', () => {
        // Length Validation
        if (conf.todoAdder.value.length > 4){
            // validate css If previously invalid (copy & paste)
            if (conf.todoAdder.classList.contains('invalid'))
                conf.todoAdder.classList.remove('invalid');

            addTodo();
        } else {
            conf.todoAdder.classList.add('invalid');
            conf.todoAdder.focus();
        }
    });

    const init = () => {
        getTodos();
        // Set Body Height to Window Height
        document.body.style.height = `${window.innerHeight}px`;
    }

    init();
})();