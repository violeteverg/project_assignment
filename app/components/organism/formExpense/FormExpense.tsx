import { Controller, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createExpenseSchema,
  TCreateExpenseSchema,
} from "@/app/utils/schemas/expenseSchema";
import DropdownCategory from "../dropdownCategory/DropdownCategory";
import DatePicker from "../datePicker/DatePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendNewExpense, updateExpense } from "@/app/service/postData";
import { useToast } from "../../ui/use-toast";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { cn } from "@/app/utils/func";
import { useMainStore } from "@/app/providers/storeProvider";
import { useEffect } from "react";

interface FormExpenseProps {
  setOpen?: (value: boolean) => void;
  defaultValues?: TCreateExpenseSchema;
  isDetail?: boolean;
}

export default function FormExpense({
  setOpen,
  defaultValues,
  isDetail,
}: FormExpenseProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { expenseId } = useMainStore((state) => ({
    expenseId: state.expenseId,
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TCreateExpenseSchema>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues,
  });

  const { mutate } = useMutation({
    mutationFn: (val: TCreateExpenseSchema) => sendNewExpense(val),
    onSuccess: () => {
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Success add expense</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["EXPENSE_DATA"] });
      if (setOpen) {
        setOpen(false);
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>Failed to add expense</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, val }: { id: number; val: TCreateExpenseSchema }) =>
      updateExpense(id, val),
    onSuccess: () => {
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Success update expense</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["EXPENSE_DATA"] });
      if (setOpen) {
        setOpen(false);
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>Failed to update expense</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
  });

  const postData = (data: TCreateExpenseSchema) => {
    if (isDetail && expenseId) {
      updateMutate({ id: expenseId, val: data });
    } else {
      mutate(data);
    }
  };

  const onSubmit = (data: TCreateExpenseSchema) => {
    postData(data);
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      className='grid items-start gap-4 mx-4 my-2'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className='grid gap-2'>
        <Label>Description</Label>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder='Description'
            />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div className='grid gap-2'>
        <Label>Amount</Label>
        <Controller
          control={control}
          name='amount'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={(e) => onChange(parseFloat(e.target.value))}
              value={value}
              type='number'
              placeholder='Amount'
            />
          )}
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Category</Label>
        <Controller
          control={control}
          name='categoryId'
          render={({ field: { onChange, value } }) => (
            <DropdownCategory value={value} onChange={onChange} />
          )}
        />
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>
      <div className='grid gap-2'>
        <Label>Date</Label>
        <Controller
          control={control}
          name='date'
          render={({ field: { onChange, value } }) => (
            <DatePicker value={value} onChange={onChange} />
          )}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  );
}
