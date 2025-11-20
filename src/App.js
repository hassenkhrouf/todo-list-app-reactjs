import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { ToastProvider } from "./contexts/ToastContext";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Alexandria",
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <ToastProvider>
          <div className="App">
            <TodoList />
          </div>
        </ToastProvider>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
