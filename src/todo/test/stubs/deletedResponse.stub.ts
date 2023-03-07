import { DeletedResponse } from '../../types';

export const deletedResponseStub = (): DeletedResponse => {
  return { statusCode: 200, message: 'Successfully deleted' };
};
