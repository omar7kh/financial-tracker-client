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
  const [exceedingLimitTimer, setExceedingLimitTimer] = useState(() => {
    const savedTimer = localStorage.getItem('exceedingLimitTimer');
    return savedTimer ? parseInt(savedTimer, 10) : 0;
  });
  const [exceedingLimitMessage, setExceedingLimitMessage] = useState(() => {
    const savedMessage = localStorage.getItem('exceedingLimitMessage');
    return savedMessage || '';
  });
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
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    LoginUser(userData);
    setErrorMessage({
      email: '',
      password: '',
    });
    setUnauthorizedError('');
  };

  useEffect(() => {
    if (isError) {
      const validationErrors = error.response.data.errors;
      const unauthorizedError = error.response.data.message;
      const exceedingLimitError = error.response.data;

      if (unauthorizedError) {
        setUnauthorizedError(unauthorizedError);
      } else if (validationErrors) {
        const newErrorMessage = { ...errorMessage };

        validationErrors.forEach((err) => {
          newErrorMessage[err.path] = err.msg;
        });
        setErrorMessage(newErrorMessage);
      } else if (exceedingLimitError) {
        setUnauthorizedError('');
        setExceedingLimitMessage(exceedingLimitError);
        setExceedingLimitTimer(60);
        localStorage.setItem('exceedingLimitTimer', 60);
        localStorage.setItem('exceedingLimitMessage', exceedingLimitError);
      }
    }
  }, [isError, error, errorMessage]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/financial');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    let timer;

    if (exceedingLimitTimer > 0) {
      timer = setInterval(() => {
        setExceedingLimitTimer((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('exceedingLimitTimer', newTime);
          return newTime;
        });
      }, 1000);
    } else {
      setExceedingLimitMessage('');
      localStorage.removeItem('exceedingLimitTimer');
      localStorage.removeItem('exceedingLimitMessage');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [exceedingLimitTimer]);

  return (
    <form
      onSubmit={handleCreateUser}
      className='relative w-5/6 md:w-3/6 xl:w-[500px] mx-auto border shadow-md py-10 px-5 rounded-xl dark:bg-secondary'
      noValidate
    >
      <div className='font-bold text-2xl mb-4 text-center'>Login</div>

      <div>
        <label htmlFor='email'>Email</label>
        <input
          className={`w-full rounded-md border-2 p-2 mb-3 dark:bg-secondary ${
            errorMessage.email && 'border-red-500'
          }`}
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

      <div>
        <label htmlFor='password'>Password</label>
        <div className='relative'>
          <input
            className={`w-full rounded-md border-2 p-2 mb-3 pr-10 dark:bg-secondary ${
              errorMessage.password ? 'border-red-500' : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            required
            onChange={handleChange}
          />
          {showPassword ? (
            <EyeOff
              className='fa-solid fa-eye-slash cursor-pointer text-primary absolute right-2 top-1/3 transform -translate-y-1/3'
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className='fa-solid fa-eye cursor-pointer text-primary absolute right-2 top-1/3 transform -translate-y-1/3'
            />
          )}
        </div>

        {errorMessage.password && (
          <p className='text-red-500 mb-5 text-sm'>{errorMessage.password}</p>
        )}
      </div>

      {unauthorizedError && (
        <p className='text-red-500 mb-5 text-sm'>{unauthorizedError}</p>
      )}

      {exceedingLimitTimer > 0 && exceedingLimitMessage && (
        <p className='text-red-500 mb-5 text-sm'>
          {exceedingLimitMessage.split('1 minute')[0]} {exceedingLimitTimer}
        </p>
      )}

      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button
          className='w-full'
          type='submit'
          disabled={exceedingLimitTimer > 0 && exceedingLimitMessage}
        >
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
  );
};

export default LogIn;
