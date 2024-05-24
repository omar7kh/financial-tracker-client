import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { useLoginUser } from '@/api/userApi';

const LogIn = () => {
  const { LoginUser, isLoading, isSuccess } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    LoginUser(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/financial');
    }
  }, [isSuccess, navigate]);

  return (
    <section className='min-h-screen w-full'>
      <div className='h-screen min-h-[600px] flex flex-col justify-center items-center border'>
        <Link to='/'>
          <p className='font-bold text-2xl mb-4'>Finance Tracker</p>
        </Link>

        <form
          onSubmit={handleCreateUser}
          className='relative w-5/6 md:w-3/6 xl:w-[500px] mx-auto text-textWhite border shadow-md py-10 px-5 rounded-xl'
        >
          <div>
            <label htmlFor='email'>Email</label>
            <input
              className='w-full rounded-md border-2 p-2 mb-3'
              type='email'
              id='email'
              name='email'
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className='relative'>
            <label htmlFor='password'>Password</label>
            <input
              className='w-full rounded-md border-2 p-2 mb-3 pr-9'
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

            {showPassword ? (
              <EyeOff
                className='fa-solid fa-eye-slash absolute right-3 top-[35px] cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                className='fa-solid fa-eye-slash absolute right-3 top-[35px] cursor-pointer'
              />
            )}
          </div>

          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button className='w-full' type='submit'>
              Log In
            </Button>
          )}

          <p className='mt-2'>
            Don't have an account ?
            <Link to='/signup' className='ml-2'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
