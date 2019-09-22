import { API_URL } from './config';

export const ADD_STUDENT_OPEN = 'ADD_STUDENT_OPEN';
export const ADD_STUDENT_CLOSE = 'ADD_STUDENT_CLOSE';
export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS';

export const FETCH_STUDENTS_BEGIN = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export const EDIT_STUDENT_OPEN = 'EDIT_STUDENT_OPEN';
export const EDIT_STUDENT_CLOSE = 'EDIT_STUDENT_CLOSE';
export const EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS';

export const REMOVE_STUDENT_SUCCESS = 'REMOVE_STUDENT_SUCCESS';

export const addStudentOpen = () => ({
  type: ADD_STUDENT_OPEN
});

export const addStudent = data => {
  return dispatch =>
    fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(student => {
        dispatch({
          type: ADD_STUDENT_SUCCESS,
          payload: student
        });
        dispatch(addStudentClose());
        return student;
      });
};

export const addStudentClose = () => ({
  type: ADD_STUDENT_CLOSE
});

export const editStudentOpen = id => ({
  type: EDIT_STUDENT_OPEN,
  payload: { id }
});

export const editStudent = (id, data) => {
  return dispatch =>
    fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(student => {
        dispatch({
          type: EDIT_STUDENT_SUCCESS,
          payload: student
        });
        dispatch(editStudentClose());
        return student;
      });
};

export const editStudentClose = () => ({
  type: EDIT_STUDENT_CLOSE
});

export const fetchStudentsBegin = () => ({
  type: FETCH_STUDENTS_BEGIN
});

export const fetchStudentsSuccess = students => ({
  type: FETCH_STUDENTS_SUCCESS,
  payload: { students }
});

export const fetchStudentsFailure = error => ({
  type: FETCH_STUDENTS_FAILURE,
  payload: { error }
});

export const removeStudentsSuccess = id => ({
  type: REMOVE_STUDENT_SUCCESS,
  payload: { id }
});

export const fetchStudents = () => {
  return dispatch => {
    dispatch(fetchStudentsBegin());
    return fetch(`${API_URL}/students`)
      .then(handleErrors)
      .then(res => res.json())
      .then(students => {
        dispatch(fetchStudentsSuccess(students));
        return students;
      })
      .catch(error => dispatch(fetchStudentsFailure(error)));
  };
};

export const removeStudent = id => {
  return dispatch =>
    fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE'
    })
      .then(handleErrors)
      .then(() => dispatch(removeStudentsSuccess(id)));
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
