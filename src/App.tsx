import { useState, useMemo, useEffect } from 'react';
import TodoList from './components/TodoList';
import Title from './components/Title';
import AddTask from './components/AddTask';
import Filter from './components/Filter';
import type { FilterType, Todo } from './types/todo';
import Totals from './components/Totals';
import ToggleDarkMode from './components/ToggleDarkMode';
import { API } from '../API/APITodos';
function App() {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');


  useEffect(() => {
    const controller = new AbortController();
    try {
      async function fetchData() {
        const data = await API.loadTodos(controller.signal);
        setAllTodos(data);
      }
      fetchData();
    }
    catch (error) {

      console.error('Error fetching todos:', error);
    }
    return () => controller.abort()
  }, []);

  const removeTask = (id: string) => {
    if (!id) return;
    setAllTodos(prev => prev.filter(todo => todo.id !== id));
    API.deleteTodo(id)
      .then(() => {
        console.log('Task deleted successfully');
      })
      .catch((error: Error) => {
        console.error('Error deleting task:', error);
      });
  };

  const cloneTask = async (id: string) => {

    try {
      const cloneTask: Todo | undefined = allTodos.find(todo => todo.id === id);
      if (!cloneTask) return;
      const newTask = { ...cloneTask, id: undefined };
      const newTodo = await API.createTodo(newTask)
      setAllTodos(prev => [...prev, newTodo]);

    } catch (error) {
      console.error('Error cloning task:', error);
    }
  };

  const updateTask = async (updatedTodo: Todo) => {
    try {
      const existingTodo = allTodos.find(todo => todo.id === updatedTodo.id);
      if (!existingTodo) {
        console.error('Task not found for update:', updatedTodo.id);
        return;
      }
      setAllTodos(prev =>
        prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      if (!updatedTodo.id) {
        console.error('Task ID is missing for update:', updatedTodo);
        return;
      }
      await API.updateTodo(updatedTodo.id, updatedTodo);
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);

    }
  };

  const addTask = async (text: string) => {
    try {
      if (!text.trim()) return;
      const newTodo = await API.createTodo({ text, completed: false });
      setAllTodos(prev => [...prev, newTodo]);
      console.log('Task added successfully:', newTodo);
    } catch (error) {
      console.error('Error adding task:', error);
      return;
    }
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

    <div className=' flex flex-col max-w-[50vw] w-[50vw] mx-auto custom-shadow gap-2 justify-center pt-8 pb-16 pr-32 pl-32  bg-ivory-200 dark:bg-dusty-500  text-ivory-200 min-h-screen'>
      <ToggleDarkMode />
      <Title />
      <div className='flex flex-col mt-16 flex-1'>
        <AddTask addTask={addTask} />
        <h2 className=' dark:text-ivory-200 text-xl font-semibold mb-2 text-plum-400'>Tasks:</h2>

        <Filter filter={filter} handleFilter={(f: FilterType) => setFilter(f)} />

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
