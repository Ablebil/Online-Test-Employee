import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) => {
    sonnerToast.success(message);
  },

  error: (message: string) => {
    sonnerToast.error(message);
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string;
      error: string;
    },
  ) => {
    return sonnerToast.promise(promise, options);
  },
};
