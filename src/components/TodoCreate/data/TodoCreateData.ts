import { TCategory, TPriority } from 'types';
import { CATEGORY_EMOJI } from 'utils/constants';

const priorityEmoji = {
  상: '🔴',
  중: '🟡',
  하: '🟢',
};

const categoryOptions: { print: string; data: string }[] = [
  { print: '카테고리', data: '' },
  ...Object.entries(TCategory).map(([key, value]) => {
    return { print: `${CATEGORY_EMOJI[value]} ${value}`, data: value };
  }),
];

const priorityOptions: { print: string; data: string }[] = [
  { print: '중요도', data: '' },
  ...Object.entries(TPriority).map(([key, value]) => {
    return { print: `${priorityEmoji[value]} ${value}`, data: value };
  }),
];

export { categoryOptions, priorityOptions };
