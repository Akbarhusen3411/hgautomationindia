import { useEffect } from 'react';

/**
 * Source Protection Hook
 * Disables common methods of viewing/copying source code in production
 * Only active when NODE_ENV === 'production'
 */
const useSourceProtection = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const preventDefaultAction = (e) => e.preventDefault();

    // Disable right-click context menu
    document.addEventListener('contextmenu', preventDefaultAction);

    // Disable keyboard shortcuts for DevTools and source viewing
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return;
      }
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key.toUpperCase() === 'S') {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent text selection except in form inputs
    const handleSelectStart = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      e.preventDefault();
    };

    document.addEventListener('selectstart', handleSelectStart);

    // Prevent copy except in form inputs
    const handleCopy = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);

    // Prevent image drag
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', preventDefaultAction);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
};

export default useSourceProtection;
