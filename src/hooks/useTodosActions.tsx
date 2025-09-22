import { addTodoLocal, removeTodoLocal, updateTodoLocal, cloneTodoLocal } from '../store/slices/todosSlice';
import type { Todo } from '../components/TodoList/todo'; // Adjust the path to where the Todo type is defined
import { enqueue } from '../store/slices/queueSyncSlice';
import { useAppDispatch } from './hooks';

export const useTodosActions = () => {
  const dispatch = useAppDispatch();

  const addTodo = (text: string) => {
    const tempTodo: Todo = { id: "temp-" + Date.now(), text, completed: false };
    dispatch(addTodoLocal(tempTodo));
    dispatch(enqueue({ type: "add", payload: tempTodo }));
  };

  const updateTodo = (todo: Todo) => {
    dispatch(updateTodoLocal({ ...todo, dirty: true }));
    dispatch(enqueue({ type: "update", payload: todo }));
  };

  const removeTodo = (id: string) => {
    dispatch(removeTodoLocal(id));
    dispatch(enqueue({ type: "remove", payload: { id } }));
  };

  const cloneTodo = (todo: Todo) => {
    const tempTodo: Todo = { ...todo, id: "temp-" + Date.now(), dirty: true };
    dispatch(cloneTodoLocal(tempTodo));
    dispatch(enqueue({ type: "clone", payload: { ...tempTodo } }));
  };

  return { addTodo, updateTodo, cloneTodo, removeTodo };
};