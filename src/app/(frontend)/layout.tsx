import React from 'react';
// @ts-ignore
import './styles.css';
import Header from '@/components/Header';
import Squares from '@/components/Squares';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang='fr'>
      <body className='relative min-h-screen bg-black text-white w-full flex flex-col overflow-hidden'>
        {/* Background layer */}
        <div className='fixed inset-0 pointer-events-auto'>
          <Squares
            speed={0.3}
            squareSize={40}
            direction='diagonal'
            borderColor='#ECD540'
            hoverFillColor='#ffffff'
          />
        </div>

        {/* Foreground content */}
        <div className='relative z-10 flex flex-col flex-1'>
          <Header />
          <main className='flex-1 relative'>
            <div className='pointer-events-auto'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
