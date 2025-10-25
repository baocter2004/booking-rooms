export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT = 'created_at:desc';

export interface BaseFilters {
  search?: string;
  page?: number;
  sort?: string;
}

export interface HotelFilters extends BaseFilters {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  from_date?: string;
  to_date?: string;
}

export const buildQueryParams = <T extends BaseFilters>(
  filters: T,
  defaults: { page?: number; sort?: string } = { page: DEFAULT_PAGE, sort: DEFAULT_SORT },
): Record<string, any> => {
  const params: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (key !== 'page' && key !== 'sort' && value && value !== '') {
      params[key] = value;
    }
  });

  if (filters.page && filters.page !== defaults.page) {
    params.page = filters.page;
  }

  if (filters.sort && filters.sort !== defaults.sort) {
    params.sort = filters.sort;
  }

  return params;
};
