"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { useQuery } from "@tanstack/react-query";
import { dataMontly } from "@/app/utils/types/client";
import { getDataByMonthly } from "@/app/service/getData";
import { format } from "date-fns";
import { Monitor } from "lucide-react";
import { ChartSkeleton } from "../loader/Loader";

interface ChartProps {
  datas?: dataMontly[];
}

export default function Chart({ datas }: ChartProps) {
  const { data, isLoading, isFetching } = useQuery<dataMontly[]>({
    queryKey: ["MONTHLY_DATA"],
    queryFn: getDataByMonthly,
    enabled: !!datas,
  });

  const chartdata = datas?.length === 0 ? data : datas;
  const loading = isLoading || isFetching;

  const defaultChartData = [
    { month: "01", expense: 0 },
    { month: "02", expense: 0 },
    { month: "03", expense: 0 },
    { month: "04", expense: 0 },
    { month: "05", expense: 0 },
    { month: "06", expense: 0 },
    { month: "07", expense: 0 },
    { month: "08", expense: 0 },
    { month: "09", expense: 0 },
    { month: "10", expense: 0 },
    { month: "11", expense: 0 },
    { month: "12", expense: 0 },
  ];

  const chartDatas = defaultChartData.map((item) => {
    const monthNumber = item.month;
    const apiData = chartdata?.find((d) => {
      const [month] = d.month.split("-");
      return month === monthNumber;
    });

    return {
      month: format(new Date(2024, parseInt(item.month) - 1), "MMM"),
      expense: apiData ? apiData.count : item.expense,
    };
  });

  const chartConfig = {
    expense: {
      label: "Expense",
      color: "#2b415c",
      icon: Monitor,
    },
  } satisfies ChartConfig;

  return (
    <>
      {loading ? (
        <ChartSkeleton />
      ) : (
        <div className='border border-black rounded-lg lg:w-[70%] p-2 lg:m-4'>
          <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
            <BarChart data={chartDatas}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='expense' fill='#2b415c' radius={3} />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </>
  );
}
