import React from 'react';

interface Props {
  name: string;
}

const TodoList: React.FC<Props> = (props: Props) => {
  console.log(props);
  return <div></div>;
};

export default TodoList;
