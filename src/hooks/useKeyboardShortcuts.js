import { useEffect } from 'react';

/**
 * Custom hook to handle keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to handler functions
 * Example: { 'ctrl+k': () => console.log('Ctrl+K pressed') }
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey; // Support both Ctrl and Cmd (Mac)
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Build key combination string
      let combination = '';
      if (ctrl) combination += 'ctrl+';
      if (shift) combination += 'shift+';
      if (alt) combination += 'alt+';
      combination += key;

      // Check if this combination has a handler
      if (shortcuts[combination]) {
        event.preventDefault();
        shortcuts[combination](event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};

/**
 * Hook to handle single key press with optional modifiers
 * @param {string} targetKey - The key to listen for
 * @param {Function} handler - Function to call when key is pressed
 * @param {Object} options - Optional modifiers (ctrl, shift, alt)
 */
export const useKeyPress = (targetKey, handler, options = {}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { ctrl = false, shift = false, alt = false } = options;
      
      const keyMatches = event.key.toLowerCase() === targetKey.toLowerCase();
      const ctrlMatches = !ctrl || event.ctrlKey || event.metaKey;
      const shiftMatches = !shift || event.shiftKey;
      const altMatches = !alt || event.altKey;

      if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, handler, options]);
};

/**
 * Hook to handle Escape key press
 * @param {Function} handler - Function to call when Escape is pressed
 */
export const useEscapeKey = (handler) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handler]);
};
