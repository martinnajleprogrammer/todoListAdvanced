import React from "react";

const AddTask = ({ addTask }: { addTask: (task: string) => void }) => {
  const [newTask, setNewTask] = React.useState<string>('');
  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTask.trim() !== '') {
      // Here you would typically call a function to add the task to the list
      addTask((event.target as HTMLInputElement).value);
      console.log(`Adding task: ${newTask}`);
      setNewTask(''); // Clear the input field after adding the task
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }
  return (<div className='bg-plum-500 border border-plum-300 w-full flex items-center gap-2 p-4 rounded-sm mb-8' >
    <label className="whitespace-nowrap font-bold text-ivory-400">Add a new task:</label>
    <input
      className="w-full border rounded px-2 py-1"
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