import axios from 'axios';
import type { Car } from '@/lib/types/cars';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const INITIAL_PAGE = 1;

const carApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
});

interface ICarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

interface ICarsResponseParams {
  page: number;
}

export const fetchCars = async ({
  page,
}: ICarsResponseParams): Promise<ICarsResponse> => {
  const response = await carApi.get<ICarsResponse>('/cars', {
    params: { page },
  });

  return response.data;
};
