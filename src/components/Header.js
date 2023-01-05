import React, { useEffect } from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import { db } from "../firebase";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { unsetUser } from "../reducers/userSlice";
import { setDarkMode, setMenu } from "../reducers/visualsSlice";

const Header = () => {
  const { isOpen, darkMode } = useSelector((state) => state.visuals);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(setMenu());
  };

  const signout = () => {
    auth.signOut().then(dispatch(unsetUser()));
  };

  useEffect(() => {
    if (user === null && isOpen === true) {
      /* Cierra el menú lateral cuando el usuario cierra sesión */
      dispatch(setMenu());
    }
  }, [isOpen]);

  return (
    <div className={darkMode ? "header dark" : "header blue"}>
      <div className="header__left">
        <div className="logo">
          <ChatIcon className="logo__icon" />
          <h2>CHAT</h2>
        </div>
      </div>
      <div className={!user ? "header__right hideBm" : "header__right"}>
        <IconButton onClick={toggleMenu}>
          <MenuIcon className="MenuIcon" fontSize="large" />
        </IconButton>
        <div className={`header__menu ${isOpen ? "header__menu--hide" : ""} ${darkMode ? "dark" : "light"}`}>
          <div className={darkMode ? "header__menuTop dark" : "header__menuTop blue"}>
            <Button className={darkMode ? "ButtonBackDark" : "ButtonBack"} onClick={toggleMenu} variant="outlined">
              VOLVER
              <ArrowForwardIcon className="ArrowIcon" />
            </Button>
            <Avatar src={user?.photoURL} />
            <div className="UserWelcome">
              <h4>Bienvenido</h4>
              <h4>{user?.displayName}</h4> {/* conditional chaining */}
            </div>
            {user && (
              <Button color="secondary" onClick={signout} variant="contained">
                Cerrar sesión
              </Button>
            )}
          </div>
          <div className="header__menuBottom">
            <Switch
              checked={darkMode}
              onChange={() => {
                dispatch(setDarkMode());
              }}
            />
            {/* Componente de material UI */}
            {/* Switch tiene una propiedad llamada "checked" en la cual pasaremos la variable darkmode*/}
            <DarkModeOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
