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
  return (
    <>
      <label>Add a new task:</label>
      <input value={newTask} onKeyDown={handleAdd} onChange={handleChange} type="text" placeholder="Enter a new task."></input>
    </>
  )
}
export default AddTask;
// This component is used to add a new task to the todo list.