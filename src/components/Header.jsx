import { Link } from 'react-router-dom';
import MainNav from './MainNav';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';

const Header = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('UserInfo')));
  }, []);

  return (
    <header className='sticky top-0 py-6 shadow w-full bg-background dark:bg-black z-50'>
      <div className='container flex justify-between items-center'>
        <Link
          to='/'
          className='font-bold text-lg text-primary tracking-tighter md:text-2xl'
        >
          Financial Tracker
        </Link>

        <div className='hidden md:block'>
          <MainNav userInfo={userInfo} />
        </div>
        <div className='md:hidden'>
          <MobileNav userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default Header;
