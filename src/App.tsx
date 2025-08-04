import TodoList from './components/TodoList'
import Title from './components/Title'
import AddTask from './components/AddTask';
import { useState } from 'react';
import type { Todo } from './types/todo';

const todos = [{
  id: 1,
  text: 'Learn React',
  completed: false
}, {
  id: 2,
  text: 'Learn TypeScript',
  completed: false
}, {
  id: 3,
  text: 'Build a Todo App',
  completed: true
}];

function App() {
  const [todoList, setTodoList] = useState(todos);

  const removeTask = (id: number) => {
    const updatedTodos = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodos);
  }

  const updateTask = (updatedTodo: Todo) => {
    const index = todoList.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      setTodoList(prevTodos => {
        const newTodos = [...prevTodos];
        newTodos[index] = updatedTodo;
        return newTodos;
      });
    }

  };

  const addTask = (text: string) => {
    const newTask = {
      id: todoList.length + 1,
      text,
      completed: false
    };
    setTodoList([...todoList, newTask]);

    console.log('New task added:', newTask);
  };
  return (
    <div className='flex flex-col justify-center pt-8 pb-16 pr-32 pl-32 bg-dusty-600 text-ivory-200'>
      <Title />
      <div className='flex flex-col mt-16'>
        <AddTask addTask={addTask} />
        <h2 className='text-ivory-400 text-xl font-semibold mb-4'>Tasks:</h2>
        <TodoList
          todos={todoList}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  )
}

export default App;

