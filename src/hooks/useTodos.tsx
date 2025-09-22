
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../store/slices/todosSlice";
import { useTodosActions } from "../hooks/useTodosActions";
import type { AppDispatch, RootState } from "../store";

export function useTodos() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const { addTodo, removeTodo, updateTodo, cloneTodo } = useTodosActions();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return {
    todos,
    addTask: addTodo,
    removeTask: removeTodo,
    updateTask: updateTodo,
    cloneTask: cloneTodo,
  };
}