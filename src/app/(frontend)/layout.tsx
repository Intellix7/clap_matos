import React from 'react';
// @ts-ignore
import './styles.css';
import Header from '@/components/Header';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang='fr'>
      <body className='min-h-screen bg-white flex flex-col items-center'>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
