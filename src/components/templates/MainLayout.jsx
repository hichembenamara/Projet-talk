import { useEffect } from 'react';
import useThemeStore from '../../stores/useThemeStore';
import ThemeToggle from '../atoms/ThemeToggle';
import Logo from '../atoms/Logo';

const MainLayout = ({ children }) => {
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    // S'assurer que la classe dark est correctement appliquée
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return (
    <div className="min-h-screen h-screen w-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="h-full w-full px-[2vw] sm:px-[4vw] py-[2vw] sm:py-[4vw]">
        <div className="mb-[2vw] sm:mb-[4vw] flex justify-between items-center">
          <div className="flex items-center gap-2 select-none">
            <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">Let's Talk</span>
          </div>
          <ThemeToggle />
        </div>
        <div className="h-[calc(100%-3rem)] grid grid-cols-1 lg:grid-cols-[minmax(30vw,40vw),1fr] gap-[2vw] sm:gap-[4vw]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 