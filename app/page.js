

import Home from './components/Home';
import Clients from './components/Clients';
import About from './components/About'; // Next.js handles this server-to-client transition automatically.
import Testimonials from './components/Testimonials';
import Career from './components/Career';
import Contact from './components/Contact';

export default function Page() {
  return (
    <>
      <Home />
      <Clients />
      <About />
      <Testimonials />
      <Career />
      <Contact />
    </>
  );
}