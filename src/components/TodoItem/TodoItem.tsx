import React from 'react';

interface Props {
  name: string;
}

const TodoItem: React.FC<Props> = (props: Props) => {
  console.log(props);
  return <div></div>;
};

export default TodoItem;
