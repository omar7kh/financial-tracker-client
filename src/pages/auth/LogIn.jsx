import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { useLoginUser } from '@/api/userApi';

const LogIn = () => {
  const { LoginUser, isLoading, isSuccess, isError, error } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);
  const [unauthorizedError, setUnauthorizedError] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
    setUnauthorizedError('');
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    LoginUser(userData);
    setErrorMessage({
      email: '',
      password: '',
    });
    setErrorMessage('');
  };

  useEffect(() => {
    if (isError) {
      const validationErrors = error.response.data.errors;
      const unauthorizedError = error.response.data.message;

      if (unauthorizedError) {
        setUnauthorizedError(unauthorizedError);
      } else if (validationErrors) {
        const newErrorMessage = { ...errorMessage };

        validationErrors.forEach((err) => {
          newErrorMessage[err.path] = err.msg;
        });
        setErrorMessage(newErrorMessage);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/financial');
    }
  }, [isSuccess, navigate]);

  return (
    <section className='min-h-screen w-full'>
      <div className='h-screen min-h-[600px] flex flex-col justify-center items-center'>
        <Link to='/'>
          <p className='font-bold text-2xl mb-4'>Finance Tracker</p>
        </Link>

        <form
          onSubmit={handleCreateUser}
          className='relative w-5/6 md:w-3/6 xl:w-[500px] mx-auto border shadow-md py-10 px-5 rounded-xl'
          noValidate
        >
          <div>
            <label htmlFor='email'>Email</label>
            <input
              className={`w-full rounded-md border-2  p-2 mb-3 dark:text-primary-foreground ${
                errorMessage.email && 'border-red-500'
              } `}
              type='email'
              id='email'
              name='email'
              required
              onChange={handleChange}
            />
            {errorMessage.email && (
              <p className='text-red-500 mb-5 text-sm'>{errorMessage.email}</p>
            )}
          </div>

          <div className='relative'>
            <label htmlFor='password'>Password</label>
            <input
              className={`w-full rounded-md border-2 p-2 mb-3 pr-10 dark:text-primary-foreground ${
                errorMessage.password && 'border-red-500'
              } `}
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              required
              onChange={handleChange}
            />

            {showPassword ? (
              <EyeOff
                className='fa-solid fa-eye-slash absolute right-3 top-[34px] cursor-pointer dark:text-primary-foreground'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                className='fa-solid fa-eye-slash absolute right-3 top-[34px] cursor-pointer dark:text-primary-foreground'
              />
            )}

            {errorMessage.password && (
              <p className='text-red-500 mb-5 text-sm'>
                {errorMessage.password}
              </p>
            )}
          </div>

          {unauthorizedError && (
            <p className='text-red-500 mb-5 text-sm'>{unauthorizedError}</p>
          )}

          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button className='w-full' type='submit'>
              Log In
            </Button>
          )}

          <p className='mt-2'>
            Don't have an account ?
            <Link to='/signup' className='ml-2 hover:underline'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
