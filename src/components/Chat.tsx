import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { auth } from "../services/auth";
import { database } from "../services/database";
import Base from "./Base";
import Message from "./Message";

import type { GeneralMessage } from "../pages/general_chat/GeneralChat";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  const [user] = useState(() => auth.currentUser);
  const { groupName } = useParams<{ groupName: string }>();
  const groupReference = ref(database, `groups/${groupName}/messages`);
  const [messages, setMessages] = useState<GeneralMessage[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<GeneralMessage>();

  useEffect(() => {
    if (!groupName) return;
    onValue(groupReference, (snapshot) => {
      const messages = Object.values(snapshot.val()) as GeneralMessage[];
      setMessages(messages);
    });
  }, []);

  const submitMessage = (data: GeneralMessage) => {
    if (!user) return;
    push(groupReference, {
      message: data.message,
      timestamp: new Date().getTime(),
      name: user.displayName,
      owner: user.uid,
    });
    reset();
  };

  return (
    <Base>
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          {`Welcome to the chat of the group: ${groupName}!`}
        </Typography>
        <form onSubmit={handleSubmit(submitMessage)}>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, flexGrow: 1 }} variant="standard">
              <InputLabel htmlFor="input-message">Message: </InputLabel>
              <Input
                id="input-message"
                type="text"
                {...register("message", {
                  required: "You have to insert a message",
                })}
              />
            </FormControl>
            <Button type="submit">Add</Button>
          </Box>
          {errors && (
            <span style={{ color: "red" }}>{errors.message?.message}</span>
          )}
        </form>
        <ChatWindow data={messages} />
      </Container>
    </Base>
  );
};

export default Chat;
