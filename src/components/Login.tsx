import { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../services/auth";
import { onAuthStateChanged } from "firebase/auth";
import Base from "./Base";
import { Navigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { BorderColor, Google } from "@mui/icons-material";

const Login = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [error, setError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  const logInWithProvider = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (isInitializing) {
        setIsInitializing(false);
      }
    });
    return unsubscribe();
  }, []);

  if (isInitializing) return <p>"Loading..."</p>;
  if (user) return <Navigate to="/chat" replace />;

  return (
    <Base>
      <Box
        sx={{
          m: 8,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            If you want to create groups and share messages with your friends.
            Sign up using a Google account.
          </Typography>
          {!user && (
            <Button
              variant="contained"
              startIcon={<Google />}
              onClick={logInWithProvider}
            >
              Log in with Google
            </Button>
          )}
          {error && <span>{error}</span>}
        </Container>
      </Box>
    </Base>
  );
};

export default Login;
