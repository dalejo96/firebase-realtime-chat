import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { onValue, push } from "firebase/database";
import { friendsRef } from "../services/database";
import Base from "./Base";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItemText,
  Typography,
} from "@mui/material";

interface Friend {
  name: string;
}

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Friend>();

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      const friendsItems = Object.values(snapshot.val()) as Friend[];
      setFriends(friendsItems);
    });
  }, []);

  const submitFriend = (data: Friend) => {
    console.log("llegamos");

    push(friendsRef, data);
    reset();
  };

  return (
    <Base>
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          Here we are going to cover the security rules applied to the friends
          node.
        </Typography>
        <Typography fontSize={14} align="center" color="text.secondary">
          Try to add another name without being authenticated and check your
          console. Then, go to the login page, sign up and come back...
        </Typography>
        <Typography fontSize={14} align="center" color="text.secondary">
          Yeah!! Just authenticated users can add names to the list.
        </Typography>
        <form onSubmit={handleSubmit(submitFriend)}>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, flexGrow: 1 }} variant="standard">
              <InputLabel htmlFor="input-name">Name: </InputLabel>
              <Input
                id="input-name"
                type="text"
                {...register("name", {
                  required: "You have to insert a name",
                })}
              />
            </FormControl>
            <Button type="submit">Add</Button>
          </Box>
          {errors && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
        </form>
        {friends.length > 0 ? (
          <List sx={{ maxHeight: "300px", overflowY: "scroll" }}>
            {friends.map((item, index) => (
              <ListItemText
                key={index}
                primary={`${index + 1} - ${item.name}`}
              />
            ))}
          </List>
        ) : (
          <p>Friends node is empty in the database</p>
        )}
      </Container>
    </Base>
  );
};

export default Friends;
