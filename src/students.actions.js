import { API_URL } from './config';

export const FETCH_STUDENTS_BEGIN   = 'FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

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
})

export function fetchStudents() {
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
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}