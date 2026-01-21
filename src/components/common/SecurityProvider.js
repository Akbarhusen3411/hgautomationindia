/**
 * SecurityProvider Component
 * Adds runtime security protections to prevent code inspection
 * Only active in production mode
 */

import { useEffect } from 'react';

const SecurityProvider = ({ children }) => {
  useEffect(() => {
    // Only apply security measures in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔓 Security measures disabled in development mode');
      return;
    }

    // Console warning message
    const warningStyle = 'color: red; font-size: 24px; font-weight: bold;';
    const infoStyle = 'color: gray; font-size: 14px;';

    console.log('%c⚠️ STOP!', warningStyle);
    console.log('%cThis browser feature is intended for developers.', infoStyle);
    console.log('%cIf someone told you to copy-paste something here, it is a scam.', infoStyle);
    console.log('%c© HG Automation India - All Rights Reserved', 'color: #e67e22; font-size: 12px;');

    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for dev tools
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (Dev Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools opening via debugger
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        // DevTools might be open - you can add actions here
        // For example, redirect or show warning
      }
    };

    // Clear console periodically
    const clearConsoleInterval = setInterval(() => {
      console.clear();
      console.log('%c⚠️ Inspection is not allowed', warningStyle);
    }, 5000);

    // Disable text selection on specific elements
    const disableSelection = () => {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.msUserSelect = 'none';
      document.body.style.MozUserSelect = 'none';
    };

    // Disable drag
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Apply protections
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('resize', detectDevTools);

    // Enable text selection for form inputs
    const enableInputSelection = () => {
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.userSelect = 'text';
        input.style.webkitUserSelect = 'text';
      });
    };

    disableSelection();
    enableInputSelection();

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('resize', detectDevTools);
      clearInterval(clearConsoleInterval);
    };
  }, []);

  return children;
};

export default SecurityProvider;
