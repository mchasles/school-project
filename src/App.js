import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import students from "./temp_fixture";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        <List>
          {students.students.map(student => (
            <ListItem key={student.id} alignItems="center" divider>
              <ListItemAvatar>
                <Avatar alt={student.name} src={student.avatar} />
              </ListItemAvatar>
              <ListItemText primary={student.name} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
