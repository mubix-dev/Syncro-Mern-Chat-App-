import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useCurrentUser from "./hooks/useCurrentUser.js";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import useOtherUserData from "./hooks/useOtherUsersData.js";
import useGetMessages from "./hooks/useGetMessages.js";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { serverURL } from "./main.jsx";
import { setOnlineUsers, setSocket } from "./redux/userSlice.js";

function App() {
  useCurrentUser();
  useOtherUserData();
  useGetMessages();
  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      const socketIo = io(`${serverURL}`, {
        query: {
          userId: userData?._id,
        },
      });
      dispatch(setSocket(socketIo));

      socketIo.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socketIo.close();
      };
    }else{
      if(socket){
        socket.close()
      dispatch(setSocket(null))
      }
    }
  }, [userData]);
  return (
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to={"/profile"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to={"/signup"} />}
      />
    </Routes>
  );
}

export default App;
