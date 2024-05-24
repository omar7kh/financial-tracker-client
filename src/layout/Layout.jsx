import Header from '@/components/Header';

import { ThemeProvider } from '@/theme/theme-provider';

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen bg-background text-foreground'>
        <Header />
        <main className='container flex-1 pt-10'>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
