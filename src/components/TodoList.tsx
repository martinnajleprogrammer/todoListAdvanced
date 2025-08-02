import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

export const TodoList = ({ todos, removeTask }: { todos: Todo[], removeTask: (id: number) => void }) => {

  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} removeTask={removeTask}></TodoItem>
      ))}
    </div>
  );
}
export default TodoList;
