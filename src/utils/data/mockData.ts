import { getRandomEnum } from 'utils';
import { ITodos, TCategory, TPriority, TStatus } from 'types';

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const randomFuture = new Date(today);
tomorrow.setDate(randomFuture.getDate() + Math.floor(Math.random() * 100));

export const mockData: ITodos = [
  {
    id: 1,
    text: '이력서 쓰기',
    status: TStatus.NOT_STARTED,
    createdAt: tomorrow,
    updatedAt: tomorrow,
    due: new Date('2021-09-06'),
    category: TCategory.WORK,
    priority: getRandomEnum(TPriority),
  },
  {
    id: 2,
    text: '타입스크립트 공부하기',
    status: TStatus.ONGOING,
    createdAt: tomorrow,
    updatedAt: tomorrow,
    due: randomFuture,
    category: TCategory.STUDY,
    priority: getRandomEnum(TPriority),
  },
  {
    id: 3,
    text: '매일 30분 운동하기',
    status: TStatus.ONGOING,
    createdAt: tomorrow,
    updatedAt: tomorrow,
    due: randomFuture,
    category: TCategory.EXERCISE,
    priority: getRandomEnum(TPriority),
  },
  {
    id: 4,
    text: '자바스크립트 공부하기',
    status: TStatus.FINISHED,
    createdAt: tomorrow,
    updatedAt: tomorrow,
    due: new Date('2021-08-01'),
    category: getRandomEnum(TCategory),
    priority: TPriority.LOW,
  },
  {
    id: 5,
    text: '벨로그 작성하기',
    status: TStatus.FINISHED,
    createdAt: tomorrow,
    updatedAt: tomorrow,
    due: new Date('2021-08-20'),
    category: TCategory.LIVING,
    priority: TPriority.HIGH,
  },

  {
    id: 6,
    text: 'Redux-Saga 공부하기',
    status: TStatus.FINISHED,
    createdAt: yesterday,
    updatedAt: yesterday,
    due: new Date('2021-09-01'),
    category: TCategory.ETC,
    priority: TPriority.MIDDLE,
  },
];
