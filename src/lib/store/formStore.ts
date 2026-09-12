import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CarBookingFormData } from '@/lib/types/cars';

interface INoteStore {
  draftForm: CarBookingFormData;
  setDraftForm: (form: CarBookingFormData) => void;
  clearDraftForm: () => void;
}

const initialFormValues: CarBookingFormData = {
  name: '',
  email: '',
  comment: '',
};

export const useDraftFormStore = create<INoteStore>()(
  persist(
    set => ({
      draftForm: initialFormValues,
      setDraftForm: (form: CarBookingFormData) =>
        set(state => ({ ...state, draftForm: form })),
      clearDraftForm: () =>
        set(state => ({ ...state, draftForm: initialFormValues })),
    }),
    {
      name: 'formValues',
      partialize: state => ({ draftForm: state.draftForm }),
    }
  )
);
