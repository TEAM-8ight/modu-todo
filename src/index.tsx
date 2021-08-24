import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import { TodoProvider } from 'context/todoContext/TodoContext';
import { ThemeProvider } from 'styled-components';
import { Theme } from './styles/Theme';
import App from './App';

ReactDOM.render(
  <TodoProvider>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme }}>
      <App />
    </ThemeProvider>
  </TodoProvider>,
  document.getElementById('root'),
);
