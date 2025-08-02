import type { Todo } from '../types/todo';

export const TodoList = ({ todos }: { todos: Todo[] }) => {

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id} >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
export default TodoList;