export type Meta = {
  code: number;
  message: string;
};

export type DataItem = {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type sendData = {
  categoryId: number;
  amount: number;
  description: string;
  date: Date;
};

export type ApiResponse = {
  meta: Meta;
  data: DataItem[];
};
