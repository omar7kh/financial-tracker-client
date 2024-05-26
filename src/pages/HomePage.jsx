import { Link } from 'react-router-dom';
import transactionsImgLight from '../assets/images/transaction-light.png';
import transactionsImgDark from '../assets/images/transaction-dark.png';
import chartImgLight from '../assets/images/chart-light.png';
import chartImgDark from '../assets/images/chart-dark.png';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  const theme = localStorage.getItem('vite-ui-theme');

  return (
    <div className='flex flex-col gap-10 justify-center items-center'>
      <div className='rounded-md bg-primary text-primary-foreground dark:bg-background dark:text-white flex flex-col justify-center p-10 gap-4 xl:gap-10'>
        <p className='text-2xl font-bold tracking-tight lg:text-4xl xxl:text-6xl'>
          Take Control of Your Finances with Ease
        </p>
        <p className='text-sm lg:text-xl'>
          Track, manage, and optimize your finances effortlessly with our
          powerful and intuitive finance tracker. From budgeting to investments,
          our comprehensive tools help you stay on top of your financial goals.
          Get started today and pave the way to a secure financial future.
        </p>

        <Link to='/signup'>
          <Button className='w-fit' variant='secondary'>
            SignUp
          </Button>
        </Link>
      </div>

      <div className='flex flex-col gap-10 justify-between items-center w-full'>
        <div className='flex flex-col md:flex-row items-center gap-5 rounded-md bg-primary text-primary-foreground dark:bg-background dark:text-white p-5'>
          <div>
            <p className='text-2xl mb-2 font-bold tracking-tight lg:text-4xl xxl:text-6xl'>
              Table
            </p>
            <p className='text-sm lg:text-xl'>
              Improve and manage your transactions easily. Download them as CSV
              and sort them with just a few clicks
            </p>
          </div>

          <img
            src={theme === 'dark' ? transactionsImgDark : transactionsImgLight}
            alt='finance image'
            className='w-full md:w-[65%] h-full object-contain'
          />
        </div>

        <div className='flex flex-col md:flex-row-reverse items-center gap-5 rounded-md bg-primary text-primary-foreground dark:bg-background dark:text-white p-5'>
          <div>
            <p className='text-2xl mb-2 font-bold tracking-tight lg:text-4xl xxl:text-6xl'>
              Chart
            </p>
            <p className='text-sm lg:text-xl'>
              The chart enables you to easily monitor and organize your
              transactions
            </p>
          </div>

          <img
            src={theme === 'dark' ? chartImgDark : chartImgLight}
            alt='chart image'
            className='w-full md:w-[65%] h-full object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
