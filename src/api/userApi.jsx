import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_SERVER_URL;

// CREATE USER
export const useCreateUser = () => {
  const createUserRequest = async (userFormData) => {
    const response = await axios.post(
      `${API_URL}/api/user/signup`,
      userFormData,
      { withCredentials: true }
    );

    if (response.status !== 201) {
      console.log(response.data);

      throw new Error('Failed to create User');
    }

    return response.data;
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation(createUserRequest, {
    onSuccess: () => {
      toast.success('User created successfully');
    },
    onError: () => {
      toast.error('Failed to create User');
    },
  });

  return { createUser, isLoading, isSuccess, isError, error };
};

// LOGIN USER
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

    localStorage.setItem('UserInfo', JSON.stringify(response.data));

    return response.data;
  };

  const {
    mutateAsync: LoginUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation(createLoginRequest, {
    onSuccess: () => {
      toast.success('Logged in successfully');
    },
    onError: () => {
      toast.error('Failed to Login');
    },
  });

  return { LoginUser, isLoading, isSuccess, isError, error };
};

// UPDATE USER
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
      toast.success('User updated successfully');
    },
    onError: () => {
      toast.error('Failed to Update User');
      reset();
    },
  });

  return { updatedUser, isLoading };
};

// LOGOUT USER
export const useLogoutUser = () => {
  const logoutUserRequest = async () => {
    const response = await axios.post(
      `${API_URL}/api/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to Logout');
    }

    return response.data;
  };

  const {
    mutate: logoutUser,
    isLoading,
    isSuccess,
  } = useMutation(logoutUserRequest, {
    onSuccess: () => {
      toast.success('Logged out');
    },
    onError: () => {
      toast.error('Failed to Logout');
    },
  });

  return { logoutUser, isLoading, isSuccess };
};
