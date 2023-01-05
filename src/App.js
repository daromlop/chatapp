import React from "react";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect } from "react";
import { auth } from "./firebase";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userSlice";

function App() {
  const { isOpen, darkMode } = useSelector((state) => state.visuals);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
    console.log(user);
  }, []);

  const dark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ff8300",
        dark: "#fca753",
      },
      secondary: {
        dark: "#fca753",
        main: "#ff8300",

        contrastText: "#121212",
      },
    },
  });

  const light = createTheme({
    palette: {
      mode: "light",
      secondary: {
        main: "#a8e0ff",
        light: "#dbffff",
        dark: "#dbffff",
        contrastText: "#000000",
      },
      primary: {
        main: "#1691c2",
      },
    },
  });

  return (
    <div className="app">
      {!user /* Si no existe usuario se sigue enseñando login si existe uno pasa a enseñar App */ ? (
        <>
          <Header />
          <Login />
        </>
      ) : (
        <>
          <ThemeProvider theme={darkMode ? dark : light}>
            <CssBaseline />
            {/* Componente de MUI que sirve para que el App acepte el cambio de modo dark a modo light */}
            <Header />
            <div className={`app__central ${isOpen ? "displayed" : ""}`}>
              <Main />
            </div>
          </ThemeProvider>
        </>
      )}
    </div>
  );
}

export default App;
