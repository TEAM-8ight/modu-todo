import React from 'react';

interface Props {
  name: string;
}

const TodoHeader: React.FC<Props> = (props: Props) => {
  console.log(props);
  return <div></div>;
};

export default TodoHeader;
