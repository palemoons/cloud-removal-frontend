import React from 'react';
import Home from '@/pages/Home';
import ThemeContext from '@/components/ThemeContext';

const App = () => {
  return (
    <ThemeContext.Provider value="light">
      <Home />
    </ThemeContext.Provider>
  );
};

export default App;
