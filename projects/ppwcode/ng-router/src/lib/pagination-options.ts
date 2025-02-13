import { InjectionToken } from '@angular/core';

export interface PaginationOptions {
  skipLocationChange: boolean;
  replaceUrl: boolean;
}

export const PAGINATION_OPTIONS = new InjectionToken<PaginationOptions>('PAGINATION_OPTIONS');

export function providePaginationOptions(options: Partial<PaginationOptions> = {}): { provide: InjectionToken<PaginationOptions>; useValue: PaginationOptions } {
  const defaultOptions: PaginationOptions = {
    skipLocationChange: false,
    replaceUrl: true,
  };

  return {
    provide: PAGINATION_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
