import { Link } from "react-router-dom";

import { auth } from "../services/auth";
import { signOut } from "../services/auth";

interface Props {
  isLogged: boolean;
}

const Nav = () => {
  const isUserConnected = auth.currentUser;

  return (
    <>
      <nav>
        <Link to="/">Welcome</Link>
        {!isUserConnected ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/chat">Chat</Link>
        )}
        <Link to="/names">Names</Link>
        {isUserConnected && <button onClick={signOut}>Logout</button>}
      </nav>
    </>
  );
};

export default Nav;
