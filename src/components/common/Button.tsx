import React from 'react';

interface Props {
  name: string;
}

const Button: React.FC<Props> = (props: Props) => {
  console.log(props);
  return <div></div>;
};

export default Button;
