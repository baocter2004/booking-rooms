import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  
  useEffect(() => {
    const scrollableElement = document.querySelector('main.overflow-y-auto');
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  
  useEffect(() => {
    const scrollableElement = document.querySelector('main.overflow-y-auto');
    const toggleVisibility = () => {
      const scrollTop = scrollableElement 
        ? scrollableElement.scrollTop 
        : window.scrollY;
      
      if (scrollTop >= 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', toggleVisibility);
    } else {
      window.addEventListener('scroll', toggleVisibility);
    }
    
    toggleVisibility();
    
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', toggleVisibility);
      } else {
        window.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, [pathname]);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector('main.overflow-y-auto');
    if (scrollableElement) {
      scrollableElement.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 active:scale-95 z-[9999]"
      aria-label="Scroll to top"
      type="button"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;
