import { useState, useMemo } from 'react';
import TodoList from './components/TodoList';
import Title from './components/Title';
import AddTask from './components/AddTask';
import Filter from './components/Filter';
import type { Todo } from './types/todo';
import Totals from './components/Totals';
import ToggleDarkMode from './components/ToggleDarkMode';

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Learn TypeScript', completed: false },
  { id: 3, text: 'Build a Todo App', completed: true }
];

function App() {
  const [allTodos, setAllTodos] = useState(initialTodos);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const removeTask = (id: number) => {
    setAllTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const cloneTask = (id: number) => {
    setAllTodos(prev => {
      const index = prev.findIndex(todo => todo.id === id);
      if (index === -1) return prev;
      const newTask = { ...prev[index], id: prev.length + 1 };
      return [...prev, newTask];
    });
  };

  const updateTask = (updatedTodo: Todo) => {
    setAllTodos(prev =>
      prev.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const addTask = (text: string) => {
    setAllTodos(prev => [
      ...prev,
      { id: prev.length + 1, text, completed: false }
    ]);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'Active':
        return allTodos.filter(todo => !todo.completed);
      case 'Completed':
        return allTodos.filter(todo => todo.completed);
      case 'All':
      default:
        return allTodos;
    }
  }, [allTodos, filter]);

  return (

    <div className='custom-shadow flex flex-col justify-center pt-8 pb-16 pr-32 pl-32  bg-ivory-200 dark:bg-dusty-500  text-ivory-200 min-h-screen'>
      <ToggleDarkMode />

      <Title />
      <div className='flex flex-col mt-16'>
        <AddTask addTask={addTask} />
        <h2 className=' dark:text-ivory-200 text-xl font-semibold mb-2 text-plum-400'>Tasks:</h2>

        <Filter filter={filter} handleFilter={(f: string) => setFilter(f as any)} />

        <TodoList
          todos={filteredTodos}
          removeTask={removeTask}
          updateTask={updateTask}
          cloneTask={cloneTask}
        />
        <Totals taskName={filter} number={filteredTodos.length} />

      </div>
    </div>
  );
}

export default App;
