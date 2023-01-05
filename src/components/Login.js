import { auth, provider } from "../firebase";
import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";

const Login = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => dispatch(setUser(result.user)))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <h1>¡Entra con tu cuenta de Google y empieza a chatear!</h1>
      <Button variant="contained" onClick={signin}>
        Iniciar sesión con Google
      </Button>
    </div>
  );
};

export default Login;
