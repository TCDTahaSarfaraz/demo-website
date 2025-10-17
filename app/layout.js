import './globals.css';
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';

export const metadata = {
  title: 'My Professional Website',
  description: 'A Stripe-inspired professional website.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}