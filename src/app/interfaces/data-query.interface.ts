export interface DataQuery {
    page?: number;
    search?: string;
    sortField?: string;
    sortDir?: string;
    items?: number;
    [x: string]: any;
  }
  