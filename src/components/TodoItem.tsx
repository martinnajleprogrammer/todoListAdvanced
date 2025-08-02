import { useState } from 'react';
import type { Todo } from '../types/todo';
const TodoItem = ({ todo, removeTask }: { todo: Todo, removeTask: (id: number) => void }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value); // Update the state to trigger a re-render
  }
  const handleSave = () => {
    // Here you would typically save the edited task
    if (text.trim() !== '' && text !== todo.text) {
      todo.text = text; // Update the todo item with the new text
      console.log(`Saving task: ${todo.text}`);
    }
    setEditing(false);
  };
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  }
  return (
    <div onKeyDown={handleKeydown} onDoubleClick={handleEdit} className='flex justify-between items-center p-2 border-gray-200'>
      {!editing ? todo.text : <input value={text} onChange={handleChange}></input>}
      <button onClick={() => removeTask(todo.id)} className='p-1'>X</button>
    </div>);
}
export default TodoItem;

