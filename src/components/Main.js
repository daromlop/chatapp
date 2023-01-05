import React, { useState, useEffect, useRef } from "react";
import "./Main.css";
import Post from "./Post";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";

const Main = () => {
  const { user } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    text: "",
  });

  const [likes, setLikes] = useState([]);

  const mainPosts = useRef(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    closeMm();
  }, []);

  const closeMm = () => {
    /* Cierra post__info (Post.js) cuando el usuario cierra sesión */
    const postmessm = db.collection("posts").where("messmenu", "==", true);

    postmessm.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          messmenu: false,
        });
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.text) {
      /* Si el usuario ha escrito algo en input.title e input.text */
      db.collection("posts").add({
        text: input.text,
        username: user?.displayName /* Graba el nombre de usuario que ha hecho el post */,
        avatar: user?.photoURL /* Guarda el avatar de usuario que ha hecho el post */,
        email: user?.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isActive: false /* Propiedad que controla los likes a los posts */,
        likes: likes,
        sameuser: false,
        messmenu: false,
      });

      setInput({
        text: "",
        /* Usamos de nuevo setInput para limpiar la barra depués de haber enviado el mensaje */
      });

      setTimeout(updateScroll, 125);
    } else {
      alert("Escribe un mensaje.");
    } /* Si el usuario no escribe nada no se envía el mensaje y recibe un alert */
  };

  const updateScroll = () => {
    if (Post) {
      let scrollHeight = window.innerHeight * 0.8;

      console.log(Post);

      mainPosts.current.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="main">
      <div className="main__posts" ref={mainPosts}>
        <div className="post__width">
          {
            <FlipMove>
              {posts.map(({ id, data: { text, isActive, username, avatar, likes, sameuser, messmenu } }) => (
                <Post
                  key={id}
                  id={id}
                  text={text}
                  isActive={isActive}
                  username={username}
                  avatar={avatar}
                  likes={likes}
                  sameuser={sameuser}
                  messmenu={messmenu}
                />
              ))}
            </FlipMove>

            /* FlipMove: Componente de librería de animación de React */

            /* username y avatar: Lo usamos para que guarde el avatar y el usuario del que hizo el post */
          }
        </div>
        <div className="main__postsBack"></div>
      </div>

      <div className="main__input">
        <Box component="form" noValidate autoComplete="off">
          <div className="main__inputForm">
            <TextField
              className="main__inputFormText"
              id="outlined-basic"
              label="Mensaje"
              variant="outlined"
              color="primary"
              value={input.text}
              onChange={(e) => setInput({ ...input, text: e.target.value })}
            />
          </div>
          <button className="button" type="submit" onClick={handleSubmit}></button>
        </Box>
      </div>
    </div>
  );
};

export default Main;
