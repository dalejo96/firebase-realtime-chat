import { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../services/auth";
import { onAuthStateChanged } from "firebase/auth";
import Nav from "./Nav";

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

  if (isInitializing) return <>"Loading..."</>;

  return (
    <>
      <Nav />
      {!user && (
        <button onClick={logInWithProvider}>Sign in with Google</button>
      )}
      {error && <span>{error}</span>}
    </>
  );
};

export default Login;
