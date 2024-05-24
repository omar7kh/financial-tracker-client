import { Link } from 'react-router-dom';
import heroImg from '../assets/images/undraw_investing_re_bov7.svg';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className='h-[600px] flex flex-col justify-between items-center gap-10 lg:flex-row md:gap-32'>
      <div className='h-full xl:w-1/2 rounded-xl bg-foreground text-white flex flex-col justify-center p-10 gap-4 xl:gap-10'>
        <p className='text-2xl font-bold capitalize w-fit lg:text-4xl xxl:text-6xl'>
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
      <img src={heroImg} alt='finance imag' className='w-[500px] lg:w-[40%] ' />
    </div>
  );
};

export default HomePage;
