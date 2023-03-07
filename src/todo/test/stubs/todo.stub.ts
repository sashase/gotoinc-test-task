import { Todo } from '../../types';

export const todoStub = (): Todo => {
  return {
    id: 1,
    text: 'cook a dinner',
    isCompleted: false,
    createdAt: '2023-03-06T14:45:28.691Z',
    updatedAt: '2023-03-06T14:45:28.691Z',
    userId: 1,
  };
};
