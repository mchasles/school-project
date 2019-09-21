import {
  FETCH_STUDENTS_BEGIN,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE
} from './students.actions';

const initialState = {
  students: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STUDENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload.students
      };

    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        students: []
      };

    default:
      return state;
  }
}