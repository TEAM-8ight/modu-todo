import React from 'react';
import TodoCreate from 'components/TodoCreate/TodoCreate';
import DropdownTemp from 'components/temp/DropdownTemp';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoCreate />
      <DropdownTemp />
    </div>
  );
};

export default App;
