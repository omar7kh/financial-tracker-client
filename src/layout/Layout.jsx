import Header from '@/components/Header';
import PopOver from '@/components/PopOver';
import { Context } from '@/context/ContextProvider';

import { ThemeProvider } from '@/theme/theme-provider';
import { useContext } from 'react';

const Layout = ({ children }) => {
  const { isPopUp } = useContext(Context);

  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen bg-background dark:bg-black text-foreground'>
        <Header />
        <main className='container flex-1 py-[32px]'>{children}</main>
        {isPopUp && <PopOver />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
