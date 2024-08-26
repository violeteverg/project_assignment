import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface YearPickerProps {
  mutate: (year: string) => void;
}

export default function YearPicker({ mutate }: YearPickerProps) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const selectYears = [
    { year: "2024" },
    { year: "2023" },
    { year: "2022" },
    { year: "2021" },
    { year: "2020" },
    { year: "2019" },
    { year: "2018" },
  ];

  return (
    <div className='lg:w-[10%]'>
      <Select
        value={selectedYear}
        onValueChange={(value) => {
          setSelectedYear(value);
          mutate(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='select year' />
        </SelectTrigger>
        <SelectContent>
          {selectYears.map((item, i) => (
            <SelectItem value={item.year} key={i}>
              {item.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
