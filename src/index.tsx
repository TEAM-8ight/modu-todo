import React from 'react';
import ReactDOM from 'react-dom';
import { TodoProvider } from 'context/todoContext/TodoContext';
import GlobalStyles from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'styles/Theme';
import 'react-datepicker/dist/react-datepicker.css';
import App from 'App';

ReactDOM.render(
  <TodoProvider>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme }}>
      <App />
    </ThemeProvider>
  </TodoProvider>,
  document.getElementById('root'),
);
