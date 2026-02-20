interface ResponseApi<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: number;
}

export default ResponseApi;
