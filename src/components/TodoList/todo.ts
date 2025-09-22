export type Todo = {
  id?: string;
  dirty?: boolean;
  text: string;
  completed: boolean;
}
export type FilterType = 'All' | 'Active' | 'Completed';
export type Todos = { todos: Todo[]; loading: boolean; error: string | undefined; };
