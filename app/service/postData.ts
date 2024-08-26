import axios from "axios";
import { api } from "../utils/helper/responseHelper";
import { sendData } from "../utils/types/client";

// Fungsi untuk mengirim data expense baru
export const sendNewExpense = async (val: sendData) => {
  try {
    const response = await axios.post(api.expense, val, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending new expense:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui data expense yang sudah ada
export const updateExpense = async (id: number, val: sendData) => {
  try {
    const response = await axios.patch(`${api.expense}/${id}`, val, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

//Fungsi untuk menghapus data expense
export const deleteExpense = async (id: number) => {
  try {
    const response = await axios.delete(`${api.expense}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

//Fungsi untuk select year chart
export const selectYear = async (year: string) => {
  try {
    const response = await axios.post(
      api.month,
      { year },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
