/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: any;
}
