import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DatePicker = ({ setTransaction, transaction }) => {
  const handleDateChange = (date) => {
    setTransaction({ ...transaction, date });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !transaction.date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {transaction.date ? (
            format(transaction.date, 'dd.MM.yyyy')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={transaction.date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
