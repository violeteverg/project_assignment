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
} from "../../ui/drawer";
import { useMainStore } from "@/app/providers/storeProvider";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "@/app/service/postData";
import { useToast } from "../../ui/use-toast";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { cn } from "@/app/utils/func";

export default function DeleteExpense() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setIsDelete, isDelete, expenseId } = useMainStore((state) => ({
    setIsDelete: state.setIsDelete,
    isDelete: state.isDelete,
    expenseId: state.expenseId,
  }));
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => {
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Expense successfully deleted</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["EXPENSE_DATA"] });
      setIsDelete(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>Failed to delete expense</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
  });

  const deleteHandler = () => {
    if (expenseId) {
      mutate(expenseId);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Expense</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col justify-center items-center gap-y-4'>
            <Image
              src='/warning_sign.svg'
              alt='warning'
              width={100}
              height={100}
            />
            <p>Are you sure you want to delete this expense?</p>
            <Button className='w-[90%]' onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDelete} onOpenChange={setIsDelete}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete Expense</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col justify-center items-center gap-y-4'>
          <Image
            src='/warning_sign.svg'
            alt='warning'
            width={100}
            height={100}
          />
          <p>Are you sure you want to delete this expense?</p>
          <Button className='w-[90%]' onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
