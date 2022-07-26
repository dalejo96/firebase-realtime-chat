import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

import WelcomeChat from "./pages/chat";
import Login from "./pages/login";
import Friends from "./pages/friends";
import GeneralChat from "./pages/general_chat";
import Welcome from "./pages/welcome";

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
