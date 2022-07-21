import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/auth";
import Base from "./Base";
import Groups from "./Groups";

const GeneralChat = () => {
  const [user] = useState(() => auth.currentUser);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Base>
      <h1>Welcome to the chat!</h1>
      <h3>Click on one group to chat with your friends!</h3>
      <Groups />
    </Base>
  );
};

export default GeneralChat;
