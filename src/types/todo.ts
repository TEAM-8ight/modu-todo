export interface ITodo {
  id: number;
  text: string;
  status: TStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
  due: Date;
  category: TCategory;
  priority: TPriority;
}

export type ITodos = ITodo[];

export enum TStatus {
  NOT_STARTED = '시작안함',
  ONGOING = '진행중',
  FINISHED = '완료',
}

export enum TCategory {
  WORK = '업무',
  STUDY = '공부',
  LIVING = '생활',
  EXERCISE = '운동',
  ETC = '기타',
}

export enum TPriority {
  HIGH = '상',
  MIDDLE = '중',
  LOW = '하',
}
