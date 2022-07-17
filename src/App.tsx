import { useEffect, useState } from "react";
import "./App.css";
import { auth, signInWithGoogle, signOut } from "./services/auth";
import { onAuthStateChanged } from "firebase/auth";

function App() {
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

  if (isInitializing) return "Loading...";

  return (
    <>
      {user ? (
        <>
          <button onClick={signOut}>Sign out</button>
          <h1>Welcome to the chat!</h1>
        </>
      ) : (
        <button onClick={logInWithProvider}>Sign in with Google</button>
      )}
      {error && <span>{error}</span>}
    </>
  );
}

export default App;
