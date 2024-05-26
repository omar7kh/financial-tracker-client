import Header from '@/components/Header';

import { ThemeProvider } from '@/theme/theme-provider';

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen bg-background text-foreground'>
        <Header />
        <main className='container flex-1 flex flex-col justify-center py-[32px]'>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
