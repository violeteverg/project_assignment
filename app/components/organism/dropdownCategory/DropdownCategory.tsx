import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface DropdownCategoryProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function DropdownCategory({
  value,
  onChange,
}: DropdownCategoryProps) {
  const categoryData = [
    { id: 1, title: "food" },
    { id: 2, title: "traveling" },
    { id: 3, title: "electronics" },
    { id: 4, title: "insurance" },
    { id: 5, title: "entertainment" },
    { id: 7, title: "clothing" },
  ];

  return (
    <Select
      onValueChange={(selectedValue) => {
        const selectedCategory = categoryData.find(
          (item) => item.title === selectedValue
        );
        if (selectedCategory) {
          onChange(selectedCategory.id);
        }
      }}
      value={categoryData.find((item) => item.id === value)?.title || ""}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select a Category' />
      </SelectTrigger>
      <SelectContent>
        {categoryData.map((item) => (
          <SelectItem value={item.title} key={item.id}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
