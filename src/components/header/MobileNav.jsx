import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Separator } from '../ui/separator';
import { IsLoggedInLinks, NotLoggedInLinks } from './NavLinks';

const MobileNav = ({ userInfo }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          className='text-primary cursor-pointer w-8 h-8'
          aria-label='Main Menu'
        />
      </SheetTrigger>

      <SheetContent className='space-y-3'>
        <SheetHeader>
          <SheetTitle className='text-primary mx-auto'>
            Finance Tracker
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {userInfo ? (
          <div className='space-y-3'>
            <IsLoggedInLinks userInfo={userInfo} />
          </div>
        ) : (
          <div className='flex justify-evenly'>
            <NotLoggedInLinks />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
