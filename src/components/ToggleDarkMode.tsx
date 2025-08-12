import useDarkMode from "../hooks/darkMode";

const ToggleDarkMode = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (<div className="absolute top-8 right-8 bg-ivory-200 dark:bg-plum-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center w-48 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-md">
    <p className="mb-2">Mode {darkMode ? 'Dark' : 'Light'}</p>
    <button
      onClick={() => toggleDarkMode()}
      className="px-4 py-2 border bg-plum-400  dark:bg-plum-500 text-white rounded hover:bg-plum-600 transition"
    >
      Toggle mode
    </button>
  </div>)
}
export default ToggleDarkMode;