import React, { useEffect, useState } from 'react';
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

import AddIcon from '@material-ui/icons/Add';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';

import Tooltip from '@material-ui/core/Tooltip';

import StudentItem from './StudentItem.component';
import StudentForm from './StudentForm.component';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'absolute',
    top: 0,
    width: '100vw'
  },
  container: {
    marginTop: theme.spacing(2)
  }
}));

function App() {
  const [loading, setLoading] = useState(true);

  const students = useSelector(state => state.students);
  const currentEditId = useSelector(state => state.currentEditId);
  const addingStudent = useSelector(state => state.addingStudent);

  const dispatch = useDispatch();

  const wrapLoading = asyncFn => (...args) => {
    setLoading(true);
    async function load() {
      await asyncFn(...args);
      setLoading(false);
    }
    load();
  };

  useEffect(() => {
    wrapLoading(() => dispatch(fetchStudents()))();
  }, [dispatch]);

  const openAdd = () => dispatch(addStudentOpen());
  const cancelAdd = () => dispatch(addStudentClose());
  const onSubmitAdd = wrapLoading(student => dispatch(addStudent(student)));

  const onClickEdit = id => dispatch(editStudentOpen(id));
  const cancelEdit = () => dispatch(editStudentClose());
  const onSubmitEdit = wrapLoading(student =>
    dispatch(
      editStudent(student.id, {
        ...student
      })
    )
  );
  const onClickRemove = wrapLoading(id => dispatch(removeStudent(id)));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      {loading && <LinearProgress variant="query" className={classes.loader} />}
      <Container maxWidth="sm" className={classes.container}>
        <Box display="flex" justifyContent="flex-end" p={1}>
          <Tooltip title="Add a student" aria-label="add">
            <Fab onClick={openAdd} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        {students.length !== 0 && (
          <List>
            {addingStudent && (
              <StudentForm onClickAway={cancelAdd} onSubmit={onSubmitAdd} />
            )}
            {students.map(student =>
              student.id === currentEditId ? (
                <StudentForm
                  key={student.id}
                  student={student}
                  onClickAway={cancelEdit}
                  onSubmit={onSubmitEdit}
                />
              ) : (
                <StudentItem
                  key={student.id}
                  student={student}
                  onClickEdit={onClickEdit}
                  onClickRemove={onClickRemove}
                />
              )
            )}
          </List>
        )}
      </Container>
    </>
  );
}

export default App;
