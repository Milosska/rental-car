import axios from 'axios';
import type { Car, CarSearchParams } from '@/lib/types/cars';

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
export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await carApi.get<Car>(`/cars/${id}`);
  return response.data;
};
// #endregion Fetch car by id

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
