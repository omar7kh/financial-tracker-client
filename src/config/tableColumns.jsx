import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    enableHiding: false,
  },
];
