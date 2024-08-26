import axios from "axios";
import { api } from "../utils/helper/responseHelper";
import { DataItem } from "../utils/types/client";

export const getAllExpense = async (): Promise<DataItem[]> => {
  const res = await axios.get(api.expense);
  return res.data?.data;
};

export const getByIdExpense = async (id: number): Promise<DataItem> => {
  const res = await axios.get(`${api.expense}/${id}`);
  return res.data?.data;
};
