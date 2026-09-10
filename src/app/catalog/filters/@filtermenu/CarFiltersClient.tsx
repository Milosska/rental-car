'use client';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { fetchFilters } from '@/lib/api/cars';

import { IoIosArrowDown } from 'react-icons/io';
import Button from '@/components/Button';

import css from './CarFiltersClient.module.css';

const CarFiltersClient = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['filters'],
    queryFn: () => fetchFilters(),
    refetchOnMount: false,
  });

  if (isError && error) {
    toast.error(error.message);
  }

  const prices = [data?.price.min].reduce((acc, price): number[] => {
    const maxPrice = data?.price.max;
    while (price && maxPrice && price <= maxPrice) {
      acc.push(price);
      price = price + 10;
    }
    return acc;
  }, [] as number[]);

  const filtersFormValidationSchema = Yup.object()
    .shape({
      brand: Yup.string().oneOf(['', ...(data?.brands || [])]),
      price: Yup.string().oneOf(['', ...prices.map(price => String(price))]),
      minMileage: Yup.string().test(
        'non-negative',
        'Mileage cannot be negative',
        value => !value || Number(value) >= 0
      ),
      maxMileage: Yup.string()
        .test(
          'non-negative',
          'Mileage cannot be negative',
          value => !value || Number(value) >= 0
        )
        .test(
          'max-greater-than-min',
          'Maximum mileage must be greater than or equal to minimum mileage',
          function (maxMileage) {
            const { minMileage } = this.parent;
            return !minMileage || !maxMileage || maxMileage >= minMileage;
          }
        ),
    })
    .test(
      'at-least-one-filter',
      'Please select at least one filter',
      values => {
        return Object.values(values).some(value => value !== '');
      }
    );

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);
      await filtersFormValidationSchema.validate(data);

      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        }
      });

      startTransition(() =>
        router.push(`/catalog/filters?${params.toString()}`)
      );
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form className={css.form} action={handleSubmit} aria-label="Filter form">
      <fieldset className={css.select_wrapper}>
        <legend className={css.label}> Car brand</legend>

        <select
          className={`${css.input} ${css.input_brand} ${css.select}`}
          name="brand"
          aria-label="Car brand"
        >
          <option value={''}>Choose a brand</option>
          {data &&
            data.brands.map((brand, id) => (
              <option key={id} value={brand}>
                {brand}
              </option>
            ))}
        </select>
        <IoIosArrowDown className={css.select_icon} />
      </fieldset>

      <fieldset className={css.select_wrapper}>
        <legend className={css.label}> Price/1 hour</legend>

        <select
          className={`${css.input} ${css.input_price} ${css.select}`}
          name="price"
          aria-label="Price per 1 hour"
        >
          <option value={''}>Choose a price</option>
          {prices.map((price, id) => (
            <option key={id} value={price}>
              {price}
            </option>
          ))}
        </select>
        <IoIosArrowDown className={css.select_icon} />
      </fieldset>

      <fieldset>
        <legend className={css.label}> Car mileage / km</legend>

        <input
          className={`${css.input} ${css.input_left}`}
          type="number"
          name="minMileage"
          min="0"
          aria-label="Minimum mileage"
        />
        <input
          className={`${css.input} ${css.input_right}`}
          type="number"
          name="maxMileage"
          min="0"
          aria-label="Maximum mileage"
        />
      </fieldset>

      <Button
        text="Search"
        type="submit"
        width={156}
        colored
        disabled={isLoading || isPending}
      />
    </form>
  );
};

export default CarFiltersClient;
