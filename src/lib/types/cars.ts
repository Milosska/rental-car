export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CarSearchParams = {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
};
