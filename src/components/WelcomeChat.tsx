import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/auth";
import Base from "./Base";
import Groups from "./Groups";

const WelcomeChat = () => {
  const [user] = useState(() => auth.currentUser);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Base>
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          paragraph
        >
          Welcome to the chat!
        </Typography>
        <Typography variant="h6" align="justify" color="text.secondary">
          Click on one group to chat with your friends!
        </Typography>
        <Groups />
      </Container>
    </Base>
  );
};

export default WelcomeChat;
