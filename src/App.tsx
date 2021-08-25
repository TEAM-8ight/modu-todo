import DropdownTemp from 'components/temp/DropdownTemp';
import React from 'react';
import TodoItem from 'components/TodoItem/TodoItem';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <TodoItem></TodoItem>
      <DropdownTemp />
    </div>
  );
};

export default App;
