import axios from "axios";
import { api } from "../utils/helper/responseHelper";
import { ApiResponse, DataItem, dataMontly } from "../utils/types/client";

export const getAllExpense = async (): Promise<DataItem[]> => {
  const res = await axios.get(api.expense);
  return res.data?.data;
};

export const getByIdExpense = async (id: number): Promise<DataItem> => {
  const res = await axios.get(`${api.expense}/${id}`);
  return res.data?.data;
};

export const getDataByMonthly = async (): Promise<dataMontly[]> => {
  const res = await axios.get(api.month);
  return res.data?.data;
};
