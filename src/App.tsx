import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

import GeneralChat from "./components/GeneralChat";
import Login from "./components/Login";
import Names from "./components/Names";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="names" element={<Names />} />
      <Route path="chat" element={<GeneralChat />} />
      <Route path="chat/group/:groupName" element={<Chat />} />
    </Routes>
  );
};

export default App;
