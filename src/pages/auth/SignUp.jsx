import { useCreateUser } from '@/api/userApi';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { createUser, isLoading, isSuccess, isError, error } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      const errors = error.response.data.errors;

      const newErrorMessage = { ...errorMessage };

      errors.forEach((err) => {
        newErrorMessage[err.path] = err.msg;
      });
      setErrorMessage(newErrorMessage);
    }
  }, [isError, error]);

  return (
    <form
      noValidate
      className='w-5/6 md:w-3/6 xl:w-[500px] mx-auto shadow-md border py-10 px-5 rounded-xl dark:bg-secondary'
      onSubmit={handleSubmit}
    >
      <div className='font-bold text-2xl mb-4 text-center'>Sign Up</div>

      <div key='firstName' className='relative'>
        <label htmlFor='firstName'>First Name</label>
        <input
          className={`w-full rounded-md border-2 p-2 mb-3 dark:bg-secondary ${
            errorMessage.firstName && 'border-red-500'
          } `}
          type='text'
          required
          id='firstName'
          name='firstName'
          value={userData.firstName}
          onChange={(e) => handleChange(e)}
        />
        {errorMessage.firstName && (
          <p className='text-red-500 mb-5 text-sm'>{errorMessage.firstName}</p>
        )}
      </div>

      <div key='lastName' className='relative'>
        <label htmlFor='lastName'>Last Name</label>
        <input
          className={`w-full rounded-md border-2 p-2 mb-3 dark:bg-secondary ${
            errorMessage.lastName && 'border-red-500'
          } `}
          type='text'
          required
          id='lastName'
          name='lastName'
          value={userData.lastName}
          onChange={(e) => handleChange(e)}
        />
        {errorMessage.lastName && (
          <p className='text-red-500 mb-5 text-sm'>{errorMessage.lastName}</p>
        )}
      </div>

      <div key='email' className='relative'>
        <label htmlFor='email'>E-Mail</label>
        <input
          className={`w-full rounded-md border-2 p-2 mb-3 dark:bg-secondary ${
            errorMessage.email && 'border-red-500'
          } `}
          type='email'
          required
          id='email'
          name='email'
          value={userData.email}
          onChange={(e) => handleChange(e)}
        />
        {errorMessage.email && (
          <p className='text-red-500 mb-5 text-sm'>{errorMessage.email}</p>
        )}
      </div>

      <div key='password' className='relative'>
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

      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button className='w-full' type='submit'>
          SignUp
        </Button>
      )}

      <p className='mt-4'>
        Already have an account ?
        <Link
          to='/login'
          className='text-textGreen hover:text-darkGreen ml-2 hover:underline'
        >
          Log In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
