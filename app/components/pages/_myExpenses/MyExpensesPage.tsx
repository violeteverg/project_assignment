"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import CardExpense from "../../organism/card/CardExpense";
import WidthWrapper from "../../WidthWrapper";
import { getAllExpense } from "@/app/service/getData";
import { DataItem } from "@/app/utils/types/client";
import AddExpense from "../../organism/addExpense/AddExpense";
import Modal from "../../organism/modal/Modal";
import { useMainStore } from "@/app/providers/storeProvider";
import DeleteExpense from "../../organism/deleteExpense/DeleteExpensel";
import Image from "next/image";
import Chart from "../../organism/chart/Chart";
import YearPicker from "../../organism/yearPicker/YearPicker";
import { Loader } from "../../organism/loader/Loader";
import { CircleX } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { selectYear } from "@/app/service/postData";
import { cn } from "@/app/utils/func";
import { useState } from "react";

export default function MyExpensesPage() {
  const { toast } = useToast();
  const [chartData, setChartData] = useState([]);
  const { isOpen, isDelete } = useMainStore((state) => ({
    isOpen: state.isOpen,
    isDelete: state.isDelete,
  }));
  const { data = [], isLoading } = useQuery<DataItem[]>({
    queryKey: ["EXPENSE_DATA"],
    queryFn: getAllExpense,
  });

  const { mutate } = useMutation({
    mutationFn: (year: string) => selectYear(year),
    onSuccess: (response) => {
      setChartData(response);
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>Failed to select year </p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
  });

  const dataHandle = () => {
    if (isLoading) {
      return (
        <div className='space-y-4'>
          <Loader />
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className='h-full flex w-full items-center lg:justify-center'>
          <Image src='/no_data.png' alt='no data' width={200} height={200} />
          <p className='font-bold'>No data here</p>
        </div>
      );
    }

    return data.map((item, i) => (
      <CardExpense
        key={i}
        id={item.id}
        description={item.description}
        category={item.categoryId}
        amount={item.amount}
      />
    ));
  };

  return (
    <WidthWrapper className='h-full'>
      <div className='flex justify-end m-2 gap-2'>
        <YearPicker mutate={mutate} />
        <AddExpense />
      </div>
      <div className='flex justify-center lg:items-center lg:mt-2'>
        <Chart datas={chartData} />
      </div>
      <div className='h-full overflow-auto p-3 mt-4'>{dataHandle()}</div>
      {isOpen && <Modal />}
      {isDelete && <DeleteExpense />}
    </WidthWrapper>
  );
}
