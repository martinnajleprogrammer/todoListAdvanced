import type { Todo } from '../src/types/todo';

// Base API URL - change this for production
const BASE_URL = 'http://localhost:3000';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      signal
    });

    // Check HTTP response status
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`API error in ${endpoint}:`, err);
    throw err; // Rethrow so the UI can decide what to do
  }
}

// API interface
export const API = {
  /**
   * Load all Todos
   */
  loadTodos: (signal?: AbortSignal) =>
    request<Todo[]>('/todos', {}, signal),

  /**
   * Create a new Todo
   */
  createTodo: (task: Todo, signal?: AbortSignal) =>
    request<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(task)
    }, signal),

  /**
   * Update an existing Todo by ID
   */
  updateTodo: (id: string, task: Todo, signal?: AbortSignal) =>
    request<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task)
    }, signal),

  /**
   * Delete a Todo by ID
   */
  deleteTodo: (id: string, signal?: AbortSignal) =>
    request<void>(`/todos/${id}`, {
      method: 'DELETE'
    }, signal)
};
