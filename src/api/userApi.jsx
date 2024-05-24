import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_SERVER_URL;

export const useCreateUser = () => {
  const createUserRequest = async (userFormData) => {
    const response = await axios.post(
      `${API_URL}/api/user/signup`,
      userFormData,
      { withCredentials: true }
    );

    if (response.status !== 201) {
      throw new Error('Failed to create User');
    }
    return response.data;
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createUserRequest, {
    onSuccess: () => {
      toast.success('User created successfully');
    },
    onError: () => {
      toast.error('Failed to create User');
    },
  });

  return { createUser, isLoading, isSuccess };
};

export const useLoginUser = () => {
  const createLoginRequest = async (userFormData) => {
    const response = await axios.post(
      `${API_URL}/api/user/login`,
      userFormData,
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error('Failed to Login');
    }
    console.log('loggedUser', response.data);

    localStorage.setItem('UserInfo', JSON.stringify(response.data));

    return response.data;
  };

  const {
    mutateAsync: LoginUser,
    isLoading,
    isSuccess,
    reset,
  } = useMutation(createLoginRequest, {
    onSuccess: () => {
      toast.success('User Logged in successfully');
    },
    onError: () => {
      toast.error('Failed to Login');
      reset();
    },
  });

  return { LoginUser, isLoading, isSuccess };
};

export const useUpdateUser = () => {
  const updateUserRequest = async (userFormData) => {
    const response = await axios.put(`${API_URL}/api/user`, userFormData, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to Update User');
    }

    localStorage.removeItem('UserInfo');
    localStorage.setItem('UserInfo', JSON.stringify(response.data));

    return response.data;
  };

  const {
    mutateAsync: updatedUser,
    isLoading,
    reset,
  } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success('User updated in successfully');
    },
    onError: () => {
      toast.error('Failed to Update User');
      reset();
    },
  });

  return { updatedUser, isLoading };
};
