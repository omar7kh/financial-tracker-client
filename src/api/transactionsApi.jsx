import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_SERVER_URL;
const userInfo = JSON.parse(localStorage.getItem('UserInfo'));

// Get Transactions
export const useGetTransactions = () => {
  const getTransactionsRequest = async () => {
    const response = await axios.get(`${API_URL}/api/transaction`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to get transactions');
    }
    return response.data;
  };

  const { data: transactions, isLoading } = useQuery(
    'getTransactions',
    getTransactionsRequest
  );

  return { transactions, isLoading };
};

// Create Transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const createTransactionRequest = async (transactionFormData) => {
    const response = await axios.post(
      `${API_URL}/api/transaction`,
      transactionFormData,
      { withCredentials: true }
    );

    if (response.status !== 201) {
      throw new Error('Failed to create transaction');
    }
    return response.data;
  };

  const { mutateAsync: createTransaction, isLoading } = useMutation(
    createTransactionRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTransactions');
        toast.success('Transaction created successfully');
      },
      onError: () => {
        toast.error('Failed to create transaction');
      },
    }
  );

  return { createTransaction, isLoading };
};

// Delete Transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const deleteTransactionRequest = async (ids) => {
    const response = await axios.delete(`${API_URL}/api/transaction`, {
      data: { ids },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete transaction');
    }
    return response.data;
  };

  const { mutateAsync: deleteTransaction, isLoading } = useMutation(
    deleteTransactionRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTransactions');
        toast.success('Transaction deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete transaction');
      },
    }
  );

  return { deleteTransaction, isLoading };
};

// Update Transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  const updateTransactionRequest = async (transaction) => {
    const response = await axios.put(
      `${API_URL}/api/transaction`,
      transaction,
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update transaction');
    }
    return response.data;
  };

  const { mutateAsync: updateTransaction, isLoading } = useMutation(
    updateTransactionRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTransactions');
        toast.success('Transaction updated successfully');
      },
      onError: () => {
        toast.error('Failed to update transaction');
      },
    }
  );

  return { updateTransaction, isLoading };
};
