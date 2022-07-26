import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

import WelcomeChat from "./pages/chat/WelcomeChat";
import Login from "./pages/login/Login";
import Friends from "./pages/friends/Friends";
import GeneralChat from "./pages/general_chat/GeneralChat";
import Welcome from "./pages/welcome/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="friends" element={<Friends />} />
      <Route path="chat" element={<WelcomeChat />} />
      <Route path="chat/group/:groupName" element={<Chat />} />
      <Route path="general-chat" element={<GeneralChat />} />
    </Routes>
  );
};

export default App;
