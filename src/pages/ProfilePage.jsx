import { useUpdateUser } from '@/api/userApi';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { updatedUser, isLoading } = useUpdateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('UserInfo'));

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.firstName &&
      !userData.lastName &&
      !userData.email &&
      !userData.currentPassword &&
      !userData.newPassword
    ) {
      setErrorMessage('Please fill in at least one field.');
      return;
    } else if (userData.currentPassword && !userData.newPassword) {
      setErrorMessage('New Password is required');
      return;
    } else if (userData.newPassword && !userData.currentPassword) {
      setErrorMessage('Current Password is required');
      return;
    }

    updatedUser(userData);
    setErrorMessage('');
  };

  useEffect(() => {
    if (
      userData.firstName ||
      userData.lastName ||
      userData.email ||
      userData.currentPassword ||
      userData.newPassword
    ) {
      setErrorMessage('');
    }
  }, [userData]);

  return (
    <div className='min-h-[600px] w-full flex flex-col justify-center items-center'>
      <div className='w-5/6 md:w-3/6 xl:w-[500px] mb-5'>
        <h2 className='font-bold text-2xl'>Profile</h2>
        <h4>view and change your Data</h4>
      </div>

      <form
        className='w-5/6 md:w-3/6 xl:w-[500px] shadow-md border py-10 px-5 rounded-xl bg-background'
        onSubmit={handleSubmit}
      >
        <div className='flex gap-2'>
          <div key='firstName' className='relative'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='w-full rounded-md border-2 p-2 mb-3 text-primary dark:text-primary-foreground'
              type='text'
              id='firstName'
              name='firstName'
              placeholder={userInfo.firstName}
              value={userData.firstName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div key='lastName' className='relative'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='w-full rounded-md border-2 p-2 mb-3 text-primary dark:text-primary-foreground'
              type='text'
              id='lastName'
              name='lastName'
              placeholder={userInfo.lastName}
              value={userData.lastName}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div key='email' className='relative'>
          <label htmlFor='email'>E-Mail</label>
          <input
            className='w-full rounded-md border-2 p-2 mb-3 text-primary dark:text-primary-foreground'
            type='email'
            id='email'
            name='email'
            placeholder={userInfo.email}
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div key='currentPassword' className='relative'>
          <label htmlFor='currentPassword'>Current Password</label>
          <input
            className='w-full rounded-md border-2 p-2 mb-3 text-primary dark:text-primary-foreground'
            type={showPassword ? 'text' : 'password'}
            id='currentPassword'
            name='currentPassword'
            value={userData.currentPassword}
            onChange={(e) => handleChange(e)}
          />

          {showPassword ? (
            <EyeOff
              className='fa-solid fa-eye-slash absolute right-3 top-[35px] cursor-pointer text-primary dark:text-primary-foreground'
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className='fa-solid fa-eye-slash absolute right-3 top-[35px] cursor-pointer text-primary dark:text-primary-foreground'
            />
          )}
        </div>
        <div key='newPassword' className='relative'>
          <label htmlFor='newPassword'>New Password</label>
          <input
            className='w-full rounded-md border-2 p-2 mb-3 text-primary dark:text-primary-foreground'
            type={showPassword ? 'text' : 'password'}
            id='newPassword'
            name='newPassword'
            value={userData.newPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <p className='text-red-500 mb-4'>{errorMessage}</p>

        {isLoading ? <LoadingButton /> : <Button type='submit'>Save</Button>}
      </form>
    </div>
  );
};

export default ProfilePage;
