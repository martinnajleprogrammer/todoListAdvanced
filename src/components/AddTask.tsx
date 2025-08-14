import { useState } from "react";

const AddTask = ({ addTask }: { addTask: (task: string) => void }) => {
  const [newTask, setNewTask] = useState<string>('');
  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTask.trim() !== '') {
      addTask((event.target as HTMLInputElement).value);
      console.log(`Adding task: ${newTask}`);
      setNewTask('');
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }
  return (<div className='bg-ivory-400  dark:bg-plum-800 border border-plum-300 w-full flex items-center gap-2 p-4 rounded-sm mb-8' >
    <label className="whitespace-nowrap font-bold text-plum-400 dark:text-ivory-200">Add a new task:</label>
    <input
      className="w-full border rounded px-2 py-1 text-plum-400 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-plum-300 dark:bg-plum-700 dark:text-ivory-200 dark:focus:ring-plum-400"
      value={newTask}
      onKeyDown={handleAdd}
      onChange={handleChange}
      type="text"
      placeholder="Enter a new task."
    />
  </div >
  );
}
export default AddTask;