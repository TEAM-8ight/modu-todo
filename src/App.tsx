import DropdownTemp from 'components/temp/DropdownTemp';
import React from 'react';
import TodoList from 'components/TodoList/TodoList';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <TodoList />
      <DropdownTemp />
    </div>
  );
};

export default App;
