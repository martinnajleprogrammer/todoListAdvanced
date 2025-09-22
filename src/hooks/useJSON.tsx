import type { Todo } from "../components/TodoList/todo";

export function useJSON(filteredTodos: Todo[]) {

  const saveJSON = (filename = "todoList.json") => {
    const blob = new Blob([JSON.stringify(filteredTodos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const loadJSON = async (e: React.ChangeEvent<HTMLInputElement>): Promise<Todo[] | undefined> => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    return new Promise<Todo[] | undefined>((resolve, reject) => {
      reader.onload = (event) => {
        try {
          if (!event.target?.result) throw new Error("No file content");
          const result = event.target.result;
          if (typeof result === 'string') {
            resolve(JSON.parse(result) as Todo[]);
          } else {
            console.error("File content is not a valid string");
            reject(new Error("File content is not a valid string"));
          }
        } catch (error) {
          alert("Invalid Json file");
          console.error("Invalid JSON file format");
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsText(file);
    });
  };
  return {
    loadJSON,
    saveJSON
  };
}