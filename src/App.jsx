import Header from './components/Header'
import Intro from './components/Intro'
import About from './components/About'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import Currently from './components/Currently'
import Bookshelf from './components/Bookshelf'
import Services from './components/Services'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Intro />
        <Currently />
        <About />
        <Resume />
        <Portfolio />
        <Bookshelf />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
