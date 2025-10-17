import Home from './components/Home';
import Clients from './components/Clients';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Career from './components/Career';
import Contact from './components/Contact';
import PageTransition from './page-transition'; // <-- Import the animation wrapper

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
  )
}