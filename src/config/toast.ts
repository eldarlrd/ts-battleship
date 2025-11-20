import toast from 'solid-toast';

const errorToast = (message: string): string => toast.error(message);

export default errorToast;
