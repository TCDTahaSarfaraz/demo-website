import { Manrope } from 'next/font/google'; // 1. Import the font for optimization
import './globals.css';

// 2. Import the essential, persistent components
import { Providers } from './providers';
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';

// 3. Configure the font with subsets and display swapping for performance
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope', // Optional: for use in CSS
});

export const metadata = {
  title: 'My Professional Website',
  description: 'A modern, animated professional website with seamless theme switching.',
};

// 4. The definitive RootLayout component
export default function RootLayout({ children }) {
  return (
    // 'suppressHydrationWarning' is the correct and professional solution here. See explanation below.
    <html lang="en" className={manrope.className} suppressHydrationWarning>
      <body>
        {/* The ThemeProvider must wrap everything, including the Navbar and Footer */}
        <Providers>
          <Navbar />
          <main id="main-content">
            {children} {/* This is where your Page components will be rendered */}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}