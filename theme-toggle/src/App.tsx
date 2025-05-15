// ThemeToggle.js
import { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
   <div className={`h-screen w-screen flex justify-center items-center ${darkMode ? 'bg-[greeb]' : 'bg-[white]'}`}>
     <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌙' : '☀️'}
    </button>
   </div>
  );
};

export default App;
