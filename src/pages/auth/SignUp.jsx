import { useCreateUser } from '@/api/userApi';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { createUser, isLoading, isSuccess } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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

  return (
    <section className='min-h-screen flex flex-col justify-center items-center'>
      <div className='h-screen min-h-[600px] w-full flex flex-col justify-center items-center'>
        <Link to='/'>
          <p className='font-bold text-2xl mb-4'>Finance Tracker</p>
        </Link>

        <form
          className='w-5/6 md:w-3/6 xl:w-[500px] mx-auto shadow-md border py-10 px-5 rounded-xl'
          onSubmit={handleSubmit}
        >
          <div key='firstName' className='relative'>
            <label htmlFor='firstName'>FirstName</label>
            <input
              className='w-full rounded-md border-2 border-borderPrimary p-2 mb-3'
              type='text'
              required
              id='firstName'
              name='firstName'
              value={userData.firstName}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div key='lastName' className='relative'>
            <label htmlFor='lastName'>LastName</label>
            <input
              className='w-full rounded-md border-2 border-borderPrimary p-2 mb-3'
              type='text'
              required
              id='lastName'
              name='lastName'
              value={userData.lastName}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div key='email' className='relative'>
            <label htmlFor='email'>Email</label>
            <input
              className='w-full rounded-md border-2 border-borderPrimary p-2 mb-3'
              type='email'
              required
              id='email'
              name='email'
              value={userData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div key='password' className='relative'>
            <label htmlFor='password'>Password</label>
            <input
              className='w-full rounded-md border-2 border-borderPrimary p-2 mb-3'
              type={showPassword ? 'text' : 'password'}
              required
              id='password'
              name='password'
              value={userData.password}
              onChange={(e) => handleChange(e)}
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
      </div>
    </section>
  );
};

export default SignUp;
