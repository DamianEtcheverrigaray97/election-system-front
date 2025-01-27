export interface ApiResponse<T> {
    status: string;
    data: T;  
    error?: string;  
  }
  