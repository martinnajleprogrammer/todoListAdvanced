import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/slices/uiSlice";
import type { RootState } from "../store";
import { useEffect } from "react";

const useDarkMode = (): [boolean, () => void] => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  useEffect(() => {
    const className = 'dark';
    const bodyClass = document.body.classList;

    if (darkMode) bodyClass.add(className);
    else bodyClass.remove(className);

    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };
  return [darkMode, toggle];
};

export default useDarkMode;