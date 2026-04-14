'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster 
      position="top-center" 
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          style: {
            background: 'rgba(46, 204, 113, 0.9)',
          },
        },
        error: {
          style: {
            background: 'rgba(255, 107, 107, 0.9)',
          },
        },
      }}
    />
  );
}
