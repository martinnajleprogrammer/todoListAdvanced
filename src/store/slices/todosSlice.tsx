import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../../API/APITodos';
import type { Todos, Todo } from '../../components/TodoList/todo';

const initialState: Todos = {
  todos: [],
  loading: false,
  error: undefined,
};

// --- THUNKS ---
export const loadTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  const { signal } = thunkAPI;
  const todos = await API.loadTodos(signal);
  return todos;
});

export const saveTodosThunk = createAsyncThunk(
  'todos/saveTodos',
  async ({ todos }: { todos: Todo[] }) => {
    for (const todo of todos) {
      if (todo.id) {
        await API.createTodo({ text: todo.text, completed: todo.completed, dirty: undefined });
      }
    }
    return todos;
  }
);

export const createTodoThunk = createAsyncThunk(
  'todos/createTodo',
  async ({ text, tempId }: { text: string, tempId: string }) => {
    const newTodo = await API.createTodo({ id: undefined, text, completed: false });
    return { todo: newTodo, tempId };
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo: Todo) => {
    if (!updatedTodo.id) throw new Error("Todo ID is required for update");
    const newTodo = { ...updatedTodo };
    delete newTodo.dirty;
    const todo = await API.updateTodo(updatedTodo.id, newTodo);
    return todo;
  }
);

export const cloneTaskThunk = createAsyncThunk(
  'todos/cloneTodo',
  async ({ todo, tempId }: { todo: Todo; tempId: string }) => {
    if (!todo.id) throw new Error("Todo ID is required for clone");
    const newTodo = { ...todo };
    delete newTodo.dirty;
    const cloned = await API.createTodo({ ...newTodo, id: undefined });
    return { todo: cloned, tempId };
  }
);

export const removeTaskThunk = createAsyncThunk('todos/removeTask', async (id: string, thunkAPI) => {
  const { signal } = thunkAPI;
  await API.deleteTodo(id, signal);
  return id;
});

// --- SLICE ---
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoLocal: (state, action: PayloadAction<Todo>) => {
      state.todos.push({ id: action.payload.id, text: action.payload.text, dirty: true, completed: false });
    },
    removeTodoLocal: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodoLocal: (state, action: PayloadAction<Todo>) => {
      const idx = state.todos.findIndex(t => t.id === action.payload.id);
      if (idx > -1) {
        state.todos[idx] = { ...action.payload, dirty: true };
      }
    },
    cloneTodoLocal: (state, action: PayloadAction<Todo>) => {
      state.todos.push({ ...action.payload, dirty: true });
    },
  },
  extraReducers: (builder) => {
    builder
      // LOAD
      .addCase(loadTodos.pending, (state) => { state.loading = true; })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // CREATE
      .addCase(createTodoThunk.fulfilled, (state, action) => {
        const { tempId, todo } = action.payload;
        const idx = state.todos.findIndex(t => t.id === tempId);
        if (idx !== -1) {
          state.todos[idx] = { ...todo, id: todo.id, dirty: false };
        } else {
          state.todos.push({ ...todo, dirty: false });
        }
      })
      .addCase(createTodoThunk.rejected, (state, action) => { state.error = action.error.message; })
      // REMOVE
      .addCase(removeTaskThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(removeTaskThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // UPDATE
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const idx = state.todos.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.todos[idx] = { ...action.payload, dirty: false };
      })
      .addCase(updateTodoThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // CLONE
      .addCase(cloneTaskThunk.fulfilled, (state, action) => {
        debugger;
        const { tempId, todo } = action.payload;
        const idx = state.todos.findIndex(t => t.id === tempId);
        if (idx !== -1) {
          state.todos[idx] = { ...todo, id: todo.id, dirty: false };
        }
      })
      .addCase(cloneTaskThunk.pending, (state) => { state.loading = true; state.error = undefined; })
      .addCase(cloneTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error cloning";
      })
      // SAVE ALL, is saved directly from JSON, skipping the sync queue
      .addCase(saveTodosThunk.pending, (state) => { state.loading = true; state.error = undefined; })
      .addCase(saveTodosThunk.fulfilled, (state) => { state.loading = false; state.error = undefined; })
      .addCase(saveTodosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error saving todos";
      });
  },
});

export const { addTodoLocal, removeTodoLocal, updateTodoLocal, cloneTodoLocal } = todosSlice.actions;
export default todosSlice.reducer;
