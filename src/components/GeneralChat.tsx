import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { database } from "../services/database";
import Base from "./Base";

interface GeneralMessage {
  name: string;
  message: string;
  timestamp: number;
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
      <h1>{`Welcome to the general chat of the Quito Lambda!`}</h1>
      <form onSubmit={handleSubmit(submitTodo)}>
        <label>Name: </label>
        <input
          type="text"
          {...register("name", {
            required: "You have to insert your name",
          })}
        />
        {errors && <span>{errors.name?.message}</span>}
        <label>Message: </label>
        <input
          type="text"
          {...register("message", {
            required: "You have to insert the message",
          })}
        />
        {errors && <span>{errors.message?.message}</span>}
        <button type="submit">Send</button>
      </form>
      <section>
        {messages.length > 0 ? (
          <ul>
            {messages.map((item, index) => (
              <li key={index}>{`From ${item.name}: ${
                item.message
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

export default GeneralChat;
