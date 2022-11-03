import { toast } from 'react-toastify';

export const errorHandler = (state, action) => {
  state.isLoading = false;
  toast.error(action.action.message);
  console.log('Request error: ', action.action);
};
