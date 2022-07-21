import Base from "./Base";
import Groups from "./Groups";

const GeneralChat = () => {
  return (
    <Base>
      <h1>Welcome to the chat!</h1>
      <h3>Click on one group to chat with your friends!</h3>
      <Groups />
    </Base>
  );
};

export default GeneralChat;
