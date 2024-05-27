import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeToggle from '@/theme/ThemeToggle';
import TransactionsTable from './TransactionsTable';
import {
  useGetTransactions,
  useCreateTransaction,
  useDeleteTransaction,
  useUpdateTransaction,
} from '@/api/transactionsApi';
import TransactionCard from './TransactionCard';
import Spinner from './Spinner';
import { useContext } from 'react';
import { Context } from '@/context/ContextProvider';
import ChartsContainer from './charts/ChartsContainer';

const Transaction = () => {
  const { isEdit, setIsEdit } = useContext(Context);
  const { transactions, isLoading: isGetLoading } = useGetTransactions();
  const { createTransaction, isLoading: isCreateLoading } =
    useCreateTransaction();
  const { deleteTransaction, isLoading: isDeleteLoading } =
    useDeleteTransaction();
  const { updateTransaction, isLoading: isUpdateLoading } =
    useUpdateTransaction();

  if (isGetLoading) return;

  return (
    <Tabs defaultValue='transactions'>
      <TabsList>
        <TabsTrigger value='transactions'>Transactions</TabsTrigger>
        <TabsTrigger value='charts'>Chart</TabsTrigger>
      </TabsList>

      <TabsContent value='transactions' className='space-y-5'>
        <TransactionCard
          onSave={isEdit ? updateTransaction : createTransaction}
          isLoading={isEdit ? isUpdateLoading : isCreateLoading}
          submitText={isEdit ? 'Update' : 'Save'}
        />
        <TransactionsTable
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          isLoading={isDeleteLoading}
        />
      </TabsContent>

      <TabsContent value='charts'>
        <ChartsContainer transactionsData={transactions} />
      </TabsContent>
    </Tabs>
  );
};

export default Transaction;
