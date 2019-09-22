import {
  ADD_STUDENT_OPEN,
  ADD_STUDENT_CLOSE,
  ADD_STUDENT_SUCCESS,
  EDIT_STUDENT_OPEN,
  EDIT_STUDENT_CLOSE,
  EDIT_STUDENT_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
  REMOVE_STUDENT_SUCCESS
} from './students.actions';

const initialState = {
  students: [],
  currentEditId: null,
  addingStudent: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT_OPEN:
      return {
        ...state,
        addingStudent: true
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [action.payload, ...state.students]
      };

    case ADD_STUDENT_CLOSE:
      return {
        ...state,
        addingStudent: false
      };

    case EDIT_STUDENT_OPEN:
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

    case EDIT_STUDENT_CLOSE:
      return {
        ...state,
        currentEditId: null
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload.students
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
