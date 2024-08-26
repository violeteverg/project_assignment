import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

export const getMonthData = async (userId: number) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
      select: {
        date: true,
      },
    });

    // Mengelompokkan berdasarkan bulan dan tahun
    const monthlyData = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = format(date, "yyyy-MM");
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += 1;
      return acc;
    }, {} as Record<string, number>);

    // Format data agar sesuai dengan kebutuhan chart
    const formattedData = Object.keys(monthlyData).map((monthYear) => {
      const [year, month] = monthYear.split("-");
      return {
        month: `${month}-${year}`,
        count: monthlyData[monthYear],
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Failed to fetch expense counts:", error);
    throw new Error("Failed to fetch expense counts");
  }
};
export const getYearData = async (userId: number, year: string) => {
  try {
    // Ambil data bulanan untuk user tertentu
    const monthData = await getMonthData(userId);

    // Filter data berdasarkan tahun yang diinginkan
    const filteredData = monthData.filter((item) => {
      const itemYear = item.month.split("-")[1]; // Ambil tahun dari format `month-year`
      return itemYear === year;
    });

    return filteredData;
  } catch (error) {
    console.error("Failed to filter data by year:", error);
    throw new Error("Failed to filter data by year");
  }
};
