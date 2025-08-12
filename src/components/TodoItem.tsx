import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

const TodoItem = ({
  todo,
  removeTask,
  updateTask,
  cloneTask
}: {
  todo: Todo;
  removeTask: (id: number) => void;
  updateTask: (todo: Todo) => void;
  cloneTask: (id: number) => void;
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
    if (event.key === 'Escape' && editing) {
      setEditing(false);
      setText(todo.text);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      editing &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      handleSave();
      setEditing(false);
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
      className="flex justify-between items-center m-2 p-4 rounded-lg 
                 bg-ivory-200
                 dark:bg-plum-800 dark:text-ivory-200 
                 transition-colors duration-200
                 border-2
                 dark:border-plum-400  text-plum-400"

    >
      {!editing ? (
        <div
          className={
            todo.completed
              ? 'line-through decoration-charcoal-800 dark:decoration-ivory-400 dark:border-plum-200 decoration-[2px] rounded-sm'
              : ''
          }
        >
          {todo.text}
        </div>
      ) : (
        <input
          value={text}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeydown}
          autoFocus
          className="bg-transparent border border-charcoal-500 dark:border-ivory-400 focus:outline-none"
        />
      )}
      <div className="flex items-center gap-2">
        <button
          aria-label="Clone task"
          onClick={(e) => {
            e.stopPropagation();
            cloneTask(todo.id);
          }}
          className="p-1 rounded bg-plum-500 text-ivory-500 hover:bg-plum-600
                     dark:bg-plum-700 dark:hover:bg-plum-600 dark:border-plum-400"
        >
          C
        </button>
        <button
          aria-label="Remove task"
          onClick={(e) => {
            e.stopPropagation();
            removeTask(todo.id);
          }}
          className="p-1 rounded bg-plum-500 text-ivory-500 hover:bg-plum-600
                     dark:bg-plum-700 dark:hover:bg-plum-600 dark:border-plum-400"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
