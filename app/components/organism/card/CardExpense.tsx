import { useMainStore } from "@/app/providers/storeProvider";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { formatPrice, truncateText } from "@/app/utils/func";

interface cardExpenseProps {
  id: number;
  description: string;
  category: number;
  amount: number;
}

export default function CardExpense({
  id,
  description,
  category,
  amount,
}: cardExpenseProps) {
  const { setIsOpen, setExpenseId, setIsDelete } = useMainStore((state) => ({
    setIsOpen: state.setIsOpen,
    setExpenseId: state.setExpenseId,
    isDelete: state.isDelete,
    setIsDelete: state.setIsDelete,
  }));

  const categoryData = [
    {
      id: 1,
      title: "food",
    },
    {
      id: 2,
      title: "traveling",
    },
    {
      id: 3,
      title: "electronics",
    },
    {
      id: 4,
      title: "insurance",
    },
    {
      id: 5,
      title: "entertaiment",
    },
    {
      id: 7,
      title: "clothing",
    },
  ];
  const categoryItem = categoryData.find((item) => item.id === category);
  const categoryTitle = categoryItem ? categoryItem.title : "-";

  const updateHandler = (id: number) => {
    setExpenseId(id);
    setIsOpen(true);
  };

  const deleteHandler = (id: number) => {
    setExpenseId(id);
    setIsDelete(true);
    setIsOpen(false);
  };
  return (
    <Card className='grid grid-cols-[2fr,1fr]  my-4 items-center p-2 cursor-pointer lg:flex lg:justify-between md:flex md:justify-between'>
      <div
        className='grid grid-cols-2 items-center gap-4 lg:w-full md:w-full'
        onClick={() => updateHandler(id)}
      >
        <div className='lg:grid lg:grid-cols-2 items-center'>
          <CardTitle>{truncateText(description, 20)}</CardTitle>
          <CardDescription>{categoryTitle}</CardDescription>
        </div>

        <p>{formatPrice(amount)}</p>
      </div>
      <CardContent className='justify-end flex w-full lg:w-[40%]'>
        <Button className='' onClick={() => deleteHandler(id)}>
          delete
        </Button>
      </CardContent>
    </Card>
  );
}
