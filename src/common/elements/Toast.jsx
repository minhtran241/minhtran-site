'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const TOAST_TYPES = {
  success: {
    icon: 'fa-solid fa-circle-check',
    className: 'alert-success',
  },
  error: {
    icon: 'fa-solid fa-circle-exclamation',
    className: 'alert-error',
  },
  warning: {
    icon: 'fa-solid fa-triangle-exclamation',
    className: 'alert-warning',
  },
  info: {
    icon: 'fa-solid fa-circle-info',
    className: 'alert-info',
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div
        className='toast toast-top toast-end z-100'
        role='region'
        aria-live='polite'
        aria-label='Notifications'
      >
        {toasts.map(({ id, message, type }) => {
          const config = TOAST_TYPES[type] || TOAST_TYPES.info;
          return (
            <div
              key={id}
              className={`alert ${config.className} animate-in slide-in-from-right-5 fade-in shadow-lg`}
              role='alert'
            >
              <div className='flex items-center gap-3'>
                <FontAwesomeIcon
                  icon={config.icon}
                  className='text-lg'
                  aria-hidden='true'
                />
                <span className='text-sm font-medium'>{message}</span>
                <button
                  onClick={() => hideToast(id)}
                  className='btn btn-sm btn-circle btn-ghost'
                  aria-label='Dismiss notification'
                >
                  <FontAwesomeIcon icon='fa-solid fa-xmark' />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
