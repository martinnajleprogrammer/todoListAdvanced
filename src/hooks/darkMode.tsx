import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const className = 'dark';
    const bodyClass = document.body.classList;

    if (darkMode) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}
export default useDarkMode;
