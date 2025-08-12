import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

export const TodoList = ({ todos, removeTask, updateTask, cloneTask }: { todos: Todo[], updateTask: (todo: Todo) => void, removeTask: (id: number) => void, cloneTask: (id: number) => void }) => {

  const Empty = () => <div className='text-center text-ivory-400 dark:text-ivory-200'>No tasks available to display. Change the filter or add a new task to get started!</div>;
  const elemEmpty = (!todos || todos.length === 0) ? <Empty /> : null;
  return (
    <div className='border border-plum-300 rounded p-4 w-full mx-auto bg-ivory-400 text-plum-400  dark:bg-plum-800 overflow-y-auto max-h-[600px]'>
      {elemEmpty}
      {(!elemEmpty && todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} cloneTask={cloneTask} removeTask={removeTask} updateTask={updateTask}></TodoItem>
      )))}
    </div>

  );
};
export default TodoList;
