import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

const TodoItem = ({
  todo,
  removeTask,
  updateTask,
}: {
  todo: Todo;
  removeTask: (id: number) => void;
  updateTask: (todo: Todo) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    setText(todo.text);
    setEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed && trimmed !== todo.text) {
      updateTask({ ...todo, text: trimmed });
    }
    setEditing(false);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSave();
  };


  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      editing &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      handleSave();
      setEditing(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editing, text]);

  const handleClick = () => {
    if (!editing) {
      updateTask({ ...todo, completed: !todo.completed });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onDoubleClick={handleEdit}
      onKeyDown={handleKeydown}
      className="flex justify-between items-center bg-charcoal-500 text-ivory-50 m-2 p-4"
    >
      {!editing ? (
        <div className={todo.completed ? 'line-through decoration-charcoal-800 decoration-[2px] rounded-sm' : ''}>
          {todo.text}
        </div>
      ) : (
        <input
          value={text}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeTask(todo.id);
        }}
        className='p-1 bg-plum-500 text-ivory-500'
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
