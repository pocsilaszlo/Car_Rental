import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { format } from 'date-fns';

interface DateRangePickerComponentProps {
  onDateRangeChange: (startDate: string, endDate: string) => void; // Függvény, amely egy stringet vár
}

export const DateRangePicker : React.FC<DateRangePickerComponentProps> = ({ onDateRangeChange }) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    if (value[0] && value[1])
    onDateRangeChange(format(new Date(value[0]), 'yyyy-MM-dd'), format(new Date(value[1]), 'yyyy-MM-dd'))  
  }, [value]);

  return (
    <DatePickerInput
      type="range"
      label="Pick dates range"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
    />
  );
}