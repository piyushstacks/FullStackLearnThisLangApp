import React, { useState } from 'react';

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Optionally, you can store the theme preference in local storage or a state management solution
    // localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
      }`}
      onClick={toggleTheme}
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
