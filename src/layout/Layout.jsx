import Header from '@/components/header/Header';
import PopOver from '@/components/PopOver';
import { Context } from '@/context/ContextProvider';

import { ThemeProvider } from '@/theme/theme-provider';
import { useContext } from 'react';

const Layout = ({ children }) => {
  const { isPopUp } = useContext(Context);

  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen text-foreground'>
        <Header />
        <main className='container flex-1 py-10 flex flex-col justify-center'>
          {children}
        </main>
        {isPopUp && <PopOver />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
