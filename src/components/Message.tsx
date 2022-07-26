import { Box, Typography } from "@mui/material";
import { GeneralMessage } from "../pages/general_chat";

interface Props {
  data: GeneralMessage;
}

const Message = ({ data }: Props) => {
  const { name, message, timestamp } = data;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "10px 0px",
        p: "10px",
        backgroundColor: "#e4e6fb",
        borderRadius: "0px 25px 25px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={16} color="text.secondary">
          {name}
        </Typography>
        <Typography fontSize={12} color="text.secondary" sx={{}}>
          {new Date(timestamp).toLocaleString()}
        </Typography>
      </Box>
      <Typography fontSize={14} color="text.primary">
        {message}
      </Typography>
    </Box>
  );
};

export default Message;
