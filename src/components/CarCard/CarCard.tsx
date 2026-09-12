import Image from 'next/image';
import ButtonLink from '@/components/ButtonLink';
import css from './CarCard.module.css';
import type { Car } from '@/lib/types/cars';

interface ICarCardProps {
  car: Car;
}

const CarCard = ({
  car: {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    location: { city, country },
    rentalCompany,
    type,
    mileage,
  },
}: ICarCardProps) => {
  return (
    <li className={css.car_card}>
      <div>
        <Image
          src={img}
          alt={`Car ${brand}, ${model}`}
          width={244}
          height={268}
          className={css.car_img}
        />

        <div className={css.car_data}>
          <p>
            {brand} <span className={css.car_model}>{model}, </span>
            {year}
          </p>
          <p>${rentalPrice}</p>
        </div>
      </div>
      <div>
        <div className={css.car_details}>
          <p className={css.car_detail}>{city}</p>
          <p className={css.car_detail}>{country}</p>
          <p className={css.car_detail}>{rentalCompany}</p>
          <p className={css.car_detail}>{type}</p>
          <p>{mileage} km</p>
        </div>
        <ButtonLink
          href={`/catalog/${id}`}
          text="Read more"
          colored
          ariaLabel={`View details for ${brand} ${model}, ${year}`}
          target="_blank"
        />
      </div>
    </li>
  );
};

export default CarCard;
