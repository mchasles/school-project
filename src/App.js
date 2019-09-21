import React, { useCallback, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./students.actions";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

function App() {
  const students = useSelector(state => state.students);

  const dispatch = useDispatch();
  const fetchAllStudents = useCallback(() => dispatch(fetchStudents()), [
    dispatch
  ]);

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        {students.length && (
          <List>
            {students.map(student => (
              <ListItem key={student.id} alignItems="center" divider>
                <ListItemAvatar>
                  <Avatar alt={student.name} src={student.avatar} />
                </ListItemAvatar>
                <ListItemText primary={student.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}

export default App;
