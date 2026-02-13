export type Review = {
  id: string;
  product_id: string;
  client_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ReviewWithRelations = Review & {
  name: string;

  products: {
    rating_avg: number;
    rating_count: number;
  } | null;
  users: {
    name: string;
  } | null;
};

export type ReviewInput = {
  product_id: string;
  rating: number;
  comment: string;
};
