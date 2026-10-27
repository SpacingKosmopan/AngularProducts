import { Review } from './products.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
  reviews: Review[];
}
