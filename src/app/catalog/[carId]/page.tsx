import type { Metadata } from 'next';
import { WEBSITE_BASE_URL } from '@/lib/metadata';

import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import CarBookingForm from '@/components/CarBookingForm';

import { FaRegCheckCircle } from 'react-icons/fa';
import { VscLocation } from 'react-icons/vsc';
import {
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGear,
} from 'react-icons/bs';
import { PiRoadHorizon } from 'react-icons/pi';

import { fetchCarById } from '@/lib/api/cars';
import type { Car } from '@/lib/types/cars';
import css from './page.module.css';

interface ICarPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: ICarPageProps): Promise<Metadata> {
  const { carId } = await params;

  let car: Car;
  try {
    car = await fetchCarById(carId);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    // Fallback default metadata if a non-404 error occurs
    return {
      title: 'Rental Car — Details',
      description: 'Car details and rental booking options.',
    };
  }

  const { brand, model, year, description, img } = car;

  const baseMetadataValues = {
    title: `Rental Car — ${brand} ${model}, ${year}`,
    description: description.slice(0, 150),
  };

  return {
    ...baseMetadataValues,
    openGraph: {
      ...baseMetadataValues,
      url: `${WEBSITE_BASE_URL}/catalog/${carId}`,
      siteName: 'Rental Car',
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: `${brand} ${model}, ${year}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      ...baseMetadataValues,
      card: 'summary_large_image',
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: `${brand} ${model}, ${year}`,
        },
      ],
    },
  };
}

const CarPage = async ({ params }: ICarPageProps) => {
  const { carId } = await params;
  const queryClient = new QueryClient();

  let car;
  try {
    car = await queryClient.query({
      queryKey: ['car', carId],
      queryFn: () => fetchCarById(carId),
    });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  const {
    img,
    brand,
    model,
    year,
    stockNumber,
    location: { country, city },
    rentalPrice,
    description,
    rentalConditions,
    type,
    fuelConsumption,
    engine,
    mileage,
    features,
  } = car;

  return (
    <div className={css.container}>
      <Image
        src={img}
        alt={`Car ${brand}, ${model}`}
        width={640}
        height={512}
        priority
        className={css.image}
      />
      <CarBookingForm />
      <section className={css.char_thumb}>
        <h2 className={css.car_title}>
          {brand} {model}, {year}
          <span className={css.car_article}>Article {stockNumber}</span>
        </h2>
        <p className={css.car_location}>
          <VscLocation width={16} height={16} />
          <span className={css.car_location_details}>
            {city}, {country}
          </span>
        </p>
        <p className={css.car_price}>${rentalPrice}</p>
        <p className={css.car_description}>{description}</p>

        <h3 className={css.car_list_title}>Rental conditions:</h3>
        <ul className={css.car_list}>
          {rentalConditions.map((condition, id) => (
            <li key={`${id}${condition}`} className={css.car_list_item}>
              <FaRegCheckCircle />
              {condition}
            </li>
          ))}
        </ul>
        <h3 className={css.car_list_title}>Car specifications:</h3>
        <ul className={css.car_list}>
          <li className={css.car_list_item}>
            <BsCalendar2Week /> Year: {year}
          </li>
          <li className={css.car_list_item}>
            <BsCarFront /> Type: {type}
          </li>
          <li className={css.car_list_item}>
            <BsFuelPump /> Fuel Consumption: {fuelConsumption}
          </li>
          <li className={css.car_list_item}>
            <BsGear />
            Engine: {engine}
          </li>
          <li className={css.car_list_item}>
            <PiRoadHorizon />
            Mileage: {mileage} km
          </li>
        </ul>
        <h3 className={css.car_list_title}>Features:</h3>
        <ul className={css.car_list}>
          {features.map((feature, id) => (
            <li key={`${id}${feature}`} className={css.car_list_item}>
              <FaRegCheckCircle />
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CarPage;
