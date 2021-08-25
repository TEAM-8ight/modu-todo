import React, { useState } from 'react';
import { useEffect } from 'react';
import Dropdown from '../common/Dropdown';
import { TCategory } from 'types';

const DropdownTemp: React.FC<any> = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (!selectedOption) {
      console.log('카테고리를 선택해주세요!');
    }
    console.log(selectedOption);
  }, [selectedOption]);

  const ops: any = [{ print: '카테고리', data: '' }];
  Object.entries(TCategory).forEach(([key, value]) => {
    ops.push({ print: value, data: value });
  });

  return (
    <div className="App">
      <Dropdown selectedItem={selectedOption} onItemClick={setSelectedOption} options={ops} />
    </div>
  );
};

export default DropdownTemp;
