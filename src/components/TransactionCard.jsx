import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import '../index.css';
import DatePicker from './DatePicker';
import { useContext, useEffect, useState } from 'react';
import LoadingButton from './LoadingButton';
import { Context } from '@/context/ContextProvider';

const TransactionCard = ({ onSave, isLoading, submitText }) => {
  const { transaction, setTransaction, setIsEdit } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transaction.amount || !transaction.category || !transaction.date) {
      setErrorMessage('All fields are required.');
      return;
    }

    setErrorMessage('');
    onSave(transaction);
    setTransaction({ amount: '', category: '', date: '' });
    setIsEdit(false);
  };

  useEffect(() => {
    if (transaction.amount && transaction.category && transaction.date) {
      setErrorMessage('');
    }
  }, [transaction]);

  return (
    <div className='border border-border p-5 rounded-md shadow-md flex flex-col justify-between gap-5'>
      <h2 className='font-bold tracking-tight'>Set new Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-start md:flex-row md:items-end  gap-5'
      >
        <div className='flex flex-wrap w-full gap-5'>
          <div className='min-w-[150px] flex flex-col space-y-1.5 flex-1'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              className='no-arrows'
              id='amount'
              type='number'
              placeholder='add your Amount'
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: +e.target.value })
              }
            />
          </div>

          <div className='min-w-[150px] flex flex-col space-y-1.5 flex-1'>
            <Label htmlFor='categories'>Categories</Label>
            <Select
              value={transaction.category}
              onValueChange={(value) =>
                setTransaction({ ...transaction, category: value })
              }
            >
              <SelectTrigger id='categories'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='transfer'>Transfer</SelectItem>
                <SelectItem value='income'>Income</SelectItem>
                <SelectItem value='expense'>Expense</SelectItem>
                <SelectItem value='others'>Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='min-w-[150px] flex flex-col space-y-1.5 flex-1'>
            <Label htmlFor='date'>Date</Label>
            <DatePicker
              setTransaction={setTransaction}
              transaction={transaction}
            />
          </div>
        </div>

        <div className='flex gap-3'>
          <Button
            variant='outline'
            type='button'
            onClick={() => {
              setTransaction({ amount: '', category: '', date: '' });
            }}
          >
            reset
          </Button>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type='submit'>{submitText}</Button>
          )}
        </div>
      </form>
      {errorMessage && (
        <div className='text-red-500 text-sm'>{errorMessage}</div>
      )}
    </div>
  );
};

export default TransactionCard;
