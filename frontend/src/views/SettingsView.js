import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme';
import { GlobalStyles } from '../Global';

function SettingsView() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
   <ThemeProvider theme= {theme === 'light' ? lightTheme : darkTheme}>
     <h1>Settings</h1>
     <>
     <GlobalStyles />
     <button onClick={toggleTheme}>Toggle theme</button>
     </>
     </ThemeProvider>
  );
}

export default SettingsView;
