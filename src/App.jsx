import Header from './components/Header'
import Intro from './components/Intro'
import About from './components/About'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import Bookshelf from './components/Bookshelf'
import CaseStudies from './components/CaseStudies'
import NetworkLab from './components/NetworkLab'
import Notes from './components/Notes'
import Services from './components/Services'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Intro />
        <About />
        <Resume />
        <Portfolio />
        <Bookshelf />
        <CaseStudies />
        <NetworkLab />
        <Notes />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
