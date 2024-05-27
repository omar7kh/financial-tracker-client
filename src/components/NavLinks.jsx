import { Separator } from './ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLogoutUser } from '@/api/userApi';

export const IsLoggedInLinks = ({ userInfo }) => {
  const { logoutUser, isLoading } = useLogoutUser();

  const navigate = useNavigate();

  if (isLoading) return;

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('UserInfo');
    navigate('/');
  };

  return (
    <>
      <div className='text-sm px-2 text-center'>{`${userInfo.firstName}  ${userInfo.lastName}`}</div>

      <Separator className='my-1' />

      <div className='flex flex-col justify-start text-sm'>
        <Link to='/'>
          <Button variant='ghost' className='w-full'>
            Home
          </Button>
        </Link>
        <Link to='/financial'>
          <Button variant='ghost' className='w-full'>
            Transactions
          </Button>
        </Link>
        <Link to='/profile'>
          <Button variant='ghost' className='w-full'>
            Profile
          </Button>
        </Link>
        <Button variant='ghost' onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export const NotLoggedInLinks = () => {
  return (
    <>
      <Link to='/login'>
        <Button variant='ghost' className='w-full'>
          Login
        </Button>
      </Link>

      <Link to='/signup'>
        <Button variant='ghost' className='w-full'>
          Sign up
        </Button>
      </Link>
    </>
  );
};
