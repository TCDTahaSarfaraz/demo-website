import Header from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Home from '@/app/components/Home'
import About from '@/app/components/About'
import Clients from '@/app/components/Clients'
import Testimonials from '@/app/components/Testimonials'
import Career from '@/app/components/Career'
import Contact from '@/app/components/Contact'

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <About/>
        <Clients />
        <Testimonials />
        <Career />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}