import React, { useCallback, useEffect, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSelector, useDispatch } from 'react-redux';
import {
  editStudentBegin,
  editStudent,
  editStudentExit,
  fetchStudents,
  removeStudent
} from './students.actions';

import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  editNameInput: {
    width: '100%',
    marginRight: '16px'
  }
});

function App() {
  const students = useSelector(state => state.students);
  const currentEditId = useSelector(state => state.currentEditId);

  const dispatch = useDispatch();
  const fetchAllStudents = useCallback(() => dispatch(fetchStudents()), [
    dispatch
  ]);

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  const inputNameRef = useRef();
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        {students.length && (
          <List>
            {students.map(student => (
              <ListItem key={student.id} alignItems="center" divider>
                <ListItemAvatar>
                  <Avatar alt={student.name} src={student.avatar} />
                </ListItemAvatar>
                {student.id === currentEditId ? (
                  <ClickAwayListener
                    onClickAway={() => dispatch(editStudentExit())}
                  >
                    <Box
                      width={1}
                      display="flex"
                      justifyContent="space-between"
                      component="form"
                      onSubmit={e => {
                        e.preventDefault();
                        dispatch(
                          editStudent(student.id, {
                            ...student,
                            name: inputNameRef.current.value
                          })
                        );
                      }}
                    >
                      <TextField
                        className={classes.editNameInput}
                        inputRef={inputNameRef}
                        autoFocus
                        defaultValue={student.name}
                        inputProps={{ 'aria-label': 'name' }}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Save
                      </Button>
                    </Box>
                  </ClickAwayListener>
                ) : (
                  <ListItemText primary={student.name} />
                )}
                {student.id !== currentEditId && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => dispatch(editStudentBegin(student.id))}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => dispatch(removeStudent(student.id))}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}

export default App;
