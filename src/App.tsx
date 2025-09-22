import { useState, useMemo, useEffect, useRef, type ChangeEvent } from 'react';
import TodoList from './components/TodoList/TodoList';
import Title from './components/Title';
import AddTask from './components/AddTask';
import Filter from './components/Filter';
import type { FilterType, Todo } from './components/TodoList/todo';
import Totals from './components/Totals';
import ToggleDarkMode from './components/ToggleDarkMode';
import DBStatus from './components/DBStatus';
import { useTodos } from './hooks/useTodos';
import { useJSON } from './hooks/useJSON';
import { clearQueue, flushQueueThunk } from './store/slices/queueSyncSlice';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { saveTodosThunk } from './store/slices/todosSlice';

function App() {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

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

  const { saveJSON, loadJSON } = useJSON(filteredTodos);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { todos, addTask, cloneTask, removeTask, updateTask } = useTodos();

  const dispatch = useAppDispatch();
  const queue = useAppSelector((s) => s.queue.syncQueue);

  useEffect(() => {
    if (queue.length === 0) return;

    const REFRESH_TIMEOUT = 5000;
    const timer = setTimeout(() => {
      dispatch(flushQueueThunk());
      dispatch(clearQueue());
    }, REFRESH_TIMEOUT);

    const BATCH_SIZE = 20;
    if (queue.length >= BATCH_SIZE) {
      dispatch(flushQueueThunk());
      dispatch(clearQueue());
    }

    return () => clearTimeout(timer);
  }, [queue, dispatch]);


  useEffect(() => {
    setAllTodos(todos);
  }, [todos]);

  const handleJSON = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const data = await loadJSON(e);
      if (data) {
        // Sync with the API
        dispatch(saveTodosThunk({ todos: data }));
        setAllTodos(data);
      }
    }
    catch (error) {
      console.error("Error loading JSON:", error);
    }

  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (

    <div className=' flex flex-col max-w-[50vw] w-[50vw] mx-auto custom-shadow gap-2 justify-center pt-8 pb-16 pr-32 pl-32  bg-ivory-200 dark:bg-dusty-500  text-ivory-200 min-h-screen'>
      <ToggleDarkMode />
      <DBStatus />
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
        <div className='flex flex-row items-center mt-4'>
          <Totals taskName={filter} number={filteredTodos.length} />
          <button
            className='bg-plum-400 hover:bg-plum-500 text-ivory-200 px-4 py-2 rounded-md w-fit ml-4'
            onClick={() => saveJSON()}
          >
            Export Json
          </button>
          <div
            onClick={handleClick}
            className="bg-plum-400 hover:bg-plum-500 text-ivory-200 px-4 py-2 rounded-md w-fit ml-4 cursor-pointer"
          >
            Load JSON
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleJSON(e)}
              ref={inputRef}
              style={{ display: "none" }} // ocultamos el input
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;