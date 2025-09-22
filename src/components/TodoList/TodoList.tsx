import React from 'react';
import type { Todo } from './todo';
import TodoItem from './TodoItem';

export const TodoList = ({ todos, removeTask, updateTask, cloneTask }: { todos: Todo[], updateTask: (todo: Todo) => void, removeTask: (id: string) => void, cloneTask: (todo: Todo) => void }) => {
  const [descending, setDescending] = React.useState(true);
  const Empty = () => <div className='text-center text-plum-400 dark:text-ivory-200'>No tasks available to display. Change the filter or add a new task to get started!</div>;
  const isEmpty = (!todos || todos.length === 0);
  const elemEmpty = isEmpty ? <Empty /> : null;
  const sortable = todos && todos.length > 1;

  if (todos.length > 0) {
    if (descending) {
      todos = todos.slice().sort((a, b) => (b.text || '').localeCompare(a.text || ''));
    } else {
      todos = todos.slice().sort((a, b) => (a.text || '').localeCompare(b.text || ''));
    }
  }
  return (
    <div className='border border-plum-300 rounded p-4 w-full mx-auto bg-ivory-400 text-plum-400  dark:bg-plum-800 overflow-y-auto max-h-[600px]'>
      {sortable && <div onClick={() => setDescending(!descending)} className='sort text-plum-400 dark:text-ivory-200 p-2 w-8 border-2 border-plum-300 rounded cursor-pointer'>
        <div className={descending ? 'sort-desc' : 'sort-asc'}></div>
      </div>}
      {elemEmpty}
      {(!elemEmpty && todos.map((todo: Todo) => {
        if (!todo) return null;
        return todo.id && < TodoItem key={todo.id} todo={todo} cloneTask={cloneTask} removeTask={removeTask} updateTask={updateTask} ></TodoItem>;
      }))}
    </div>

  );
};
export default TodoList;
