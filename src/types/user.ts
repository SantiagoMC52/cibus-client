export type User = {
  id: number;
  last_name: string;
  mail: string;
  name: string;
};

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  user_id: number;
};
