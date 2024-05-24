import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownUp, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { Context } from '@/context/ContextProvider';
import Spinner from '@/components/Spinner';
import { useDeleteTransaction } from '@/api/transactionsApi';

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Nr',
    cell: ({ row }) => <div className='font-medium text-left'>{row.id}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowDownUp size={20} strokeWidth={1} absoluteStrokeWidth />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const category = row.original.category;
      const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return (
        <div className='font-medium'>{`${
          category !== 'income' ? '- ' + formatted : formatted
        }`}</div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <div className='capitalize font-medium'>{row.getValue('category')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const formateDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return <div className='font-medium'>{formateDate}</div>;
    },
  },
  {
    id: 'actions',
    header: () => <div className='text-right mr-6'>Edit</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      const { setTransaction, setIsEdit } = useContext(Context);

      const { deleteTransaction, isLoading } = useDeleteTransaction();

      const handleEdit = () => {
        setTransaction(rowData);
        setIsEdit(true);
      };

      const handleDelete = () => {
        deleteTransaction(rowData);
      };

      return (
        <div className='text-right mr-5 flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <div className='flex justify-center items-center h-8 w-8'>
                  <Spinner />
                </div>
              ) : (
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <Ellipsis />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleEdit}>Change</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  },
];
