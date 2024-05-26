import { Link } from 'react-router-dom';
import transactionsImg from '../assets/images/transactions-light.png';
import chartImg from '../assets/images/chart-light.png';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  const theme = localStorage.getItem('vite-ui-theme');
  return (
    <div className='flex flex-col gap-20 justify-center items-center'>
      <div className='lg:h-[500px] rounded-xl bg-foreground text-primary-foreground flex flex-col justify-center p-10 gap-4 xl:gap-10'>
        <p className='text-2xl font-bold capitalize w-fit lg:text-4xl xxl:text-6xl'>
          Take Control of Your Finances with Ease
        </p>
        <p className='text-sm lg:text-xl lg:max-w-[80%]'>
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

      <div className='flex flex-col gap-10 md:w-[80%]'>
        <img
          src={transactionsImg}
          alt='finance image'
          className='rounded-xl border p-1 shadow-md'
        />

        <img
          src={chartImg}
          alt='chart image'
          className='rounded-xl border shadow-md'
        />
      </div>
    </div>
  );
};

export default HomePage;
