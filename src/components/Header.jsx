import { Link } from 'react-router-dom';
import MainNav from './MainNav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='mx-auto py-6 shadow w-full bg-background z-50'>
      <div className='container flex justify-between items-center'>
        <Link
          to='/'
          className='font-bold text-lg text-primary tracking-tighter md:text-2xl'
        >
          Finance Tracker
        </Link>

        <div className='hidden md:block'>
          <MainNav />
        </div>
        <div className='md:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
