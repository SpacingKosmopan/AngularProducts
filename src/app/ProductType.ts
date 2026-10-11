interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
  reviews: { id: number; value: number; content: string }[];
}
