import { TCategory, TPriority } from 'types';
import { CATEGORY_EMOJI } from 'utils/constants';

import { ReactComponent as High } from 'assets/svg/high.svg';
import { ReactComponent as Middle } from 'assets/svg/middle.svg';
import { ReactComponent as Low } from 'assets/svg/low.svg';

type POptions = {
  [key in TPriority]: JSX.Element;
};

const prioritySVGs: POptions = {
  [TPriority.HIGH]: <High />,
  [TPriority.MIDDLE]: <Middle />,
  [TPriority.LOW]: <Low />,
};

const categoryOptions: { print: string; data: string }[] = [
  { print: '카테고리', data: '' },
  ...Object.entries(TCategory).map(([key, value]) => {
    return { print: `${CATEGORY_EMOJI[value]} ${value}`, data: value };
  }),
];

const priorityOptions: { print: JSX.Element | string; data: string }[] = [
  { print: '중요도', data: '' },
  ...Object.values(TPriority).map((value) => {
    return {
      print: (
        <>
          {prioritySVGs[value]}&nbsp;&nbsp;{value}
        </>
      ),
      data: value,
    };
  }),
];

export { categoryOptions, priorityOptions };
