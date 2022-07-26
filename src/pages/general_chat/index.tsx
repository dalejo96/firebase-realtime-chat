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
import { database } from "../../services/database";
import Base from "../../components/Base";
import Message from "../../components/Message";
import ChatWindow from "../../components/ChatWindow";

export interface GeneralMessage {
  name: string;
  message: string;
  timestamp: number;
  owner?: string;
}

const GeneralChat = () => {
  const generalChatRef = ref(database, "generalChat");
  const [messages, setMessages] = useState<GeneralMessage[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<GeneralMessage>();

  useEffect(() => {
    onValue(generalChatRef, (snapshot) => {
      const messages = Object.values(snapshot.val()) as GeneralMessage[];
      setMessages(messages);
    });
  }, []);

  const submitTodo = (data: GeneralMessage) => {
    const { message, name } = data;
    push(generalChatRef, {
      name,
      message,
      timestamp: new Date().getTime(),
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
          Welcome to the general chat of the Quito Lambda!
        </Typography>
        <form onSubmit={handleSubmit(submitTodo)}>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, flexGrow: 1 }} variant="standard">
              <InputLabel htmlFor="input-name">Name: </InputLabel>
              <Input
                id="input-name"
                type="text"
                {...register("name", {
                  required: "You have to insert your name",
                })}
              />
            </FormControl>
          </Box>
          {errors && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, flexGrow: 1 }} variant="standard">
              <InputLabel htmlFor="input-message">Message: </InputLabel>
              <Input
                id="input-message"
                type="text"
                {...register("message", {
                  required: "You have to insert the message",
                })}
              />
            </FormControl>
          </Box>
          {errors && (
            <span style={{ color: "red" }}>{errors.message?.message}</span>
          )}
          <Button type="submit">Send</Button>
        </form>
        <ChatWindow data={messages} />
      </Container>
    </Base>
  );
};

export default GeneralChat;
