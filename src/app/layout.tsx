'use client';
import './globals.css';
import { AuthContextProvider } from './context/AuthContext';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
