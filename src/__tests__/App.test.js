import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import App from '../App';

const mockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({
    currentEditId: null,
    addingStudent: false,
    students: []
  });
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
