'use client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import React, { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {
  const themeValues = [
    { value: 'winter', label: 'Winter' },
    { value: 'night', label: 'Night' },
    { value: 'lofi', label: 'Lo-Fi' },
    { value: 'corporate', label: 'Corporate' },
  ];

  // Initialize with empty string to prevent hydration mismatch
  const [currentTheme, setCurrentTheme] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    // Set initial theme immediately
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'night'
        : 'winter');

    document.documentElement.setAttribute('data-theme', savedTheme);
    localStorage.setItem('theme', savedTheme);
    setCurrentTheme(savedTheme);

    // Initialize theme-change after setting initial theme
    themeChange(false);

    // Listen for theme changes on radio inputs
    const handleThemeChange = (e) => {
      if (e.target.matches('input[name="theme-dropdown"]')) {
        setCurrentTheme(e.target.value);
      }
    };

    // Listen to clicks on theme radio buttons
    document.addEventListener('change', handleThemeChange);

    return () => {
      document.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const getCurrentThemeLabel = () => {
    const theme = themeValues.find((t) => t.value === currentTheme);
    return theme ? theme.label : currentTheme || 'Default';
  };

  return (
    <div className='dropdown dropdown-end' data-choose-theme>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost gap-2'
        aria-label='Choose theme'
      >
        <FontAwesomeIcon icon='fa-duotone fa-solid fa-droplet' />
        <span className='hidden sm:inline'>
          {isClient ? getCurrentThemeLabel() : 'Theme'}
        </span>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu rounded-box border-base-200 bg-base-100 text-base-content z-1 min-w-40 border p-2 shadow-lg'
      >
        {themeValues.map((theme) => (
          <li key={theme.value}>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
              aria-label={theme.label}
              value={theme.value}
              defaultChecked={currentTheme === theme.value}
              onChange={(e) => {
                document.documentElement.setAttribute(
                  'data-theme',
                  e.target.value,
                );
                localStorage.setItem('theme', e.target.value);
                setCurrentTheme(e.target.value);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeChanger;
