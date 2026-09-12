'use client';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useDraftFormStore } from '@/lib/store/formStore';

import { bookCar } from '@/lib/api/cars';
import type { IBookCarParams } from '@/lib/api/cars';
import type { CarBookingFormData } from '@/lib/types/cars';

import { capitalizeWords } from '@/lib/utils/utils';

import Button from '@/components/Button';
import css from './CarBookingForm.module.css';

const CarBookingForm = () => {
  const { carId } = useParams<{ carId: string }>();
  const { draftForm, setDraftForm, clearDraftForm } = useDraftFormStore();
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    comment: null,
  });

  const carBookingMutation = useMutation({
    mutationFn: ({ id, bookingData }: IBookCarParams) =>
      bookCar({ id, bookingData }),
    onSuccess: data => toast.success(data.message),
    onError: error => toast.error(`Failed to book a car. ${error}`),
  });

  const carBookingFormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .transform(value => capitalizeWords(value))
      .min(3, 'Name should have at least 3 characters.')
      .max(50, 'Name should not exceed 50 characters.')
      .required('Please enter your name.'),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email should be in a valid format.'
      )
      .required('Please enter your email.'),
    comment: Yup.string()
      .max(1000, 'Name should not exceed 1000 characters.')
      .required('Comment is required.'),
  });

  const handleChange = useDebouncedCallback(
    async (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;

      try {
        await carBookingFormValidationSchema.validateAt(name, {
          [name]: value,
        });
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: null,
        }));

        setDraftForm({ ...draftForm, [name]: value });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error.message,
          }));
        }
      }
    },
    300
  );

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as CarBookingFormData;
      await carBookingFormValidationSchema.validate(data);
      carBookingMutation.mutate({ id: carId, bookingData: data });
      clearDraftForm();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(
          'Please check the form and correct the highlighted fields.'
        );
      }
    }
  };

  return (
    <section className={css.section}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form
        className={css.form}
        action={handleSubmit}
        aria-label="Car booking form"
      >
        <div className={css.input_thumb}>
          <label
            className={`${css.label} ${errors.name ? css.label_error : ''}`}
            htmlFor="name"
          >
            Name*
          </label>
          <input
            className={`${css.input} ${errors.name ? css.input_error : ''}`}
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            defaultValue={draftForm.name}
            onChange={handleChange}
          ></input>
          {errors.name && <p className={css.error_message}>{errors.name}</p>}
        </div>
        <div className={css.input_thumb}>
          <label
            className={`${css.label} ${errors.email ? css.label_error : ''}`}
            htmlFor="email"
          >
            Email*
          </label>
          <input
            className={`${css.input} ${errors.email ? css.input_error : ''}`}
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            defaultValue={draftForm.email}
            onChange={handleChange}
          ></input>
          {errors.email && <p className={css.error_message}>{errors.email}</p>}
        </div>
        <div className={css.input_thumb}>
          <label
            className={`${css.label} ${errors.comment ? css.label_error : ''}`}
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            className={`${css.input} ${css.textarea} ${errors.comment ? css.input_error : ''}`}
            id="comment"
            name="comment"
            placeholder=" "
            rows={6}
            defaultValue={draftForm.comment}
            onChange={handleChange}
          ></textarea>
          {errors.comment && (
            <p className={css.error_message}>{errors.comment}</p>
          )}
        </div>
        <Button type="submit" text="Send" colored />
      </form>
    </section>
  );
};

export default CarBookingForm;
