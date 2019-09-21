import {
  EDIT_STUDENT_BEGIN,
  EDIT_STUDENT_EXIT,
  EDIT_STUDENT_SUCCESS,
  FETCH_STUDENTS_BEGIN,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  REMOVE_STUDENT_SUCCESS
} from './students.actions';

const initialState = {
  students: [],
  loading: false,
  error: null,
  currentEditId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_STUDENT_BEGIN:
      return {
        ...state,
        currentEditId: action.payload.id
      };

    case EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id
            ? { ...student, name: action.payload.name }
            : student
        )
      };

    case EDIT_STUDENT_EXIT:
      return {
        ...state,
        currentEditId: null
      };

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

    case REMOVE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(({ id }) => id !== action.payload.id)
      };

    default:
      return state;
  }
};
