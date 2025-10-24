

import Home from './components/Home';
import Clients from './components/Clients';
import About from './components/About'; // Next.js handles this server-to-client transition automatically.
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';

export default function Page() {
  return (
    <>
      <Home />
      <Clients />
      <Testimonials />
      <About />
      <Services />
      <Contact />
    </>
  );
}