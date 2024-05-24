import { CircleUserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { IsLoggedInLinks, NotLoggedInLinks } from './NavLinks';

const MainNav = () => {
  const userInfo = JSON.parse(localStorage.getItem('UserInfo'));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none flex justify-center items-center'>
        <CircleUserIcon
          className='text-primary md:w-8 md:h-8'
          aria-label='User Profile'
        />
      </DropdownMenuTrigger>

      {userInfo ? (
        <>
          <DropdownMenuContent>
            <IsLoggedInLinks userInfo={userInfo} />
          </DropdownMenuContent>
        </>
      ) : (
        <DropdownMenuContent className='flex flex-col text-sm'>
          <NotLoggedInLinks />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default MainNav;
