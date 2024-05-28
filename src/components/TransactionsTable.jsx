import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useContext, useEffect, useState } from 'react';
import { ChevronDown, Ellipsis } from 'lucide-react';
import { columns } from '../config/tableColumns';
import { CSVLink } from 'react-csv';
import { Context } from '@/context/ContextProvider';
import Spinner from './Spinner';

const TransactionsTable = ({ transactions, deleteTransaction, isLoading }) => {
  const {
    setIsPopUp,
    isDeleteConfirm,
    setIsDeleteConfirm,
    setTransaction,
    setIsEdit,
    setPopUpText,
  } = useContext(Context);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [rowToDelete, setRowToDelete] = useState(null);

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const getIncomeAndExpense = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.category === 'income') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    return { income, expense };
  };

  const getSelectedData = () => {
    const selectedRowsArray = [];

    table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected())
      .map((row) => {
        const date = new Date(row.original.date);
        return selectedRowsArray.push({
          _id: row.original._id,
          nr: row.id,
          amount: row.original.amount,
          category: row.original.category,
          date: date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        });
      });

    return selectedRowsArray;
  };

  const handleEdit = (rowData) => {
    setTransaction(rowData);
    setIsEdit(true);
  };

  const handleDeleteTransactions = () => {
    setIsPopUp(true);
    setPopUpText(`( ${getSelectedData().length} Transactions )`);
  };

  const handleDeleteIndividual = (row) => {
    setRowToDelete(row._id);
    setIsPopUp(true);
    setPopUpText(`( ${row.category} ${row.amount} )`);
  };

  useEffect(() => {
    if (isDeleteConfirm) {
      if (rowToDelete !== null) {
        deleteTransaction(rowToDelete);
        setRowToDelete(null);
      } else {
        const selectedData = getSelectedData();
        const ids = selectedData.map((row) => row._id);
        deleteTransaction(ids);
        setRowSelection({});
      }
      setIsPopUp(false);
      setIsDeleteConfirm(false);
    }
  }, [isDeleteConfirm]);

  return (
    <>
      <div className='flex flex-col justify-between gap-4 py-2 md:flex-row'>
        <Input
          placeholder='Filter by Category'
          value={table.getColumn('category').getFilterValue()}
          onChange={(event) =>
            table.getColumn('category').setFilterValue(event.target.value)
          }
          className='md:max-w-sm dark:bg-secondary'
        />

        <div className='flex gap-2 flex-wrap'>
          <div className='flex gap-2'>
            <Button variant='outline' disabled={!getSelectedData().length}>
              <CSVLink data={getSelectedData()}>Export as CSV</CSVLink>
            </Button>

            <Button
              variant='outline'
              disabled={!getSelectedData().length}
              onClick={handleDeleteTransactions}
            >
              Delete
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='rounded-md border border-border shadow-md dark:bg-secondary'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='font-bold'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {cell.column.id === 'actions' && (
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
                              <DropdownMenuItem
                                onClick={() => handleEdit(row.original)}
                              >
                                Change
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteIndividual(row.original)
                                }
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  There is no Transactions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='border-t flex gap-4 p-2 font-medium text-sm'>
          <span className='tracking-tight'>{`Income: ${
            getIncomeAndExpense().income
          } €`}</span>
          <span className='tracking-tight'>{`Expense: - ${
            getIncomeAndExpense().expense
          } €`}</span>
        </div>
      </div>

      <div className='flex items-center justify-end space-x-2 py-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className='space-x-2'>
          <Button
            variant={!table.getCanPreviousPage() ? 'outline' : 'default'}
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant={!table.getCanNextPage() ? 'outline' : 'default'}
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
