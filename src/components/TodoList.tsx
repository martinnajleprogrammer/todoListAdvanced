import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

export const TodoList = ({ todos, removeTask, updateTask }: { todos: Todo[], updateTask: (todo: Todo) => void, removeTask: (id: number) => void }) => {

  const Empty = () => <div className='text-center text-ivory-400'>No tasks available. Add a new task to get started!</div>;
  const elemEmpty = (!todos || todos.length === 0) ? <Empty /> : null;
  return (
    <div className='border rounded p-4 w-full mx-auto bg-plum-500 overflow-y-auto max-h-[600px]'>
      {elemEmpty}
      {(!elemEmpty && todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} removeTask={removeTask} updateTask={updateTask}></TodoItem>
      )))}
    </div>
  );
};
export default TodoList;
