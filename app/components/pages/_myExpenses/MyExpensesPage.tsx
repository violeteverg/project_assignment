"use client";

import { useQuery } from "@tanstack/react-query";
import CardExpense from "../../organism/card/CardExpense";
import WidthWrapper from "../../WidthWrapper";
import { getAllExpense } from "@/app/service/getData";
import { DataItem } from "@/app/utils/types/client";
import AddExpense from "../../organism/addExpense/AddExpense";
import Modal from "../../organism/modal/Modal";
import { useMainStore } from "@/app/providers/storeProvider";
import { Button } from "../../ui/button";
import DeleteExpense from "../../organism/deleteExpense/DeleteExpensel";
import Image from "next/image";
import Loader from "../../organism/loader/Loader";

export default function MyExpensesPage() {
  const { isOpen, isDelete } = useMainStore((state) => ({
    isOpen: state.isOpen,
    isDelete: state.isDelete,
  }));

  const { data = [], isLoading } = useQuery<DataItem[]>({
    queryKey: ["EXPENSE_DATA"],
    queryFn: getAllExpense,
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
      <div className='flex justify-end m-2'>
        <AddExpense />
      </div>
      <div className='h-full overflow-auto p-3 mt-4'>{dataHandle()}</div>
      {isOpen && <Modal />}
      {isDelete && <DeleteExpense />}
    </WidthWrapper>
  );
}
