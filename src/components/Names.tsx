import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { onValue, push } from "firebase/database";
import { friendsRef } from "../services/database";
import Base from "./Base";

interface Friend {
  name: string;
}

const Names = () => {
  const [todo, setTodo] = useState<Friend[]>([]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Friend>();

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      const todoItems = Object.values(snapshot.val()) as Friend[];
      setTodo(todoItems);
    });
  }, []);

  const submitTodo = (data: Friend) => {
    push(friendsRef, data);
    reset();
  };

  return (
    <Base>
      <form onSubmit={handleSubmit(submitTodo)}>
        <label>Name: </label>
        <input
          type="text"
          {...register("name", {
            required: "You have to insert your friends name",
          })}
        />
        {errors && <span>{errors.name?.message}</span>}
        <button type="submit">Add</button>
      </form>
      <section>
        {todo.length > 0 ? (
          <ul>
            {todo.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>You have not submitted any friend's name yet</p>
        )}
      </section>
    </Base>
  );
};

export default Names;
