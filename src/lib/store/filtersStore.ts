import { create } from 'zustand';

interface IFiltersStore {
  isFilterTransactionPending: boolean;
  setIsFilterTransactionPending: (isPending: boolean) => void;
}

export const useFiltersStore = create<IFiltersStore>()(set => ({
  isFilterTransactionPending: false,
  setIsFilterTransactionPending: (isPending: boolean) =>
    set(state => ({ ...state, isFilterTransactionPending: isPending })),
}));
