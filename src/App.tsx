import './App.css'
import TodoList from './components/TodoList'
import Title from './components/Title'
import AddTask from './components/AddTask';
import { useState } from 'react';

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

  const addTask = (text: string) => {
    const newTask = {
      id: todos.length + 1,
      text,
      completed: false
    };
    setTodoList([...todoList, newTask]);

    console.log('New task added:', newTask);
  };
  return (
    <>
      <h1 className="text-3xl font-bold text-red-500">Hello Tailwind</h1>

      <Title />
      <AddTask addTask={addTask} />
      <TodoList todos={todoList} />
    </>
  )
}

export default App;

