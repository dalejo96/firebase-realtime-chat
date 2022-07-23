import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

import WelcomeChat from "./components/WelcomeChat";
import Login from "./components/Login";
import Friends from "./components/Names";
import Welcome from "./components/Welcome";
import GeneralChat from "./components/GeneralChat";

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
