import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useMessage = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  useCallback((text, type = 'info') => {
    if (type === 'success') {
      toast.success(text);
    } else if (type === 'error') {
      toast.error(text);
    } else {
      toast.info(text);
    }
  }, []);
