import axios from 'axios';
import { cache } from 'react';
import type {
  Car,
  CarSearchParams,
  CarBookingFormData,
} from '@/lib/types/cars';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const INITIAL_PAGE = 1;
const PER_PAGE = 12;

const carApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
});

// #region Fetch cars
interface ICarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

interface ICarsResponseParams {
  page: number;
  searchParams?: CarSearchParams;
}

export const fetchCars = async ({
  page,
  searchParams,
}: ICarsResponseParams): Promise<ICarsResponse> => {
  const response = await carApi.get<ICarsResponse>('/cars', {
    params: { page, perPage: PER_PAGE, ...(searchParams || {}) },
  });

  return response.data;
};
// #endregion Fetch cars

// #region Fetch car by id
export const fetchCarById = cache(async (id: string): Promise<Car> => {
  const response = await carApi.get<Car>(`/cars/${id}`);
  return response.data;
});
// #endregion Fetch car by id

// #region Book a car
export interface IBookCarParams {
  id: string;
  bookingData: CarBookingFormData;
}
interface IBookCarResponse {
  message: string;
}

export const bookCar = async ({
  id,
  bookingData,
}: IBookCarParams): Promise<IBookCarResponse> => {
  const response = await carApi.post<IBookCarResponse>(
    `/cars/${id}/booking-requests`,
    bookingData
  );
  return response.data;
};
// #endregion Book a car

// #region Fetch filters
interface IFiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export const fetchFilters = async (): Promise<IFiltersResponse> => {
  const response = await carApi.get<IFiltersResponse>('/cars/filters');

  return response.data;
};

// #endregion Fetch filters
