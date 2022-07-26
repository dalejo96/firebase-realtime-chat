import { Box } from "@mui/material";
import { GeneralMessage } from "../pages/general_chat/GeneralChat";
import Message from "./Message";

interface Props {
  data: GeneralMessage[];
}

const ChatWindow = ({ data }: Props) => {
  return (
    <Box sx={{ m: "10px", maxHeight: "400px", overflowY: "scroll" }}>
      {data.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {data.map((item, index) => (
            <li key={index}>
              <Message data={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>The group has no messages</p>
      )}
    </Box>
  );
};

export default ChatWindow;
