import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Services from "../components/Services";
import BeyondCode from "../components/BeyondCode";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Hero />
      <About />
      <Work />
      <Services />
      <BeyondCode />
      <Experience />
      <Contact />
    </main>
  );
}
