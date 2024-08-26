"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useMediaQuery } from "@/app/utils/hook/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import FormExpense from "../formExpense/FormExpense";
import { useMainStore } from "@/app/providers/storeProvider";
import { useQuery } from "@tanstack/react-query";
import { DataItem } from "@/app/utils/types/client";
import { getByIdExpense } from "@/app/service/getData";
import { FormSkeleton } from "../loader/Loader";

export default function Modal() {
  const { setIsOpen, isOpen, expenseId } = useMainStore((state) => ({
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen,
    expenseId: state.expenseId,
  }));
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data, isLoading, isFetching } = useQuery<DataItem>({
    queryKey: ["EXPENSE_DETAIL"],
    queryFn: () => getByIdExpense(expenseId),
    enabled: !!expenseId,
  });
  const loading = isLoading || isFetching;
  const defaultValues = {
    amount: data?.amount ?? 0,
    description: data?.description ?? "",
    categoryId: data?.categoryId ?? 0,
    date: data?.date ? new Date(data.date) : new Date(),
  };
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Expense</DialogTitle>
          </DialogHeader>
          {loading ? (
            <FormSkeleton />
          ) : (
            <FormExpense defaultValues={defaultValues} isDetail />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Expense</DrawerTitle>
        </DrawerHeader>
        {loading ? (
          <FormSkeleton />
        ) : (
          <FormExpense defaultValues={defaultValues} isDetail />
        )}
      </DrawerContent>
    </Drawer>
  );
}
