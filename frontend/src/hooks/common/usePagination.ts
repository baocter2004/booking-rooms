import { useState, useCallback, useMemo } from 'react';

export interface PaginationConfig {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

export interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  offset: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  reset: () => void;
}

export function usePagination(config: PaginationConfig = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    totalItems = 0,
  } = config;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItemsState, setTotalItemsState] = useState(totalItems);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItemsState / pageSize);
  }, [totalItemsState, pageSize]);

  const hasNextPage = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  const hasPrevPage = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const offset = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const setPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const setPageSizeCallback = useCallback((size: number) => {
    if (size > 0) {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  }, []);

  const setTotalItems = useCallback((total: number) => {
    setTotalItemsState(total);
  }, []);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPrevPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
    setTotalItemsState(totalItems);
  }, [initialPage, initialPageSize, totalItems]);

  return {
    currentPage,
    pageSize,
    totalItems: totalItemsState,
    totalPages,
    hasNextPage,
    hasPrevPage,
    offset,
    setPage,
    setPageSize: setPageSizeCallback,
    setTotalItems,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    reset,
  };
}
