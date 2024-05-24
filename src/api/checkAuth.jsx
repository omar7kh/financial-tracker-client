import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = import.meta.env.VITE_SERVER_URL;

export const useCheckAuth = () => {
  const checkAuthRequest = async () => {
    const response = await axios.get(`${API_URL}/api/user/auth`, {
      withCredentials: true,
    });

    return response.data;
  };

  const { data: isAuth, isLoading } = useQuery('checkAuth', checkAuthRequest);

  return { isAuth, isLoading };
};
