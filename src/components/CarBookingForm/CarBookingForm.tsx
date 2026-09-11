'use client';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Button from '@/components/Button';
import css from './CarBookingForm.module.css';

const CarBookingForm = () => {
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    comment: null,
  });

  const carBookingFormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name should have at least 3 characters.')
      .max(50, 'Name should not exceed 50 characters.')
      .required('Please enter your name.'),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email should be in a valid format.'
      )
      .required('Please enter your email.'),
    comment: Yup.string().max(1000, 'Name should not exceed 1000 characters.'),
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
      const data = Object.fromEntries(formData);
      await carBookingFormValidationSchema.validate(data);
      console.log(data);
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
