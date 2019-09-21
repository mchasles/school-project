import studentsReducer from '../students.reducer';
import {
  FETCH_STUDENTS_SUCCESS,
  REMOVE_STUDENT_SUCCESS
} from '../students.actions';

describe('async actions', () => {
  let mockStudents;

  beforeEach(() => {
    mockStudents = [
      { id: 1, name: 'Maxime' },
      { id: 2, name: 'Jean' },
      { id: 3, name: 'Sophie' }
    ];
  });

  it('should add fetched students to the state', () => {
    expect(
      studentsReducer(undefined, {
        type: FETCH_STUDENTS_SUCCESS,
        payload: { students: mockStudents }
      })
    ).toEqual({
      error: null,
      loading: false,
      students: [
        { id: 1, name: 'Maxime' },
        { id: 2, name: 'Jean' },
        { id: 3, name: 'Sophie' }
      ]
    });
  });

  it('should remove student from the state', () => {
    const initialState = studentsReducer(undefined, { type: 'NOOP' });
    const state = {
      ...initialState,
      students: mockStudents
    };

    expect(
      studentsReducer(state, {
        type: REMOVE_STUDENT_SUCCESS,
        payload: { id: 2 }
      })
    ).toEqual({
      error: null,
      loading: false,
      students: [{ id: 1, name: 'Maxime' }, { id: 3, name: 'Sophie' }]
    });
  });
});
