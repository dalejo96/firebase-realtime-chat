import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { auth } from "../services/auth";
import { database } from "../services/database";
import Base from "./Base";

interface Message {
  description: string;
  timestamp: number;
  name: string;
}

const Chat = () => {
  const [user] = useState(() => auth.currentUser);
  const { groupName } = useParams<{ groupName: string }>();
  const groupReference = ref(database, `groups/${groupName}/messages`);
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Message>();

  useEffect(() => {
    if (!groupName) return;
    onValue(groupReference, (snapshot) => {
      const messages = Object.values(snapshot.val()) as Message[];
      setMessages(messages);
    });
  }, []);

  const submitTodo = (data: Message) => {
    if (!user) return;
    push(groupReference, {
      description: data.description,
      timestamp: new Date().getTime(),
      name: user.displayName,
    });
    reset();
  };

  return (
    <Base>
      <h1>{`Welcome to the chat of the group: ${groupName}!`}</h1>
      <form onSubmit={handleSubmit(submitTodo)}>
        <label>Description: </label>
        <input
          type="text"
          {...register("description", {
            required: "You have to insert a group name",
          })}
        />
        {errors && <span>{errors.description?.message}</span>}
        <button type="submit">Send</button>
      </form>
      <section>
        {messages.length > 0 ? (
          <ul>
            {messages.map((item, index) => (
              <li key={index}>{`From ${item.name}: ${
                item.description
              } at ${new Date(item.timestamp)}`}</li>
            ))}
          </ul>
        ) : (
          <p>The group has no messages</p>
        )}
      </section>
    </Base>
  );
};

export default Chat;
