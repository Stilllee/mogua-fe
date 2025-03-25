export interface BaseResponse {
  status: string;
  message: string | null;
}

export interface PaginationData {
  isLast: boolean;
  nextPage: number;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T[];
  additionalData: PaginationData;
}

export interface PageResponse<T> {
  items: T[];
  hasNextPage: boolean;
  nextPage: number;
}
