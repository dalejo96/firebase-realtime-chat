import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../services/database";
import { auth } from "../services/auth";
import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText } from "@mui/material";

const Groups = () => {
  const [user] = useState(() => auth.currentUser);
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    const starCountRef = ref(database, "users/" + user.uid);
    onValue(starCountRef, (snapshot) => {
      const groups = Object.keys(snapshot.val().groups) as string[];
      setGroups(groups);
    });
  }, []);

  return (
    <section>
      {groups.length > 0 ? (
        <List>
          {groups.map((item, index) => (
            <ListItemButton
              component={Link}
              to={`/chat/group/${item}`}
              key={index}
            >
              {item}
            </ListItemButton>
          ))}
        </List>
      ) : (
        <p>You have not any groups</p>
      )}
    </section>
  );
};

export default Groups;
