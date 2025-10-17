import { Manrope } from 'next/font/google'; 
import './globals.css';
import Navbar from '../app/components/Navbar'; 
import Footer from '../app/components/Footer';


const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'My Professional Website',
  description: 'A Stripe-inspired professional website.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}