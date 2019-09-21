import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { API_URL } from '../config';

import {
  FETCH_STUDENTS_BEGIN,
  FETCH_STUDENTS_SUCCESS,
  fetchStudents,
  removeStudent,
  REMOVE_STUDENT_SUCCESS
} from '../students.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  let mockStudents;

  beforeEach(() => {
    mockStudents = [
      { id: 1, name: 'Maxime' },
      { id: 2, name: 'Jean' },
      { id: 3, name: 'Sophie' }
    ];
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch FETCH_STUDENTS_SUCCESS when sucessfully fetching students', async () => {
    fetchMock.getOnce(`${API_URL}/students`, {
      body: {
        students: mockStudents
      }
    });

    const store = mockStore();
    await store.dispatch(fetchStudents());

    expect(store.getActions()).toEqual([
      { type: FETCH_STUDENTS_BEGIN },
      {
        payload: {
          students: {
            students: [
              { id: 1, name: 'Maxime' },
              { id: 2, name: 'Jean' },
              { id: 3, name: 'Sophie' }
            ]
          }
        },
        type: FETCH_STUDENTS_SUCCESS
      }
    ]);
  });

  it('should dispatch REMOVE_STUDENT_SUCCESS when sucessfully removing a student', async () => {
    fetchMock.deleteOnce(`${API_URL}/students/2`, {
      body: {}
    });

    const store = mockStore();

    await store.dispatch(removeStudent(2));
    expect(store.getActions()).toEqual([
      { payload: { id: 2 }, type: REMOVE_STUDENT_SUCCESS }
    ]);
  });
});
