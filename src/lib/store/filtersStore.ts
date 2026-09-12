import { create } from 'zustand';

interface IFiltersStore {
  isFilterTransactionPending: boolean;
  setIsFilterTransactionPending: (isPending: boolean) => void;
}

/**
 * Use Zustand state to share the pending navigation state from the filter menu with the catalog page,
 * keeping the loading state consistent and avoiding hydration mismatches caused by isFetching flag usage.
 */
export const useFiltersStore = create<IFiltersStore>()(set => ({
  isFilterTransactionPending: false,
  setIsFilterTransactionPending: (isPending: boolean) =>
    set(state => ({ ...state, isFilterTransactionPending: isPending })),
}));
