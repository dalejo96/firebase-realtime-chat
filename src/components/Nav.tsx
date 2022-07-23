import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth, signOut } from "../services/auth";

const Nav = () => {
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    if (!auth.currentUser) return;
    setUser(auth.currentUser);
  }, [auth]);

  return (
    <nav>
      <Link to="/">Welcome</Link>
      {!user ? <Link to="/login">Login</Link> : <Link to="/chat">Chat</Link>}
      <Link to="/friends">Friends</Link>
      <Link to="/general-chat">General Chat</Link>
      {user && <button onClick={signOut}>Logout</button>}
    </nav>
  );
};

export default Nav;
