import React, { useCallback, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSelector, useDispatch } from 'react-redux';
import {
  addStudentOpen,
  addStudent,
  addStudentClose,
  editStudentOpen,
  editStudent,
  editStudentClose,
  fetchStudents,
  removeStudent
} from './students.actions';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import StudentForm from './StudentForm.component';

function App() {
  const students = useSelector(state => state.students);
  const currentEditId = useSelector(state => state.currentEditId);
  const addingStudent = useSelector(state => state.addingStudent);

  const dispatch = useDispatch();
  const fetchAllStudents = useCallback(() => dispatch(fetchStudents()), [
    dispatch
  ]);

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  const openAdd = () => dispatch(addStudentOpen());
  const cancelAdd = () => dispatch(addStudentClose());
  const submitAddStudent = student => dispatch(addStudent(student));

  const openEdit = id => dispatch(editStudentOpen(id));
  const cancelEdit = () => dispatch(editStudentClose());
  const submitEditStudent = (student, name) => {
    dispatch(
      editStudent(student.id, {
        ...student,
        name
      })
    );
  };

  const remove = id => dispatch(removeStudent(id));

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="flex-end" p={1}>
          <Tooltip title="Add a student" aria-label="add">
            <Fab onClick={openAdd} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        {students.length && (
          <List>
            {addingStudent && (
              <StudentForm
                onClickAway={cancelAdd}
                onSubmit={submitAddStudent}
              />
            )}
            {students.map(student =>
              student.id === currentEditId ? (
                <StudentForm
                  key={student.id}
                  student={student}
                  onClickAway={cancelEdit}
                  onSubmit={submitEditStudent}
                />
              ) : (
                <ListItem key={student.id} alignItems="center" divider>
                  <Box width={1} display="flex" justifyContent="space-between">
                    <ListItemAvatar>
                      <Avatar alt={student.name} src={student.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={student.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => openEdit(student.id)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => remove(student.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Box>
                </ListItem>
              )
            )}
          </List>
        )}
      </Container>
    </>
  );
}

export default App;
