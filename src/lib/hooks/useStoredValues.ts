'use client';
import { useState } from 'react';

interface IUseStoredValuesParams<T> {
  initialValues: T;
  key: string;
}

export const useStoredValues = <T>({
  initialValues,
  key,
}: IUseStoredValuesParams<T>) => {
  const [values, setValues] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const savedValues = localStorage.getItem(key);

    return savedValues ? JSON.parse(savedValues) : initialValues;
  });

  const updateValues = ({ values }: { values: Partial<T> }) =>
    setValues(prevValues => {
      const newState = { ...prevValues, ...values };
      localStorage.setItem('formValues', JSON.stringify(newState));
      return newState;
    });

  const resetValues = () =>
    setValues(() => {
      localStorage.setItem(key, JSON.stringify(initialValues));
      return initialValues;
    });

  return { values, updateValues, resetValues };
};
