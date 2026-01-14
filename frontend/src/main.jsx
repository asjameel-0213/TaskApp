import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext";

import { store } from "./app/store";
import App from "./App";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/themes";

// Root wrapper that holds global providers and theme state
export function Root() {

  // Beginner note: darkMode controls which theme is active
  const [darkMode, setDarkMode] = useState(false);

  // Toggle function passed to Navbar via <App />
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {/* Global CSS reset + theme-based colors */}
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            {/* Pass theme controls down to App so Navbar can use them */}
            <App darkMode={darkMode} toggleTheme={toggleTheme} />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />)
