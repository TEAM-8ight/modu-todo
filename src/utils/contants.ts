import { colorType, emojiType } from 'types';

export const TODOS: string = 'todos';

export const TIME_ZONE: string = 'ko-KR';

export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const DATE_LABEL = {
  createdAt: '생성일',
  updatedAt: '수정일',
  due: '완료일',
};

export const emoji = {
  WORK: '👩‍💻',
  STUDY: '📚',
  LIVING: '🌱',
  EXERCISE: '🏃‍♀️',
  ETC: '💬',
};

export const circle = {
  HIGH: 'red',
  MIDDLE: 'yellow',
  LOW: 'green',
};
