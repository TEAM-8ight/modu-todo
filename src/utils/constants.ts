import Check from 'assets/svg/check.svg';
import Checked from 'assets/svg/checked.svg';

export const TODOS: string = 'todos';

export const TIME_ZONE: string = 'ko-KR';

export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const DATE_OPTION_NUMERIC: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
};

export const DATE_LABEL: {
  [key: string]: string;
} = {
  createdAt: '생성일',
  updatedAt: '수정일',
  due: '완료일',
};

export const STATUS_SVG: {
  [key: string]: string;
} = {
  시작안함: '',
  진행중: Check,
  완료: Checked,
};

export const CATEGORY_EMOJI: {
  [key: string]: string;
} = {
  업무: '👩‍💻',
  공부: '📚',
  생활: '🌱',
  운동: '🏃‍♀️',
  기타: '💬',
};

export const PRIORITY_CIRCLE: {
  [key: string]: string;
} = {
  상: 'red',
  중: 'yellow',
  하: 'green',
};
