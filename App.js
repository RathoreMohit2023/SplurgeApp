import React from "react";
import MainApp from "./src/MainApp";
import { ThemeProvider } from "./src/components/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
